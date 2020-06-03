import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { HeaderQ as Content, ItemQ } from '../../common'
import { Icon } from 'native-base'
import { colors } from '../../../assets'
import { getCustomerDetails } from '../../../store/actions'
import { moderateScale, scale } from 'react-native-size-matters'
import styles from './Vale.style';
import moment from 'moment'

class CustomerInformation extends Component {
  componentDidMount() {
    let { navigation } = this.props
    let clientId = navigation.getParam('clienteId')

    this.props.getCustomerDetails(clientId)
  }

  _nextPage() {
    this.props.navigation.navigate('TransactionTypes')
  }

  _validateCode() {
    this.props.navigation.navigate('ValidateCode')
  }

  _renderFooter() {
    let { customer_details, creditoPendiente, loading } = this.props.vale;
    if (customer_details && !loading) {
      return (
        <TouchableOpacity
          onPress={() => !creditoPendiente.length ? this._nextPage() : this._validateCode()}
          style={[styles.footerCard, { backgroundColor: !creditoPendiente.length ? colors.primary : colors.warning }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            {!creditoPendiente.length && <Icon style={styles.iconButton} type="FontAwesome5" name="arrow-right" />}
            <Text style={styles.textButton}>
              {!creditoPendiente.length ? 'SIGUIENTE \t' : 'CONTINUAR'}
            </Text>
          </View>
        </TouchableOpacity>
      )
    }
  }

  render() {
    let { vale } = this.props
    let { loading, customer_details, creditoPendiente } = vale

    return (
      <Content
        title="Nuevo Vale"        
        contentStyle={styles.containerStyle}        
        footer={this._renderFooter()}
      >
        {loading ? <ActivityIndicator style={{ marginTop: moderateScale(8) }} color={colors.primary} /> :
          customer_details && <View style={[styles.bodyCard, { height: undefined }]}>
            <ItemQ client={customer_details} />
            <Text style={[styles.titleBodyNew, { flex: 0 }]}>Historial</Text>
            {creditoPendiente.length ? <Text style={{ color: colors.danger, fontWeight: 'bold' }}>* Tienes un crédito pendiente por finalizar</Text> : null}
            <FlatList data={customer_details.creditos} keyExtractor={(item, index) => `credito-${item.creditoId}`}
              renderItem={({ item }) =>
                <View style={[styles.bodyItem]}>
                  <View style={styles.datesContent}>
                    <View style={[styles.itemDate, { marginTop: moderateScale(8) }]}>
                      <Text style={styles.itemTextLeft}>Fecha Inicio:</Text>
                      <Text style={styles.itemTextRight}>{moment(item.fInicio).format('ll')}</Text>
                    </View>
                    <View style={[styles.itemDate, { marginTop: moderateScale(8) }]}>
                      <Text style={styles.itemTextLeft}>Importe Prestado:</Text>
                      <Text style={styles.itemTextRight}>${item.importe.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    </View>
                    <View style={[styles.itemDate, { marginTop: moderateScale(8) }]}>
                      <Text style={styles.itemTextLeft}>Fecha Fin:</Text>
                      <Text style={styles.itemTextRight}>{moment(item.fFinal).format('ll')}</Text>
                    </View>
                    <View style={[styles.itemDate, { marginTop: moderateScale(8) }]}>
                      <Text style={styles.itemTextLeft}>Saldo Pendiente:</Text>
                      <Text style={styles.itemTextRight}>${item.saldoPendiente.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    </View>
                  </View>
                </View>
              }
            />            
          </View>}
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
  vale: state.vale,
})

const mapDispatchToProps = {
  getCustomerDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerInformation)
