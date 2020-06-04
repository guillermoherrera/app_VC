import React, { Component } from 'react'
import { connect } from 'react-redux'
import { images } from '../../../assets';
import { CustomModal } from '../../common';
import navigation from '../../../services/navigation';

class SuccessModal extends Component {
  render() {    
    return (
      <CustomModal
        onSubmit={() => navigation.reset(this.props.navigation.getParam('route'))}
        buttonText={this.props.navigation.getParam('buttonText')}
        description={this.props.navigation.getParam('message')}
        image={images.success}
        title={this.props.navigation.getParam('title')}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SuccessModal)
