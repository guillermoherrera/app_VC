import React, { Component } from 'react'
import { Text, StyleSheet, Dimensions } from 'react-native'
import { Icon, Button, View } from 'native-base';
import { colors, style } from '../../assets';
const { width, height } = Dimensions.get('window');
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  button:{
    color: colors.white,
    textAlign:'center',
    fontWeight:"bold",
    backgroundColor: colors.primary,
    borderRadius: style.border,
    justifyContent:'center',
    textAlign:"center",
    alignSelf:"center",
    width:width* .79,
    marginTop: moderateScale(25),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 10,
  },
  txtButton:{
    fontSize: moderateScale(13),
    color: colors.white,
    textAlign:'center',
    fontWeight: "bold",
  }
});

export const ButtonQ = (props) => {
  return (
    <Button {...props} style={[styles.button,props.style]}>
      <Text style={[styles.txtButton]}>{props.text}</Text>
    </Button>
  )
}