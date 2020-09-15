//import 'react-native-gesture-handler';
import React, {Component, useEffect, useState } from 'react';
//import { NavigationContainer } from '@react-navigation/native';

import { View, Text, AsyncStorage, Alert, Button, Image} from 'react-native';
import {constants, images, colors} from './src/assets';
import {createStore, applyMiddleware} from 'redux';
import reducers from './src/store/reducers';
import ReduxThunk from 'redux-thunk';
import {createRootNavigator} from './src/config/routes';
import RNBootSplash from "react-native-bootsplash";
import {Root} from 'native-base';
import {Provider} from 'react-redux'
import NavigationService from './src/services/navigation'
import { Loading } from './src/components/common';
import {fcmService} from './src/FCMService'
import {localNotificationService} from './src/LocalNotificationService'
import Modal from 'react-native-modal';
import {moderateScale} from 'react-native-size-matters';

export default class App extends Component {
  state = {
    signedIn: true,
    checkedSignIn: false
  };

  componentDidMount() {
    this.isSignedIn()
      .then(res => { this.setState({ signedIn: res, checkedSignIn: true }); RNBootSplash.hide({duration: 900}); })
      .catch(err => console.log("App Error",err));
  }

  isSignedIn() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(constants.TOKEN)
        .then(async res => {          
          let address = await AsyncStorage.getItem(constants.ADDRESS)
          if (res !== null && address) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(err => reject(err));
    });
  }

  render(){
    console.disableYellowBox = true;
    const { checkedSignIn, signedIn } = this.state;
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    const AppNavigator = createRootNavigator(signedIn)

    return <AppNotification checkedSignIn={checkedSignIn} store={store} AppNavigator={AppNavigator}/>
    /*if (!checkedSignIn) {
      return <Loading />;
    }
    return (
      <Root>
        <Provider store={store}>
          <AppNavigator ref={navigatorRef => NavigationService.setTopLevelNavigator(navigatorRef)} />
        </Provider>
      </Root>
    );*/
  }
  
};

function AppNotification({checkedSignIn, store, AppNavigator}) {

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('Vale Confía');
  const [content, setContent] = useState('Mensaje detallado de la notificacion. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
  const [image, setImage] = useState('https://firebasestorage.googleapis.com/v0/b/app-vc-e5ea5.appspot.com/o/notificaciones%2FvaleConfia.jpg?alt=media&token=d7979930-613b-418d-a960-eb3fb6880c3e');

  useEffect(() => {
    fcmService.registerAppWithFCM()
    fcmService.register(onRegister, onNotification, onOpenNotification)
    localNotificationService.configure(onOpenNotification)

    async function onRegister(token) {
      console.log("[App] onRegister: ", token)
      await AsyncStorage.setItem(constants.PUSHTOKEN, token);
    }

    function onNotification(notify) {
      console.log("[App] onNotification: ", notify)
      const options = {
        soundName: 'default',
        playSound: true,
        // largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
        smallIcon: 'ic_notification' // add icon small for Android (Link: app/src/main/mipmap)
      }
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options
      )
    }
    
    function _cleanNotification(){
      setImage('https://firebasestorage.googleapis.com/v0/b/app-vc-e5ea5.appspot.com/o/notificaciones%2FvaleConfia.jpg?alt=media&token=d7979930-613b-418d-a960-eb3fb6880c3e')
      setTitle('Vale Confía')
    }

    function onOpenNotification(notify) {
      console.log("[App] onOpenNotification: ", notify)
      if(notify['body'] != null){
        _cleanNotification();
        setShowModal(true)
        if(notify['title'] != null)setTitle(notify['title'])
        setContent(notify['body'])
        if(notify['android']['imageUrl'] != null )setImage(notify['android']['imageUrl'])
      }
      //alert("Open Notification: " + notify.body)
      //Alert.alert(notify.title, notify.body);
    }

    return () => {
      console.log("[App] unRegister")
      fcmService.unRegister()
      localNotificationService.unregister()
    }

  }, [])

  return (
    !checkedSignIn ? <Loading /> : <Root>
      <Provider store={store}>
        <Modal isVisible={showModal} animationType = {"slide"}>
          <View style={{backgroundColor: 'white', padding: moderateScale(20), borderRadius:40}}>
            <Text style={{ paddingBottom: moderateScale(10), paddingTop: moderateScale(10), fontSize: moderateScale(20), fontWeight: 'bold' }} >{title}</Text>
            <View style={{ alignItems: 'center'}}>
              <Image style={{ backgroundColor: '#f8f8f8', width: moderateScale(250), height: moderateScale(200)}} resizeMode='contain' source={{uri: image}}></Image>
            </View>
            <Text style={{ paddingBottom: moderateScale(10), paddingTop: moderateScale(10), textAlign:'justify', fontSize: moderateScale(14) } } >{content}</Text>
            <Button color={colors.secondary} title="Entendido" onPress={() => setShowModal(false)} />
          </View>
        </Modal>
        <AppNavigator ref={navigatorRef => NavigationService.setTopLevelNavigator(navigatorRef)} />
      </Provider>
    </Root>
    /*<View style={styles.container}>
      <Text>Sample React Native Firebase V7</Text>
      <Button
        title="Press me"
        onPress={() => localNotificationService.cancelAllLocalNotifications()}
      />
    </View>*/
  )

}
