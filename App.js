//import 'react-native-gesture-handler';
import React, {Component, useEffect } from 'react';
//import { NavigationContainer } from '@react-navigation/native';

import { View, Text, AsyncStorage, Alert} from 'react-native';
import {constants} from './src/assets';
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

  /*useEffect(() => {
    fcmService.registerAppWithFCM()
    fcmService.register(onRegister, onNotification, onOpenNotification)
    localNotificationService.configure(onOpenNotification)

    function onRegister(token) {
      console.log("[App] onRegister: ", token)
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

    function onOpenNotification(notify) {
      console.log("[App] onOpenNotification: ", notify)
      //alert("Open Notification: " + notify.body)
      //Alert.alert(notify.title, notify.body);
    }

    return () => {
      console.log("[App] unRegister")
      fcmService.unRegister()
      localNotificationService.unregister()
    }

  }, [])*/

  return (
    !checkedSignIn ? <Loading /> : <Root>
      <Provider store={store}>
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
