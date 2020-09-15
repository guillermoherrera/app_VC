import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dialog from "react-native-dialog";
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView, Image, Alert, Keyboard } from 'react-native'
import { Icon, Title } from 'native-base';
import { HeaderQ as Content } from '../../common';
import { onValeChanged, getValesDeadlines, onAmountIncreases, onAmountDecreases, onAmountReset, onTogglePhoneInput, onPhoneInputChanges, saveVale } from '../../../store/actions';
import styles from './Vale.style';
import { moderateScale } from 'react-native-size-matters';
import { colors, images } from '../../../assets';

class ValeSection extends Component {
  _nextPage() {
    let { vale } = this.props
    let { fortnights, deadline_selected} = vale
    let plazo = fortnights[deadline_selected].plazo
    if(plazo > 0){
      this.props.navigation.navigate('Reasons')
    }else{
      Alert.alert(
        'Oops', 
        `Ha ocurido un error al guardar la información, por favor vuelve a intenarlo`, 
        [{text: 'Volver a intentarlo', onPress: () => this.props.navigation.goBack()}]
      )
    }
  }

  componentDidMount() {
    let { customer_details, methods } = this.props.vale
    let desembolsoId = methods.find(method => method.active).desembolsoTipoId;
    this.props.getValesDeadlines(customer_details.clienteId, desembolsoId)
  }

  _save() {
    let { vale } = this.props
    let { customer_details, methods, fortnights, deadline_selected, amount_selected, phoneInput } = vale
    let method = methods.find(method => method.active)
    let payload = {
      clienteId: customer_details.clienteId,
      telefono: phoneInput ? `+52${phoneInput}` : `+52${customer_details.telefono}`,
      importe: fortnights[deadline_selected].tipoPlazos[0].importes[amount_selected].importe,
      plazo: 0,
      desembolsoTipoId: method.desembolsoTipoId,
      tipoPlazoId: fortnights[deadline_selected].tipoPlazos[0].tipoPlazoId,
      valeTipoId: 1,
    }

    Keyboard.dismiss();
    console.log('$$$', payload);
    this.props.saveVale(payload)
  }

  _confirmAlert() {
    let { vale } = this.props
    let { customer_details } = vale
    if (customer_details.telefono) {
      Alert.alert('Confia', `Se va a enviar un mensaje de texto con el código de confimación al número +52${customer_details.telefono}, ¿es correcto el teléfono del cliente?`, [{ text: 'Sí', onPress: () => this._save() }, { text: 'No', onPress: () => this.props.onTogglePhoneInput() }])
    }
    else {
      this.props.onTogglePhoneInput()
    }
  }

