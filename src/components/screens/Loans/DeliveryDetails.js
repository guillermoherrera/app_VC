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

  onPageChange(position){
    this.setState({currentPosition: position});
  }

  render() {
      return (
      <Container style={{ backgroundColor: colors.tertiary }}>
        <Header noShadow transparent androidStatusBarColor={colors.tertiary} iosBarStyle="light-content">
        <Left style={{ paddingLeft: moderateScale(8), flex: 1 }}>
            <Button transparent onPress={() => navigation.goBack()}>
            <Icon style={{ fontSize: moderateScale(28), fontWeight: "bold", color: colors.white }} name='arrow-back' />
            </Button>
        </Left>
        <Body style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={[styles.titleBodyCenter, { color: colors.white, fontSize: moderateScale(20) }]}>Detalle del envío</Text>
        </Body>
        <Right style={{ flex: 1 }} />
        </Header>
        <SafeAreaView style={{ flex: 1 }}>
          <Card style={{ flex: 1, paddingTop: moderateScale(10), paddingBottom: moderateScale(10), borderRadius: moderateScale(25) }}>
            {this.props.loan.loading ? <Loading /> : <View style={[styles.bodyItem ,{flex: 1}]}>
                <Title style={styles.itemTextTitle}>PROXIMAMENTE</Title>
                <Container style={{alignSelf: 'center',}}>
                
                  <StepIndicator
                    customStyles={customStyles}
                    currentPosition={0}
                    labels={[
                        "EN PREPARACIÓN\nEstamos preparando tu paquete\ndd/mm/YYYY",
                        "EN CAMINO\nTu paquete esta en viaje\ndd/mm/YYYY",
                        "EN PROCESO DE ENTREGA",
                        "ENTREGADO\ndd/mm/YYYY"
                      ]
                    }
                    direction={'vertical'}
                    stepCount={4}
                  />
                  
                </Container>
                <Icon type="FontAwesome5" name="map-marker" style={{alignSelf: 'center', color: colors.tertiary}}/>
                <Text style={[styles.itemTextRight, {fontWeight:'bold'}]}>Datos de entrega: Nombre de calle #Numero Colonia c.p. Municipio, Estado Pais. | Nombre Apellidos Teléfono</Text>
                <Icon type="FontAwesome5" name="truck" style={{alignSelf: 'center', color: colors.tertiary}}/>
                <Text style={[styles.itemTextRight, {alignSelf: 'center', fontWeight:'bold', paddingBottom: moderateScale(50),}]}>Envío por Estafeta.</Text>
            </View>}
          </Card>
        </SafeAreaView>
    </Container>)
  }
}

const mapStateToProps = (state) => ({
  loan: state.loan,
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryDetails)