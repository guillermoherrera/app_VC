import { VALE_CUSTOMER_DETAILS_FETCH, VALE_FETCHING, VALE_FETCH_FAILED, VALE_TRANSACTION_TYPES_FETCH, VALE_TRANSACTION_TYPE_CHANGED, VALE_CHANGED, VALE_REASONS_FETCH, VALE_REASON_CHANGED, VALE_GENERATE_FETCH, VALE_CUSTOMER_FILTER, VALE_CODE_CHANGED, VALE_VALIDATE_CODE_FETCH, VALE_VALES_DEADLINES, VALE_AMOUNT_INCREASES, VALE_AMOUNT_DECREASES, VALE_AMOUNT_RESET, VALE_TOGGLE_MODAL_CONFIRMATION, VALE_DISMISS_MODAL, VALE_TOGGLE_PHONE_INPUT, VALE_CONFIRMATION_SUBMIT, VALE_PHONE_INPUT_CHANGED, VALE_OUTSTANDING_CREDIT } from "../types";
import { constants, toast } from "../../assets";
import { AsyncStorage } from "react-native";
import { getRequest, request } from "../../config/service";
import navigation from "../../services/navigation";
let { methods, paths } = constants


const getCustomerDetails = (payload) => {
  return async dispatch => {
    dispatch({ type: VALE_FETCHING })
    let user = JSON.parse(await AsyncStorage.getItem(constants.USER))
    getRequest(methods.GET, `${paths.customer_details}${user.DistribuidorId}/${payload}`).then(async response => {
      console.log("CreditoPendiente", response)
      if (response.data.creditoPendiente.length) {
        dispatch({ type: VALE_OUTSTANDING_CREDIT, payload: response.data })
      }
      else {
        dispatch({ type: VALE_CUSTOMER_DETAILS_FETCH, payload: response.data });
      }
    }).catch(error => {
      console.log("Error", error)
      navigation.goBack();
      dispatch({ type: VALE_FETCH_FAILED });
      try {
        let JSONError = JSON.parse(error.message)
        toast.showToast(JSONError.resultDesc, 3000, "danger");
      }
      catch (e) {
        try{
          toast.showToast("resultDesc: "+error.message, 5000, "danger")
        }
        catch(er){
          toast.showToast("ERROR AL OBTENER DETALLE\n\nPOR FAVOR REVISA TU CONEXIÓN A INTERNET O INTENTA DE NUEVO MÁS TARDE", 5000, "danger")
        }
      }
    });
  }
}

const getTransactionTypes = (clienteId) => {
  return async dispatch => {
    dispatch({ type: VALE_FETCHING })
    let user = JSON.parse(await AsyncStorage.getItem(constants.USER))
    getRequest(methods.GET, `${paths.transaction_types}${user.DistribuidorId}/${clienteId}`).then(async response => {
      console.log("TransactionTypes", response)
      dispatch({ type: VALE_TRANSACTION_TYPES_FETCH, payload: response.data });
    }).catch(error => {
      dispatch({ type: VALE_FETCH_FAILED, payload: error.message });
      try {
        let JSONError = JSON.parse(error.message)
        toast.showToast(JSONError.resultDesc, 3000, "danger");
      }
      catch (e) {
        try{
          toast.showToast("resultDesc: "+error.message, 5000, "danger")
        }
        catch(er){
          toast.showToast("ERROR AL OBTENER INFORMACIÓN\n\nPOR FAVOR REVISA TU CONEXIÓN A INTERNET O INTENTA DE NUEVO MÁS TARDE", 5000, "danger")
        }
      }
    });
  }
}

const onTransactionChanged = (payload) => ({
  type: VALE_TRANSACTION_TYPE_CHANGED,
  payload
})

const onValeFilterChanged = (payload) => {
  return dispatch => {
    let { data, filter } = payload
    if (!filter) {
      dispatch({ type: VALE_CUSTOMER_FILTER, payload: data })
    }
    else {
      let filterData = data.filter(element => element.primerNombre.concat(element.primerApellido).toUpperCase().includes(filter.replace(/\s+/g, '').toUpperCase()));

      dispatch({ type: VALE_CUSTOMER_FILTER, payload: filterData.length ? filterData : [] })
    }
  }
}

const onValeChanged = (payload) => ({
  type: VALE_CHANGED,
  payload
})

const getReasons = () => {
  return async dispatch => {
    dispatch({ type: VALE_FETCHING })
    let user = JSON.parse(await AsyncStorage.getItem(constants.USER))
    getRequest(methods.GET, `${paths.reasons}${user.DistribuidorId}`).then(async response => {
      console.log("Reasons", response)
      dispatch({ type: VALE_REASONS_FETCH, payload: response.data });
    }).catch(error => {
      dispatch({ type: VALE_FETCH_FAILED, payload: error.message });
      try {
        let JSONError = JSON.parse(error.message)
        toast.showToast(JSONError.resultDesc, 3000, "danger");
      }
      catch (e) {
        try{
          toast.showToast("resultDesc: "+error.message, 5000, "danger")
        }
        catch(er){
          toast.showToast("ERROR AL OBTENER MOTIVOS\n\nPOR FAVOR REVISA TU CONEXIÓN A INTERNET O INTENTA DE NUEVO MÁS TARDE", 3000, "danger");
        }
      }
    });
  }
}

const onReasonChanged = (payload) => ({
  type: VALE_REASON_CHANGED,
  payload
})

