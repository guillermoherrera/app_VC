import { CUSTOMER_BANK_DATA_FETCH, CONFIASHOP_FETCHING, CONFIASHOP_CUSTOMER_INPUT_CHANGED, CONFIASHOP_SET_TICKET, CONFIASHOP_ITEM_CHANGED, CONFIASHOP_CUSTOMER_SELECTED, CONFIASHOP_TOGGLE_PHONE_INPUT, CONFIASHOP_ASSOCIATE_TICKET, CONFIASHOP_PHONE_INPUT_CHANGED, CONFIASHOP_FETCH_FAILED, CONFIASHOP_CODE_CHANGED, CONFIASHOP_PAGE_CHANGED, CONFIASHOP_CODE_VALIDATE, CONFIASHOP_TOGGLE_MODAL, CONFIASHOP_DISMISS_ERROR, CONFIASHOP_ADDRESSES_FETCH, CONFIASHOP_ADDRESS_CHANGED, CONFIASHOP_TICKET_FETCHING } from "../types"

const initialState = {
  loading: false,
  showInputPhone: false,
  showModal: false,
  showValidationCode: false,
  customers: [],
  customersFiltered: [],
  selectedItem: '',
  customer: null,
  initialPage: null,
  ticketId: '',
  phoneInput: '',
  code: '',
  transaccionId: '',
  creditoId: '',
  errorMessage: '',
  addresses: [],
  exclusiveDist: false,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CONFIASHOP_FETCHING:
      return { ...state, loading: true, showInputPhone: false, showValidationCode: false }
    case CONFIASHOP_FETCH_FAILED:
      return { ...state, loading: false, errorMessage: payload, showValidationCode: false }
    case CUSTOMER_BANK_DATA_FETCH:
      return { ...state, loading: false, customers: payload, customersFiltered: payload }
    case CONFIASHOP_CUSTOMER_INPUT_CHANGED:
      return { ...state, ...payload }
    case CONFIASHOP_SET_TICKET:
      return { ...state, ticketId: payload }
    case CONFIASHOP_ITEM_CHANGED:
      return { ...state, selectedItem: payload }
    case CONFIASHOP_CUSTOMER_SELECTED:
      return { ...state, customer: payload }
    case CONFIASHOP_TOGGLE_PHONE_INPUT:
      return { ...state, showInputPhone: !state.showInputPhone }
    case CONFIASHOP_PHONE_INPUT_CHANGED:
      return { ...state, phoneInput: payload }
    case CONFIASHOP_ASSOCIATE_TICKET:
      return { ...state, ...payload, initialPage: 2, showInputPhone: false, loading: false, showValidationCode: true }
    case CONFIASHOP_CODE_CHANGED:
      return { ...state, code: payload }
    case CONFIASHOP_PAGE_CHANGED:
      return { ...state, initialPage: payload }
    case CONFIASHOP_CODE_VALIDATE:
      return { ...state, successMessage: payload, loading: false, ticketId: '', phoneInput: '', code: '', transaccionId: '', creditoId: '', initialPage: null, showValidationCode: false }
    case CONFIASHOP_TOGGLE_MODAL:
      return { ...state, showModal: false, showValidationCode: true }
    case CONFIASHOP_DISMISS_ERROR:
      return { ...state, errorMessage: '', showValidationCode: state.showValidationCode ? true : false }
    case CONFIASHOP_ADDRESSES_FETCH:
      return {...state, addresses: payload, loading: false}
    case CONFIASHOP_ADDRESS_CHANGED:
      return {...state, addresses: state.addresses.map(address => address.direccionId == payload.direccionId ? { ...address, active: true } : { ...address, active: false }) }
    case CONFIASHOP_TICKET_FETCHING:
      return {...state, loading: false, exclusiveDist: payload}
    default:
      return state
  }
}
