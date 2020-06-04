
import React from 'react'
import moment from 'moment';
import { moderateScale } from 'react-native-size-matters';
import { Text, StyleSheet, View } from 'react-native'
import { ListItem, Left, Right, Body } from 'native-base';
import { colors } from '../../assets';

const styles = StyleSheet.create({
  icon: {
    fontSize: moderateScale(15)
  },
  text: {
    fontSize: moderateScale(16),
    color: colors.black_light,
  },
  subtitle: {
    color: colors.primary
  },
  txtName: {
    fontWeight: "bold",
    fontSize: moderateScale(13)
  },
  txtDates: {
    fontSize: moderateScale(10),
    color: colors.gray_strong,
  },
  txtStatus: {
    fontSize: moderateScale(11),
    fontWeight: "900",
    textAlign: "left"
  },
  txtMonto: {
    color: colors.black_strong,
    fontWeight: "900",
    fontSize: moderateScale(12),
    textAlign: "center"
  },
  contentTextStatus: {
    alignItems: "flex-start",
    alignSelf: "flex-start"
  },
});


export const ItemHistory = (props) => {
  let history = props.history;
  return (
    <ListItem button onPress={props.onPress} style={{ marginLeft: 0 }}>
      <Left style={{ flex: 1.5 }}>
        <Text style={styles.txtName}>#{history.numVale}</Text>
        {/* <Text style={styles.txtDates}>{moment(history.fFinal).format('DD/MM/YY')}</Text>         */}
      </Left>
      {history.importe &&
        <Body style={{ flex: 0, marginLeft: moderateScale(10) }}>
          <Text style={[styles.txtMonto]}>${history.importe.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
        </Body>
      }
      <Right style={{ flex: 1.2 }}>
        {
          history.saldoPendiente > 0 ?
            <Text style={[styles.txtStatus, { color: colors.secondary }]}>Activo</Text>
            :
            <Text style={[styles.txtStatus, { color: colors.primary }]}>Finalizado</Text>
        }
      </Right>
    </ListItem>
  )
}

export const HeaderHistory = () => (
  <ListItem button noBorder>
    <Left style={{ flex: 1.5 }}>
      <Text style={{ fontWeight: "900", color: colors.gray_normal, fontSize: moderateScale(12), textAlign: 'center' }}># DE VALE</Text>
    </Left>
    <Body style={{ flex: 0, marginLeft: moderateScale(10) }}>
      <Text style={{ fontWeight: "900", color: colors.gray_normal, fontSize: moderateScale(12), textAlign: 'center' }}>IMPORTE</Text>
    </Body>
    <Right style={{ flex: 1.2 }}>
      <Text style={{ fontWeight: "900", color: colors.gray_normal, fontSize: moderateScale(12), textAlign: 'center' }}>ESTATUS</Text>
    </Right>
  </ListItem>
)