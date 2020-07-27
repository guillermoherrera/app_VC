import {
  LOGIN_ERROR,
  USER_FETCHING,
  TOGGLE_FORM,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  CHANGE_INPUT_LOGIN,
  USER_FORM_RECOVERY_CHANGED,
  USER_ACTIVATE_FETCH,
  USER_VALIDATE_FETCH,
  USER_UPDATE_ADDRESS_FETCH,
} from "../types";
import { AsyncStorage } from "react-native";

import { constants, toast } from '../../assets';
import { request } from '../../config/service';
import navigation from "../../services/navigation";
import { ValidatorService } from "../../services/validator";

// methods allowed and paths to request
const { methods } = constants;
const { paths } = constants;


export const login = (data) => {
  return dispatch => {
    dispatch({ type: USER_FETCHING });
    return request(methods.POST, paths.login, data).then(async response => {
      console.log("Response",response)
      await AsyncStorage.setItem(constants.USER, JSON.stringify({ DistribuidorId: data.distribuidor, categoriaId: response.categoriaId }))
      await AsyncStorage.setItem(constants.TOKEN, response.token);
      if (response.direccionActualizada) {
        await AsyncStorage.setItem(constants.ADDRESS, 'true')
        navigation.navigate("Home");
      }
      else {
        toast.showToast('NECESITAS ACTUALIZAR TU DIRECCIÓN DE ENVÍO PARA PODER CONTINUAR', 3000, "danger");

        navigation.navigate("Address");
      }
      dispatch({ type: LOGIN_SUCCESS });
    }).catch(error => {
      dispatch({ type: LOGIN_ERROR });
      try {
        let JSONError = JSON.parse(error.message)
        toast.showToast(JSONError.resultDesc, 3000, "danger");
      }
      catch (e) {
        try{
          toast.showToast("resultDesc: "+error.message, 5000, "danger")
        }
        catch(er){
          toast.showToast("ERROR AL INICIAR SESIÓN\n\nPOR FAVOR REVISA TU CONEXIÓN A INTERNET O INTENTA DE NUEVO MÁS TARDE", 5000, "danger")
        }
      }
    });
  }
}

export const toggleForm = () => {
  return {
    type: TOGGLE_FORM,
  }
}

export const changeInput = (payload) => {
  return {
    type: CHANGE_INPUT_LOGIN,
    payload
  }
}

export const onFormRecoveryChanged = (payload) => ({
  type: USER_FORM_RECOVERY_CHANGED,
  payload
})

export const validateUser = (payload) => {
  return dispatch => {
    //Reglas para validación
    let rules = {
      usuario: 'required',
      codigo: 'required',
      telefono: 'required|numeric|digits:10',
    }
    //Nombre de los campos para mostrar en los errores
    let customAttributes = {
      usuario: 'número de la distribuidora',
      codigo: 'código',
      telefono: 'teléfono',
    }

    let validator = ValidatorService.validate(payload, rules, customAttributes)

    if (validator.fails) {
      let message = Object.values(validator.errors)[0][0]

      toast.showToast(message, 5000, 'warning')
    }    
    else {      
      dispatch({ type: USER_FETCHING });
      let data = { usuario: payload.usuario, codigo: payload.codigo, telefono: payload.telefono }
      console.log("Activate",data)
      request(methods.POST, paths.activate, data).then(async response => {
        console.log("ValidateUser", response)
        navigation.navigate("ChangePassword");
        dispatch({ type: USER_VALIDATE_FETCH, payload: response });
      }).catch(error => {
        console.log('Error', error.message)
        dispatch({ type: LOGIN_ERROR });
        try {
          let JSONError = JSON.parse(error.message)
          navigation.navigate('Error', { error: JSONError.resultDesc })
        }
        catch (e) {
          try{
            navigation.navigate('Error', { error: "resultDesc: " + error.message})
          }
          catch(er){
            navigation.navigate('Error', { error: "ERROR AL VALIDAR LA INFORMACIÓN\n\nPOR FAVOR REVISA TU CONEXIÓN A INTERNET O INTENTA DE NUEVO MÁS TARDE" })
          }          
        }
      });
    }
  }
}

