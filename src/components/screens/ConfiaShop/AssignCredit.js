import React, { Component } from 'react'
import Dialog from "react-native-dialog";
import { connect } from 'react-redux'
import { getPhoneNumberSync } from "react-native-device-info";
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { View, Dimensions, TouchableOpacity, FlatList, RefreshControl, Text, SafeAreaView, Alert, Platform } from 'react-native'
import { Footer, Picker, Icon, Container, Header, Left, Button, Card, CardItem, Col, Body, Right } from 'native-base'
import { onConfiaShopCustomerInputChange, getCustomersWithBankData, onValueItemChanged, onCustomerSelect, associateTicket, onConfiaShopToggleInput, onConfiaShopPhoneChanged, confiaShopTicketInfo } from '../../../store/actions';
import { InputQ, ItemQ, Spinner, Loading } from '../../common';
import { colors } from '../../../assets';
import styles from './ConfiaShop.styles';
import navigation from '../../../services/navigation';
const { width } = Dimensions.get('window');

export class AssignCredit extends Component {
  componentWillMount() {
    this.props.onValueItemChanged(0)
    this.props.confiaShopTicketInfo();
    this.props.getCustomersWithBankData();
  }

  _save() {
    let { user } = this.props.profile
    let { ticketId, selectedItem, phoneInput, customer, addresses } = this.props.confiashop
    let address = addresses.find(address => address.active).direccionId
    let phone = selectedItem == 1 ? phoneInput ? `${phoneInput}` : `${getPhoneNumberSync()}` : phoneInput ? `${phoneInput}` : `${customer.telefono}`
    let payload = {
      clienteId: selectedItem == 1 ? 0 : customer.clienteId,
      telefono: phone,
      importe: 0,
      plazo: 0,
      desembolsoTipoId: 0,
      tipoPlazoId: "",
      valeTipoId: 0,
      idTicket: ticketId,
      distribuidorId: user.DistribuidorId,
      direccionId: address
    }
    console.log("payload", payload)
    console.log("ticket",ticketId)
    this.props.associateTicket(payload)
  }

  _confirmAlert(customer) {
    let { confiashop } = this.props;
    let { selectedItem } = confiashop
    let phoneNumber = selectedItem == 1 ? getPhoneNumberSync() : customer.telefono

    if (phoneNumber && phoneNumber != 'unknown') {
      Alert.alert('Confia', `Se va a enviar un mensaje de texto con el código de confimación al número +52${phoneNumber}, ¿es correcto el teléfono?`, [{ text: 'Sí', onPress: () => this._save() }, { text: 'No', onPress: () => this.props.onConfiaShopToggleInput() }])
    }
    else {
      this.props.onConfiaShopToggleInput()
    }
  }

  _onRefresh() {
    this.props.getCustomersWithBankData();
  }

