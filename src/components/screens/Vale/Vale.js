import React, { Component } from 'react';
import moment from 'moment/min/moment-with-locales';
import { connect } from 'react-redux';
import { View, RefreshControl, FlatList } from 'react-native';
import { InputQ, HeaderQ, ItemQ, ItemHeader } from '../../common';
import { getCustomersWithBankData, onValeFilterChanged } from '../../../store/actions';
import styles from './Vale.style';

class Vale extends Component {
  componentDidMount() {
    if (!this.props.vale.customersWithBankData.length) {
      this.props.getCustomersWithBankData();
    }
    moment.locale("es");
  }

  onFilterChange(filter) {
    let data = this.props.vale.customersWithBankData;

    this.props.onValeFilterChanged({ data, filter })
  }

  _onRefresh() {
    this.props.getCustomersWithBankData();
  }

  render() {
    let { vale, customer } = this.props;
    let { customersFiltered } = vale
    let { loading } = customer
    
    return (
      <HeaderQ
        title="Nuevo Vale"
        navigation={this.props.navigation}
        contentStyle={styles.containerStyle}
        noPaddingBottom
        scroll={false}>
        <View style={[styles.bodyCard]}>
          <View style={styles.bodyCardItems}>
            <View>
              <InputQ onChangeText={this.onFilterChange.bind(this)} icon="search" placeholder="Buscar cliente..." />
              <View style={styles.wrapperItems}>
                <FlatList
                  data={customersFiltered}
                  ListHeaderComponent={<ItemHeader />}
                  stickyHeaderIndices={[0]}
                  keyExtractor={(item, index) => `client-${item.clienteId.toString()}`}
                  refreshControl={
                    <RefreshControl
                      refreshing={loading}
                      onRefresh={() => this._onRefresh()}
                    />}
                  renderItem={({ index, item }) => <ItemQ key={index} onPress={() => this.props.navigation.navigate('CustomerInformation', { clienteId: item.clienteId })} client={item} />}
                />
              </View>
            </View>
          </View>
        </View>
      </HeaderQ>
    );
  }
}


const mapStateToProps = state => ({
  vale: state.vale,
  customer: state.customer
});

const mapDispatchToProps = {
  getCustomersWithBankData,
  onValeFilterChanged
};

export default connect(mapStateToProps, mapDispatchToProps)(Vale);

