import { CUSTOMER_FETCHING, CUSTOMER_CUSTOMERS_FETCH, CUSTOMER_BANK_DATA_FETCH, CUSTOMER_FETCH_FAILED, CUSTOMER_TOGGLE_FILTER, CUSTOMER_FILTER_CHANGED, CUSTOMER_ORDER_CHANGED, CUSTOMER_STATUS_CHANGED, CUSTOMER_BLOCKED, CUSTOMER_ADDRESS_SUGGESTIONS, CUSTOMER_FORM_ADD_CHANGED, CUSTOMER_ADD_FETCH, VALE_OCCUPATIONS_FETCH, VALE_MARITAL_STATE_FETCH, VALE_STATES_FETCH } from "../types";

const statuses = [{
  name: 'SITUACION NORMAL',
  checked: false,
}, {
  name: 'BLOQUEADO',
  checked: false
}]

const FORM_ADD = {
  distribuidorId: '',
  primerNombre: '',
  segundoNombre: '',
  primerApellido: '',
  segundoApellido: '',
  fechaNacimiento: '',
  telefono: '',
  codigoPostal: '',
  estado: '',
  municipio: '',
  colonia: '',
  calle: '',
  numExterior: '',
  numInterior: '',
  entreCalle1: '',
  entreCalle2: '',
  tipoDomicilio: '',
  descripcionDomicilio: '',
  ocupacionId: '',
  estadoCivilId: '',
  estadoNacimientoId: '',
  ingresos: ''
}

const INITIAL_STATE = {
  loading: false,
  showNextChargesFilter: false,
  showMyCustomersFilter: false,
  customersWithBankData: [],
  customersWithBankDataFiltered: [],
  nextCharges: [],
  nextChargesFiltered: [],
  customers: [],
  customersFiltered: [],
  nextChargesFilter: {
    orderBy: '',
    statuses: [...statuses],
    dateFrom: new Date(),
    dateTo: new Date()
  },
  myCustomersFilter: {
    orderBy: '',
    statuses: [...statuses],
    dateFrom: new Date(),
    dateTo: new Date()
  },
  addressSuggests: [],
  formAdd: { ...FORM_ADD },
  occupations: [],
  maritalStates: [],
  states: []
}


export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case CUSTOMER_FETCHING:
      return { ...state, loading: true }
    case CUSTOMER_CUSTOMERS_FETCH:
      return { ...state, loading: false, customers: payload, customersFiltered: payload }
    case CUSTOMER_BANK_DATA_FETCH:
      return { ...state, customerWithBankData: payload, customersWithBankDataFiltered: payload, loading: false }
    case CUSTOMER_FETCH_FAILED:
      return { ...state, loading: false }
    case CUSTOMER_TOGGLE_FILTER:
      return { ...state, ...payload }
    case CUSTOMER_FILTER_CHANGED:
      return { ...state, ...payload }
    case CUSTOMER_ORDER_CHANGED:
      return { ...state, [payload.key]: { ...payload.object, orderBy: payload.value }, [payload.data.key]: payload.data.data }
    case CUSTOMER_STATUS_CHANGED:
      return { ...state, [payload.key]: { ...payload.object, statuses: [...payload.object.statuses.slice(0, payload.index), { ...payload.object.statuses[payload.index], checked: payload.value }, ...payload.object.statuses.slice(payload.index + 1)] }, [payload.result.key]: payload.result.data }
    case CUSTOMER_BLOCKED:
      return { ...state, loading: false }
    case CUSTOMER_ADDRESS_SUGGESTIONS:
      return { ...state, addressSuggests: payload }
    case CUSTOMER_FORM_ADD_CHANGED:
      return { ...state, formAdd: { ...state.formAdd, [payload.key]: payload.value } }
    case CUSTOMER_ADD_FETCH:
      return { ...state, formAdd: FORM_ADD, addressSuggests: [], loading: false }
    case VALE_OCCUPATIONS_FETCH:
      return { ...state, occupations: payload, loading: false}
    case VALE_MARITAL_STATE_FETCH:
      return { ...state, maritalStates: payload, loading: false}
    case VALE_STATES_FETCH:
      return { ...state, states: payload, loading: false} 
    default:
      return state
  }
}
