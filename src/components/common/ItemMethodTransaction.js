import React, { Component } from 'react'
import { Text, StyleSheet, Dimensions, TouchableOpacity, View } from 'react-native'
import { Icon, Content, List, ListItem, Right, Left } from 'native-base';
import { colors, style, images } from '../../assets';
const { width, height } = Dimensions.get('window');
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { TitleQ } from './Title';

const styles = StyleSheet.create({
  content: {
    // flex:1,
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: moderateScale(10),
    marginTop: moderateScale(10)
  },
  active: {
    borderWidth: 2,
    borderColor: colors.secondary,
    borderRadius: moderateScale(5),
  },
  noActive: {

  },
  card: {
    backgroundColor: colors.white,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginBottom: 0,
    borderColor: colors.grays,
    borderWidth: 1,
  },
  cardFooter: {
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginBottom: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    borderWidth: 0,
    borderTopWidth: 0,
    borderColor: 'transparent',
    borderWidth: 2,
  },
  cardStyle: {
    paddingBottom: 0,
    borderRadius: 8,
    marginBottom: verticalScale(10)
  },
  contDetails: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  titleCard: {
    fontWeight: 'bold',
    fontFamily: 'Heebo',
    fontStyle: 'normal',
    textAlign: "center",
    lineHeight: moderateScale(25),
    fontSize: moderateScale(14),
    color: colors.black_light
  },
  subtitle: {
    fontSize: moderateScale(11),
    fontFamily: 'Heebo',
    fontWeight: 'bold',
    textAlign: "center",
    lineHeight: moderateScale(17),
    color: colors.primary
  },
  wrapperSubtitle: {
    flex: 1,
    flexDirection: "row",
    marginTop: moderateScale(4)
  },
  titleCard: {
    fontSize: moderateScale(20),
    color: colors.black,
    fontWeight: '900',
    textAlign: "left",
    flexWrap: "wrap",
    marginBottom: 0,
    flexDirection: "row",
  },
  subtitleCard: {
    color: colors.gray_normal,
    fontSize: moderateScale(14),
    fontWeight: "300"

  },
  icon: {
    color: colors.success,
    fontWeight: "bold",
    fontSize: moderateScale(45),
    alignSelf: "center",
  },
  leftContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    height: moderateScale(100),
  },
  rightContent: {
    flex: 2,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    height: moderateScale(100),
  },
});

export const ItemMethodTransaction = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.content, props.active ? styles.active : styles.noActive]}>
      <View style={styles.leftContent}>
        <Icon
          type="FontAwesome"
          name={props.iconoDesembolsoTipo || "credit-card"}
          style={styles.icon} />
      </View>
      <View style={styles.rightContent}>
        <Text style={styles.titleCard}>{props.desembolsoTipoDesc}</Text>
        {props.requiereDatosBancarios && <Text style={styles.subtitleCard}>
          {props.nombreBanco} {'\n'} ••••{props.numeroTarjeta}
        </Text>}
      </View>
    </TouchableOpacity>
  )
}