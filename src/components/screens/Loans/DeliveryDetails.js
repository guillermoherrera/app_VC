import React from 'react';
import { connect } from 'react-redux';
import { Text, SafeAreaView, View } from 'react-native'
import { Container, Header, Left, Button, Icon, Card, CardItem, Body, Right, Row, Title} from 'native-base'
import { colors } from '../../../assets';
import styles from './Loans.style';
import { moderateScale} from 'react-native-size-matters';
import navigation from '../../../services/navigation';
import { Loading } from '../../common';
import StepIndicator from 'react-native-step-indicator';
import { getDeliveryInfo } from '../../../store/actions';
import { HeaderQ} from '../../common'

  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize:30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: moderateScale(12),
    stepStrokeCurrentColor: colors.tertiary,
    stepStrokeWidth: moderateScale(10),
    stepStrokeFinishedColor: colors.tertiary,
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: colors.tertiary,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: colors.tertiary,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: colors.tertiary,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: moderateScale(15),
    currentStepLabelColor: colors.tertiary
  }

class DeliveryDetails extends React.Component {

  componentDidMount() {
    this.props.getDeliveryInfo()
    console.log("!!!", this.props.loan.delivery)
  }

  onPageChange(position){
    this.setState({currentPosition: position});
  }

  render() {
      let { loan } = this.props
      let { delivery } = loan
      let color = colors.tertiary
      return (
      <HeaderQ
				navigation={navigation}
				imageTitle={true}
				contentStyle={[styles.containerStyle, { backgroundColor: color }]}
				noPaddingBottom
				scroll={true}
				color={color}
				//footer={this._renderFooter()}
      >
      <Container style={{ backgroundColor: colors.tertiary }}>
        {/*<Header noShadow transparent androidStatusBarColor={colors.tertiary} iosBarStyle="light-content">
        <Left style={{ paddingLeft: moderateScale(8), flex: 1 }}>
            <Button transparent onPress={() => navigation.goBack()}>
            <Icon style={{ fontSize: moderateScale(28), fontWeight: "bold", color: colors.white }} name='arrow-back' />
            </Button>
        </Left>
        <Body style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={[styles.titleBodyCenter, { color: colors.white, fontSize: moderateScale(20) }]}>{'DETALLE DEL ENVÍO\n(PROXIMAMENTE)'}</Text>
        </Body>
        <Right style={{ flex: 1 }} />
        </Header>*/}
        <SafeAreaView style={{ flex: 1 }}>
          <Card style={{ flex: 1, paddingTop: moderateScale(10), paddingBottom: moderateScale(10), borderRadius: moderateScale(25) }}>
            {this.props.loan.loading ? <View style={[styles.bodyItem ,{flex: 1}]}><Loading /></View> : <View style={[styles.bodyItem ,{flex: 1}]}>
                <Text style={[styles.titleBodyCenter, { color: colors.black, fontSize: moderateScale(20) }]}>{'DETALLE DEL ENVÍO\n(PROXIMAMENTE)'}</Text>
                <Title style={styles.itemTextTitle}>{delivery ? delivery.estadoActual : "CARGANDO"}</Title>
                <Container style={{alignSelf: 'center',}}>
                
                  <StepIndicator
                    customStyles={customStyles}
                    currentPosition={delivery ? delivery.paso : 0}
                    labels={[
                        "EN PREPARACIÓN\nEstamos preparando tu paquete\ndd/mm/YYYY",
                        "EN CAMINO\nTu paquete esta en viaje\ndd/mm/YYYY",
                        "EN PROCESO DE ENTREGA",
                        "ENTREGA\nFecha estimada dd/mm/YYYY"
                      ]
                    }
                    direction={'vertical'}
                    stepCount={4}
                  />
                  
                </Container>
                <Icon type="FontAwesome5" name="map-marker" style={{alignSelf: 'center', color: colors.tertiary}}/>
                <Text style={[styles.itemTextRight, {fontWeight:'bold'}]}>Datos de entrega: Nombre de calle #Numero Colonia c.p. Municipio, Estado Pais. | Nombre Apellidos Teléfono | Guia 0123456789101112131415</Text>
                <Icon type="FontAwesome5" name="truck" style={{alignSelf: 'center', color: colors.tertiary}}/>
                <Text style={[styles.itemTextRight, {alignSelf: 'center', fontWeight:'bold'}]}>{'Envío por Estafeta.'}</Text>
            </View>}
          </Card>
        </SafeAreaView>
    </Container>
    </HeaderQ>)
  }
}

const mapStateToProps = (state) => ({
  loan: state.loan,
})

const mapDispatchToProps = {
  getDeliveryInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryDetails)