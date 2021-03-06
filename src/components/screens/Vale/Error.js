import React, { Component } from 'react'
import { connect } from 'react-redux'
import { images } from '../../../assets';
import { CustomModal } from '../../common';

export class Error extends Component {
  render() {
    let { navigation, vale } = this.props
    let errorMessage = navigation.getParam('error')
    return (
      <CustomModal
        onSubmit={() => navigation.goBack()}
        buttonText="REGRESAR"
        description={errorMessage}
        image={images.error}
        type="danger"
        title="Error"
      />
    )
  }
}

const mapStateToProps = (state) => ({
  vale: state.vale
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Error)