  _renderFooter() {
    let { loading, fortnights, methods } = this.props.vale;
    let desembolsoId = null;
    if(methods.find(method => method.active) != undefined){
      desembolsoId = methods.find(method => method.active).desembolsoTipoId;
    }
    if (!loading) {
      return (
        desembolsoId == 14 ? <TouchableOpacity
          onPress={() => this._confirmAlert()}
          style={[styles.footerCard]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <Text style={styles.textButton}>
              {'SOLICITAR \t'}
            </Text>
          </View>
        </TouchableOpacity>
        : fortnights.length > 0 ? <TouchableOpacity
          onPress={() => this._nextPage()}
          style={[styles.footerCard]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <Icon style={styles.iconButton} type="FontAwesome5" name="arrow-right" />
            <Text style={styles.textButton}>
              {'SIGUIENTE \t'}
            </Text>
          </View>
        </TouchableOpacity> : <TouchableOpacity
          onPress={() => {}}
          style={[styles.footerCard]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <Text style={styles.textButton}>
              {''}
            </Text>
          </View>
        </TouchableOpacity>
      )
    }
  }

  render() {
    let { vale } = this.props
    let { loading, fortnights, deadline_selected, amount_selected, methods, showInputPhone, phoneInput } = vale
    let desembolsoId = null;
    if(methods.find(method => method.active) != undefined){
      desembolsoId = methods.find(method => method.active).desembolsoTipoId;
    }
    let plazo_selected = fortnights.find(method => method.active).plazo;
    if(amount_selected > fortnights[deadline_selected].tipoPlazos[0].importes.length - 1){
      amount_selected = 0;
      this.props.onAmountReset()
    };
    return (
      <Content
        title="Nuevo Vale"
        navigation={this.props.navigation}
        contentStyle={[styles.containerStyle, { backgroundColor: desembolsoId == 14 ? colors.tertiary : colors.secondary}]}
        noPaddingBottom
        scroll={false}
        footer={this._renderFooter()}
        color={desembolsoId == 14 ? colors.tertiary : null}
      >
      <Dialog.Container visible={showInputPhone}>
        <Dialog.Title>Confia</Dialog.Title>
        <Dialog.Description>
          Ingresa el número de teléfono del cliente para poder validar el crédito solicitado
        </Dialog.Description>
        <Dialog.Input style={{backgroundColor: Platform.OS === 'ios' ? '#ffffff' : '#f0f0f0', borderBottomWidth : Platform.OS === 'ios' ? 0 : 1.0, borderBottomColor: '#d0d0d0'}} autoFocus={true} placeholder=" Ingresa aquí el número de teléfono" keyboardType="phone-pad" value={phoneInput} onChangeText={(phoneNumber) => this.props.onPhoneInputChanges(phoneNumber)} />
        <Dialog.Button label="Cancelar" onPress={() => this.props.onTogglePhoneInput()} />
        <Dialog.Button disabled={phoneInput.length == 10 ? !loading ? false : true : true} label="Aceptar" onPress={() => this._save()} />
      </Dialog.Container>
        <View style={styles.headerVale}>
          <Title style={styles.titleCalculate}>Calcula tu vale</Title>
          {fortnights.length > 0 ? <View style={[styles.cardMoney, {backgroundColor: desembolsoId == 14 ? colors.blue_light : colors.green_light}]}>
            <View style={styles.wrapperNumbers}>
              {amount_selected > 0 && <TouchableOpacity onPress={() => this.props.onAmountDecreases()}>
                <Icon style={[styles.iconCant, { marginTop: moderateScale(10), color: desembolsoId == 14 ? colors.tertiary : colors.green }]} type="FontAwesome5" name="minus-circle" />
              </TouchableOpacity>}
              <Text style={[styles.textCamt]}>${fortnights[deadline_selected].tipoPlazos[0].importes[amount_selected].importe.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
              {fortnights[deadline_selected].tipoPlazos[0].importes.length > (amount_selected + 1) && <TouchableOpacity onPress={() => this.props.onAmountIncreases()}>
                <Icon style={[styles.iconCant, { marginTop: moderateScale(10), color: desembolsoId == 14 ? colors.tertiary : colors.green }]} type="FontAwesome5" name="plus-circle" />
              </TouchableOpacity>}
            </View>
            {desembolsoId == 14 ? <View></View> :<View style={styles.wrapperFooterVale}>
              <Text style={styles.textPayment}>Pago quincenal</Text>
              <Text style={styles.textCantPayment}>${fortnights[deadline_selected].tipoPlazos[0].importes[amount_selected].importePagoPlazo.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
            </View>}
          </View> : <View style={styles.cardMoney}><Text style={styles.textPayment}>...</Text></View>}
        </View>
        <View style={[styles.bodyCard]}>
          { desembolsoId == 14 ? <View>
            {loading ? <ActivityIndicator style={{ marginTop: moderateScale(8) }} color={colors.primary} /> : <View><View style={{alignItems: "center", paddingTop: moderateScale(0),}}>
              <Image style={{ width: moderateScale(260), height: moderateScale(100)}} source={images.confiashop_color}></Image>
            </View>
            <View style={{alignItems: "center", paddingTop: moderateScale(20),}}>
              <Image style={{ width: moderateScale(140), height: moderateScale(130)}} source={images.bolsa}></Image>
            </View></View>}
          </View>
          :<View>
            <Text style={styles.titleBodyCenter}>
              {'Quincenas'}
            </Text>
            <ScrollView>
              {fortnights.length > 0 ? <View style={[styles.wrapperButtonsNumbers, { marginTop: moderateScale(10) }]}>
                {fortnights.map((deadline, index) =>
                  <TouchableOpacity
                    key={index}
                    onPress={() => this.props.onValeChanged({ deadline, index })}
                    style={[styles.itemNumber, deadline.active ? (desembolsoId == 14 ? styles.activeNumberCS : styles.activeNumber) : null]}>
                    <Text style={[styles.textNumber, deadline.active ? styles.activeNumberText : null]}>
                      {deadline.plazo}
                    </Text>
                  </TouchableOpacity>
                )}
              </View> : <View style={[styles.wrapperButtonsNumbers, { marginTop: moderateScale(10) }]}><Text style={styles.textPayment}>...</Text></View>}
            </ScrollView>
            <View style={{alignItems: "center"}}>
              <Image style={{ width: moderateScale(140), height: moderateScale(100)}} source={plazo_selected == 4 ? images.vale_express : images.vale_color}></Image>
            </View>
          </View>}
        </View>
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
  vale: state.vale,
})

const mapDispatchToProps = {
  onValeChanged,
  getValesDeadlines,
  onAmountIncreases,
  onAmountDecreases,
  onAmountReset,
  onTogglePhoneInput,
  onPhoneInputChanges,
  saveVale
}

export default connect(mapStateToProps, mapDispatchToProps)(ValeSection)