const getValesDeadlines = (clienteId, desembolsoId) => {
  return async dispatch => {
    dispatch({ type: VALE_FETCHING })
    let user = JSON.parse(await AsyncStorage.getItem(constants.USER))
    getRequest(methods.GET, `${paths.vale_calculate}${user.DistribuidorId}/${clienteId}/${desembolsoId}`).then(async response => {
      dispatch({ type: VALE_VALES_DEADLINES, payload: response.data });
    }).catch(error => {
      dispatch({ type: VALE_VALES_DEADLINES, payload: [{
        plazo: "0",
        tipoPlazos: [{
          tipoPlazoId: "Q",
          importes: [{
            importe: 0,
            importePagoPlazo: 0
          }],
        }],
        active: true
      }] });
      dispatch({ type: VALE_FETCH_FAILED, payload: error.message });
      try {
        let JSONError = JSON.parse(error.message)
        toast.showToast(JSONError.resultDesc, 3000, "danger");
      }
      catch (e) {
        try{
          toast.showToast("resultDesc: "+error.message, 5000, "danger")
        }
        catch(er){
          toast.showToast("ERROR AL OBTENER INFORMACIÓN\n\nPOR FAVOR REVISA TU CONEXIÓN A INTERNET O INTENTA DE NUEVO MÁS TARDE", 3000, "danger");
        }        
      }
    });
  }
}

const onAmountIncreases = (payload) => ({
  type: VALE_AMOUNT_INCREASES,
  payload
})

const onAmountDecreases = (payload) => ({
  type: VALE_AMOUNT_DECREASES,
  payload
})

const onAmountReset = (payload) => ({
  type: VALE_AMOUNT_RESET,
  payload
})

const saveVale = (payload) => {
  return async dispatch => {
    dispatch({ type: VALE_FETCHING })
    let user = JSON.parse(await AsyncStorage.getItem(constants.USER))
    let data = { ...payload, distribuidorId: user.DistribuidorId }
    console.log("Data", data)
    request(methods.POST, `${paths.credit_generate}`, data).then(async response => {
      console.log("SaveVale", response)
      dispatch({ type: VALE_GENERATE_FETCH, payload: response.result })
      navigation.navigate('ValidateCode')
    }).catch(error => {
      try {
        let JSONError = JSON.parse(error.message)
        dispatch({ type: VALE_FETCH_FAILED, payload: JSONError.resultDesc });
        navigation.navigate('Error', { error: JSONError.resultDesc })
      }
      catch (e) {
        dispatch({ type: VALE_FETCH_FAILED, payload: error.message });
        navigation.navigate('Error', { error: error.message })
      }
    })
  }
}

const onCodeChanged = (payload) => ({
  type: VALE_CODE_CHANGED,
  payload
})

const onValidateCode = (codigo, creditoId, transaccionId) => {
  return async dispatch => {
    if (codigo && codigo.length == 8) {
      dispatch({ type: VALE_FETCHING })
      let user = JSON.parse(await AsyncStorage.getItem(constants.USER))
      let payload = { creditoId, codigo, transaccionId, distribuidorId: user.DistribuidorId }
      console.log("ValidateData", payload)
      request(methods.POST, paths.code_validate, payload).then(async response => {
        console.log("CodeValidate", response);
        dispatch({ type: VALE_VALIDATE_CODE_FETCH, payload: response.resultDesc.split('|')[1] })
        navigation.reset('Success', { success: response.resultDesc.split('|')[1] })
      }).catch(error => {
        try {
          let JSONError = JSON.parse(error.message)
          dispatch({ type: VALE_FETCH_FAILED, payload: JSONError.resultDesc });
          navigation.navigate('Error', { error: JSONError.resultDesc })
        }
        catch (e) {
          dispatch({ type: VALE_FETCH_FAILED, payload: error.message });
          navigation.navigate('Error', { error: error.message })
        }
      })
    }
    else {
      setTimeout(() => toast.showToast("Ingresa un código valido", 5000, "danger"), 100)
    }
  }
}

const onToggleConfirmation = (payload) => ({
  type: VALE_TOGGLE_MODAL_CONFIRMATION,
  payload
})

const onConfirmationSubmit = (payload) => {
  return dispatch => {
    dispatch({ type: VALE_CONFIRMATION_SUBMIT, payload })
    navigation.navigate('ValidateCode')
  }
}

const onTogglePhoneInput = (payload) => ({
  type: VALE_TOGGLE_PHONE_INPUT,
  payload
})

const onPhoneInputChanges = (payload) => {
  return dispatch => {
    const regExp = new RegExp('^[0-9]+$')
    if (regExp.test(payload) && payload.length <= 10)
      dispatch({ type: VALE_PHONE_INPUT_CHANGED, payload: { isValid: true, value: payload } })
    else
      dispatch({ type: VALE_PHONE_INPUT_CHANGED, payload: false })
  }
}


export {
  getCustomerDetails,
  getTransactionTypes,
  onTransactionChanged,
  onValeChanged,
  getReasons,
  onReasonChanged,
  saveVale,
  onValeFilterChanged,
  onCodeChanged,
  onValidateCode,
  getValesDeadlines,
  onAmountIncreases,
  onAmountDecreases,
  onAmountReset,
  onToggleConfirmation,
  onConfirmationSubmit,
  onTogglePhoneInput,
  onPhoneInputChanges
}