  render() {
    let { confiashop, customer } = this.props;
    let { customersFiltered, customers, selectedItem, showInputPhone, phoneInput, exclusiveDist } = confiashop
    let { loading } = customer
    //if (this.props.confiashop.loading) {
    //  return <Loading />
    //}
    return (
      <Container style={{ backgroundColor: colors.tertiary }}>
        <Header noShadow transparent androidStatusBarColor={colors.tertiary} iosBarStyle="light-content">
          <Left style={{ paddingLeft: moderateScale(8), flex: 1 }}>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon style={{ fontSize: moderateScale(28), fontWeight: "bold", color: colors.white }} name='arrow-back' />
            </Button>
          </Left>
          <Body style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={[styles.titleBodyCenter, { color: colors.white, fontSize: moderateScale(20) }]}>ASIGNAR CRÉDITO</Text>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <Dialog.Container visible={showInputPhone}>
          <Dialog.Title>Confia</Dialog.Title>
          <Dialog.Description>
            Ingresa el número de teléfono para poder validar el crédito solicitado
          </Dialog.Description>
          <Dialog.Input style={{backgroundColor: Platform.OS === 'ios' ? '#ffffff' : '#f0f0f0', borderBottomWidth : Platform.OS === 'ios' ? 0 : 1.0, borderBottomColor: '#d0d0d0'}} autoFocus={true} placeholder=" Ingresa aquí el número de teléfono" keyboardType="phone-pad" value={phoneInput} onChangeText={(phoneNumber) => this.props.onConfiaShopPhoneChanged(phoneNumber)} />
          <Dialog.Button label="Cancelar" onPress={() => this.props.onConfiaShopToggleInput()} />
          <Dialog.Button disabled={phoneInput.length == 10 ? false : true} label="Aceptar" onPress={() => this._save()} />
        </Dialog.Container>
        {!this.props.confiashop.loading && <SafeAreaView style={{ flex: 1 }}>
          <Card style={{ flex: 1, paddingTop: moderateScale(10), paddingBottom: moderateScale(10), borderRadius: moderateScale(25) }}>
            <CardItem style={{ borderRadius: moderateScale(25) }}>
              <Col>
                <View style={{ borderWidth: 2.5, borderColor: colors.secondary, marginLeft: moderateScale(8), marginRight: moderateScale(8) }}>
                  {!exclusiveDist && <Picker
                    note={!selectedItem ? true : false}
                    mode="dropdown"
                    placeholder="Selecciona"
                    headerBackButtonText="Regresar"
                    iosHeader="Seleccionar"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined, paddingRight: moderateScale(10) }}
                    selectedValue={selectedItem}
                    onValueChange={(value) => this.props.onValueItemChanged(value)}
                  >
                    <Picker.Item label="Selecciona"></Picker.Item>
                    <Picker.Item label="Para mí" value={1}></Picker.Item>
                    <Picker.Item label="Para otra persona" value={2}></Picker.Item>
                  </Picker>}
                  {exclusiveDist && <Picker
                    note={!selectedItem ? true : false}
                    mode="dropdown"
                    placeholder="Selecciona"
                    headerBackButtonText="Regresar"
                    iosHeader="Seleccionar"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined, paddingRight: moderateScale(10) }}
                    selectedValue={selectedItem}
                    onValueChange={(value) => this.props.onValueItemChanged(value)}
                  >
                    <Picker.Item label="Selecciona"></Picker.Item>
                    <Picker.Item label="Para mí" value={1}></Picker.Item>
                  </Picker>}
                </View>
              </Col>
            </CardItem>
            <CardItem style={{ paddingLeft: 0 }}>
              {selectedItem == 2 && <Col>                
                <InputQ onChangeText={value => this.props.onConfiaShopCustomerInputChange({ data: customers, filter: value, key: 'customersFiltered' })} icon="search" placeholder="Buscar cliente..." />                
                <FlatList
                  data={customersFiltered}
                  style={{ height: verticalScale(280) }}
                  keyExtractor={(item, index) => `my-client-${item.clienteId.toString()}`}
                  refreshControl={
                    <RefreshControl
                      refreshing={loading}
                      onRefresh={() => this._onRefresh()}
                    />}
                  renderItem={({ index, item }) => <ItemQ key={index} onPress={() => { this.props.onCustomerSelect(item); this._confirmAlert(item) }} client={item} />}
                />
              </Col>}
            </CardItem>
          </Card>
          {selectedItem == 1 &&
            <Footer style={{ height: moderateScale(55), backgroundColor: colors.tertiary, elevation: 0, borderTopColor: 'transparent' }}>
              <TouchableOpacity
                onPress={() => this._confirmAlert()}
                style={[styles.footerCard]}>
                <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                  <Icon style={{ color: colors.white }} type="FontAwesome5" name="arrow-right" />
                  <Text style={styles.textButton}>
                    {'SIGUIENTE \t'}
                  </Text>
                </View>
              </TouchableOpacity>
            </Footer>
          }
        </SafeAreaView>}
        {this.props.confiashop.loading && <Loading />}
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.user,
  confiashop: state.confiashop,
  customer: state.customer
})

const mapDispatchToProps = {
  onConfiaShopCustomerInputChange,
  getCustomersWithBankData,
  onValueItemChanged,
  onCustomerSelect,
  associateTicket,
  onConfiaShopToggleInput,
  onConfiaShopPhoneChanged,
  confiaShopTicketInfo,
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignCredit)
