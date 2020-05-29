import 'react-native-gesture-handler';
import React, {Component, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { View, Text, AsyncStorage} from 'react-native';
import {constants} from './src/assets';
import {createStore, applyMiddleware} from 'redux';
import reducers from './src/store/reducers';
import ReduxThunk from 'redux-thunk';
import {createRootNavigator} from './src/config/routes';
import RNBootSplash from "react-native-bootsplash";
import {Root} from 'native-base';
import {Provider} from 'react-redux'
import NavigationService from './src/services/navigation'

export default class App extends Component {
  state = {
    signedIn: true,
    checkedSignIn: false
  };

  componentDidMount() {
    this.isSignedIn()
      .then(res => { this.setState({ signedIn: res, checkedSignIn: true }); RNBootSplash.hide(); })
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
    const { checkedSignIn, signedIn } = this.state;
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    const AppNavigator = createRootNavigator(signedIn)

    if (!checkedSignIn) {
      return (<View >
        <Text>Hola Mundo</Text>
      </View>);
    }
    return (
      <Root>
        <Provider store={store}>
          <AppNavigator ref={navigatorRef => NavigationService.setTopLevelNavigator(navigatorRef)} />
        </Provider>
      </Root>
    );
  }
  
};
