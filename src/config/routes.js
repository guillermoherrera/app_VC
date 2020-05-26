import React from 'react';

import { 
  createStackNavigator,
  createBottomTabNavigator  } from '@react-navigation/stack';

import { Icon } from 'native-base';

import { colors } from '../assets';

import { moderateScale } from 'react-native-size-matters';

const TabNavigator = createBottomTabNavigator();

function MyTabs() {
  return (
    <TabNavigator.Navigator
      tabBarOptions={{
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
      }}
    >
      <TabNavigator.Screen 
        name="Home" 
        component={Home}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ tintColor }) => (
            <Icon type="FontAwesome5" name={"home"} style={{ color: tintColor, fontSize: moderateScale(20) }} />
          ),
        }} 
      />
      <TabNavigator.Screen 
        name="Loans" 
        component={Loans}
        options={{
          tabBarLabel: 'Vales',
          tabBarIcon: ({ tintColor }) => (
            <Icon type="FontAwesome5" name={"dollar-sign"} style={{ color: tintColor, fontSize: moderateScale(20) }} />
          ),
        }} 
      />
      <TabNavigator.Screen 
        name="Customers" 
        component={Customers}
        options={{
          tabBarLabel: 'Clientes',
          tabBarIcon: ({ tintColor }) => (
            <Icon type="FontAwesome5" name={"users"} style={{ color: tintColor, fontSize: moderateScale(20) }} />
          ),
        }} 
      />
      <TabNavigator.Screen 
        name="ConfiaShop" 
        component={ConfiaShop}
        options={{
          tabBarLabel: 'ConfiaShop',
          tabBarIcon: ({ tintColor }) => (
            <Icon type="FontAwesome5" name={"shopping-cart"} style={{ color: tintColor, fontSize: moderateScale(20) }} />
          ),
        }} 
      />
    </TabNavigator.Navigator>
  );
}

export const createRootNavigator = (signedIn = false) => {
  const AppNavigator = createStackNavigator(
    <AppNavigator.Navigator
      initialRouteName={signedIn ? "Home" : "Login"}
      headerMode="none"
      >
      signedIn ?(
        <AppNavigator.Screen name="Home" component={TabNavigator} />
        <AppNavigator.Screen name="Profile" component={Profile} />
        <AppNavigator.Screen name="CustomerProfile" component={CustomerProfile} />
        <AppNavigator.Screen name="CustomerInformation" component={CustomerInformation} />
        <AppNavigator.Screen name="TransactionTypes" component={TransactionTypes} />
        <AppNavigator.Screen name="SuccValeSectioness" component={ValeSection} />
        <AppNavigator.Screen name="Reasons" component={Reasons} />
        <AppNavigator.Screen name="LoanDetails" component={LoanDetails} />
        <AppNavigator.Screen name="ValidateCode" component={ValidateCode} />
        <AppNavigator.Screen name="Error" component={ErrorScreen} />
        <AppNavigator.Screen name="Success" component={SuccessCredit} />
        <AppNavigator.Screen name="AssignCredit" component={AssignCredit} />
        <AppNavigator.Screen name="ValidateConfiaShopCode" component={ValidateConfiaShopCode} />
        <AppNavigator.Screen name="ConfiaShopError" component={ConfiaShopError} />
        <AppNavigator.Screen name="SuccessConfiaShop" component={SuccessConfiaShop} />
        <AppNavigator.Screen name="CustomerAdd" component={CustomerAdd} />
        <AppNavigator.Screen name="SuccessModal" component={SuccessModal} />
        <AppNavigator.Screen name="ErrorModal" component={ErrorModal} />
      ) : (
        <AppNavigator.Screen name="Login" component={Login} />
        <AppNavigator.Screen name="Recovery" component={Recovery} />
        <AppNavigator.Screen name="ChangePassword" component={ChangePassword} />
        <AppNavigator.Screen name="Address" component={Address} />
        <AppNavigator.Screen name="Error" component={ErrorLogin} />
        <AppNavigator.Screen name="Success" component={SuccessAuth} />
      )
    </AppNavigator.Navigator>
  );
  return createAppContainer(AppNavigator)
}