import { Linking, Alert, Platform } from 'react-native';

const callNumber = phone => {
  let phoneNumber = phone;
  if (Platform.OS !== 'android') phoneNumber = `telprompt:${phone}`;
  else phoneNumber = `tel:${phone}`;

  Linking.canOpenURL(phoneNumber).then(supported => {
    return Linking.openURL(phoneNumber);
  }).catch(err => Alert.alert('Confia', err.message));
};

const sendWhatsapp = (phone, text = '¡Hola!') => {
  let url = `whatsapp://send?text=${text}&phone=+52${phone}`;
  Linking.canOpenURL(url).then(supported => {
    return Linking.openURL(url);
  }).catch(err => Alert.alert('Confia', err.message));
}

export default {
  callNumber,
  sendWhatsapp
}