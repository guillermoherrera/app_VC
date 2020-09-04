import { VALE_FETCHING, VALE_FETCH_FAILED, VALE_CUSTOMER_DETAILS_FETCH, VALE_TRANSACTION_TYPES_FETCH, VALE_TRANSACTION_TYPE_CHANGED, VALE_CHANGED, VALE_REASONS_FETCH, VALE_REASON_CHANGED, CUSTOMER_BANK_DATA_FETCH, VALE_CUSTOMER_FILTER, VALE_GENERATE_FETCH, VALE_CODE_CHANGED, VALE_AMOUNT_INCREASES, VALE_AMOUNT_DECREASES, VALE_AMOUNT_RESET, VALE_VALES_DEADLINES, VALE_TOGGLE_MODAL_CONFIRMATION, VALE_DISMISS_MODAL, VALE_VALIDATE_CODE_FETCH, VALE_TOGGLE_PHONE_INPUT, VALE_CONFIRMATION_SUBMIT, VALE_PHONE_INPUT_CHANGED, VALE_OUTSTANDING_CREDIT, CUSTOMER_BLOCKED } from "../types"

const initialState = {
  loading: false,
  showValeConfirmation: false,
  showInputPhone: false,
  isPhoneInputValid: false,
  customersWithBankData: [],
  customersFiltered: [],
  creditoPendiente: [],
  customer_details: null,
  methods: [],
  creditoId: 0,
  phoneInput: '',
  deadline_selected: 0,
  amount_selected: 0,
  fortnights: [{
    plazo: "4",
    tipoPlazos: [{
      tipoPlazoId: "Q",
      importes: [{
        importe: 500.0,
        importePagoPlazo: 175.5
      }, {
        importe: 1000.0,
        importePagoPlazo: 335.50
      },
      {
        importe: 1500.0,
        importePagoPlazo: 495.25
      },
      {
        importe: 2000.0,
        importePagoPlazo: 655.0
      }],
    }],
    active: true
  },
  {plazo: "8",
    tipoPlazos: [{
      tipoPlazoId: "Q",
      importes: [{
        importe: 1000.0,
        importePagoPlazo: 129.5
      }, {
        importe: 1500.0,
        importePagoPlazo: 189.0
      },
      {
        importe: 2000.0,
        importePagoPlazo: 248.5
      },
      {
        importe: 2500.0,
        importePagoPlazo: 308.0
      }],
    }],
    //active: true
  },
  {
    plazo: "10",
    tipoPlazos: [{
      tipoPlazoId: "Q",
      importes: [{
        importe: 1000.0,
        importePagoPlazo: 129.5
      }, {
        importe: 1500.0,
        importePagoPlazo: 189.0
      },
      {
        importe: 2000.0,
        importePagoPlazo: 248.5
      },
      {
        importe: 2500.0,
        importePagoPlazo: 308.0
      }],
    }],
  },
  {
    plazo: "12",
    tipoPlazos: [{
      tipoPlazoId: "Q",
      importes: [{
        importe: 1000.0,
        importePagoPlazo: 129.5
      }, {
        importe: 1500.0,
        importePagoPlazo: 189.0
      },
      {
        importe: 2000.0,
        importePagoPlazo: 248.5
      },
      {
        importe: 2500.0,
        importePagoPlazo: 308.0
      }],
    }],
  }],
  vales_deadlines: [],
  reasons: [],
  code: '',
  errorMessage: '',
  successMessage: ''
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case VALE_FETCHING:
      return { ...state, showInputPhone: false, loading: true }
    case VALE_FETCH_FAILED:
      return { ...state, loading: false, showInputPhone: false, errorMessage: payload }
    case VALE_CUSTOMER_DETAILS_FETCH:
      return { ...state, customer_details: payload, creditoPendiente: [], loading: false }
    case VALE_TRANSACTION_TYPES_FETCH:
      return { ...state, methods: payload, loading: false }
    case VALE_TRANSACTION_TYPE_CHANGED:
      return { ...state, methods: state.methods.map(method => method.desembolsoTipoId == payload.desembolsoTipoId ? { ...method, active: true } : { ...method, active: false }) }
    case VALE_CHANGED:
      return { ...state, fortnights: state.fortnights.map(fortnight => fortnight.plazo == payload.deadline.plazo ? { ...fortnight, active: true } : { ...fortnight, active: false }), deadline_selected: payload.index }
    case VALE_REASONS_FETCH:
      return { ...state, reasons: payload, loading: false }
    case VALE_REASON_CHANGED:
      return { ...state, reasons: state.reasons.map(reason => reason.motivoTipoId == payload.motivoTipoId ? { ...reason, active: true } : { ...reason, active: false }) }
    case VALE_CUSTOMER_FILTER:
      return { ...state, customersFiltered: payload }
    case CUSTOMER_BANK_DATA_FETCH:
      return { ...state, customersWithBankData: payload, customersFiltered: payload, loading: false }
    case VALE_GENERATE_FETCH:
      return { ...state, showInputPhone: false, showValeConfirmation: true, ...payload, loading: false, }
    case VALE_CODE_CHANGED:
      return { ...state, code: payload.toUpperCase() }
    case VALE_VALES_DEADLINES:
      return { ...state, fortnights: payload[0].hasOwnProperty('plazo') ? payload : [], loading: false, deadline_selected: 0 }
    case VALE_AMOUNT_INCREASES:
      return { ...state, amount_selected: state.amount_selected + 1 }
    case VALE_AMOUNT_DECREASES:
      return { ...state, amount_selected: state.amount_selected - 1 }
    case VALE_AMOUNT_RESET:
      return { ...state, amount_selected: 0}
    case VALE_TOGGLE_PHONE_INPUT:
      return { ...state, showInputPhone: !state.showInputPhone }
    case VALE_TOGGLE_MODAL_CONFIRMATION:
      return { ...state, showValeConfirmation: !state.showValeConfirmation }
    case VALE_CONFIRMATION_SUBMIT:
      return { ...state, showValeConfirmation: false, customer_details: { ...state.customer_details, telefono: state.phoneInput || state.customer_details.telefono } }
    case VALE_VALIDATE_CODE_FETCH:
      return { ...state, successMessage: payload, methods: state.methods.map(method => { return { ...method, active: false } }), reasons: state.reasons.map(reason => { return { ...reason, active: false } }), phoneInput: '', code: '', loading: false }
    case VALE_PHONE_INPUT_CHANGED:
      return { ...state, phoneInput: payload.isValid ? payload.value : state.phoneInput, isPhoneInputValid: payload.isValid }
    case VALE_OUTSTANDING_CREDIT:
      return { ...state, customer_details: payload, creditoPendiente: payload.creditoPendiente, loading: false }
    case CUSTOMER_BLOCKED:
      return { ...state, customer_details: { ...state.customer_details, estatusId: 1 } }
    default:
      return state
  }
}
