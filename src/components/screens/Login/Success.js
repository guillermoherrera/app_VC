import React, { Component } from 'react'
import { connect } from 'react-redux'
import { images } from '../../../assets';
import { CustomModal } from '../../common';

export class SuccessAuth extends Component {
  static navigationOptions = {
		headerLeft: null,
		gesturesEnabled: false,
		swipeEnabled: false
	};
  render() {
    let { navigation } = this.props
    let successMessage = navigation.getParam('success')
    return (
      <CustomModal
        onSubmit={() => navigation.navigate('Home')}
        buttonText="FINALIZAR"
        description={successMessage}
        image={images.check}
        title="¡Cuenta Activada!"
      />
    )
  }
}

const mapStateToProps = (state) => ({
  vale: state.vale
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SuccessAuth)
