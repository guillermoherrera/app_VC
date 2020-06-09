import React, { Component } from 'react';
import moment from 'moment/min/moment-with-locales';
import { connect } from 'react-redux';
import { moderateScale } from 'react-native-size-matters';
import { View, Text, Alert, ActivityIndicator, FlatList } from 'react-native';
import { Left, Body, Right, Row, Col } from 'native-base';
import { Icon } from "react-native-elements";
import { HeaderQ, ItemHistory, UserInfo, HeaderHistory, Loading } from '../../common';
import { getCustomerDetails, blockCustomer } from '../../../store/actions';
import linking from '../../../services/linking';
import { images, colors } from '../../../assets';
import styles from './Customers.styles';

class CustomerProfile extends Component {
  componentDidMount() {
    let clientId = this.props.navigation.getParam('clienteId')

    this.props.getCustomerDetails(clientId)

    moment.locale("es");
  }

  _confirmAlert() {
    let { vale } = this.props;
    let { customer_details } = vale

    Alert.alert('Confia', '¿Estás seguro que quieres bloquear a éste cliente? Esta acción es irreversible.', [{ text: 'Sí, bloquear', onPress: () => this.props.blockCustomer(customer_details.clienteId) }, { text: 'No, regresar' }], { cancelable: false })
  }

  _renderFooter() {
    let { vale } = this.props;
    let { customer_details, loading } = vale
    if (customer_details && !loading) {
      return (
        <Row style={{ backgroundColor: colors.white, paddingBottom: moderateScale(10) }}>
          {customer_details.telefono ? <Left style={{ marginLeft: moderateScale(60) }}>
            <Icon
              raised
              name='phone'
              type='font-awesome'
              color={"#1A9CFF"}
              size={moderateScale(20)}
              reverse
              reverseColor="white"
              onPress={() => linking.callNumber(customer_details.telefono)} />
          </Left> : null}
          {customer_details.estatusId == 0 && <Body style={{ justifyContent: 'center' }}>
            <Icon
              raised
              name='ban'
              type='font-awesome'
              color={"#EB5757"}
              size={moderateScale(20)}
              reverse
              reverseColor="white"
              onPress={this._confirmAlert.bind(this)} />
          </Body>}
          {customer_details.telefono ? <Right style={{ marginRight: moderateScale(60) }}>
            <Icon
              raised
              name='whatsapp'
              type='font-awesome'
              color={"#25D366"}
              size={moderateScale(20)}
              reverse
              reverseColor="white"
              onPress={() => linking.sendWhatsapp(customer_details.telefono)} />
          </Right> : null}
        </Row>
      )
    }
  }

  render() {
    let { navigation, vale, customer } = this.props;
    let { customer_details, loading } = vale

    return (
      <HeaderQ
        navigation={navigation}
        title="Mis Clientes"
        contentStyle={[styles.containerStyle]}
        footer={this._renderFooter()}
      >
        <UserInfo
          photo={images.nophoto}
          username={loading ? 'Cargando...' : customer_details ? `${customer_details.primerNombre} ${customer_details.primerApellido}` : ''}
        />
        {!customer_details || loading || customer.loading ? <Loading /> :
          <View style={styles.containerCard}>
            <Text style={[styles.titleBodyNew, { flex: 0 }]}>
              Datos de contacto
            </Text>
            <Col>
              <Row style={{ marginBottom: moderateScale(10) }}>
                <Left>
                  <Text style={styles.itemTextLeft}>Telefono:</Text>
                </Left>
                <Right>
                  <Text style={styles.itemTextRight}>{customer_details.telefono}</Text>
                </Right>
              </Row>
              <Row style={{ marginBottom: moderateScale(10) }}>
                <Left>
                  <Text style={styles.itemTextLeft}>Dirección:</Text>
                </Left>
                <Right>
                  <Text style={styles.itemTextRight}>{`${customer_details.direcciones[0].calle} #${customer_details.direcciones[0].numExterior} ${customer_details.direcciones[0].colonia}`}</Text>
                </Right>
              </Row>
            </Col>
            <View style={[styles.contentTitle]}>
              <Text style={[styles.titleBodyNew]}>
                Historial de pagos
            </Text>
            </View>
            <View>
              <FlatList
                data={customer_details.creditos}
                ListHeaderComponent={<HeaderHistory />}
                stickyHeaderIndices={[0]}
                keyExtractor={(item, index) => `history-${index.toString()}`}
                renderItem={({ item, index }) => <ItemHistory onPress={() => navigation.navigate('LoanDetails', { backgroundColor: colors.secondary, noCredito: item.creditoId, isFrom: 'ValeDinero' })} history={item} />}
              />
            </View>
          </View>
        }
      </HeaderQ>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.user,
  vale: state.vale,
  customer: state.customer
});

const mapDispatchToProps = {
  getCustomerDetails,
  blockCustomer
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomerProfile);
