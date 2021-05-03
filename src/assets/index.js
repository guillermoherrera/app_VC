import {StyleSheet} from 'react-native';
import {verticalScale, moderateScale} from 'react-native-size-matters';

import Toast from 'react-native-root-toast';

export const images = {
  logo: require('./images/logos/Logo.png'),
  confiashop: require('./images/logos/confiashop.png'),
  sublogo: require('./images/logos/sublogo.png'),
  background: require('./images/logos/backgrounds/background.png'),
  add: require('./images/add.png'),
  photo: require('./images/loading.gif'),
  nophoto: require('./images/user_circle.png'),
  phone: require('./images/call.png'),
  map: require('./images/map.png'),
  check: require('./images/CodigoEnviado.png'),
  error: require('./images/Error.png'),
  success: require('./images/CreditoExitoso.png'),
  bolsa: require('./images/bolsita_confiashop.png'),
  confiashop_color: require('./images/confiashop.png'),
  vale_express: require('./images/logos/vale_express.png'),
  vale_color: require('./images/logos/vale_color.png')
}

export const colors = {
  primary: '#0074CC',
  tertiary: '#005799',
  alternate: '#1A9CFF',
  danger: '#EC1940',
  warning: '#F2C94C',
  organge: '#F2994A',
  success: '#27AE60',
  secondary: '#76BD21',
  green: '#3B5F11',
  green_light: '#BCEA84',
  green_lighter: '#598E19',
  green_strong: '#333333',
  gray_light: 'rgba(255, 255, 255, 0.2)',
  gray_normal: '#A9A9A9',
  gray: '#C4C4C4',
  gray_lighter: '#F0F0F0',
  gray_strong: '#828282',
  black_light: '#4E5357',
  black_lighter: '#979797',
  black: '#000',
  black_strong: '#333333',
  white: '#ffffff',
  white_lighther: '#EEEEEE',
  white_strong: '#F2F2F2',
  white_light: 'rgba(255, 255, 255, 0.82)',
  blue_light: '#84BCEA'
}

export const style = {
  border: 5,
  styles: StyleSheet.create({
    hr: {
      borderBottomColor: colors.black,
      borderBottomWidth: 1,
      flex: 1
    },
    hrWrapper: {
      marginTop: verticalScale(10),
      marginBottom: verticalScale(20),
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    },
    mb15: {
      marginBottom: moderateScale(55)
    }
  })
}

export const constants = {
  TOKEN: "token",
  USER: 'user',
  ADDRESS: "address",
  TICKET: "ticketId",
  PUSHTOKEN: "pushToken",
  methods: {
    POST: "post",
    GET: "get",
    PUT: "put",
    DELETE: "delete",
    UPDATE: "update"
  },
  // paths request 
  paths: {
    login: "login/",
    profile: "secure/consulta/distribuidor/",
    summary: "secure/consulta/resumen/",
    pdf: "secure/consulta/pdf/",
    relation: "secure/consulta/relacion/",
    customer_details: "secure/consulta/cliente/detalle/",
    transaction_types: "secure/consulta/catalogo/desembolsosTipos/",
    reasons: "secure/consulta/catalogo/motivosTipos/",
    photoUpload: "secure/exec/guardarFotoDistribuidor",
    clientsBankData: "secure/consulta/clientesDatosBancarios/",
    customers: "secure/consulta/clientes/",
    credit_generate: "secure/exec/generarCredito/",
    photo: "secure/exec/consultaFotoDistribuidor/",
    credits: "secure/consulta/creditos/",
    credit_details: "secure/consulta/creditos/detalle/",
    vale_calculate: "secure/consulta/catalogo/productosTipos/",
    code_validate: "secure/exec/validaCodigos/",
    logout: "secure/logout/",
    customer_block: "secure/exec/cliente/marcarBuro",
    associate_ticket: "secure/exec/asociarTicket",    
    activate: "activacion",
    change_password: "cambioPassword",
    update_address: "secure/exec/distribuidor/actualizaDireccion",
    customer_add: "secure/exec/cliente/alta",
    cancel_vale: "secure/exec/creditos/cancelaVale",
    deferred_charges: "secure/consulta/detalleCargosDiferidos/",
    get_addresses: "secure/consulta/direcciones/",
    get_occupations: 'secure/consulta/catalogo/ocupacionesTipos/',
    get_marital_status: 'secure/consulta/catalogo/estadoCivilTipos/',
    get_states: 'secure/consulta/catalogo/estados/',
    get_cyg: 'secure/consulta/colocaygana/',

    confiaShop_Ticket_Info: 'ConfiaShop_Ticket_Info',
  }
}

export const toast = {
  showToast: (text, duration = 3500, type, position = "bottom") => {
    Toast.show(text.toUpperCase(), {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      backgroundColor: type == 'danger' ? colors.danger : type == 'success' ? colors.success : type == 'warning' ? colors.warning : colors.primary,      
      animation: true,
      hideOnPress: true,
      delay: 0,
      opacity: 1 
    });
  },
};