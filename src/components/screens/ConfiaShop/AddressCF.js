import React from 'react';
import { connect } from 'react-redux';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import { Container, Content, Card, Root, Header, Left, Button, Icon, Body, Right, Picker } from 'native-base';
import { ButtonQ, InputQ } from '../../common';
import { onFormRecoveryChanged, updateAddressCF } from '../../../store/actions';
import { colors, images } from '../../../assets';
import styles from '../Login/Login.styles';
import navigation from '../../../services/navigation';
import { getVersion } from 'react-native-device-info';

class AddressCF extends React.Component {
  render() {
    let { formRecovery, loading } = this.props;
    return (
      <Root>
        <Container style={{ backgroundColor: colors.tertiary }}>
          <Header noShadow transparent androidStatusBarColor={colors.tertiary} iosBarStyle="light-content" style={{ marginTop: 15, height: verticalScale(50) }}>
            <Left style={{ flex: 1, paddingLeft: moderateScale(10) }}>
              <Button transparent onPress={() => navigation.goBack()}>
                <Icon style={{ fontSize: moderateScale(28), color: colors.white, fontWeight: "bold" }} name='arrow-back' />
              </Button>
            </Left>
            <Body style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: moderateScale(18), fontWeight: 'bold', color: colors.white, textAlign: 'center' }}>DIRECCIÓN DE ENVÍO</Text>
            </Body>
            <Right style={{ flex: 1 }} />
          </Header>
          <Content padder contentContainerStyle={{ flexDirection: "column", alignItems: "stretch" }} style={{ flex: 1 }}>
            <Card style={styles.card}>
              <InputQ
                label={"Calle"}
                onChangeText={(value) => { this.props.onFormRecoveryChanged({ key: "calle", value }) }}
                value={formRecovery.calle}
                placeholder="Calle"                
              />
              <InputQ
                label={"Número exterior"}
                onChangeText={(value) => { this.props.onFormRecoveryChanged({ key: "numExterior", value }) }}
                value={formRecovery.numExterior}
                placeholder="Número exterior"                
              />
              <InputQ
                label={"Número interior"}
                onChangeText={(value) => { this.props.onFormRecoveryChanged({ key: "numInterior", value }) }}
                value={formRecovery.numInterior}
                placeholder="Número interior"                
              />
              <InputQ
                label={"Colonia"}
                onChangeText={(value) => { this.props.onFormRecoveryChanged({ key: "colonia", value }) }}
                value={formRecovery.colonia}
                placeholder="Colonia"                
              />
              <InputQ
                label={"Municipio"}
                onChangeText={(value) => { this.props.onFormRecoveryChanged({ key: "municipio", value }) }}
                value={formRecovery.municipio}
                placeholder="Municipio"                
              />
              <InputQ
                label={"Estado"}
                onChangeText={(value) => { this.props.onFormRecoveryChanged({ key: "estado", value }) }}
                value={formRecovery.estado}
                placeholder="Estado"                
              />
              <InputQ
                label={"Código postal"}
                onChangeText={(value) => { this.props.onFormRecoveryChanged({ key: "codigoPostal", value }) }}
                value={formRecovery.codigoPostal}
                placeholder="Código postal" 
                kType="numeric"               
                maxLength={5}
              />
              <InputQ
                label={"Entre calle"}
                onChangeText={(value) => { this.props.onFormRecoveryChanged({ key: "entreCalle1", value }) }}
                value={formRecovery.entreCalle1}
                placeholder="Entre calle"                
              />
              <InputQ
                label={"Y entre calle"}
                onChangeText={(value) => { this.props.onFormRecoveryChanged({ key: "entreCalle2", value }) }}
                value={formRecovery.entreCalle2}
                placeholder="Y entre calle"                
              />
              {/* <InputQ
                label={"Tipo de Domicilio"}
                onChangeText={(value) => { this.props.onFormRecoveryChanged({ key: "tipoDomicilio", value }) }}
                value={formRecovery.tipoDomicilio}
                placeholder="Tipo de domicilio"                
              /> */}
              <View>
                <Text style={[styles.textInput]}>Tipo de domicilio</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    mode="dropdown"
                    placeholder="Selecciona"
                    headerBackButtonText="Regresar"
                    iosHeader="Seleccionar"
                    iosIcon={<Icon name="arrow-down" />}
                    style={styles.picker}
                    selectedValue={formRecovery.tipoDomicilio}
                    onValueChange={(value) => { console.warn(JSON.stringify(formRecovery)); this.props.onFormRecoveryChanged({ key: "tipoDomicilio", value }) }}
                  >
                    <Picker.Item label="Selecciona"></Picker.Item>
                    <Picker.Item label="CASA" value="casa"></Picker.Item>
                    <Picker.Item label="OFICINA" value="oficina"></Picker.Item>
                    <Picker.Item label="EDIFICIO" value="edificio"></Picker.Item>
                  </Picker>
                </View>
              </View>
              <InputQ
                label={"Descripción domicilio"}
                onChangeText={(value) => { this.props.onFormRecoveryChanged({ key: "descripcionDomicilio", value }) }}
                value={formRecovery.descripcionDomicilio}
                placeholder="Descripción del domicilio"                
              />
              <InputQ
                label={"Teléfono"}
                onChangeText={(value) => { this.props.onFormRecoveryChanged({ key: "telefonoEnvio", value }) }}
                value={formRecovery.telefonoEnvio}
                placeholder="Teléfono"  
                kType="numeric"              
                maxLength={10}
              />
              <View style={styles.contButton}>
                {loading ? <ActivityIndicator color={colors.tertiary} size="large" style={{ margin: moderateScale(8) }} /> : <ButtonQ
                  block
                  onPress={() => this.props.updateAddressCF(formRecovery)}
                  style={styles.button}
                  text="Guardar"
                />}
              </View>
            </Card>
          </Content>
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
  updateAddressCF
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressCF)