import React, { Component } from 'react'
import { Text, StyleSheet, Dimensions, ImageBackground, TouchableOpacity } from 'react-native'
import { Title, CardItem, Body, View, Icon } from 'native-base';
import { colors, style, images } from '../../assets';
const { width, height } = Dimensions.get('window');
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  content:{
    width: scale(145),
    height: scale(145),
    padding: moderateScale(5) 
  },
  card:{
    backgroundColor: colors.gray_lighter
  },
  rightCont:{
    flex:1,
    flexDirection:"row",
    alignItems:"flex-end",
    justifyContent:"center"
  },
  leftCont:{
    flex:6,
    flexDirection:"column",
    alignItems:"flex-start",
    justifyContent:"center"
  },
  titleCard:{
   fontWeight:'900',
   fontFamily:'Roboto',
   fontStyle:'normal',
   lineHeight: moderateScale(17),
   fontSize: moderateScale(15),
   color: colors.black_light
  },
  subtitle:{
    color: colors.primary,
    fontSize: moderateScale(12),
    fontFamily:'Roboto',
    fontWeight:'normal',
    lineHeight: moderateScale(14)
  },
  mrt15:{
    marginTop: moderateScale(15)
   },
   mrb10:{
    marginBottom: moderateScale(10)
   },
   cardMoney:{
      flex:1,
      height: moderateScale(250),
      margin: moderateScale(10),
      borderRadius: moderateScale(12),
      backgroundColor: colors.green_light,
      padding: moderateScale(10),
      paddingTop: moderateScale(15),
      flexDirection:"column",
      alignItems:"stretch",
      justifyContent: 'flex-start',
   },
   textMoney:{
    color: colors.black_strong,
    fontSize: moderateScale(30),
    fontWeight:"100",
    textAlign:"center",
   },
   textCard:{
    fontSize: moderateScale(16),
    color: colors.green,
    fontWeight: '200',
    textAlign:"left"
   },
   hr:{
    height: moderateScale(1),
    width: moderateScale(130),
    alignSelf:"center",
    backgroundColor:colors.white,
    marginTop: moderateScale(10),
    marginBottom: moderateScale(10)
   },
   textSubTotal:{
     fontSize: moderateScale(16),
     fontWeight:"200"
   }
});

export const CardBalance = (props) => {
  return (
    <View style={styles.cardMoney}>
      <Title style={styles.totalDetail}>
        {props.name}
      </Title>
      <Text style={styles.textMoney}>
        {props.balance}
      </Text>
      <Title style={styles.textCard}>
        Disponible
      </Title>
      <View style={styles.hr}/>
      <Text style={styles.textSubTotal}>
        {props.granted}
      </Text>
      <Title style={[styles.textCard,styles.mrb10]}>
        Límite de crédito
      </Title>
      <Text style={styles.textSubTotal}>
        {props.used}
      </Text>
      <Title style={[styles.textCard,styles.mrb10]}>
        Utilizado
      </Title>
    </View>
  )
}