import React, { Component } from 'react'
import { connect } from 'react-redux'
import { images } from '../../../assets';
import { CustomModal } from '../../common';
import navigation from '../../../services/navigation';

export class SuccessCredit extends Component {
  render() {
    let { successMessage } = this.props.vale
    return (
      <CustomModal
        onSubmit={() => navigation.reset('Home')}
        buttonText="FINALIZAR"
        description={successMessage}
        image={images.success}
        title="Crédito Exitoso"
      />
    )
  }
}

const mapStateToProps = (state) => ({
  vale: state.vale
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SuccessCredit)
