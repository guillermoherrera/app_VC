
import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, View, ImageBackground } from 'react-native'
import { Container  } from 'native-base';
import { colors, images } from '../../assets';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
});

export const Loading = (props) => {
  return (
    <Container style={styles.container}>        
      {/* <ImageBackground resizeMode="cover" source={images.background} style={{flex:1,alignItems:"stretch",flexDirection: 'column',justifyContent:"flex-start"}}>          */}
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      {/* </ImageBackground> */}
    </Container>
  )
}
