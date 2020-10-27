import { AsyncStorage } from 'react-native';
import { CUSTOMER_FETCHING, CUSTOMER_BANK_DATA_FETCH, CUSTOMER_FETCH_FAILED, CUSTOMER_CUSTOMERS_FETCH, CUSTOMER_TOGGLE_FILTER, CUSTOMER_FILTER_CHANGED, CUSTOMER_ORDER_CHANGED, CUSTOMER_STATUS_CHANGED, CUSTOMER_BLOCKED, CUSTOMER_ADDRESS_SUGGESTIONS, CUSTOMER_FORM_ADD_CHANGED, CUSTOMER_ADD_FETCH, VALE_OCCUPATIONS_FETCH, VALE_MARITAL_STATE_FETCH, VALE_STATES_FETCH } from "../types";
import { constants, toast } from '../../assets';
import { getRequest, request } from '../../config/service';
import { ValidatorService } from '../../services/validator';
import navigation from '../../services/navigation';
// methods allowed and paths to request
const { methods } = constants;
const { paths } = constants;

const getCustomersWithBankData = () => {
  return async dispatch => {
    dispatch({ type: CUSTOMER_FETCHING })
    let user = JSON.parse(await AsyncStorage.getItem(constants.USER))
    getRequest(methods.GET, `${paths.clientsBankData}${user.DistribuidorId}`).then(response => {      
      dispatch({ type: CUSTOMER_BANK_DATA_FETCH, payload: response.data })
    }).catch(error => {
      dispatch({ type: CUSTOMER_FETCH_FAILED, payload: error.message })
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

const getCustomers = () => {
  return async dispatch => {
    dispatch({ type: CUSTOMER_FETCHING })
    let user = JSON.parse(await AsyncStorage.getItem(constants.USER))
    getRequest(methods.GET, `${paths.customers}${user.DistribuidorId}/1`).then(response => {      
      dispatch({ type: CUSTOMER_CUSTOMERS_FETCH, payload: response.data })
    }).catch(error => {
      dispatch({ type: CUSTOMER_FETCH_FAILED, payload: error.message })
      try {
        let JSONError = JSON.parse(error.message)
        setTimeout(() => toast.showToast(JSONError.resultDesc, 5000, "danger"), 100)
      }
      catch (e) {
        try{
          setTimeout(() => toast.showToast("resultDesc: "+error.message, 5000, "danger"), 1000)
        }
        catch(er){
          setTimeout(() => toast.showToast("ERROR AL OBTENER LOS CLIENTES\n\nPOR FAVOR REVISA TU CONEXIÓN A INTERNET O INTENTA DE NUEVO MÁS TARDE", 5000, "danger"), 1000)
        }
      }
    })
  }
}

const onCustomerToggleFilter = (payload) => ({
  type: CUSTOMER_TOGGLE_FILTER,
  payload
})

const onCustomersFilterChanged = (payload) => {
  return (dispatch) => {
    let { data, filter, key } = payload
    if (!filter) {
      dispatch({ type: CUSTOMER_FILTER_CHANGED, payload: { [key]: data } })
    }
    else {
      let filterData = data.filter(element => element.primerNombre.concat(element.primerApellido).toUpperCase().includes(filter.replace(/\s+/g, '').toUpperCase()));

      dispatch({ type: CUSTOMER_FILTER_CHANGED, payload: { [key]: filterData.length ? filterData : [] } })
    }
  }
}

const onCustomersOrderByChanged = (payload) => {
  return (dispatch) => {
    let { data, value } = payload
    let array = [...data.data];
    let result = array.sort((a, b) => {
      a = a.primerNombre.toUpperCase()
      b = b.primerNombre.toUpperCase()

      let comparison = 0;
      if (a > b) {
        comparison = value === 'asc' ? 1 : -1;
      } else if (a < b) {
        comparison = value === 'asc' ? -1 : 1;
      }
      return comparison;
    })
    dispatch({ type: CUSTOMER_ORDER_CHANGED, payload: { ...payload, data: { key: data.key, data: result } } })
  }
}

const onCustomersStatusChanged = (payload) => {
  return (dispatch) => {
    let { data, object, index, value } = payload
    let array = [...data.data]
    let objectUpdated = [...object.statuses.slice(0, index), { ...object.statuses[index], checked: value }, ...object.statuses.slice(index + 1)]
    let result = []
    objectUpdated.map(status => {
      if (status.checked) {
        result = [...result, ...array.filter(element => element.estatusDesc == status.name)]
      }
    })

    dispatch({ type: CUSTOMER_STATUS_CHANGED, payload: { ...payload, result: { key: [payload.data.key], data: !result.length ? data.data : result } } })
  }
}

const blockCustomer = (clienteId) => {
  return async (dispatch) => {
    dispatch({ type: CUSTOMER_FETCHING })
    let user = JSON.parse(await AsyncStorage.getItem(constants.USER))
    getRequest(methods.GET, `${paths.customer_block}/${user.DistribuidorId}/1/${clienteId}`).then(response => {      
      dispatch({ type: CUSTOMER_BLOCKED })
      toast.showToast('El cliente se ha mandado a buro interno', 5000, "success")
    }).catch(error => {
      dispatch({ type: CUSTOMER_FETCH_FAILED, payload: error.message })
      try {
        let JSONError = JSON.parse(error.message)
        setTimeout(() => toast.showToast(JSONError.resultDesc, 5000, "danger"), 100)
      }
      catch (e) {
        try{
          setTimeout(() => toast.showToast("resultDesc: "+error.message, 5000, "danger"), 1000)
        }
        catch(er){
          setTimeout(() => toast.showToast("ERROR AL BLOQUEAR AL CLIENTE\n\nPOR FAVOR REVISA TU CONEXIÓN A INTERNET O INTENTA DE NUEVO MÁS TARDE", 5000, "danger"), 1000)
        }
      }
    })
  }
}

const onAddressSuggestionChanged = (payload) => ({
  type: CUSTOMER_ADDRESS_SUGGESTIONS,
  payload
})

const onFormAddChanged = (payload) => ({
  type: CUSTOMER_FORM_ADD_CHANGED,
  payload
})

const getOcupacion = () => {
  return async dispatch => {
    dispatch({ type: CUSTOMER_FETCHING })
    getRequest(methods.GET, `${paths.get_occupations}`).then(async response => {
      console.log('ocupaciones', response);
      dispatch({ type: VALE_OCCUPATIONS_FETCH, payload: response.data });
    }).catch(error => {
      dispatch({ type: CUSTOMER_FETCH_FAILED, payload: error.message })
      console.log('ocupaciones error', error.message);
    })
  }
}

const getEstadoCivil = () => {
  return async dispatch => {
    dispatch({ type: CUSTOMER_FETCHING })
    getRequest(methods.GET, `${paths.get_marital_status}`).then(async response => {
      console.log('estado civil', response)
      dispatch({ type: VALE_MARITAL_STATE_FETCH, payload: response.data });
    }).catch(error =>{
      dispatch({ type: CUSTOMER_FETCH_FAILED, payload: error.message })
      console.log('ocupaciones error', error.message);
    })
  }
}

const getEstados = () => {
  return async dispatch => {
    dispatch({ type: CUSTOMER_FETCHING })
    getRequest(methods.GET, `${paths.get_states}`).then(async response => {
      console.log('estados', response)
      dispatch({ type: VALE_STATES_FETCH, payload: response.data });
    }).catch(error =>{
      dispatch({ type: CUSTOMER_FETCH_FAILED, payload: error.message })
      console.log('ocupaciones error', error.message);
    })
  }
}

const customerSave = (payload) => {
  return async dispatch => {
    //Reglas para validación
    let rules = {
      primerNombre: 'required',
      primerApellido: 'required',
      segundoApellido: 'required',
      fechaNacimiento: 'required',
      telefono: 'required|size:10',
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
      ocupacionId: 'required',
      estadoCivilId: 'required',
      estadoNacimientoId: 'required',
      ingresos: 'required'
    }
    //Nombre de los campos para mostrar en los errores
    let customAttributes = {
      primerNombre: 'primer nombre',
      primerApellido: 'apellido paterno',
      segundoApellido: 'apellido materno',
      fechaNacimiento: 'fecha de nacimiento',
      telefono: 'teléfono',
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
      ocupacionId: 'ocupación',
      estadoCivilId: 'estado civil',
      estadoNacimientoId: 'estado de nacimiento',
      ingresos: 'ingreso mensual'
    }

    let validator = ValidatorService.validate(payload, rules, customAttributes)

    if (validator.fails) {
      let message = Object.values(validator.errors)[0][0]

      toast.showToast(message, 5000, 'warning')
    }
    else {
      console.log('###', payload)
      dispatch({ type: CUSTOMER_FETCHING });      
      let user = JSON.parse(await AsyncStorage.getItem(constants.USER))
      let data = { ...payload, distribuidorId: user.DistribuidorId }
      let dataUpperCase = JSON.parse(JSON.stringify(data, function(a, b) {
        return typeof b === "string" ? b.toUpperCase() : b
      }));      
      console.log("Data",dataUpperCase)
      request(methods.POST, paths.customer_add, dataUpperCase).then(async response => {        
        dispatch({ type: CUSTOMER_CUSTOMERS_FETCH, payload: [] })
        dispatch(getCustomers());
        dispatch(getCustomersWithBankData());
        navigation.navigate("SuccessModal", { title: 'Cliente agregado', message: 'Se ha agregado exitosamente al cliente', buttonText: 'Aceptar', route: 'Home' });
        dispatch({ type: CUSTOMER_ADD_FETCH });
      }).catch(error => {        
        dispatch({ type: CUSTOMER_FETCH_FAILED });
        try {
          let JSONError = JSON.parse(error.message)
          navigation.navigate('ErrorModal', { error: JSONError.resultDesc })
        }
        catch (e) {
          try{
            navigation.navigate('ErrorModal', { error: "resultDesc: "+error.message })
          }
          catch(er){
            navigation.navigate('ErrorModal', { error: "ERROR AL GUARDAR AL CLIENTE\n\nPOR FAVOR REVISA TU CONEXIÓN A INTERNET O INTENTA DE NUEVO MÁS TARDE" })
          } 
        }
      });
    }
  }
}


export {
  getCustomersWithBankData,
  getCustomers,
  onCustomerToggleFilter,
  onCustomersFilterChanged,
  onCustomersOrderByChanged,
  onCustomersStatusChanged,
  blockCustomer,
  onAddressSuggestionChanged,
  onFormAddChanged,
  customerSave,
  getOcupacion,
  getEstadoCivil,
  getEstados
}