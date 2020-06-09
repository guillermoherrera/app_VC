import { getRequest, request } from "../../config/service"
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
  LOAN_VALE_CANCEL
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
        setTimeout(() => toast.showToast("OCURRIÓ UN ERROR, POR FAVOR INTENTA MÁS TARDE", 5000, "danger"), 100)
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
        setTimeout(() => toast.showToast("OCURRIÓ UN ERROR, POR FAVOR INTENTA MÁS TARDE", 5000, "danger"), 100)
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
        dispatch({ type: LOAN_CREDIT_DETAILS_FETCH, payload: response.datos })
      }).catch(error => {
        dispatch({ type: LOAN_FETCH_FAILED, payload: error.message });
        navigation.goBack();
        try {
          let JSONError = JSON.parse(error.message)
          setTimeout(() => toast.showToast(JSONError.resultDesc, 5000, "danger"), 1000)
        }
        catch (e) {
          setTimeout(() => toast.showToast("OCURRIÓ UN ERROR, POR FAVOR INTENTA MÁS TARDE", 5000, "danger"), 1000)
        }

      })
    }
    else
      dispatch({ type: LOAN_SET_FOLIO_DIGITAL, payload: credit })
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
          setTimeout(() => toast.showToast("OCURRIÓ UN ERROR, POR FAVOR INTENTA MÁS TARDE", 5000, "danger"), 100)
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
        setTimeout(() => toast.showToast("OCURRIÓ UN ERROR, POR FAVOR INTENTA MÁS TARDE", 5000, "danger"), 100)
      }
    })
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
  onCancelVale
}