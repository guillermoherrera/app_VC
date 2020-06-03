import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { HeaderQ as Content, ItemQ, ItemMethodTransaction } from '../../common';
import { moderateScale } from 'react-native-size-matters';
import { getTransactionTypes, onTransactionChanged } from '../../../store/actions';
import { Icon } from 'native-base';
import { colors } from '../../../assets';
import styles from './Vale.style';

class TransactionType extends Component {
  componentDidMount() {
    let { vale } = this.props
    let { customer_details } = vale
    this.props.getTransactionTypes(customer_details.clienteId);    
  }

  _nextPage() {
    this.props.navigation.navigate('ValeSection')
  }

  _renderFooter() {
    let { methods, loading } = this.props.vale;
    let hasSelected = methods.find(method => method.active);
    if (methods.length && !loading && hasSelected) {
      return (
        <TouchableOpacity
          onPress={() => this._nextPage()}
          style={[styles.footerCard]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <Icon style={styles.iconButton} type="FontAwesome5" name="arrow-right" />
            <Text style={styles.textButton}>
              {'SIGUIENTE \t'}
            </Text>
          </View>
        </TouchableOpacity>
      )
    }
  }

  render() {
    let { vale } = this.props
    let { loading, customer_details, methods } = vale
   
    return (
      <Content
        title="Nuevo Vale"
        contentStyle={styles.containerStyle}        
        footer={this._renderFooter()}
      >
        {loading ? <ActivityIndicator style={{ marginTop: moderateScale(8) }} color={colors.primary} /> : <View style={[styles.bodyCard, { height: undefined }]}>
          <ItemQ client={customer_details} />
          <View
            style={[styles.bodyItem, { justifyContent: "center", height: moderateScale(70), borderBottomColor: 'transparent' }]}>
            <Text style={styles.titleBodyCenter}>
              {'Selecciona el tipo de desembolso'}
            </Text>
          </View>
          {methods.map((method, index) =>
            <ItemMethodTransaction
              onPress={() => this.props.onTransactionChanged({ desembolsoTipoId: method.desembolsoTipoId, index })}
              key={index}
              {...method} />
          )}
        </View>}
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
  vale: state.vale,
})

const mapDispatchToProps = {
  getTransactionTypes,
  onTransactionChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionType)
