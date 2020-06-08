import React, { Component } from 'react'
import { connect } from 'react-redux'
import { images } from '../../../assets';
import { CustomModal } from '../../common';
import navigation from '../../../services/navigation';

class SuccessConfiaShop extends Component {
  render() {
    let { successMessage } = this.props.confiashop
    return (
      <CustomModal
        onSubmit={() => navigation.reset('Home')}
        buttonText="FINALIZAR"
        description={successMessage}
        image={images.success}
        title="Compra Exitosa"
      />
    )
  }
}

const mapStateToProps = (state) => ({
  confiashop: state.confiashop
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SuccessConfiaShop)
