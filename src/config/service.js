import { AsyncStorage } from "react-native";
import { getUniqueId } from "react-native-device-info";
import { constants } from '../assets';
import { URL, URL_DEMO, URL_CSSERVICE, URL_CSSERVICE_DEMO } from "../config/env";

const getEnv = async () => {
  let _env = await AsyncStorage.getItem('env');
  return _env == "DEMO" ? URL_DEMO : URL;
}

const getConfiaShopEnv = async () => {
  let _env = await AsyncStorage.getItem('env');
  return _env == "DEMO" ? URL_CSSERVICE_DEMO : URL_CSSERVICE;
}

export const getConfiaShopRequest = async (type, path) => {
  let _url = await getConfiaShopEnv();
  console.log("url request --> ", `${_url}/${path}`);
  return await fetch(`${_url}/${path}`, {    
    method: type,
    headers: {
      'Content-Type': 'application/json',
      //"Authorization": `Bearer ${await AsyncStorage.getItem(constants.TOKEN)}`,
      //"Device-Token": getUniqueId()
    },
  }).then(async response => {        
    if (response.status == 401) throw new Error('unauthorized')
    else if (!response.ok) throw new Error(JSON.parse(await response.text()).resultDesc);
    return response.json()
  }).catch(error => {
    throw new Error(error.message)
  });
} 

export const request = async (type, path, data = {}) => {
  let _url = await getEnv();
  console.log("url request --> ", `${_url}/${path}`);
  return await fetch(`${_url}/${path}`, {
    method: type,
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${await AsyncStorage.getItem(constants.TOKEN)}`,
      "Device-Token": getUniqueId()
    },
    body: JSON.stringify(data)
  }).then(async response => {    
    if (response.status == 401) throw new Error('unauthorized')
    else if (!response.ok) throw new Error(await response.text());
    return response.json()
  }).catch(error => {
    throw new Error(error.message)
  });
}

export const requestGeneric = async (type, path, data = {}, headers = {}) => {
  console.log("url request --> ", `$${path}`);
  let argument = data != null ? {method: type, headers: headers, body: JSON.stringify(data)} : {method: type, headers: headers} 
  return await fetch(`${path}`, argument).then(async response => {    
    if (response.status == 401) throw new Error('unauthorized')
    else if (!response.ok) throw new Error(await response.text());
    return response.json()
  }).catch(error => {
    throw new Error(error.message)
  });
}

export const getRequest = async (type, path) => {  
  let _url = await getEnv();
  console.log("url getRequest --> ", `${_url}/${path}`);
  return await fetch(`${_url}/${path}`, {    
    method: type,
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${await AsyncStorage.getItem(constants.TOKEN)}`,
      "Device-Token": getUniqueId()
    },
  }).then(async response => {        
    if (response.status == 401) throw new Error('unauthorized')
    else if (!response.ok) throw new Error(JSON.parse(await response.text()).resultDesc);
    return response.json()
  }).catch(error => {
    throw new Error(error.message)
  });
}

export const requestFile = async (type, path, data = {}) => {
  let _url = await getEnv();
  console.log("url requestFile --> ", `${_url}/${path}`);
  return await fetch(`${_url}/${path}`, {
    method: type,
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${await AsyncStorage.getItem(constants.TOKEN)}`,
      "Device-Token": getUniqueId()
    },
    body: JSON.stringify({ distribuidorId: data.distribuidorId, archivo: data.user_photo, tipoArchivo: data.mimeType.split('/')[1] })
  }).then(async response => {
    if (response.status == 401) throw new Error('unauthorized')
    else if (!response.ok) throw new Error(await response.text());
    return response.json()
  }).catch(error => {
    throw new Error(error.message)
  });
}

export const requestCredito = async (type, path, data = {}) => {
  return await fetch(`http://45a3b4a5.ngrok.io/v1.0/${path}`, {
    method: type,
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${await AsyncStorage.getItem(constants.TOKEN)}`,
      "Device-Token": getUniqueId()
    },
    body: JSON.stringify(data)
  }).then(async response => {
    if (response.status == 401) throw new Error('unauthorized')
    else if (!response.ok) throw new Error(await response.text());
    return response.json()
  }).catch(error => {
    throw new Error(error.message)
  });
}