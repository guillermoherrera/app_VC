
import React from 'react'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { Text, StyleSheet, View } from 'react-native'
import { ListItem, Left, Right, Body, Row, Col } from 'native-base';
import { colors } from '../../assets';
import { moderateScale } from 'react-native-size-matters';
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

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
    fontSize: moderateScale(12)
  },
  txtDates: {
    fontSize: moderateScale(10),
    color: colors.gray_strong,
  },
  txtStatus: {
    fontSize: moderateScale(10),
    fontWeight: "900",
    textAlign: "center"
  },
  txtMonto: {
    color: colors.black_strong,
    fontSize: moderateScale(10),
    textAlign: "center"
  },
  contentTextStatus: {
    alignItems: "flex-start",
    alignSelf: "flex-start"
  },
  header: {
    backgroundColor: colors.white
  }
});


export const ItemQ = (props) => {
  let client = props.client;
  return (
    <ListItem button onPress={props.onPress}>
      <Left>
        <Col>
          <Text style={[styles.txtName, { flex: 1, flexWrap: 'wrap' }]}>{client.primerNombre} {client.primerApellido}</Text>
          <Text style={styles.txtDates}>{client.telefono}</Text>
          <Text style={[styles.txtDates, { color: 'black' }]}>ID #{client.clienteId}</Text>
        </Col>
      </Left>
      <Right style={{ flex: 1.1 }}>
        {client.estatusId == 0 ?
          <Text style={[styles.txtStatus, { color: colors.secondary }]}>{client.estatusDesc}</Text>
          :
          <Text style={[styles.txtStatus, { color: colors.danger }]}>{client.estatusDesc}</Text>
        }
      </Right>
    </ListItem>
  )
}

export const ItemHeader = () => (
  <ListItem button noBorder style={styles.header}>
    <Left>
      <Text style={{ fontWeight: "900", color: colors.gray_normal, fontSize: moderateScale(12), textAlign: 'center' }}>CLIENTE/TELÉFONO</Text>
    </Left>
    <Right>
      <Text style={{ fontWeight: "900", color: colors.gray_normal, fontSize: moderateScale(12), textAlign: 'center' }}>ESTATUS</Text>
    </Right>
  </ListItem>
)

export const LoanItem = ({ loan, onPress, isLoan, valeType }) => (
  <ListItem button onPress={onPress}>
    <Left style={{ flex: 1.5 }}>
      <Col>
        <View style={{ flex: 1 }}>
          <Text style={styles.txtName}>{isLoan ? `#${loan.noCredito}{\n}` : loan.nombreCliente}</Text>
          {/* {!isLoan && <Text style={[styles.txtDates, { color: 'black' }]}>{loan.clienteId}</Text>} */}
        </View>
        <Row>
          <Text style={styles.txtDates}>{moment(valeType != 'FolioDigital' ? loan.fechaCredito : loan.fhRegistro).format('DD/MM/YY HH:mm a')}</Text>
        </Row>
      </Col>
    </Left>
    <Body style={{ flex: 0, marginLeft: moderateScale(15) }}>
      <Text style={[styles.txtMonto]}>${valeType != 'FolioDigital' ? loan.monto ? loan.monto.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '' : loan.importe ? loan.importe.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ''}</Text>
    </Body>
    <Right style={{ flex: 1.1 }}>
      {loan.status == "ACTIVO" ?
        <Text style={[styles.txtStatus, { color: colors.secondary }]}>{loan.status}</Text> :
        loan.status == "LIQUIDADO" ?
          <Text style={[styles.txtStatus, { color: colors.warning }]}>{loan.status}</Text> :
          loan.status == "CANCELADO" ?
            <Text style={[styles.txtStatus, { color: colors.danger }]}>{loan.status}</Text> :
            <Text style={[styles.txtStatus, { color: colors.alternate }]}>{loan.status}</Text>
      }
    </Right>
  </ListItem>
)

export const LoanHeader = () => (
  <ListItem button noBorder style={styles.header}>
    <Left style={{ flex: 1.5 }}>
      <Text style={{ fontWeight: "900", color: colors.gray_normal, fontSize: moderateScale(12), textAlign: 'center' }}>CLIENTE/FECHA</Text>
    </Left>
    <Body style={{ flex: 0, marginLeft: moderateScale(15) }}>
      <Text style={{ fontWeight: "900", color: colors.gray_normal, fontSize: moderateScale(12), textAlign: 'center' }}>MONTO</Text>
    </Body>
    <Right style={{ flex: 1.1 }}>
      <Text style={{ fontWeight: "900", color: colors.gray_normal, fontSize: moderateScale(12), textAlign: 'center' }}>ESTATUS</Text>
    </Right>
  </ListItem>
)
