// In App.js in a new project
import React from 'react';
import { moderateScale } from 'react-native-size-matters';

import { 
  createAppContainer, 
  createSwitchNavigator } from "react-navigation";

import {createStackNavigator} from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';

import {
  Loans,
  Login,
  NewVale,  
  Profile,    
  Home,
  CustomerProfile,
  Customers,    
  CustomerInformation,
  TransactionTypes,
  ValeSection,
  Reasons,
  LoanDetails,
  ValidateCode,
  ConfiaShop,
  ErrorScreen,
  SuccessCredit,
  ActivateAccount,
  Address,
  AssignCredit,
  ValidateConfiaShopCode,
  ConfiaShopError,
  SuccessConfiaShop,
  ChangePassword,
  ErrorLogin,
  SuccessAuth,
  CustomerAdd,
  SuccessModal,
  ErrorModal,
  AddressSelection,
  AddressCF,
  DeliveryDetails
} from '../components/screens';


import { Icon } from 'native-base';

import { colors } from '../assets';

const NotAuthNavigator = createStackNavigator({
  Login: Login,
  Recovery: ActivateAccount,
  ChangePassword: ChangePassword,
  Address: Address,
  Error: ErrorLogin,
  Success: SuccessAuth
},{
  initialRouteName: 'Login',    
  headerMode: 'none'
});


const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: "Inicio",
      tabBarIcon: ({ tintColor }) => (
        <Icon type="FontAwesome5" name={"home"} style={{ color: tintColor, fontSize: moderateScale(20) }} />
      )
    },
  },
  Loans: {
    screen: Loans,
    navigationOptions: {
      tabBarLabel: "Vales",
      tabBarIcon: ({ tintColor }) => (
        <Icon type="FontAwesome5" name={"dollar-sign"} style={{ color: tintColor, fontSize: moderateScale(20) }} />
      )
    },
  },
  Customers: {
    screen: Customers,
    navigationOptions: {
      tabBarLabel: "Clientes",
      tabBarIcon: ({ tintColor }) => (
        <Icon type="FontAwesome5" name={"users"} style={{ color: tintColor, fontSize: moderateScale(20) }} />
      )
    },
  },
  ConfiaShop: {
    screen: ConfiaShop,
    navigationOptions: {
      tabBarLabel: "ConfiaShop",
      tabBarIcon: ({ tintColor }) => (
        <Icon type="FontAwesome5" name={"shopping-cart"} style={{ color: tintColor, fontSize: moderateScale(20) }} />
      )
    },
  },
},{
  swipeEnabled: true,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showIcon: true,
    showLabel: true,
    activeTintColor: colors.primary,
    inactiveTintColor: colors.gray,
    style: {
      backgroundColor: colors.white,
      height: moderateScale(45),
      alignItems:"center"
    },
    labelStyle: {
      fontSize: moderateScale(11)
    },
    indicatorStyle: {
      backgroundColor: colors.primary,
      borderTopWidth: moderateScale(8)
    },
  }
}
);

const AuthNavigator = createStackNavigator({
  Home: {
    screen: TabNavigator,
  },    
  Profile,  
  NewVale,  
  CustomerProfile,    
  CustomerInformation,
  TransactionTypes,
  ValeSection,
  Reasons,
  LoanDetails,
  ValidateCode,
  Error: ErrorScreen,
  Success: SuccessCredit,
  AssignCredit,
  ValidateConfiaShopCode,
  ConfiaShopError,
  SuccessConfiaShop,
  CustomerAdd,
  SuccessModal,
  ErrorModal,
  AddressSelection,
  AddressCF,
  DeliveryDetails
},{
  initialRouteName: 'Home',  
  headerMode: 'none'  
});


export const createRootNavigator = (signedIn = false) => {
  const AppNavigator = createSwitchNavigator(
    {
      Home: AuthNavigator,
      Login: NotAuthNavigator
    },
    {
      initialRouteName: signedIn ? "Home" : "Login"
    }
  );
  return createAppContainer(AppNavigator);
}
