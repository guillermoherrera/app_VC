export const APP_DEBUG = true;
export const APP_MODE = "QA";
export let BASEURL = APP_MODE == "DEV"  ? "http://transportes-martha-dev.supernova-desarrollo.com" : 
              APP_MODE == "QA"   ? "https://vcapi.finconfia.com.mx/v1.0" :
              APP_MODE == "LOCAL" ?  "http://192.168.0.16:8000" : "http://192.168.0.16:8000";
export const URL =  `${BASEURL}`;

export const URL_DEMO = "https://testvcapi.finconfia.com.mx/v1.0";
export const GOOGLE_API_KEY = 'AIzaSyDobS-DIxXHS79mIgIzbz_kHJQuMjK6bFg';

export const URL_CSSERVICE = 'https://servicios.confiashop.com/api';
export const URL_CSSERVICE_DEMO = 'https://servicios-dev.confiashop.com/api';