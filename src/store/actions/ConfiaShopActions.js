import { CONFIASHOP_CUSTOMER_INPUT_CHANGED, CONFIASHOP_ASSOCIATE_TICKET, CONFIASHOP_FETCHING, CONFIASHOP_FETCH_FAILED, CONFIASHOP_SET_TICKET, CONFIASHOP_ITEM_CHANGED, CONFIASHOP_CUSTOMER_SELECTED, CONFIASHOP_TOGGLE_PHONE_INPUT, CONFIASHOP_PHONE_INPUT_CHANGED, CONFIASHOP_CODE_CHANGED, CONFIASHOP_PAGE_CHANGED, CONFIASHOP_CODE_VALIDATE, CONFIASHOP_TOGGLE_MODAL, CONFIASHOP_DISMISS_ERROR, CONFIASHOP_ADDRESSES_FETCH, CONFIASHOP_ADDRESS_CHANGED, LOGIN_ERROR, USER_FETCHING, USER_UPDATE_ADDRESS_FETCH, CONFIASHOP_TICKET_FETCHING } from "../types";
import { constants, toast } from '../../assets';
import { request, getRequest, requestGeneric } from '../../config/service';
import { AsyncStorage, Alert } from "react-native";
import navigation from "../../services/navigation";
import { ValidatorService } from "../../services/validator";
// methods allowed and paths to request
const { methods } = constants;
const { paths } = constants;

const onConfiaShopCustomerInputChange = (payload) => {
  return (dispatch) => {
    let { data, filter, key } = payload
    if (!filter) {
      dispatch({ type: CONFIASHOP_CUSTOMER_INPUT_CHANGED, payload: { [key]: data } })
    }
    else {
      let filterData = data.filter(element => element.primerNombre.concat(element.primerApellido).toUpperCase().includes(filter.replace(/\s+/g, '').toUpperCase()));

      dispatch({ type: CONFIASHOP_CUSTOMER_INPUT_CHANGED, payload: { [key]: filterData.length ? filterData : [] } })
    }
  }
}

const associateTicket = (payload) => {
  return async dispatch => {
    dispatch({ type: CONFIASHOP_FETCHING })
    let user = JSON.parse(await AsyncStorage.getItem(constants.USER))
    console.log("Payload", payload)
    request(methods.POST, `${paths.credit_generate}${user.DistribuidorId}`, payload).then(response => {
      console.log("ConfiaShop", response)
      dispatch({ type: CONFIASHOP_ASSOCIATE_TICKET, payload: response.result })
      navigation.navigate('ValidateConfiaShopCode')
    }).catch(error => {
      try {
        let JSONError = JSON.parse(error.message)
        dispatch({ type: CONFIASHOP_FETCH_FAILED, payload: JSONError.resultDesc });
        navigation.navigate('ConfiaShopError', { error: JSONError.resultDesc })
      }
      catch (e) {
        dispatch({ type: CONFIASHOP_FETCH_FAILED, payload: error.message });
        navigation.navigate('ConfiaShopError', { error: error.message })
      }
    })
  }
}

const setTicket = (payload) => {
  console.log("setTicket_Action", "### ###")
  console.log("payload", payload)
  return async (dispatch) => {
    await AsyncStorage.setItem(constants.TICKET, payload)
    dispatch({ type: CONFIASHOP_SET_TICKET, payload })
    navigation.navigate('AddressSelection')
  }
}

const getAddresses = () => {
  return async dispatch => {
    dispatch({ type: CONFIASHOP_FETCHING });
    let user = JSON.parse(await AsyncStorage.getItem(constants.USER))
    let responseDos = [];
    getRequest(methods.GET, `${paths.get_addresses}${user.DistribuidorId}`).then(async response => {
      responseDos = response.data;
      if(responseDos.length > 0)responseDos[0] = {...responseDos[0], active: true}
      dispatch({ type: CONFIASHOP_ADDRESSES_FETCH, payload: responseDos })
    }).catch(error => {
      console.log("ERROR", error.message)
      toast.showToast(error.message, 5000, "danger")
    });
  }
}

const confiaShopTicketInfo = () => {
  return async dispatch => {
    dispatch({ type: CONFIASHOP_FETCHING });
    let _env = await AsyncStorage.getItem('env');
    let env_url = _env == "DEMO" ? 'servicios-dev' : 'servicios';
    let user = JSON.parse(await AsyncStorage.getItem(constants.USER));
    let ticketId = await AsyncStorage.getItem(constants.TICKET);
    let headers = {'Content-Type': 'application/json'};
    requestGeneric(methods.Get, `https://${env_url}.confiashop.com/api/ConfiaShop_Ticket_Info?id_empresa=1&tipo_usuario=1&id_usuario=${user.DistribuidorId}&estatus=CAPTURA&id_ticket=${ticketId}`, null, headers).then(async response => {
      var exclusiveDist = response[0].ticket_detalle.find(article => article.id_promocion == 14);
      if(exclusiveDist == null) exclusiveDist = response[0].ticket_detalle.find(article => article.dinele_utilizado > 0);
      dispatch({ type: CONFIASHOP_TICKET_FETCHING, payload: exclusiveDist != null });
    }).catch(error => {
      dispatch({ type: CONFIASHOP_FETCH_FAILED, payload: error.message });
      console.log('###Error confiaShopTicketInfo', `Error al consultar ticket de confiashop ${ticketId}\n (${error.message})`);
      //toast.showToast(`Error al consultar ticket de confiashop ${ticketId}\n (${error.message})`, 5000, "danger")
    });
  }
}

