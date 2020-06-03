
import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native'
import { Icon } from 'native-base';
import { colors } from '../../assets';
import { moderateScale, verticalScale } from 'react-native-size-matters';
const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
  content: {
    // width: moderateScale(width / 2 - 30),
    flex: 1,
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: moderateScale(10),
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
    fontSize: moderateScale(16),
    color: colors.black,
    fontWeight: '900',
    textAlign: "center",
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
  centerContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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

export const ItemReason = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.content, props.active ? styles.active : styles.noActive]}>
      <View style={styles.centerContent}>
        <Icon
          type="FontAwesome"
          name={props.iconoMotivoTipo || "bars"}
          style={styles.icon} />
        <Text style={styles.titleCard}>{props.motivoTipoDesc}</Text>
      </View>
    </TouchableOpacity>
  )
}
