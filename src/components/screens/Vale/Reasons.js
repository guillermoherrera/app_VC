import React, { Component } from 'react'
import Dialog from "react-native-dialog";
import { connect } from 'react-redux'
import { moderateScale } from 'react-native-size-matters';
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, Alert, Keyboard } from 'react-native'
import { onReasonChanged, getReasons, saveVale, onToggleConfirmation, onConfirmationSubmit, onTogglePhoneInput, onPhoneInputChanges, onValidateCode, onCodeChanged } from '../../../store/actions';
import { HeaderQ as Content, ItemQ, ItemReason, CustomModal, CustomCodeInputModal } from '../../common';
import { colors } from '../../../assets';
import styles from './Vale.style';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

class Reasons extends Component {
  componentDidMount() {
    if (!this.props.vale.reasons.length) {
      this.props.getReasons()
    }
  }
  _save() {
    let { vale } = this.props
    let { customer_details, methods, fortnights, deadline_selected, amount_selected, phoneInput } = vale
    let method = methods.find(method => method.active)
    let payload = {
      clienteId: customer_details.clienteId,
      telefono: phoneInput ? `+52${phoneInput}` : `+52${customer_details.telefono}`,
      importe: fortnights[deadline_selected].tipoPlazos[0].importes[amount_selected].importe,
      plazo: fortnights[deadline_selected].plazo,
      desembolsoTipoId: method.desembolsoTipoId,
      tipoPlazoId: fortnights[deadline_selected].tipoPlazos[0].tipoPlazoId,
      valeTipoId: 1,
    }

    Keyboard.dismiss();
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
    let { loading } = this.props.vale;
    if (!loading) {
      return (
        <TouchableOpacity
          onPress={() => this._confirmAlert()}
          style={[styles.footerCard]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <Text style={styles.textButton}>
              {'SOLICITAR \t'}
            </Text>
          </View>
        </TouchableOpacity>
      )
    }
  }

  render() {
    let { vale } = this.props
    let { loading, customer_details, reasons, showValeConfirmation, showInputPhone, phoneInput } = vale   

    return (
      <Content
        title="Nuevo Vale"
        contentStyle={styles.containerStyle}        
        footer={this._renderFooter()}
      >
        <Dialog.Container visible={showInputPhone}>
          <Dialog.Title>Confia</Dialog.Title>
          <Dialog.Description>
            Ingresa el número de teléfono del cliente para poder validar el crédito solicitado
          </Dialog.Description>
          <Dialog.Input keyboardType="phone-pad" value={phoneInput} onChangeText={(phoneNumber) => this.props.onPhoneInputChanges(phoneNumber)} autofocus />
          <Dialog.Button label="Cancelar" onPress={() => this.props.onTogglePhoneInput()} />
          <Dialog.Button disabled={phoneInput.length == 10 ? !loading ? false : true : true} label="Aceptar" onPress={() => this._save()} />
        </Dialog.Container>
        {loading ? <ActivityIndicator style={{ marginTop: moderateScale(8) }} color={colors.primary} /> : <View style={[styles.bodyCard, { height: undefined}]}>
          <ItemQ client={customer_details} />
          <View
            style={[styles.bodyItem, { justifyContent: "center", height: moderateScale(60), flexDirection: 'column', borderBottomColor: 'transparent' }]}>            
            <Text style={styles.titleBodyCenter}>
              Selecciona el motivo del prestamo de tu cliente
            </Text>
          </View>
          <View style={styles.wrapperReasons}>
            <FlatList
              numColumns={2}
              data={reasons}
              keyExtractor={(item, index) => `reason-${index.toString()}`}
              renderItem={({ item, index }) => <ItemReason
                onPress={() => this.props.onReasonChanged(item)}
                {...item} />
              } />
          </View>
        </View>}
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
  vale: state.vale,
})

const mapDispatchToProps = {
  getReasons,
  onReasonChanged,
  saveVale,
  onToggleConfirmation,
  onConfirmationSubmit,
  onTogglePhoneInput,
  onPhoneInputChanges,
  onValidateCode,
  onCodeChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(Reasons)