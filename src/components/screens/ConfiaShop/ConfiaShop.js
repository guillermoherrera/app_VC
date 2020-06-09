import React, { Component } from 'react'
import { connect } from 'react-redux'
import { WebView } from 'react-native-webview'
//import { WebView } from "react-native-webview-messaging/WebView";
import { View, SafeAreaView, StatusBar, Platform } from 'react-native'
import { Container } from 'native-base'
import { getProfile, setTicket, getTicket, removeTicket } from '../../../store/actions';
import { Loading } from '../../common';
import { colors } from '../../../assets';

class ConfiaShop extends Component {  
  componentWillMount() {
    this.props.getProfile(true);    
  }

  componentDidMount(){
    const { navigation } = this.props

    this.focusListener = navigation.addListener("didFocus", () => {
      this.props.getTicket();
    })
  }

  componentDidUpdate(){
    if (this.props.profile.user.DistribuidorId){
      let { user } = this.props.profile
      console.log(`https://confia-qa.supernova-desarrollo.com/?meta=1&page=mobile&env=dist&tk1=${user.DistribuidorId}&tk2=&benefit=${user.categoriaId}`)
    }
  }

  componentWillUnmount(){
    this.focusListener.remove();
  }

  _setTicket(ticket) {    
    this.props.setTicket(ticket);
  }

  _removeTicket() {
    this.props.removeTicket()
  }

  render() {
    let { profile } = this.props;
    let { user } = profile

    if (!user.DistribuidorId) {
      return <Loading />
    }

    return (
      <Container style={{ backgroundColor: colors.tertiary }}>
        <StatusBar animated barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'} />
        <View style={{ flex: 1 }}>
          <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <WebView
              ref={webview => { this.webview = webview; }}
              startInLoadingState
              javaScriptEnabledAndroid={true}
              renderLoading={() => <Loading />}
              javaScriptEnabled={true}
              onMessage={(event) => this._setTicket(event.nativeEvent.data)}
              source={{ uri: `https://confia-qa.supernova-desarrollo.com/?meta=1&page=mobile&env=dist&tk1=${user.DistribuidorId}&tk2=&benefit=${user.categoriaId}` }}
            />
          </SafeAreaView>
        </View>
      </Container >
    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.user,
  confiashop: state.confiashop
})

const mapDispatchToProps = {
  getProfile,
  setTicket,
  getTicket,
  removeTicket,
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfiaShop)
