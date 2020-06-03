import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, FlatList, RefreshControl, Dimensions } from 'react-native';
import { Tabs, Tab, Thumbnail, Icon, Row } from 'native-base';
import { HeaderQ, InputQ, Filters, LoanItem, LoanHeader, CustomPickerInput } from '../../common';
import { getVales, onChangeTab, onToggleFilter, onFilterChanged, onOrderByChanged, onStatusChanged, onDateChanged, getLoans, getConfiaShopCredits, onValeTypeChanged } from '../../../store/actions';
import { images, colors } from '../../../assets';
import styles from './Loans.style';
import { moderateScale } from 'react-native-size-matters';
const { width } = Dimensions.get('window');

class Loands extends Component {
  state = {
    currentTab: 0
  }

  componentDidMount() {
    this.props.getVales()
    this.props.getLoans()
    this.props.getConfiaShopCredits()
  }

  render() {
    let { navigation, loan, profile } = this.props;
    let { atraso } = profile
    let { currentTab } = this.state
    let {
      loadingVales,
      loadingLoans,
      loadingConfiaShop,
      vales,
      valesFiltered,
      credishop,
      credishopFiltered,
      loans,
      loansFiltered,
      backgroundColor,
      showValeFilter,
      showShopFilter,
      showLoanFilter,
      valeFilter,
      credishopFilter,
      loanFilter,
    } = loan
    let valeType = valeFilter.valeSelector.find(vale => vale.value == valeFilter.valeSelected).label
    return (
      <HeaderQ
        navigation={navigation}
        contentStyle={styles.containerStyle}
        noPaddingBottom
        imageTitle={currentTab == 1}
        scroll={false}
        color={backgroundColor}
        contentLeft={
          (currentTab == 0 || currentTab == 1) && !atraso ? <TouchableOpacity onPress={() => navigation.navigate(currentTab == 0 ? "NewVale" : "ConfiaShop")}>
            <Thumbnail small source={images.add} />
          </TouchableOpacity> : null
        }>
        <Tabs onChangeTab={(tab) => { this.props.onChangeTab(tab.i); this.setState({ 'currentTab': tab.i }) }} tabContainerStyle={{ elevation: 0, borderBottomColor: backgroundColor }} tabBarUnderlineStyle={[styles.tabBar, { borderBottomColor: 'black' }]}>
          <Tab activeTextStyle={styles.textActive} textStyle={styles.textTab} activeTabStyle={{ backgroundColor }} tabStyle={{ backgroundColor }} style={{ backgroundColor }} heading={valeType}>
            <View style={[styles.wrapperFilters, { flex: 0 }]}>
              <TouchableOpacity onPress={() => this.props.onToggleFilter({ showValeFilter: !showValeFilter })}>
                <Text style={styles.txtFilter}>FILTROS <Icon type="FontAwesome5" name={showValeFilter ? "arrow-up" : "arrow-down"} style={styles.iconFilter} /></Text>
              </TouchableOpacity>
            </View>
            {showValeFilter &&
              <Filters
                {...valeFilter}
                orderByPress={(orderBy) => this.props.onOrderByChanged({ key: 'valeFilter', data: { key: 'valesFiltered', data: valesFiltered }, object: valeFilter, value: orderBy })}
                statusPress={(statusObject) => this.props.onStatusChanged({ key: 'valeFilter', object: valeFilter, index: statusObject.key, value: statusObject.value, data: { key: 'valesFiltered', data: vales } })}
                onDateChange={(dateObject) => this.props.onDateChanged({ key: 'valeFilter', object: valeFilter, date: dateObject.key, value: dateObject.value, data: { key: 'valesFiltered', data: vales } })}
                onValeTypeChanged={(vale) => this.props.onValeTypeChanged({ key: 'valeFilter', object: valeFilter, value: vale })}
              />}
            <View style={styles.bodyCard}>
              <InputQ onChangeText={value => this.props.onFilterChanged({ data: vales, filter: value, key: 'valesFiltered' })} icon="search" placeholder="Buscar cliente..." />
              <FlatList
                data={valesFiltered}
                ListHeaderComponent={() => <LoanHeader />}
                stickyHeaderIndices={[0]}
                keyExtractor={(item, index) => `client-${index.toString()}`}
                renderItem={({ index, item }) => <LoanItem key={index} onPress={() =>  navigation.navigate('LoanDetails', { backgroundColor, noCredito: valeType != 'FolioDigital' ? item.noCredito : item, isFrom: valeType }) } loan={item} valeType={valeType} />}
                refreshControl={<RefreshControl refreshing={loadingVales} onRefresh={() => this.props.getVales(valeFilter.valeSelector.find(vale => vale.value == valeFilter.valeSelected).path)} />}
              />
            </View>
          </Tab>
          <Tab activeTextStyle={styles.textActive} textStyle={styles.textTab} activeTabStyle={{ backgroundColor }} tabStyle={{ backgroundColor }} style={{ backgroundColor }} heading="ConfiaShop">
            <View style={[styles.wrapperFilters, { flex: 0 }]}>
              <TouchableOpacity onPress={() => this.props.onToggleFilter({ showShopFilter: !showShopFilter })}>
                <Text style={styles.txtFilter}>FILTROS <Icon type="FontAwesome5" name={showShopFilter ? "arrow-up" : "arrow-down"} style={styles.iconFilter} /></Text>
              </TouchableOpacity>
            </View>
            {showShopFilter &&
              <Filters
                {...credishopFilter}
                orderByPress={(orderBy) => this.props.onOrderByChanged({ key: 'credishopFilter', data: { key: 'credishopFiltered', data: credishopFiltered }, object: credishopFilter, value: orderBy })}
                statusPress={(statusObject) => { this.props.onStatusChanged({ key: 'credishopFilter', object: credishopFilter, index: statusObject.key, value: statusObject.value, data: { key: 'credishopFiltered', data: credishop } }) }}
                onDateChange={(dateObject) => this.props.onDateChanged({ key: 'credishopFilter', object: credishopFilter, date: dateObject.key, value: dateObject.value, data: { key: 'credishopFiltered', data: credishop } })}
              />}
            <View style={styles.bodyCard}>
              <FlatList
                data={credishopFiltered}
                ListHeaderComponent={() => <LoanHeader />}
                stickyHeaderIndices={[0]}
                keyExtractor={(item, index) => `clientStore-${item.noCredito.toString()}`}
                renderItem={({ index, item }) => <LoanItem key={index} onPress={() => navigation.navigate('LoanDetails', { backgroundColor, noCredito: item.noCredito, isFrom: 'ConfiaShop' })} loan={item} />}
                refreshControl={<RefreshControl refreshing={loadingConfiaShop} onRefresh={() => {  this.props.getConfiaShopCredits() }} />}
              />
            </View>
          </Tab>
          <Tab activeTextStyle={styles.textActive} textStyle={styles.textTab} activeTabStyle={{ backgroundColor }} tabStyle={{ backgroundColor }} style={{ backgroundColor }} heading="Personales">
            <View style={[styles.wrapperFilters, { flex: 0 }]}>
              <TouchableOpacity>
                <Row style={{ alignItems: 'center' }}>
                  <Text style={styles.txtFilter}>PRÓXIMAMENTE</Text>
                  {/* <Icon type="FontAwesome5" name={showLoanFilter ? "arrow-up" : "arrow-down"} style={styles.iconFilter} /> */}
                </Row>
              </TouchableOpacity>
            </View>
            {/* {showLoanFilter &&
              <Filters
                {...loanFilter}
                orderByPress={(orderBy) => this.props.onOrderByChanged({ key: 'loanFilter', data: { key: 'loansFiltered', data: loansFiltered }, object: loanFilter, value: orderBy })}
                statusPress={(statusObject) => { this.props.onStatusChanged({ key: 'loanFilter', object: loanFilter, index: statusObject.key, value: statusObject.value }) }}
                onDateChange={(dateObject) => this.props.onDateChanged({ key: 'loanFilter', object: loanFilter, date: dateObject.key, value: dateObject.value })}
              />} */}
            <View style={styles.bodyCard}>
              <View style={styles.bodyCardItems}>
                <FlatList
                  data={[]}
                  keyExtractor={(item, index) => `loans-${item.noCredito.toString()}`}
                  renderItem={({ index, item }) => <LoanItem key={index} isLoan onPress={() => navigation.navigate('LoanDetails', { backgroundColor, noCredito: item.noCredito, isFrom: 'Préstamo' })} loan={item} />}
                  refreshControl={<RefreshControl refreshing={loadingLoans} onRefresh={() => this.props.getLoans()} />}
                />
              </View>
            </View>
          </Tab>
        </Tabs>
      </HeaderQ>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.user,
  loan: state.loan
});

const mapDispatchToProps = {
  getVales,
  getLoans,
  onChangeTab,
  onToggleFilter,
  onFilterChanged,
  onOrderByChanged,
  onStatusChanged,
  onDateChanged,
  getConfiaShopCredits,
  onValeTypeChanged
};

export default connect(mapStateToProps, mapDispatchToProps)(Loands);
