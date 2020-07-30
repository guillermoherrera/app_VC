import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { Tabs, Tab, Thumbnail, Icon } from 'native-base';
import { HeaderQ, ItemQ, InputQ, Filters, ItemHeader } from '../../common';
import { images, colors } from '../../../assets';
import { getCustomers, onCustomerToggleFilter, onCustomersFilterChanged, onCustomersOrderByChanged, onCustomersStatusChanged } from '../../../store/actions';
import styles from './Customers.styles';

class Customers extends PureComponent {
  state = {
    currentTab: 0,
    filter: '',
  };

  componentDidMount() {
    if (!this.props.customer.customers.length) {
      this.props.getCustomers();
    }
  }

  _onRefresh() {
    this.props.getCustomers();
  }

  render() {
    let { navigation, customer, profile } = this.props;
    let { currentTab } = this.state
    let { loading_photo, user_photo } = profile
    let {
      loading,
      nextCharges,
      nextChargesFiltered,
      customers,
      customersFiltered,
      showNextChargesFilter,
      showMyCustomersFilter,
      nextChargesFilter,
      myCustomersFilter
    } = customer

    return (
      <HeaderQ
        contentStyle={styles.containerStyle}
        scroll={false}
        contentLeft={
          currentTab == 0 ? <TouchableOpacity onPress={() => navigation.navigate("CustomerAdd")}>
            <Thumbnail small source={images.add} />
          </TouchableOpacity> : <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Thumbnail source={loading_photo ? images.photo : user_photo ? { uri: `data:image/jpeg;base64,${user_photo}` } : images.nophoto} />
            </TouchableOpacity>
        }>
        <Tabs onChangeTab={(tab) => { this.setState({ 'currentTab': tab.i }) }} tabContainerStyle={{ elevation: 0, borderBottomColor: colors.secondary }} tabBarUnderlineStyle={styles.tabBar}>
          <Tab activeTextStyle={styles.textActive} textStyle={styles.textTab} activeTabStyle={styles.activeTabStyle} tabStyle={styles.tabStyle} style={styles.tab} heading="Mis Clientes">
            <View style={[styles.wrapperFilters, { flex: 0 }]}>
              <TouchableOpacity onPress={() => this.props.onCustomerToggleFilter({ showMyCustomersFilter: !showMyCustomersFilter })}>
                <Text style={styles.txtFilter}>FILTROS <Icon type="FontAwesome5" name={showMyCustomersFilter ? "arrow-up" : "arrow-down"} style={styles.iconFilter} /></Text>
              </TouchableOpacity>
            </View>
            {showMyCustomersFilter &&
              <Filters
                {...myCustomersFilter}
                orderByPress={(orderBy) => this.props.onCustomersOrderByChanged({ key: 'myCustomersFilter', data: { key: 'customersFiltered', data: customersFiltered }, object: myCustomersFilter, value: orderBy })}
                statusPress={(statusObject) => { this.props.onCustomersStatusChanged({ key: 'myCustomersFilter', object: myCustomersFilter, index: statusObject.key, value: statusObject.value, data: { key: 'customersFiltered', data: customers } }) }}
              />}
            <View style={styles.bodyCard}>
              <InputQ onChangeText={value => this.props.onCustomersFilterChanged({ data: customers, filter: value, key: 'customersFiltered' })} icon="search" placeholder="Buscar cliente..." />
              <FlatList
                data={customersFiltered}
                ListHeaderComponent={() => <ItemHeader />}
                stickyHeaderIndices={[0]}
                keyExtractor={(item, index) => `my-client-${item.clienteId.toString()}`}
                refreshControl={
                  <RefreshControl
                    refreshing={loading}
                    onRefresh={() => this._onRefresh()}
                  />}
                renderItem={({ index, item }) => <ItemQ key={index} onPress={() => this.props.navigation.navigate('CustomerProfile', { clienteId: item.clienteId })} client={item} />}
              />
            </View>
          </Tab>
          <Tab activeTextStyle={styles.textActive} textStyle={styles.textTab} activeTabStyle={styles.activeTabStyle} tabStyle={styles.tabStyle} style={styles.tab} heading="Próximos Cobros">
            <View style={[styles.wrapperFilters, { flex: 0 }]}>
              {/* <TouchableOpacity onPress={() => this.props.onCustomerToggleFilter({ showNextChargesFilter: !showNextChargesFilter })}> */}
              <Text style={styles.txtFilter}>Próximamente
                  {/* <Icon type="FontAwesome5" name={showNextChargesFilter ? "arrow-up" : "arrow-down"} style={styles.iconFilter} /> */}
              </Text>
              {/* </TouchableOpacity> */}
            </View>
            {/* {showNextChargesFilter &&
              <Filters
                {...nextChargesFilter}
                orderByPress={(orderBy) => this.props.onCustomersOrderByChanged({ key: 'nextChargesFilter', data: { key: 'nextChargesFiltered', data: nextChargesFiltered }, object: nextChargesFilter, value: orderBy })}
                statusPress={(statusObject) => { this.props.onCustomersStatusChanged({ key: 'nextChargesFilter', object: nextChargesFilter, index: statusObject.key, value: statusObject.value, data: { key: 'nextChargesFiltered', data: nextCharges } }) }}
                onDateChange={(dateObject) => this.props.onDateChanged({ key: 'nextChargesFilter', object: nextChargesFilter, date: dateObject.key, value: dateObject.value, data: { key: 'nextChargesFiltered', data: vales } })}
              />} */}
            <View style={styles.bodyCard}>
              <View style={styles.bodyCardItems}>
                {/* <InputQ onChangeText={value => this.props.onCustomersFilterChanged({ data: nextCharges, filter: value, key: 'nextChargesFiltered' })} icon="search" placeholder="Buscar cliente..." /> */}
                <FlatList
                  data={nextChargesFiltered}
                  keyExtractor={(item, index) => `next-paid-${item.clienteId.toString()}`}
                  refreshControl={
                    <RefreshControl
                      refreshing={loading}
                      onRefresh={() => this._onRefresh()}
                    />}
                  renderItem={({ index, item }) => <ItemQ key={index} onPress={() => this.props.navigation.navigate('CustomerProfile', { clienteId: item.clienteId })} client={item} />}
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
  customer: state.customer
});

const mapDispatchToProps = {
  getCustomers,
  onCustomerToggleFilter,
  onCustomersStatusChanged,
  onCustomersOrderByChanged,
  onCustomersFilterChanged
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Customers);
