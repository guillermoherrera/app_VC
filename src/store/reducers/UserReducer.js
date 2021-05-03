import {
  LOGIN_ERROR,
  USER_FETCHING,
  TOGGLE_FORM,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  CHANGE_INPUT_LOGIN,
  PROFILE_FETCH_SUCCESS,
  PROFILE_FETCH_ERROR,
  USER_SUMMARY_FETCH,
  USER_FETCH_FAILED,
  USER_PROFILE_CHANGED,
  USER_PHOTO_FETCH,
  USER_RELATION_FETCH,
  USER_PDF_FETCH,
  USER_PROFILE_PICTURE_FETCH,
  USER_LOGOUT,
  USER_PHOTO_FETCHING,
  USER_PHOTO_FETCH_FAILED,
  USER_LOGOUT_FETCHING,
  USER_LOGOUT_FETCH_FAILED,
  USER_FORM_RECOVERY_CHANGED,
  USER_VALIDATE_FETCH,
  USER_ACTIVATE_FETCH,
  USER_UPDATE_ADDRESS_FETCH,
  USER_DEFERRED_CHARGES_FETCH,
  USER_BCONFIASHOP_FETCH,
  USER_COLOCAYGANA_FETCH,
} from "../types";

const FormRecovery = {
  tipoUsuario: 'D',
  usuario: '',
  codigo: '',
  telefono: '',
  identificador: '',
  password: '',
  confirm_password: '',
  distribuidorId: '',
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
  telefonoEnvio: '',
  descripcionDomicilio: ''
}

const INITIAL_STATE = {
  formRecovery: { ...FormRecovery },
  user: {
    telefonos: [{
      telefonoTipo: ''
    }],
    direcciones: [{
      calle: '',
      numExterior: '',
      colonia: ''
    }],
    categoria: {
      categoriaDesc: ''
    },
    coordinador: {
      coordinadorDesc: ''
    }
  },
  user_photo: null,
  mimeType: null,
  distribuidor: '',
  password: '',
  codigo: '',
  summary: null,
  relation: null,
  personal_loan: null,
  bonus: [],
  detalleCargosDiferidos: null,
  pdf: null,
  loading_photo: false,
  loading_logout: false,
  loading: false,
  is_vissible_form: true,
  hasError: false,
  atraso: false,
  saldoActualTotal: 0,
  disponibleTotal: 0,
  limiteTotal: 0,
  relacionDisponible: false,
  monederoConfiashop: 0,
  versionIOS: 1.1,
  versionAndroid: 1.1,
  CYGActual: 0.00,
  CYGMeta: 0.00,
  CYGIndicador: 0.1,
  CYGVigencia: '',
}


export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TOGGLE_FORM:
      return { ...state, is_vissible_form: !state.is_vissible_form }
    case USER_FETCHING:
      return { ...state, loading: true, refreshing: true }
    case LOGIN_ERROR:
      return { ...state, loading: false }
    case LOGIN_SUCCESS:
      return { ...state, loading: false, distribuidor: '', password: '' }
    case CHANGE_INPUT_LOGIN:
      return { ...state, [payload.name]: payload.value }
    case LOGIN_FAILED:
      return { ...state, loading: false, refreshing: false }
    case PROFILE_FETCH_SUCCESS:
      return { ...state, user: payload, refreshing: false, loading: false }
    case PROFILE_FETCH_ERROR:
      return { ...state, loading: false, hasError: payload }
    case USER_SUMMARY_FETCH:
      return { ...state, summary: payload.detalle, ...payload, loading: false, refreshing: false }
    case USER_COLOCAYGANA_FETCH:
      return { ...state, CYGActual: payload.actual_colocacion, CYGMeta: payload.meta_colocacion, CYGIndicador: payload.Indicador, CYGVigencia: payload.vigencia, loading: false, refreshing: false }
    case USER_BCONFIASHOP_FETCH:
      return { ...state, monederoConfiashop: payload != null ? payload.saldo : 0}
    case USER_FETCH_FAILED:
      return { ...state, loading: false, refreshing: false }
    case USER_PROFILE_CHANGED:
      return { ...state, [payload.key]: payload.value }
    case USER_PHOTO_FETCH:
      return { ...state, loading: false, refreshing: false }
    case USER_RELATION_FETCH:
      return { ...state, relation: payload.relaciones, personal_loan: payload.detallePrestamoPersonal, bonus: payload.bonificaciones }
    case USER_PDF_FETCH:
      return { ...state, pdf: payload }
    case USER_PHOTO_FETCHING:
      return { ...state, loading_photo: true }
    case USER_PROFILE_PICTURE_FETCH:
      return { ...state, user_photo: payload.archivo, loading_photo: false }
    case USER_PHOTO_FETCH_FAILED:
      return { ...state, loading_photo: false }
    case USER_LOGOUT_FETCHING:
      return { ...state, loading_logout: true }
    case USER_LOGOUT:
      return { ...state, loading_logout: false }
    case USER_LOGOUT_FETCH_FAILED:
      return { ...state, loading_logout: false }
    case USER_FORM_RECOVERY_CHANGED:
      return { ...state, formRecovery: { ...state.formRecovery, [payload.key]: payload.value } }
    case USER_VALIDATE_FETCH:
      return { ...state, codigo: payload.codigo, loading: false }
    case USER_ACTIVATE_FETCH:
      return { ...state, loading: false }
    case USER_UPDATE_ADDRESS_FETCH:
      return { ...state, loading: false, formRecovery: FormRecovery }
    case USER_DEFERRED_CHARGES_FETCH:
      return { ...state, detalleCargosDiferidos: payload, loading: false, refreshing: false }
    default:
      return state
  }
}