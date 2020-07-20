import { CONFIASHOP_CUSTOMER_INPUT_CHANGED, CONFIASHOP_ASSOCIATE_TICKET, CONFIASHOP_FETCHING, CONFIASHOP_FETCH_FAILED, CONFIASHOP_SET_TICKET, CONFIASHOP_ITEM_CHANGED, CONFIASHOP_CUSTOMER_SELECTED, CONFIASHOP_TOGGLE_PHONE_INPUT, CONFIASHOP_PHONE_INPUT_CHANGED, CONFIASHOP_CODE_CHANGED, CONFIASHOP_PAGE_CHANGED, CONFIASHOP_CODE_VALIDATE, CONFIASHOP_TOGGLE_MODAL, CONFIASHOP_DISMISS_ERROR, CONFIASHOP_ADDRESSES_FETCH } from "../types";
import { constants, toast } from '../../assets';
import { request } from '../../config/service';
import { AsyncStorage, Alert } from "react-native";
import navigation from "../../services/navigation";
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
    let response = [{direccion: "1"}, {direccion: "2"}, {direccion: "3"}, {direccion: "4"}];
    dispatch({ type: CONFIASHOP_ADDRESSES_FETCH, payload: response });
    //setTimeout(function(){dispatch({ type: CONFIASHOP_ADDRESSES_FETCH, payload: response })}, 5000);
  }
}

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
  getAddresses
}
