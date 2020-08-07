import React, { Component } from 'react'
import { connect } from 'react-redux'
import { WebView } from 'react-native-webview'
//import { WebView } from "react-native-webview-messaging/WebView";
import { View, SafeAreaView, StatusBar, Platform, AsyncStorage, Text } from 'react-native'
import { Container, Content, Icon } from 'native-base'
import { getProfile, setTicket, getTicket, removeTicket } from '../../../store/actions';
import { Loading } from '../../common';
import { colors } from '../../../assets';
import { moderateScale } from 'react-native-size-matters';

class ConfiaShop extends Component {  
  state = {
    env: 'dev'
  }

  componentWillMount() {
    this.props.getProfile(true);    
  }

  componentDidMount(){
    const { navigation } = this.props

    this.focusListener = navigation.addListener("didFocus", () => {
      this.props.getTicket();
    })

    AsyncStorage.getItem('env').then((env) => {
      console.log("env###", env);
      if(env != "DEMO"){
        this.setState({
          env: 'qa'
        });
      }
    });
  }

  componentDidUpdate(){
    if (this.props.profile.user.DistribuidorId){
      let { user } = this.props.profile
      console.log('confiashop env -->', `https://confia-${this.state.env}.supernova-desarrollo.com/?meta=1&page=mobile&env=dist&tk1=${user.DistribuidorId}&tk2=&benefit=${user.categoriaId}`)
    }
  }

  componentWillUnmount(){
    this.focusListener.remove();
  }

  _setTicket(ticket) {   
    console.log("_setTicket", "### ###");
    console.log("Ticket", ticket);
    if(ticket != ""){
      this.props.setTicket(ticket);
    }
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
            {profile.accesoConfiaShop ? <WebView
              useWebKit={true}
              ref={webview => { this.webview = webview; }}
              startInLoadingState
              javaScriptEnabledAndroid={true}
              renderLoading={() => <Loading />}
              javaScriptEnabled={true}
              onMessage={(event) => this._setTicket(event.nativeEvent.data)}
              source={{ uri: `https://confia-${this.state.env}.supernova-desarrollo.com/?meta=1&page=mobile&env=dist&tk1=${user.DistribuidorId}&tk2=&benefit=${user.categoriaId}` }}
            /> : <View style={{alignItems: "center", flex: 1, paddingTop: moderateScale(100), paddingHorizontal: moderateScale(20),}}>
              <Text style={{fontSize: moderateScale(30), fontWeight: 'bold'}}>{'ConfiaShop no disponible\n'}</Text>
              <Text style={{justifyContent: 'center'}}>Lo sentimos, por el momento el servicio de ConfiaShop no esta disponible para esta sesión</Text>
            </View>}
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
