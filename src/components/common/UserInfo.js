
import React, { Component } from 'react'
import { Text, StyleSheet, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Icon, Thumbnail, View, Badge } from 'native-base';
import { colors, style } from '../../assets';
import { TitleQ } from './Title';
const { width, height } = Dimensions.get('window');
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


const styles = StyleSheet.create({
  contImageProfile: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(20),
    backgroundColor: colors.secondary
  },
  thumbnail: {
    borderRadius: 50,
    width: scale(90),
    height: scale(90)
  },
  title: {
    color: colors.white,
    marginBottom: verticalScale(5)
  },
  badge: {
    position: 'absolute',
    justifyContent: 'center',
    top: moderateScale(3),
    right: moderateScale(3),
    padding: moderateScale(10),
    width: moderateScale(25),
    height: moderateScale(25)
  },
  icon: {
    alignSelf: 'center',    
    color: colors.white,
    fontSize: moderateScale(12)
  }
});

export const UserInfo = (props) => {
  return (
    <View style={styles.contImageProfile}>

      <TouchableOpacity activeOpacity={1} onPress={props.onPress}>
        <Thumbnail
          style={styles.thumbnail}
          large source={props.photo} />
        {props.icon && <Badge primary={props.iconStyle === "primary" || false} danger={props.iconStyle === "danger" || false} style={styles.badge}>
          <Icon type="FontAwesome5" name={props.icon} style={styles.icon} />
        </Badge>}
      </TouchableOpacity>
      <TitleQ style={[styles.title, props.userStyle]} title={props.username} />
      {props.monto ? <TitleQ style={styles.title} title={`$${props.monto}`} /> : null}
    </View>
  )
}
