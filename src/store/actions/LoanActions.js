import { getRequest, request, getConfiaShopRequest } from "../../config/service"
import { AsyncStorage } from "react-native"
import { constants, toast } from "../../assets"
import {
  LOAN_LOANS_FETCH,
  LOAN_FETCH_FAILED,
  LOAN_FETCHING,
  LOAN_CHANGED_TAB,
  LOAN_TOGGLE_FILTER,
  LOAN_FILTER_CHANGED,
  LOAN_ORDER_CHANGED,
  LOAN_STATUS_CHANGED,
  LOAN_DATE_CHANGED,
  LOAN_VALES_FETCH,
  LOAN_CREDIT_DETAILS_FETCH,
  LOAN_CONFIASHOP_FETCH,
  LOAN_VALE_TYPE_CHANGED,
  LOAN_SET_FOLIO_DIGITAL,
  LOAN_VALE_CANCEL,
  DELIVERY_FETCHING,
  LOAN_ARTICLE_DETAILS_FETCH,
} from "../types"
import moment from "moment"
import navigation from "../../services/navigation"

let { methods, paths } = constants

const getVales = (path) => {
  return async dispatch => {
    console.log("Vales", path)
    dispatch({ type: LOAN_FETCHING, payload: { key: 'loadingVales' } })
    let user = JSON.parse(await AsyncStorage.getItem(constants.USER))
    getRequest(methods.GET, `${paths.credits}${user.DistribuidorId}/${path || '2/1/2'}`).then(response => {
      dispatch({ type: LOAN_VALES_FETCH, payload: response.result })
    }).catch(error => {
      dispatch({ type: LOAN_FETCH_FAILED, payload: error.message })
      try {
        let JSONError = JSON.parse(error.message)
        setTimeout(() => toast.showToast(JSONError.resultDesc, 5000, "danger"), 100)
      }
      catch (e) {
        try{
          setTimeout(() => toast.showToast("resultDesc: "+error.message, 5000, "danger"), 1000)
        }
        catch(er){
          setTimeout(() => toast.showToast("ERROR AL OBTENER VALES\n\nPOR FAVOR REVISA TU CONEXIÓN A INTERNET O INTENTA DE NUEVO MÁS TARDE", 5000, "danger"), 1000)
        }
      }
    })
  }
}

const getConfiaShopCredits = () => {
  return async dispatch => {
    dispatch({ type: LOAN_FETCHING, payload: { key: 'loadingConfiaShop' } })
    let user = JSON.parse(await AsyncStorage.getItem(constants.USER))
    getRequest(methods.GET, `${paths.credits}${user.DistribuidorId}/1/1/4`).then(response => {
      dispatch({ type: LOAN_CONFIASHOP_FETCH, payload: response.result })
    }).catch(error => {
      dispatch({ type: LOAN_FETCH_FAILED, payload: error.message })
      try {
        let JSONError = JSON.parse(error.message)
        setTimeout(() => toast.showToast(JSONError.resultDesc, 5000, "danger"), 100)
      }
      catch (e) {
        try{
          setTimeout(() => toast.showToast("resultDesc: "+error.message, 5000, "danger"), 1000)
        }
        catch(er){
          setTimeout(() => toast.showToast("ERROR AL OBTENER CREDITOS CONFIASHOP\n\nPOR FAVOR REVISA TU CONEXIÓN A INTERNET O INTENTA DE NUEVO MÁS TARDE", 5000, "danger"), 1000)
        }
      }
    })
  }
}

const getLoans = () => {
  return async dispatch => {
    dispatch({ type: LOAN_FETCHING, payload: { key: 'loadingLoans' } })
    let user = JSON.parse(await AsyncStorage.getItem(constants.USER))
    getRequest(methods.GET, `${paths.credits}${user.DistribuidorId}/2/1/1`).then(response => {
      dispatch({ type: LOAN_LOANS_FETCH, payload: response.result })
    }).catch(error => {
      dispatch({ type: LOAN_FETCH_FAILED, payload: error.message })
    })
  }
}

