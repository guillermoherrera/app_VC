import React, { Component } from 'react'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { getPhoneNumberSync } from 'react-native-device-info';
import { connect } from 'react-redux'
import { CustomModal } from '../../common';
import { onConfiaShopCodeChanged, onConfiaShopValidateCode } from '../../../store/actions';
import { images } from '../../../assets';
import styles from './ConfiaShop.styles';

class ValidateConfiaShopCode extends Component {
  static navigationOptions = {
    headerLeft: null,
    gesturesEnabled: false,
    swipeEnabled: false
  };

  _finish() {
    let { code, creditoId, transaccionId } = this.props.confiashop
    this.props.onConfiaShopValidateCode(code, creditoId, transaccionId)
  }

  render() {
    let { confiashop } = this.props
    let { code, selectedItem, phoneInput, customer, loading } = confiashop

    return (
      <CustomModal
        onSubmit={() => this._finish()}
        isLoading={loading}
        buttonText="SIGUIENTE"
        description={`Hemos enviado tu código al ${selectedItem == 1 ? phoneInput ? `+52${phoneInput}` : `+52${getPhoneNumberSync()}` : phoneInput ? `+52${phoneInput}` : `52${customer.telefono}`}`}        
        image={images.check}
        title="Código Enviado"
      >
        <SmoothPinCodeInput
          codeLength={8}
          cellSize={36}
          restrictToNumbers={false}
          keyboardType="default"
          cellStyle={styles.celdaPin}
          cellStyleFocused={styles.celdaEnfocadaPin}
          containerStyle={styles.espacioInferiorEstandar}
          value={code}
          onTextChange={(code) => this.props.onConfiaShopCodeChanged(code.toUpperCase())}
        />
      </CustomModal>
    )
  }
}

const mapStateToProps = (state) => ({
  confiashop: state.confiashop
})

const mapDispatchToProps = {
  onConfiaShopCodeChanged,
  onConfiaShopValidateCode
}

export default connect(mapStateToProps, mapDispatchToProps)(ValidateConfiaShopCode)
