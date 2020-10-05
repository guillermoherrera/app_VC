import { LOAN_FETCH_FAILED, LOAN_FETCHING, LOAN_LOANS_FETCH, LOAN_CHANGED_TAB, LOAN_TOGGLE_FILTER, LOAN_FILTER_CHANGED, LOAN_ORDER_CHANGED, LOAN_STATUS_CHANGED, LOAN_DATE_CHANGED, LOAN_VALES_FETCH, LOAN_CREDIT_DETAILS_FETCH, LOAN_CONFIASHOP_FETCH, LOAN_VALE_TYPE_CHANGED, LOAN_SET_FOLIO_DIGITAL, LOAN_VALE_CANCEL, DELIVERY_FETCHING, LOAN_ARTICLE_DETAILS_FETCH } from "../types"
import { colors } from "../../assets"

const statuses = [{
  name: 'ACTIVO',
  checked: false,
}, {
  name: 'LIQUIDADO',
  checked: false
},
{
  name: 'CANCELADO',
  checked: false
}]

const valeSelector = [{
  label: 'ValeDinero',
  path: '2/1/2',
  value: 1
}, {
  label: 'FolioDigital',
  path: '1/1/3',
  value: 2
}]

const initialState = {
  loading: false,
  loadingVales: false,
  loadingConfiaShop: false,
  loadingLoans: false,
  vales: [],
  valesFiltered: [],
  credishop: [],
  credishopFiltered: [],
  loans: [],
  loansFiltered: [],
  creditDetails: null,
  articleDetail: {
    talla: null
  },
  backgroundColor: colors.secondary,
  showValeFilter: false,
  showShopFilter: false,
  showLoanFilter: false,
  delivery: null,
  valeFilter: {
    valeSelector: [...valeSelector],
    valeSelected: 1,
    orderBy: '',
    statuses: [...statuses],
    dateFrom: new Date(),
    dateTo: new Date()
  },
  credishopFilter: {
    orderBy: '',
    statuses: [...statuses],    
    dateFrom: new Date(),
    dateTo: new Date()
  },
  loanFilter: {
    orderBy: '',
    statuses: [...statuses],
    dateFrom: new Date(),
    dateTo: new Date()
  },    
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAN_FETCHING:
      return { ...state, [payload ? payload.key : 'loading']: true }
    case LOAN_VALES_FETCH:
      return { ...state, vales: payload || [], valesFiltered: payload || [], loadingVales: false }
    case LOAN_CONFIASHOP_FETCH:
      return { ...state, credishop: payload, credishopFiltered: payload, loadingConfiaShop: false }
    case LOAN_LOANS_FETCH:
      return { ...state, loans: payload, loansFiltered: payload, loadingLoans: false }
    case LOAN_CREDIT_DETAILS_FETCH:
      return { ...state, creditDetails: payload, loading: false }
    case LOAN_ARTICLE_DETAILS_FETCH:
      return { ...state, articleDetail: payload }
    case LOAN_FETCH_FAILED:
      return { ...state, loading: false }
    case LOAN_CHANGED_TAB:
      return { ...state, backgroundColor: payload == 0 ? colors.secondary : payload == 1 ? colors.tertiary : colors.alternate }
    case LOAN_TOGGLE_FILTER:
      return { ...state, ...payload }
    case LOAN_FILTER_CHANGED:
      return { ...state, ...payload }
    case LOAN_ORDER_CHANGED:
      return { ...state, [payload.key]: { ...payload.object, orderBy: payload.value }, [payload.data.key]: payload.data.data }
    case LOAN_STATUS_CHANGED:
      return { ...state, [payload.key]: { ...payload.object, statuses: [...payload.object.statuses.slice(0, payload.index), { ...payload.object.statuses[payload.index], checked: payload.value }, ...payload.object.statuses.slice(payload.index + 1)] }, [payload.result.key]: payload.result.data }
    case LOAN_DATE_CHANGED:
      return { ...state, [payload.key]: { ...payload.object, [payload.date]: payload.value }, [payload.result.key]: payload.result.data }
    case LOAN_VALE_TYPE_CHANGED:
      return { ...state, [payload.key]: { ...payload.object, valeSelected: payload.value } }
    case LOAN_SET_FOLIO_DIGITAL:
      return { ...state, creditDetails: payload, loading: false }
    case LOAN_VALE_CANCEL:
      let vale_index = state.valesFiltered.findIndex(vale => vale.valeId == payload.valeId)
      return { ...state, valesFiltered: [...state.valesFiltered.slice(0, vale_index), { ...state.valesFiltered[vale_index], cancelado: true }, ...state.valesFiltered.slice(vale_index + 1)], loading: false }
    case DELIVERY_FETCHING:
      return { ...state, delivery: payload, loading: false}
    default:
      return state
  }
}
