import { AsyncStorage } from 'react-native';
import {
  USER_FETCHING,
  PROFILE_FETCH_SUCCESS,
  PROFILE_FETCH_ERROR,
  USER_FETCH_FAILED,
  USER_SUMMARY_FETCH,
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
  USER_DEFERRED_CHARGES_FETCH,
  USER_BCONFIASHOP_FETCH,
  USER_COLOCAYGANA_FETCH,
} from "../types";
import { constants, images, toast } from '../../assets';
import { getRequest, requestFile, requestGeneric } from '../../config/service';
import NavigationService from "../../services/navigation";

// methods allowed and paths to request
const { methods } = constants;
const { paths } = constants;

const getProfile = (isFromConfiaShop = false) => {
  return async dispatch => {
    dispatch({ type: USER_FETCHING })
    let user = JSON.parse(await AsyncStorage.getItem(constants.USER))
    if (isFromConfiaShop)
      dispatch({ type: PROFILE_FETCH_SUCCESS, payload: user });
    else {
      getRequest(methods.GET, `${paths.profile}${user.DistribuidorId}`).then(async response => {
        console.log("User", { ...response.data, DistribuidorId: user.DistribuidorId })
        await AsyncStorage.mergeItem(constants.USER, JSON.stringify({ ...response.data, DistribuidorId: user.DistribuidorId }))
        dispatch({ type: PROFILE_FETCH_SUCCESS, payload: { ...response.data, DistribuidorId: user.DistribuidorId } });
      }).catch(error => {
        dispatch({ type: PROFILE_FETCH_ERROR, payload: error.message });
        if (error.message == 'unauthorized') {
          dispatch(logout());
          toast.showToast("La sesión ha expirado", 5000, "danger")
        }
        else{
          //toast.showToast(error.message, 5000, "danger")
          try{
            toast.showToast("resultDesc: "+error.message, 5000, "danger")
          }
          catch(er){
            toast.showToast("ERROR AL OBTENER DETALLE\n\nPOR FAVOR REVISA TU CONEXIÓN A INTERNET O INTENTA DE NUEVO MÁS TARDE", 5000, "danger")
          }
        }
      });
    }
  }
}

const getSummary = () => {
  return async dispatch => {
    dispatch({ type: USER_FETCHING });
    let user = JSON.parse(await AsyncStorage.getItem(constants.USER))
    getRequest(methods.GET, `${paths.summary}${user.DistribuidorId}`).then(async response => {
      dispatch({ type: USER_SUMMARY_FETCH, payload: response.data });
    }).catch(error => {
      dispatch({ type: USER_FETCH_FAILED, payload: error.message });
      if (error.message == 'unauthorized') {
        dispatch(logout());
        toast.showToast("La sesión ha expirado", 5000, "danger")
      }
      else{
        //toast.showToast(error.message, 5000, "danger")
        try{
          toast.showToast("resultDesc: "+error.message, 5000, "danger")
        }
        catch(er){
          toast.showToast("ERROR AL OBTENER DETALLE\n\nPOR FAVOR REVISA TU CONEXIÓN A INTERNET O INTENTA DE NUEVO MÁS TARDE", 5000, "danger")
        }
      }
    });
  }
}

const getConfiaYGana = () => {
  return async dispatch => {
    dispatch({ type: USER_FETCHING });
    let user = JSON.parse(await AsyncStorage.getItem(constants.USER))
    console.warn(`${paths.get_cyg}${user.DistribuidorId}`);
    getRequest(methods.GET, `${paths.get_cyg}${user.DistribuidorId}`).then(async response => {
      console.warn('payload CYG', response.data);
      dispatch({ type: USER_COLOCAYGANA_FETCH, payload: response.data });
    }).catch(error => {
      dispatch({ type: USER_FETCH_FAILED, payload: error.message });
      if (error.message == 'unauthorized') {
        dispatch(logout());
        toast.showToast("La sesión ha expirado", 5000, "danger")
      }
      else{
        //toast.showToast(error.message, 5000, "danger")
        try{
          toast.showToast("resultDesc: (ColocaYGana) "+error.message, 5000, "danger")
        }
        catch(er){
          toast.showToast("(ColocaYGana) ERROR AL OBTENER DETALLE CYG\n\nPOR FAVOR REVISA TU CONEXIÓN A INTERNET O INTENTA DE NUEVO MÁS TARDE", 5000, "danger")
        }
      }
    });
  }
}

const getBalanceConfiashop = () =>{
  return async dispatch => {
    dispatch({ type: USER_FETCHING });
    let data = { email: 'jjaramillo@fconfia.com', password: 'jjaramillo'};
    let headers = {'Content-Type': 'application/json'}
    requestGeneric(methods.POST, `https://lealtad.confiashop.com/api/Auth/login`, data, headers).then(async response => {
      console.log("###Token", response);
      
      //Request Consulta Saldo////////////////
      let user = JSON.parse(await AsyncStorage.getItem(constants.USER));
      headers = {'Content-Type': 'application/json', "Authorization": `Bearer ${response.token}`};
      requestGeneric(methods.Get, `https://lealtad.confiashop.com/api/Lealtad?id_usuario=${user.DistribuidorId}`, null, headers).then(async response => {
        console.log("###Token2", response);
        dispatch({ type: USER_BCONFIASHOP_FETCH, payload: response[0] });
      }).catch(error => {
        dispatch({ type: USER_FETCH_FAILED, payload: error.message });
        toast.showToast(`Error al consultar saldo Monedero Confiashop ${user.DistribuidorId}\n (${error.message})`, 5000, "danger")
      });
      ///////////////////////////////////////

    }).catch(error => {
      dispatch({ type: USER_FETCH_FAILED, payload: error.message });
      toast.showToast(`Error al conectar con Monedero Confiashop\n (${error.message})`, 5000, "danger")
    });
  }
}

