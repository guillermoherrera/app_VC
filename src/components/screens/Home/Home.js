import React, { PureComponent } from 'react';
import { View, TouchableOpacity, RefreshControl, FlatList, Linking, Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import styles from './Home.styles';
import { HeaderQ, CardBalance } from '../../common';
import { Thumbnail, Text, Row, Title, Left, Right, Button, Icon, Col } from 'native-base';
import { Icon as RoundIcon, Tooltip } from "react-native-elements";
import { images, colors } from '../../../assets';
import { getSummary, getRelation, getPdf, getProfilePicture, getdeferredCharges, getBalanceConfiashop, getConfiaYGana} from '../../../store/actions';
import moment from "moment";
import "moment/locale/es";
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Modal from 'react-native-modal';
import { getVersion } from 'react-native-device-info';
import * as Progress from 'react-native-progress';

class Home extends PureComponent {
  state = {
    now: moment().format('DD/MM/YYYY HH:mm a'),
    totalUsed: 0,
    totalAvailable: 0,
    totalGranted: 0,
    showModal: false,
    checkVersion: false,
  }

  componentDidMount() {
    moment.locale('es');

    this.props.getdeferredCharges()
    this.props.getSummary()
    this.props.getRelation()
    this.props.getPdf()
    this.props.getProfilePicture()
    this.props.getBalanceConfiashop()
    this.props.getConfiaYGana()
  }

  _onRefresh = () => {
    this.props.getdeferredCharges()
    this.props.getSummary()
    this.props.getRelation()
    this.props.getPdf()
    this.props.getBalanceConfiashop()
    this.props.getConfiaYGana()

    this.setState({ now: moment().format('DD/MM/YYYY HH:mm a'), checkVersion: false })
  }

  _downloadPDF(pdf) {
    try {
      Linking.canOpenURL(pdf.archivo).then(async supported => {
        if (supported) return await Linking.openURL(pdf.archivo)
      }).catch(error => {
        console.log("Error", error.message)
      })
    }
    catch (e) {

    }
  }

  render() {
    let { navigation, profile } = this.props;
    let { summary, bonus, relation, personal_loan, pdf, user_photo, loading_photo, disponibleTotal, limiteTotal, saldoActualTotal, atraso, relacionDisponible, detalleCargosDiferidos, monederoConfiashop, CYGActual, CYGMeta, CYGIndicador, CYGVigencia } = profile
    //console.log('###', profile.versionAndroid);
    //console.log('###', Platform.OS)
    if(!this.state.checkVersion){
      if(Platform.OS === 'ios' && profile.versionIOS > getVersion()) this.setState({ showModal: true })
      if(Platform.OS === 'android' && profile.versionAndroid > getVersion()) this.setState({ showModal: true })
    }
    return (
      <HeaderQ
        navigation={this.props.navigation}
        contentStyle={[styles.headerContent, { backgroundColor: colors.secondary }]}
        noPaddingBottom
        noback={true}
        contentLeft={
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}>
            <Thumbnail              
              source={loading_photo ? images.photo : user_photo ? { uri: `data:image/jpeg;base64,${user_photo}` } : images.nophoto}
            />
          </TouchableOpacity>
        }
        refreshControl={
          <RefreshControl
            refreshing={profile.refreshing}
            onRefresh={this._onRefresh} />
        }>
        <Modal isVisible={this.state.showModal} animationType = {"slide"}>
          <View style={{backgroundColor: 'white', borderRadius:40}}>
            <View style={{ alignItems: 'center'}}>
              <Image style={{ backgroundColor: colors.secondary, borderTopRightRadius: 40, borderTopLeftRadius: 40, width: '100%', height: moderateScale(200)}} source={images.logo}></Image>
            </View>
            <View style={{ padding: moderateScale(20)}}>
              <Text style={{ textAlign:'center', fontSize: moderateScale(15), fontWeight: 'bold' }} >{profile.mensaje}</Text>
              <View style={{ alignItems: 'center', marginTop: moderateScale(20)}}>
                <Button style={styles.buttonFooter} onPress={() => this.setState({ showModal: false, checkVersion: true })} ><Text style={styles.textButtonFooter}>Entendido</Text></Button>
              </View>
            </View>
          </View>
        </Modal>
        <View>
          {CYGMeta > 0 && <View style={styles.cardMoney}>
            <Title >COLOCA Y GANA</Title>
            <Row>
              <View style={{marginTop: moderateScale(18)}}>
                <Progress.Bar progress={CYGIndicador} width={moderateScale(240)} height={moderateScale(30)} borderRadius={moderateScale(12)} color={colors.secondary} borderColor={colors.secondary}>
                  <Title style={[styles.textCard, {alignSelf:"center",position:"absolute",top: moderateScale(4),} ]}>${CYGActual.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Title>
                </Progress.Bar>
              </View>
              <View style={{paddingHorizontal: moderateScale(5), alignItems: 'center'}}>
                <Title style={[styles.textCard, { }]}>Meta</Title>
                <Title style={[styles.textCard, { }]}>${CYGMeta.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Title>
              </View>
            </Row>
            <Text style={[styles.textTitle, { fontSize: moderateScale(9), marginTop: moderateScale(3) }]}>{CYGVigencia}</Text>
          </View>}
          {/*  title */}
          <View style={styles.paddingContent}>
            <Row style={styles.mrt15}>
              <Left><Title style={styles.title}>Mi Saldo</Title></Left>
              <Right style={{ justifyContent: "flex-end" }}><Text style={[styles.textTitle, { fontSize: moderateScale(12) }]}>Última actualización {this.state.now}</Text></Right>
            </Row>
            {/*  Row details account */}
            <Row style={styles.mrt15}>
              <Left><Title style={styles.totalDetail}>Saldo actual</Title></Left>
              <Right style={{ justifyContent: "flex-end" }}><Text style={styles.totalPrice}>${saldoActualTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text></Right>
            </Row>
            <Row style={styles.mrt15}>
              <Left><Title style={styles.totalDetail}>Línea disponible</Title></Left>
              <Right style={{ justifyContent: "flex-end" }}><Text style={styles.totalPrice}>${disponibleTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text></Right>
            </Row>
            <Row style={styles.mrt15}>
              <Left><Title style={styles.totalDetail}>Línea otorgada</Title></Left>
              <Right style={{ justifyContent: "flex-end" }}><Text style={styles.totalPrice}>${limiteTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text></Right>
            </Row>
            <Row style={styles.mrt15}>
              <Left><Title style={Platform.OS === 'ios' ? styles.totalDetailIOS : styles.totalDetail}>Monedero ConfiaShop</Title></Left>
              <Right style={{ justifyContent: "flex-end" }}><Text style={styles.totalPrice}>${monederoConfiashop.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text></Right>
            </Row>
            {detalleCargosDiferidos && <Row style={styles.mrt15}>
              <Left><Title style={styles.totalDetail}>Saldo COVID</Title></Left>
              <Right style={{ justifyContent: "flex-end", flexDirection: 'row', alignItems: 'center' }}><Tooltip width={scale(250)} height={verticalScale(100)} popover={<Text style={[styles.title, { color: colors.white, fontSize: moderateScale(12) }]}>Este saldo represanta un apoyo a nuestras distribuidoras por causas de la contingencia. Desliza más abajo para conocer los detalles.</Text>}><RoundIcon reverse color={colors.white} reverseColor={colors.primary} size={10} raised name="info" type="font-awesome" /></Tooltip><Text style={styles.totalPrice}>${detalleCargosDiferidos.totalSaldoActual.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text></Right>
            </Row>}
          </View>
          <Row style={styles.mrt15}>
            <FlatList data={summary} horizontal={true} keyExtractor={(item, index) => `vale-${index.toString()}`}
              renderItem={({ item }) => {
                return (
                  <CardBalance
                    name={item.caption}
                    balance={`$${item.disponible.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                    granted={`$${item.limite.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                    used={`$${item.colocacion.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`} />)
              }}
            />
          </Row>
          {!atraso && !profile.refreshing && <View style={styles.valeButtons}>
            <Title style={styles.titleHeaderNew}>Nuevo vale digital</Title>
            <Text style={styles.subtitleHeaderNew}>Otorga un nuevo vale a tus clientes</Text>
            <View style={[styles.contentButton]}>
              <Button icon onPress={() => this.props.navigation.navigate("NewVale")} style={[styles.buttonNewVale]}>
                <Text style={styles.textButtonNew}><Icon type="FontAwesome5" name="plus" style={styles.iconNew} /> NUEVO VALE</Text>
              </Button>
              <Button icon onPress={() => this.props.navigation.navigate("ConfiaShop")} style={[styles.buttonNewVale]}>
                <Text style={styles.textButtonNew}><Icon type="FontAwesome5" name="shopping-cart" style={styles.iconNew} /> CONFIA SHOP</Text>
              </Button>
            </View>
          </View>}
          {!profile.refreshing && <View style={[styles.bodyCard, { marginTop: atraso ? moderateScale(-6) : styles.bodyCard.marginTop }]}>
            <View style={styles.bodyCardItems}>
              {bonus.length > 0 && <Col >
                <Text style={styles.titleBodyNew}>
                  {'Gana más pagando antes'}
                </Text>
                <Row>
                  <Left>
                    <Text style={styles.itemTextLeft}>Fecha de pago:</Text>
                  </Left>
                  <Right>
                    <Text style={styles.itemTextRight}>{moment(bonus[0].fechaPago).format('DD/MMM/YYYY')}</Text>
                  </Right>
                </Row>
                <Row>
                  <Left>
                    <Text style={styles.itemTextLeft}>Tasa Porcentaje:</Text>
                  </Left>
                  <Right>
                    <Text style={styles.itemTextRight}>{bonus[0].porcentajeBonificacion}%</Text>
                  </Right>
                </Row>
                <Row>
                  <Left>
                    <Text style={styles.itemTextLeft}>Bonificación:</Text>
                  </Left>
                  <Right>
                    <Text style={styles.itemTextRight}>${bonus[0].bonificacionImporte.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                  </Right>                  
                </Row>
              </Col>}
              {detalleCargosDiferidos && <Col style={styles.bodyItem}>
                <Text style={styles.titleBodyNew}>
                  {'Saldo COVID'}
                  {'\n'}
                  <Text style={[styles.subtitleBodyNew, { color: 'black'}]}>
                    {detalleCargosDiferidos.titulo}
                  </Text>
                </Text>
                {
                  detalleCargosDiferidos.detalle.map((item, index) => (
                    <Col key={`detalle-${index}`}>
                      <View style={styles.itemDate}>
                        <Text style={styles.itemTextLeft}>Fecha de cierre:</Text>
                        <Text style={styles.itemTextRight}>{moment(item.fechaCierre.fechaPago).format('DD/MMM/YYYY')}</Text>
                      </View>
                      <View style={styles.itemDate}>
                        <Text style={styles.itemTextLeft}>Descripción:</Text>
                        <Text style={styles.itemTextRight}>{item.descripcion}%</Text>
                      </View>
                      <View style={styles.itemDate}>
                        <Text style={styles.itemTextLeft}>Importe:</Text>
                        <Text style={styles.itemTextRight}>${item.importe.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                      </View>
                      <View style={[styles.itemDate, { marginBottom: moderateScale(8) }]}>
                        <Text style={styles.itemTextLeft}>Saldo:</Text>
                        <Text style={styles.itemTextRight}>${item.saldo.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                      </View>
                    </Col>
                  ))
                }               
              </Col>}
              {relation && <View style={styles.bodyItem}>
                <Text style={styles.titleBodyNew}>
                  {'\nTus últimas relaciones'}
                </Text>
                <View style={styles.datesContent}>
                  {
                    relation.map((item, index) => (
                      <View key={`relacion-${index + 1}`} style={[styles.itemDate, { marginBottom: moderateScale(8) }]}>
                        <Text style={styles.itemTextLeft}>{moment(item.fechaRelacion).format('DD/MMM/YYYY')}</Text>
                        <Text style={styles.itemTextRight}>${item.importePago.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                      </View>
                    ))
                  }
                  {/* <Text style={styles.textFooterItem}>
                    Última actualización {this.state.now}
                  </Text> */}
                </View>
              </View>}
              {personal_loan && <View style={[styles.bodyItem]}>
                <Text style={styles.titleBodyNew}>
                  {'\nPréstamos personales'}
                  {/* <Text style={styles.subtitleBodyNew}>
                    Antes de relizar cualquier depósito es necesario que acuda con su coordinador para informarle que desea realizar la liquidación de su préstamo persona y le indique el proceso a seguir.
                  </Text> */}
                </Text>
                <View style={styles.datesContent}>
                  <View style={styles.itemDate}>
                    <Text style={styles.itemTextLeft}>Saldo Actual:</Text>
                    <Text style={styles.itemTextRight}>${personal_loan.saldoActualPrestamoPersonal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                  </View>
                  <View style={styles.itemDate}>
                    <Text style={styles.itemTextLeft}>Abono quincenal:</Text>
                    <Text style={styles.itemTextRight}>${personal_loan.importePagoPrestamoPersonal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                  </View>
                  <View style={[styles.itemDate, { marginBottom: moderateScale(8) }]}>
                    <Text style={styles.itemTextLeft}>Saldo vencido:</Text>
                    <Text style={styles.itemTextRight}>${personal_loan.saldoAtrasadoPrestamoPersonal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                  </View>
                  {/* <Text style={[styles.textFooterItem, { paddingBottom: moderateScale(30) }]}>
                    Última actualización {this.state.now}
                  </Text> */}
                </View>
              </View>}
              <View style={styles.bodyItem}>
                <Text style={[styles.textFooterItem, { paddingBottom: moderateScale(30), textAlign: 'center' }]}>
                  Última actualización {this.state.now}
                </Text>
              </View>
            </View>
          </View>}
          {!atraso && relacionDisponible && <View style={styles.footerCard}>
            <Text style={styles.titleFooter}>
              <Icon type="FontAwesome5" name="info-circle" />
              {' Relación de cobro \n'}
              <Text style={styles.subtitleBodyNew}>
                Descarga tu relación de cobro aquí.
              </Text>
            </Text>
            <View style={styles.contentButtonFooter}>
              <Button style={styles.buttonFooter} onPress={() => this._downloadPDF(pdf)}>
                <Text style={styles.textButtonFooter}>
                  DESCARGAR
                </Text>
              </Button>
            </View>
          </View>}
        </View>
      </HeaderQ>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.user,
});

const mapDispatchToProps = {
  getSummary,
  getRelation,
  getPdf,
  getProfilePicture,
  getdeferredCharges,
  getBalanceConfiashop,
  getConfiaYGana,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