export const updateAddressCF = (payload) => {
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
        dispatch(getAddresses());
        navigation.goBack();
        //navigation.navigate("Success", { success: 'Se ha activado tu cuenta exitosamente, ahora puedes disfrutar de todos los beneficios de ValeConfia.'});        
        dispatch({ type: USER_UPDATE_ADDRESS_FETCH });
      }).catch(error => {
        console.log("Error", error.message);
        dispatch({ type: LOGIN_ERROR });
        try {
          let JSONError = JSON.parse(error.message)
          toast.showToast(JSONError.resultDesc, 5000, 'danger')
          //navigation.navigate('Error', { error: JSONError.resultDesc })
        }
        catch (e) {
          try{
            toast.showToast("resultDesc: "+error.message, 5000, "danger")
          }
          catch(er){
            toast.showToast("ERROR AL GUARDAR LA DIRECCIÓN\n\nPOR FAVOR REVISA TU CONEXIÓN A INTERNET O INTENTA DE NUEVO MÁS TARDE", 5000, "danger")
          }
          //navigation.navigate('Error', { error: "OCURRIÓ UN ERROR, POR FAVOR INTENTA MÁS TARDE" })
        }
      });
    }
  }
}

const onAddressChanged = (payload) => ({
  type: CONFIASHOP_ADDRESS_CHANGED,
  payload
})

const getTicket = () => {
  return async (dispatch) => {
    let ticketId = await AsyncStorage.getItem(constants.TICKET)
    
    if (ticketId) {
      Alert.alert('Confia', 'Tienes un folio de compra sin asignar, ¿Deseas continuar con el mismo folio?', [{ text: 'Sí', onPress: () => { dispatch(setTicket(ticketId));  } }, { text: 'No', onPress: () => dispatch(removeTicket()) }], { cancelable: false })
    }
  }
}

const onValueItemChanged = (payload) => ({
  type: CONFIASHOP_ITEM_CHANGED,
  payload
})

const onCustomerSelect = (payload) => ({
  type: CONFIASHOP_CUSTOMER_SELECTED,
  payload
})

const onConfiaShopToggleInput = (payload) => ({
  type: CONFIASHOP_TOGGLE_PHONE_INPUT,
  payload
})

const onConfiaShopPhoneChanged = (payload) => ({
  type: CONFIASHOP_PHONE_INPUT_CHANGED,
  payload
})

const onConfiaShopCodeChanged = (payload) => ({
  type: CONFIASHOP_CODE_CHANGED,
  payload
})

const onConfiaShopPageChanged = (payload) => ({
  type: CONFIASHOP_PAGE_CHANGED,
  payload
})

const removeTicket = () => {
  return async dispatch => {
    await AsyncStorage.removeItem('ticketId')
    dispatch({ type: CONFIASHOP_PAGE_CHANGED, payload: 0 })
  }
}

const onConfiaShopModalConfirm = (payload) => ({
  type: CONFIASHOP_TOGGLE_MODAL,
  payload
})

const onConfiaShopValidateCode = (codigo, creditoId, transaccionId) => {
  return async dispatch => {
    if (codigo && codigo.length == 8) {
      dispatch({ type: CONFIASHOP_FETCHING })
      let user = JSON.parse(await AsyncStorage.getItem(constants.USER))
      let payload = { creditoId, codigo, transaccionId, distribuidorId: user.DistribuidorId }
      console.log("ValidateData", payload)
      request(methods.POST, paths.code_validate, payload).then(async response => {
        console.log("CodeValidate", response.resultDesc.split('|')[1]);
        dispatch(removeTicket());
        dispatch({ type: CONFIASHOP_CODE_VALIDATE, payload: response.resultDesc.split('|')[1] })
        navigation.reset('SuccessConfiaShop', { success: response.resultDesc.split('|')[1] })
      }).catch(error => {
        console.log("Error", error.message)
        try {
          let JSONError = JSON.parse(error.message)
          dispatch({ type: CONFIASHOP_FETCH_FAILED, payload: JSONError.resultDesc });
          navigation.navigate('ConfiaShopError', { error: JSONError.resultDesc })
        }
        catch (e) {
          dispatch({ type: CONFIASHOP_FETCH_FAILED, payload: error.message });
          navigation.navigate('ConfiaShopError', { error: error.message })
        }
      })
    }
    else {
      toast.showToast("Ingresa un código valido", 5000, "danger")
    }
  }
}

const dismissError = () => ({
  type: CONFIASHOP_DISMISS_ERROR,
})

export {
  onConfiaShopCustomerInputChange,
  associateTicket,
  setTicket,
  getTicket,
  onValueItemChanged,
  onCustomerSelect,
  onConfiaShopToggleInput,
  onConfiaShopPhoneChanged,
  onConfiaShopCodeChanged,
  onConfiaShopPageChanged,
  removeTicket,
  onConfiaShopValidateCode,
  onConfiaShopModalConfirm,
  dismissError,
  getAddresses,
  onAddressChanged,
  confiaShopTicketInfo,
}
