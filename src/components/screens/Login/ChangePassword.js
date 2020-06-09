import React from 'react';
import { connect } from 'react-redux';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Container, Content, Card, Root, Header, Left, Button, Icon, Body, Right } from 'native-base';
import { ButtonQ, InputQ } from '../../common';
import { onFormRecoveryChanged, changePassword } from '../../../store/actions';
import { colors, images } from '../../../assets';
import styles from './Login.styles';
import navigation from '../../../services/navigation';
import { getVersion } from 'react-native-device-info';

class ChangePassword extends React.Component {
  render() {
    let { formRecovery, loading, codigo } = this.props;
    return (
      <Root>
        <Container style={{ backgroundColor: colors.secondary }}>
          <Header noShadow transparent androidStatusBarColor={colors.secondary} iosBarStyle="light-content" style={{ height: verticalScale(50) }}>
            <Left style={{ flex: 1, paddingLeft: moderateScale(10) }}>
              <Button transparent onPress={() => navigation.goBack()}>
                <Icon style={{ fontSize: moderateScale(28), color: colors.white, fontWeight: "bold" }} name='arrow-back' />
              </Button>
            </Left>
            <Body style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: moderateScale(18), fontWeight: 'bold', color: colors.white, textAlign: 'center' }}>CAMBIAR CONTRASEÑA</Text>
            </Body>
            <Right style={{ flex: 1 }} />
          </Header>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: moderateScale(8) }}>
            <Image source={images.logo} style={{ width: scale(180), height: verticalScale(75) }} />
            <Text style={[styles.textInput, { fontSize: moderateScale(20), color: 'white' }]}>v. {getVersion()}</Text>
            <Image source={images.sublogo} style={{ width: scale(180), height: verticalScale(75) }} />
          </View>
          <View style={{ flex: 1, justifyContent: 'center', marginLeft: moderateScale(10), marginRight: moderateScale(10) }}>
            <Content contentContainerStyle={{ flexDirection: "column", alignItems: "stretch" }} style={{ flex: 1 }}>
              <Card style={styles.card}>
                <InputQ
                  label={"Código de confirmación"}
                  onChangeText={(value) => { this.props.onFormRecoveryChanged({ key: "identificador", value }) }}
                  value={formRecovery.identificador}
                  placeholder="Código de confirmación"                  
                  icon={'info'}
                />
                <InputQ
                  label={"Nueva Contraseña"}
                  secureTextEntry
                  onChangeText={(value) => { this.props.onFormRecoveryChanged({ key: "password", value }) }}
                  value={formRecovery.password}
                  placeholder="Nueva contraseña"                  
                  icon={'lock'}
                />
                <InputQ
                  label={"Confirmar Contraseña"}
                  secureTextEntry
                  onChangeText={(value) => { this.props.onFormRecoveryChanged({ key: "confirm_password", value }) }}
                  value={formRecovery.confirm_password}
                  placeholder="Confirmar contraseña"
                  labelColor={colors.gray_normal}                  
                  icon={'lock'}
                />

                <View style={styles.contButton}>
                  {loading ? <ActivityIndicator color={colors.tertiary} size="large" style={{ margin: moderateScale(8) }} /> : <ButtonQ
                    block
                    style={styles.button}
                    onPress={() => this.props.changePassword(formRecovery, codigo)}
                    text="Cambiar"
                  />}
                </View>
              </Card>
            </Content>
          </View>
        </Container>
      </Root>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.user
  }
}

const mapDispatchToProps = {
  onFormRecoveryChanged,
  changePassword
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)