const getDetailsCredit = (credit) => {
  return async dispatch => {
    dispatch({ type: LOAN_FETCHING })
    console.log("ValeCredit", credit)
    if (typeof credit === 'number') {
      let user = JSON.parse(await AsyncStorage.getItem(constants.USER))
      getRequest(methods.GET, `${paths.credit_details}${user.DistribuidorId}/${credit}`).then(response => {
        console.log("Credit", response)
        if(response.datos.detalleVenta.length > 0){
          let idTicket = response.datos.detalleVenta[0].idTicket;
          let sku = response.datos.detalleVenta[0].idSku;
          dispatch(getDetailsArticle(idTicket, sku));
        }
        dispatch({ type: LOAN_CREDIT_DETAILS_FETCH, payload: response.datos })
      }).catch(error => {
        dispatch({ type: LOAN_FETCH_FAILED, payload: error.message });
        navigation.goBack();
        try {
          let JSONError = JSON.parse(error.message)
          setTimeout(() => toast.showToast(JSONError.resultDesc, 5000, "danger"), 1000)
        }
        catch (e) {
          try{
            setTimeout(() => toast.showToast("resultDesc: "+error.message, 5000, "danger"), 1000)
          }
          catch(er){
            setTimeout(() => toast.showToast("ERROR AL OBTENER DETALLE\n\nPOR FAVOR REVISA TU CONEXIÓN A INTERNET O INTENTA DE NUEVO MÁS TARDE", 5000, "danger"), 1000)
          }
        }

      })
    }
    else
      dispatch({ type: LOAN_SET_FOLIO_DIGITAL, payload: credit })
  }
}

const getDetailsArticle = (idTicket, sku) => {
  return async dispatch => {
    dispatch({ type: LOAN_ARTICLE_DETAILS_FETCH, payload: {talla: null} })
    let user = JSON.parse(await AsyncStorage.getItem(constants.USER));
    let status = 'OPERADO';
    let ticketDetalle;
    getConfiaShopRequest(methods.GET, `${paths.confiaShop_Ticket_Info}?id_empresa=1&tipo_usuario=1&id_usuario=${user.DistribuidorId}&estatus=${status}&id_ticket=${idTicket}`).then(response => {
      if(response.length > 0){
        ticketDetalle = response[0].ticket_detalle;
        try{
          let talla = ticketDetalle.find(articulo => articulo.id_sku == sku).talla;
          console.log('TALLA', talla)
          dispatch({ type: LOAN_ARTICLE_DETAILS_FETCH, payload: {talla: talla} })
        }catch(e){
          console.log("### ERROR ConfiaShop_Ticket_Info OPERADO", e)
          dispatch({ type: LOAN_ARTICLE_DETAILS_FETCH, payload: {talla: null} })
        }
      }else{
        status = 'CAPTURA';
        getConfiaShopRequest(methods.GET, `${paths.confiaShop_Ticket_Info}?id_empresa=1&tipo_usuario=1&id_usuario=${user.DistribuidorId}&estatus=${status}&id_ticket=${idTicket}`).then(response => {
          ticketDetalle = response[0].ticket_detalle;
          try{
            let talla = ticketDetalle.find(articulo => articulo.id_sku == sku).talla;
            console.log('TALLA', talla)
            dispatch({ type: LOAN_ARTICLE_DETAILS_FETCH, payload: {talla: talla} })
          }catch(e){
            console.log("### ERROR ConfiaShop_Ticket_Info OPERADO", e)
          }
        }).catch(error => {
          console.log("### ERROR ConfiaShop_Ticket_Info CAPTURA", error)
        })
      }
    }).catch(error => {
      console.log("### ERROR ConfiaShop_Ticket_Info OPERADO", error)
    })
  }
}

const onChangeTab = (payload) => ({
  type: LOAN_CHANGED_TAB,
  payload
})

const onToggleFilter = (payload) => ({
  type: LOAN_TOGGLE_FILTER,
  payload
})

const onFilterChanged = (payload) => {
  return (dispatch) => {
    let { data, filter, key } = payload
    if (!filter) {
      dispatch({ type: LOAN_FILTER_CHANGED, payload: { [key]: data } })
    }
    else {
      let filterData = data.filter(element => element.nombreCliente.replace(/\s+/g, '').toUpperCase().includes(filter.replace(/\s+/g, '').toUpperCase()));
      dispatch({ type: LOAN_FILTER_CHANGED, payload: { [key]: filterData.length ? filterData : [] } })
    }
  }
}

const onOrderByChanged = (payload) => {
  return (dispatch) => {
    let { data, value } = payload
    let array = [...data.data];
    let result = array.sort((a, b) => {
      a = a.nombreCliente.toUpperCase()
      b = b.nombreCliente.toUpperCase()

      let comparison = 0;
      if (a > b) {
        comparison = value === 'asc' ? 1 : -1;
      } else if (a < b) {
        comparison = value === 'asc' ? -1 : 1;
      }
      return comparison;
    })
    dispatch({ type: LOAN_ORDER_CHANGED, payload: { ...payload, data: { key: data.key, data: result } } })
  }
}

