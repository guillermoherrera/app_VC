import React, { Component } from 'react';
import Geocoder from 'react-native-geocoder';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, FlatList, Platform } from 'react-native';
import { ListItem, Left, Icon, Right } from 'native-base';
import { HeaderQ, Loading, InputQ, CustomDateInput, CustomPickerInput } from '../../common';
import { onAddressSuggestionChanged, onFormAddChanged, customerSave, getOcupacion, getEstadoCivil, getEstados } from '../../../store/actions';
import { colors } from '../../../assets';
import { GOOGLE_API_KEY } from '../../../config/env';
import styles from './Customers.styles';
import moment from 'moment';
const types = [{
  label: 'CASA',
  value: 'casa'
},
{
  label: 'OFICINA',
  value: 'oficina'
},
{
  label: 'EDIFICIO',
  value: 'edificio'
}];
class CustomerAdd extends Component {
  componentDidMount() {
    console.log("xxx")
    Geocoder.fallbackToGoogle(GOOGLE_API_KEY);
    this.props.getOcupacion();
    this.props.getEstadoCivil();
    this.props.getEstados();
  }
  _renderFooter() {
    let { customer } = this.props;
    let { loading, formAdd } = customer    
    return (
      <TouchableOpacity
        onPress={() => { this.props.customerSave(formAdd) }}
        style={[styles.footerCard]}>
        <Text style={styles.textButton}>
          Guardar
        </Text>
      </TouchableOpacity>
    )
  }

