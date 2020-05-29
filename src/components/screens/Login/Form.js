import React from 'react';
import { Text, Keyboard, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Content, View, Toast, Card, CardItem } from 'native-base';
import styles from './Login.styles';
import { connect } from 'react-redux';
import { ButtonQ, InputQ } from '../../common';
import { toggleForm, login, changeInput } from '../../../store/actions';
import { colors } from '../../../assets';
import { moderateScale } from 'react-native-size-matters';
import { getUniqueId } from "react-native-device-info";
import navigation from '../../../services/navigation';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { distribuidor: null, password: null };
  }

  signIn(distribuidor, password) {
    Keyboard.dismiss();
    if (distribuidor && password) {
      let uniqueId = getUniqueId();
      this.props.login({ distribuidor, password, identificador: uniqueId });
    }
    else {
      Toast.show({
        text: "Completa los campos",
        buttonText: "Entendido",
        type: "danger"
      })
    }
  }


  render() {
    let { distribuidor, password, loading } = this.props;
    return (
      <Content scrollEnabled={false} contentContainerStyle={{ flexDirection: "column", alignItems: "stretch" }} style={{ flex: 1 }}>
        <Card style={styles.card}>
          <InputQ
            label={"Distribuidora"}
            onChangeText={(value) => { this.props.changeInput({ name: "distribuidor", value }) }}
            value={distribuidor}
            placeholder="Número de distribuidora"            
            icon={'user'} />
          <InputQ
            label={"Contraseña"}
            secureTextEntry
            onChangeText={(value) => { this.props.changeInput({ name: "password", value }) }}
            value={password}
            placeholder="Contraseña"                        
            onSubmitEditing={() => this.signIn(distribuidor, password)}
            icon={'lock'} />

          <View style={styles.contButton}>
            {loading ? <ActivityIndicator color={colors.tertiary} size="large" style={{ margin: moderateScale(8) }} /> : <ButtonQ
              block
              style={styles.button}
              onPress={() => this.signIn(distribuidor, password)}
              text={"Entrar"}
            />}
          </View>
          <View style={styles.contForgot}>
            <Text style={[styles.txtWhite, { color: colors.black }]}>¿Aún no activas tu cuenta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Recovery')}>
              <Text style={[styles.txtWhite, { fontWeight: "bold", color: colors.primary }]}>Activala aquí</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </Content>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.user
  }
}

const mapDispatchToProps = {
  login,
  toggleForm,
  changeInput,
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)