const onStatusChanged = (payload) => {
  return (dispatch) => {
    let { data, object, index, value } = payload
    let array = [...data.data]
    let objectUpdated = [...object.statuses.slice(0, index), { ...object.statuses[index], checked: value }, ...object.statuses.slice(index + 1)]
    let result = []
    objectUpdated.map(status => {
      if (status.checked) {
        result = [...result, ...array.filter(element => element.status == status.name)]
      }
    })

    dispatch({ type: LOAN_STATUS_CHANGED, payload: { ...payload, result: { key: [payload.data.key], data: !result.length ? data.data : result } } })
  }
}

const onDateChanged = (payload) => {
  return (dispatch) => {
    let { data, object, date, value } = payload
    let array = [...data.data]
    let objectUpdated = { ...object, [date]: value.date }
    let result = array.filter(element => moment(element.fechaCredito).isBetween(moment(objectUpdated.dateFrom), moment(objectUpdated.dateTo)))

    dispatch({ type: LOAN_DATE_CHANGED, payload: { ...payload, result: { key: [payload.data.key], data: !result.length ? data.data : result } } })
  }
}

const onValeTypeChanged = (payload) => {
  return async dispatch => {
    let { object, value } = payload
    if (value) {
      dispatch({ type: LOAN_FETCHING, payload: { key: 'loadingVales' } })
      let valeSelected = object.valeSelector.find(vale => vale.value == value)
      let user = JSON.parse(await AsyncStorage.getItem(constants.USER))
      getRequest(methods.GET, `${paths.credits}${user.DistribuidorId}/${valeSelected.path}`).then(response => {
        dispatch({ type: LOAN_VALE_TYPE_CHANGED, payload })
        dispatch({ type: LOAN_VALES_FETCH, payload: response.result })
      }).catch(error => {
        dispatch({ type: LOAN_FETCH_FAILED, payload: error.message })
        try {
          let JSONError = JSON.parse(error.message)
          setTimeout(() => toast.showToast(JSONError.resultDesc, 5000, "danger"), 100)
        }
        catch (e) {
          try{
            setTimeout(() => toast.showToast("resultDesc: "+error.message, 5000, "danger"), 1000)
          }
          catch(er){
            setTimeout(() => toast.showToast("ERROR AL OBTENER INFORMACIÓN\n\nPOR FAVOR REVISA TU CONEXIÓN A INTERNET O INTENTA DE NUEVO MÁS TARDE", 5000, "danger"), 1000)
          }
        }
      })
    }
  }
}

const onCancelVale = (payload) => {
  return async dispatch => {
    dispatch({ type: LOAN_FETCHING })
    let user = JSON.parse(await AsyncStorage.getItem(constants.USER))
    let data = { distribuidorId: user.DistribuidorId, valeId: payload.valeId }
    request(methods.POST, paths.cancel_vale, data).then(response => {
      dispatch({ type: LOAN_VALE_CANCEL, payload })
      navigation.goBack();
      toast.showToast("EL FOLIO DIGITAL HA SIDO CANCELADO", 5000, 'success')
    }).catch(error => {
      dispatch({ type: LOAN_FETCH_FAILED, payload: error.message })
      try {
        let JSONError = JSON.parse(error.message)
        setTimeout(() => toast.showToast(JSONError.resultDesc, 5000, "danger"), 100)
      }
      catch (e) {
        try{
          setTimeout(() => toast.showToast("resultDesc: "+error.message, 5000, "danger"), 1000)
        }
        catch(er){
          setTimeout(() => toast.showToast("ERROR AL CANCELAR VALE\n\nPOR FAVOR REVISA TU CONEXIÓN A INTERNET O INTENTA DE NUEVO MÁS TARDE", 5000, "danger"), 1000)
        }
      }
    })
  }
}

const getDeliveryInfo = () => {
  return async dispatch => {
    dispatch({ type: LOAN_FETCHING });
    let response = {paso: 0, estadoActual:"EN PREPARACIÓN"}
    setTimeout(function(){dispatch({ type: DELIVERY_FETCHING, payload: response})}, 1000)
    //dispatch({ type: DELIVERY_FETCHING, payload: response});
  }
}

export {
  onChangeTab,
  onToggleFilter,
  onFilterChanged,
  onOrderByChanged,
  onStatusChanged,
  onDateChanged,
  getVales,
  getLoans,
  getDetailsCredit,
  getConfiaShopCredits,
  onValeTypeChanged,
  onCancelVale,
  getDeliveryInfo
}