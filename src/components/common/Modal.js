import React from 'react'
import { View, Text, Modal, Image, StyleSheet, ActivityIndicator } from 'react-native'
import { colors } from '../../assets'
import { Button } from 'native-base'
import { moderateScale, scale } from 'react-native-size-matters'

const CustomModal = ({ children, onSubmit, onCancel, image, title, description, buttonText, cancelText, type, isLoading }) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: type === "danger" ? colors.danger : colors.secondary }}>
        <Image source={image} resizeMode="contain" style={styles.image} />
        <View style={styles.viewCenter}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
      <View style={{ flex: 1.5, backgroundColor: colors.white, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.viewCenter}>
          <Text style={styles.description}>
            {description}
          </Text>          
        </View>
        {children}
        {isLoading ? <View style={styles.buttonContainer}><ActivityIndicator color={colors.primary} size="large" /></View> : <View style={styles.buttonContainer}>
          <Button onPress={onSubmit} style={styles.button} >
            <Text style={styles.buttonText}>
              {buttonText}
            </Text>
          </Button>
          {onCancel && <Button transparent onPress={onCancel} style={[styles.button, { backgroundColor: 'transparent' }]} >
            <Text style={[styles.buttonText, { color: colors.gray_strong }]}>
              {cancelText}
            </Text>
          </Button>}
        </View>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  image: {
    marginTop: moderateScale(50),
    alignSelf: 'center',
    height: moderateScale(150),
    width: moderateScale(150)
  },
  title: {
    color: colors.white,
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    letterSpacing: 1
  },
  description: {
    color: colors.gray_normal,
    fontSize: moderateScale(20),
    textAlign: 'center',
    padding: moderateScale(10)
  },
  viewCenter: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(10)
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "center",
    marginTop: moderateScale(20)
  },
  button: {
    width: scale(150),
    // height: verticalScale(50),
    justifyContent: "center",
    alignSelf: 'center',
    backgroundColor: colors.primary
  },
  buttonText: {
    color: colors.white,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    textAlign: 'center'
  },
  celdaPin: {
    borderWidth: 1,
    borderRadius: 24,
    borderColor: colors.secondary
  },
  celdaEnfocadaPin: {
    borderColor: colors.tertiary
  },
  espacioInferiorEstandar: {
    marginBottom: moderateScale(8),
    marginTop: moderateScale(30)
  }
})
export { CustomModal }
