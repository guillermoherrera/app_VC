import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'
import { Icon, Button, View } from 'native-base';
import { colors, style } from '../../assets';
import { verticalScale, moderateScale, scale } from 'react-native-size-matters';
const styles = StyleSheet.create({
  text:{
    fontSize: moderateScale(20),
    lineHeight: moderateScale(23),
    fontFamily: 'Roboto',
    fontStyle:'normal',
    fontWeight:'900',
    alignItems:"center",
    marginTop: verticalScale(6)
  },
});

export const TitleQ = (props) => {
  const color = props.color ? props.color : colors.black;
  return (
    <Text 
      {...props} 
      style={[styles.text,{color:color},props.style]}>
        {props.title}
    </Text>
  )
}