  _openCamera() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      cropperToolbarTitle: 'Editar Foto',
      cropperStatusBarColor: colors.secondary,
      cropperToolbarColor: colors.secondary,
      includeBase64: true
    }).then(image => {
      this.props.onChangeProfile({ key: 'user_photo', value: image.data })
      this.props.onChangeProfile({ key: 'mimeType', value: image.mime })
    }).catch(error => {
      console.log(error)
    });
  }

  async _onAddressChange(text) {
    this.props.onFormAddChanged({ key: 'calle', value: text })
    try {
      const response = await Geocoder.geocodeAddress(text);      
      this.props.onAddressSuggestionChanged(response)
      console.log('#########')
      console.log(response)
    }
    catch (err) {
      console.log("Error", err.message);
    }
  }

  _selectAddress(address) {
    this.props.onFormAddChanged({ key: 'calle', value: address.streetName })
    this.props.onFormAddChanged({ key: 'numExterior', value: address.streetNumber })
    this.props.onFormAddChanged({ key: 'colonia', value: address.subLocality })
    this.props.onFormAddChanged({ key: 'municipio', value: address.locality })
    this.props.onFormAddChanged({ key: 'estado', value: address.adminArea })
    this.props.onFormAddChanged({ key: 'codigoPostal', value: address.postalCode })
    this.props.onAddressSuggestionChanged([])
  }

  render() {
    let { customer } = this.props;
    let { addressSuggests, formAdd, loading, occupations, maritalStates, states } = customer
    let occupationsItem = [], maritalStatesItem = [], statesItem = []
    if (loading) return <Loading />
    occupations.map((item, index) => occupationsItem.push({label: item.ocupacionDesc,value: item.ocupacionId}))
    maritalStates.map((item, index) => maritalStatesItem.push({label: item.estadoDesc, value: item.estadoId}))
    states.map((item, index) => statesItem.push({label: item.estadoDesc, value: item.estadoId}))
    return (
      <HeaderQ title="Nuevo Cliente" contentStyle={styles.containerStyle} footer={this._renderFooter()}>        
        <View style={styles.containerCard}>
          <InputQ
            label={"Primer Nombre"}
            onChangeText={(value) => { this.props.onFormAddChanged({ key: "primerNombre", value }) }}
            value={formAdd.primerNombre}
            placeholder="Escribe el primer nombre"
          />
          <InputQ
            label={"Segundo Nombre"}
            onChangeText={(value) => { this.props.onFormAddChanged({ key: "segundoNombre", value }) }}
            value={formAdd.segundoNombre}
            placeholder="Escribe el segundo nombre"
          />
          <InputQ
            label={"Apellido Paterno"}
            onChangeText={(value) => { this.props.onFormAddChanged({ key: "primerApellido", value }) }}
            value={formAdd.primerApellido}
            placeholder="Escribe el apellido paterno"
          />
          <InputQ
            label={"Apellido Materno"}
            onChangeText={(value) => { this.props.onFormAddChanged({ key: "segundoApellido", value }) }}
            value={formAdd.segundoApellido}
            placeholder="Escribe el apellido materno"
          />
          <CustomDateInput
            label={"Fecha de nacimiento"}
            styleContent={styles.dateContainer}
            labelStyle={styles.labelStyle}
            onChangeText={(value) => { Platform.OS === 'ios' ? this.props.onFormAddChanged({ key: "fechaNacimiento", value: moment(value.date).format("YYYY-MM-DD[T]HH:mm:ss") }) : this.props.onFormAddChanged({ key: "fechaNacimiento", value: moment(value).format("YYYY-MM-DD[T]HH:mm:ss") }) }}
          />
          <InputQ
            label={"Teléfono"}
            onChangeText={(value) => { this.props.onFormAddChanged({ key: "telefono", value }) }}
            value={formAdd.telefono}
            placeholder="Escribe el teléfono"
            kType="numeric"
            maxLength={10}
          />
          <InputQ
            label="Dirección"
            onChangeText={this._onAddressChange.bind(this)}
            value={formAdd.calle}
            placeholder="Escribe la dirección"
          />
          <FlatList
            keyExtractor={(item, index) => `address-${index}`}
            data={formAdd.calle ? addressSuggests : []}
            extraData={true}
            renderItem={({ item }) => (
              <ListItem button style={styles.listItem} onPress={this._selectAddress.bind(this, item)}>
                <Left>
                  <Text style={styles.textItem}>
                    {item.formattedAddress}
                  </Text>
                </Left>
                <Right>
                  <Icon name="map-marker" type="FontAwesome5" style={styles.iconItem} />
                </Right>
              </ListItem>
            )}
          />
          <InputQ
            label={"Número exterior"}
            onChangeText={(value) => { this.props.onFormAddChanged({ key: "numExterior", value }) }}
            value={formAdd.numExterior}
            placeholder="Escribe el número exterior"
          />
          <InputQ
            label={"Número interior"}
            onChangeText={(value) => { this.props.onFormAddChanged({ key: "numInterior", value }) }}
            value={formAdd.numInterior}
            placeholder="Escribe el número exterior"
          />
          <InputQ
            label={"Colonia"}
            onChangeText={(value) => { this.props.onFormAddChanged({ key: "colonia", value }) }}
            value={formAdd.colonia}
            placeholder="Escribe la colonia"
          />
          <InputQ
            label={"Municipio"}
            onChangeText={(value) => { this.props.onFormAddChanged({ key: "municipio", value }) }}
            value={formAdd.municipio}
            placeholder="Escribe el municipio"
          />
          <InputQ
            label={"Estado"}
            onChangeText={(value) => { this.props.onFormAddChanged({ key: "estado", value }) }}
            value={formAdd.estado}
            placeholder="Escribe el estado"
          />
          <InputQ
            label={"Código postal"}
            onChangeText={(value) => { this.props.onFormAddChanged({ key: "codigoPostal", value }) }}
            value={formAdd.codigoPostal}
            placeholder="Escribe el código postal"
            kType="numeric"
            maxLength={5}
          />
          <InputQ
            label={"Entre calle"}
            onChangeText={(value) => { this.props.onFormAddChanged({ key: "entreCalle1", value }) }}
            value={formAdd.entreCalle1}
            placeholder="Escribe el nombre de la calle entra la que se encuentra"
          />
          <InputQ
            label={"Y entre calle"}
            onChangeText={(value) => { this.props.onFormAddChanged({ key: "entreCalle2", value }) }}
            value={formAdd.entreCalle2}
            placeholder="Escribe el nombre de la calle entra la que se encuentra"
          />
          <CustomPickerInput
            label="Tipo de domicilio"
            items={types}
            value={formAdd.tipoDomicilio}
            onChangeText={(value) => { this.props.onFormAddChanged({ key: "tipoDomicilio", value }) }}
          />
          <InputQ
            label={"Descripción del domicilio"}
            onChangeText={(value) => { this.props.onFormAddChanged({ key: "descripcionDomicilio", value }) }}
            value={formAdd.descripcionDomicilio}
            placeholder="Escribe la descripción del domicilio"
          />
          <CustomPickerInput
            label="Ocupación"
            items={occupationsItem}
            value={formAdd.ocupacionId}
            onChangeText={(value) => { this.props.onFormAddChanged({ key: "ocupacionId", value }) }}
          />
          <CustomPickerInput
            label="Estado Civil"
            items={maritalStatesItem}
            value={formAdd.estadoCivilId}
            onChangeText={(value) => { this.props.onFormAddChanged({ key: "estadoCivilId", value }) }}
          />
          <CustomPickerInput
            label="Estado de Nacimiento"
            items={statesItem}
            value={formAdd.estadoNacimientoId}
            onChangeText={(value) => { this.props.onFormAddChanged({ key: "estadoNacimientoId", value }) }}
          />
          <InputQ
            label={"Ingresos"}
            onChangeText={(value) => { this.props.onFormAddChanged({ key: "ingresos", value }) }}
            value={formAdd.ingresos}
            placeholder="Ingresos por mes"
            kType="numeric"
            maxLength={5}
          />
        </View>
      </HeaderQ >
    );
  }
}

const mapStateToProps = state => ({
  customer: state.customer
});

const mapDispatchToProps = {
  onAddressSuggestionChanged,
  onFormAddChanged,
  customerSave,
  getOcupacion,
  getEstadoCivil,
  getEstados
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAdd);