const onChangeProfile = (payload) => ({
  type: USER_PROFILE_CHANGED,
  payload
});

const onSubmitProfile = (payload) => {
  return async dispatch => {
    dispatch({ type: USER_FETCHING });
    let user = JSON.parse(await AsyncStorage.getItem(constants.USER))
    let data = { ...payload, distribuidorId: user.DistribuidorId }
    requestFile(methods.POST, `${paths.photoUpload}`, data).then(response => {
      dispatch({ type: USER_PHOTO_FETCH })
      toast.showToast("Tu foto se ha guardado con éxito", 4000, 'success')
      NavigationService.goBack();
    }).catch(error => {
      dispatch({ type: USER_FETCH_FAILED })
      dispatch({ type: USER_PROFILE_CHANGED, payload: { key: 'photo', value: images.photo } })
      try {
        let JSONError = JSON.parse(error.message)
        toast.showToast(JSONError.resultDesc, 5000, "danger")
      }
      catch (e) {
        if (error.message == 'unauthorized') {
          dispatch(logout());
          toast.showToast("La sesión ha expirado", 5000, "danger")
        }
        else{
          //toast.showToast("No se pudo cargar la foto, inténtalo más tarde", 3000, "danger");
          try{
            toast.showToast("resultDesc: "+error.message, 5000, "danger")
          }
          catch(er){
            toast.showToast("ERROR AL OBTENER DETALLE\n\nPOR FAVOR REVISA TU CONEXIÓN A INTERNET O INTENTA DE NUEVO MÁS TARDE", 5000, "danger")
          }
        }
      }
    })
  }
}

const getRelation = () => {
  return async dispatch => {
    let user = JSON.parse(await AsyncStorage.getItem(constants.USER))
    getRequest(methods.GET, `${paths.relation}${user.DistribuidorId}`).then(async response => {
      dispatch({ type: USER_RELATION_FETCH, payload: response.data });
    }).catch(error => {
      dispatch({ type: USER_FETCH_FAILED, payload: error.message });
      if (error.message == 'unauthorized')
        toast.showToast("La sesión ha expirado", 5000, "danger")
      else{
        //toast.showToast(error.message, 5000, "danger")
        try{
          toast.showToast("resultDesc: "+error.message, 5000, "danger")
        }
        catch(er){
          toast.showToast("ERROR AL OBTENER DETALLE\n\nPOR FAVOR REVISA TU CONEXIÓN A INTERNET O INTENTA DE NUEVO MÁS TARDE", 5000, "danger")
        }
      }
    });
  }
}

const getPdf = () => {
  return async dispatch => {
    let user = JSON.parse(await AsyncStorage.getItem(constants.USER))
    getRequest(methods.GET, `${paths.pdf}${user.DistribuidorId}`).then(async response => {
      dispatch({ type: USER_PDF_FETCH, payload: response.data });
    }).catch(error => {
      dispatch({ type: USER_FETCH_FAILED, payload: error.message });
    });
  }
}

const getProfilePicture = () => {
  return async dispatch => {
    dispatch({ type: USER_PHOTO_FETCHING });
    let user = JSON.parse(await AsyncStorage.getItem(constants.USER))
    getRequest(methods.GET, `${paths.photo}${user.DistribuidorId}`).then(async response => {
      dispatch({ type: USER_PROFILE_PICTURE_FETCH, payload: response.datos });
    }).catch(error => {
      dispatch({ type: USER_PHOTO_FETCH_FAILED, payload: error.message });
    });
  }
}

const logout = () => {
  return async dispatch => {
    let user = JSON.parse(await AsyncStorage.getItem(constants.USER))
    dispatch({ type: USER_LOGOUT_FETCHING });
    getRequest(methods.GET, `${paths.logout}${user.DistribuidorId}`).then(async response => {
      await AsyncStorage.removeItem(constants.TOKEN);
      await AsyncStorage.removeItem(constants.USER);
      await AsyncStorage.removeItem(constants.ADDRESS);
      await AsyncStorage.removeItem(constants.TICKET);
      dispatch({ type: USER_LOGOUT })
      NavigationService.navigate("Login")
    }).catch(async error => {
      dispatch({ type: USER_LOGOUT_FETCH_FAILED, payload: error.message });
      toast.showToast(error.message, 5000, "danger")
      await AsyncStorage.removeItem(constants.TOKEN);
      await AsyncStorage.removeItem(constants.USER);
      await AsyncStorage.removeItem(constants.ADDRESS);
      await AsyncStorage.removeItem(constants.TICKET);
      dispatch({ type: USER_LOGOUT })
      NavigationService.navigate("Login")
    });
  }
}

const getdeferredCharges = () => {
  return async dispatch => {
    let user = JSON.parse(await AsyncStorage.getItem(constants.USER))
    dispatch({ type: USER_FETCHING });
    getRequest(methods.GET, `${paths.deferred_charges}${user.DistribuidorId}`).then(async response => {
      console.log("Deferred Charges", response)
      dispatch({ type: USER_DEFERRED_CHARGES_FETCH, payload: response.datos });
    }).catch(error => {
      dispatch({ type: USER_FETCH_FAILED, payload: error.message });
      //toast.showToast(error.message, 5000, "danger")
    });
  }
}


export {
  getProfile,
  getSummary,
  onChangeProfile,
  onSubmitProfile,
  getRelation,
  getPdf,
  getProfilePicture,
  getdeferredCharges,
  logout,
  getBalanceConfiashop,
  getConfiaYGana,
}
