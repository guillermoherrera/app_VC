import React, { Component } from 'react'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { connect } from 'react-redux'
import { CustomModal } from '../../common';
import { onCodeChanged, onValidateCode } from '../../../store/actions';
import { images } from '../../../assets';
import styles from "./Vale.style";

export class ValidateCode extends Component {
	static navigationOptions = {
		headerLeft: null,
		gesturesEnabled: false,
		swipeEnabled: false
	};

	render() {
		let { navigation, vale } = this.props
		let { customer_details, code, creditoPendiente, creditoId, transaccionId, phoneInput, loading } = vale

		return (
			<CustomModal
				onSubmit={() => creditoPendiente.length ? this.props.onValidateCode(code, creditoPendiente[creditoPendiente.length - 1].creditoId, creditoPendiente[creditoPendiente.length - 1].transaccionId) : this.props.onValidateCode(code, creditoId, transaccionId)}
				onCancel={creditoPendiente.length ? () => navigation.goBack() : null}
				cancelText="REGRESAR"
				buttonText="SIGUIENTE"
				description={`Hemos enviado tu código al +52${creditoPendiente.length ? creditoPendiente[creditoPendiente.length - 1].telefono : phoneInput || customer_details.telefono}`}
				image={images.check}
				isLoading={loading}
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
					onTextChange={(code) => this.props.onCodeChanged(code)}
				/>
			</CustomModal>
		)
	}
}

const mapStateToProps = (state) => ({
	vale: state.vale
})

const mapDispatchToProps = {
	onCodeChanged,
	onValidateCode
}

export default connect(mapStateToProps, mapDispatchToProps)(ValidateCode)