export const changePassword = (payload, identificador) => {
  return (dispatch) => {
    //Reglas para validación
    let rules = {
      identificador: 'required',
      password: 'required',
      confirm_password: 'required|same:password',
    }
    //Nombre de los campos para mostrar en los errores
    let customAttributes = {
      identificador: 'código',
      password: 'contraseña',
      confirm_password: 'confirmar contraseña',
    }

    let validator = ValidatorService.validate(payload, rules, customAttributes)

    if (validator.fails) {
      let message = Object.values(validator.errors)[0][0]

      toast.showToast(message, 5000, 'warning')
    }
    else if (payload.identificador != identificador) {
      navigation.navigate('Error', { error: "CÓDIGO INCORRECTO" })
    }
    else {
      dispatch({ type: USER_FETCHING });
      return request(methods.POST, paths.change_password, payload).then(async response => {
        console.log("ChangePassword", response)
        await AsyncStorage.setItem(constants.USER, JSON.stringify({ DistribuidorId: payload.usuario, categoriaId: response.categoriaId }))
        await AsyncStorage.setItem(constants.TOKEN, response.token);
        navigation.navigate("Address");
        dispatch({ type: USER_ACTIVATE_FETCH });
      }).catch(error => {
        console.log("Error", error.message);
        dispatch({ type: LOGIN_ERROR });
        try {
          let JSONError = JSON.parse(error.message)
          navigation.navigate('Error', { error: JSONError.resultDesc })
        }
        catch (e) {
          try{
            navigation.navigate('Error', { error: "resultDesc: " + error.message})
          }
          catch(er){
            navigation.navigate('Error', { error: "ERROR AL CAMBIAR LA CONTRASEÑA\n\nPOR FAVOR REVISA TU CONEXIÓN A INTERNET O INTENTA DE NUEVO MÁS TARDE" })
          }
        }
      });
    }
  }
}

export const updateAddress = (payload) => {
  return async dispatch => {
    //Reglas para validación
    let rules = {
      codigoPostal: 'required|size:5',
      estado: 'required',
      municipio: 'required',
      colonia: 'required',
      calle: 'required',
      numExterior: 'required',
      entreCalle1: 'required',
      entreCalle2: 'required',
      tipoDomicilio: 'required',
      descripcionDomicilio: 'required',
      telefonoEnvio: 'required|size:10'
    }
    //Nombre de los campos para mostrar en los errores
    let customAttributes = {
      codigoPostal: 'codigo postal',
      estado: 'estado',
      municipio: 'municipio',
      colonia: 'colonia',
      calle: 'calle',
      numExterior: 'número exterior',
      entreCalle1: 'entre calle',
      entreCalle2: 'y entre calle',
      tipoDomicilio: 'tipo de domicilio',
      descripcionDomicilio: 'descripción del domicilio',
      telefonoEnvio: 'teléfono'
    }

    let validator = ValidatorService.validate(payload, rules, customAttributes)

    if (validator.fails) {
      console.log(validator.errors)
      let message = Object.values(validator.errors)[0][0]

      toast.showToast(message, 5000, 'warning')
    }
    else {
      dispatch({ type: USER_FETCHING });
      let user = JSON.parse(await AsyncStorage.getItem(constants.USER))
      let data = { ...payload, distribuidorId: user.DistribuidorId }
      return request(methods.POST, paths.update_address, data).then(async response => {
        console.log("UpdateAddress", response)
        await AsyncStorage.setItem(constants.ADDRESS, 'true')
        navigation.navigate("Success", { success: 'Se ha activado tu cuenta exitosamente, ahora puedes disfrutar de todos los beneficios de ValeConfia.'});        
        dispatch({ type: USER_UPDATE_ADDRESS_FETCH });
      }).catch(error => {
        console.log("Error", error.message);
        dispatch({ type: LOGIN_ERROR });
        try {
          let JSONError = JSON.parse(error.message)
          navigation.navigate('Error', { error: JSONError.resultDesc })
        }
        catch (e) {
          try{
            navigation.navigate('Error', { error: "resultDesc: " + error.message})
          }
          catch(er){
            navigation.navigate('Error', { error: "ERROR AL ACTUALIZAR LA DIRECCIÓN\n\nPOR FAVOR REVISA TU CONEXIÓN A INTERNET O INTENTA DE NUEVO MÁS TARDE" })
          }
        }
      });
    }
  }
}






