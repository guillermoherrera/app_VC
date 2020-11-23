import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, SafeAreaView, TouchableOpacity, View, FlatList } from 'react-native'
import { Container, Header, Left, Button, Icon, Card, CardItem, Body, Right, Footer, Col, Radio } from 'native-base'
import { colors } from '../../../assets';
import styles from './ConfiaShop.styles';
import { moderateScale} from 'react-native-size-matters';
import navigation from '../../../services/navigation';
import { getAddresses, onAddressChanged } from '../../../store/actions';
import { Loading } from '../../common';

export class AddressSelection extends Component{
  componentDidMount() {
    console.log("111", this.props.confiashop.addresses)
    if (!this.props.confiashop.addresses.length) {
      this.props.getAddresses()
      console.log("!!!", this.props.confiashop.addresses)
    }
  }

	render(){
    
    let { confiashop } = this.props
    let { addresses } = confiashop
    if (this.props.confiashop.loading) {
      return <Loading />
    }
		return (
			<Container style={{ backgroundColor: colors.tertiary }}>
				<Header noShadow transparent androidStatusBarColor={colors.tertiary} iosBarStyle="light-content">
				<Left style={{ paddingLeft: moderateScale(8), flex: 1 }}>
					<Button transparent onPress={() => navigation.goBack()}>
					<Icon style={{ fontSize: moderateScale(28), fontWeight: "bold", color: colors.white }} name='arrow-back' />
					</Button>
				</Left>
				<Body style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
					<Text style={[styles.titleBodyCenter, { color: colors.white, fontSize: moderateScale(20) }]}>DIRECCIÓN DE ENVÍO</Text>
				</Body>
				<Right style={{ flex: 1 }} />
				</Header>
        <SafeAreaView style={{ flex: 1 }}>
          <Card style={{ flex: 1, paddingTop: moderateScale(10), paddingBottom: moderateScale(10), borderRadius: moderateScale(25) }}>
            {this.props.confiashop.loading ? <Loading /> : <FlatList
              numColumns={1}
              data={addresses}
              keyExtractor={(item, index) => `address-${index.toString()}`}
              renderItem={({ item, index }) => <CardItem style={{borderRadius: moderateScale(25) }}>
                {item.active ? <TouchableOpacity
                  onPress={() => {}}
                  style={[styles.addressCard]}>
                  <Col>
                    <View >
                      <Text style={styles.textButton}>
                        {'ENTREGAR A ESTA DIRECCIÓN  \t\n'}
                      </Text>
                    </View>
                    <View style={{  flexDirection: 'row' }}>
                      <Radio selectedColor={colors.tertiary} selected={true} color='white'/>
                      <Text style={styles.textButtonAddress}>
                        {item.calle+' #'+item.numExterior+' '+item.numInterior+' '+item.colonia+' '+item.codigoPostal+' '+item.ciudad+', '+item.estado+'. | '+item.tipoDomicilio+' '+item.telefonoEnvio}
                      </Text>
                    </View>
                    {/*<View style={[styles.contentButton]}>
                      <View style={{ flex: .3 }}/>
                      <Button icon onPress={() => {}} style={[styles.buttonNewVale]}>
                        <Text style={styles.textButtonNew}><Icon type="FontAwesome5" name="edit" style={styles.iconNew} /> EDITAR</Text>
                      </Button>
                      <Button icon onPress={() => {}} style={[styles.buttonNewVale]}>
                        <Text style={styles.textButtonNew}><Icon type="FontAwesome5" name="trash" style={styles.iconNew} /> ELIMINAR</Text>
                      </Button>
                    </View>*/}
                  </Col>
                </TouchableOpacity> : <TouchableOpacity
                  onPress={() => {console.log(item); this.props.onAddressChanged(item)}}
                  style={[styles.addressCardUnChecked]}>
                  <Col>
                    <View style={{  flexDirection: 'row' }}>
                      <Radio selectedColor={colors.tertiary} selected={false} color='white'/>
                      <Text style={styles.textButtonAddress}>
                        {item.calle+' #'+item.numExterior+' '+item.numInterior+' '+item.colonia+' '+item.codigoPostal+' '+item.ciudad+', '+item.estado+'. | '+item.tipoDomicilio+' '+item.telefonoEnvio}
                      </Text>
                    </View>
                  </Col>
                </TouchableOpacity>}
              </CardItem>
              } />}
            <CardItem style={{ borderRadius: moderateScale(25) }}>
              <Button icon onPress={() => navigation.navigate('AddressCF')} style={[styles.buttonAddAddress]}>
                <Text style={styles.textButtonNew2}><Icon type="FontAwesome5" name="plus" style={styles.iconNew} /> AÑADIR DIRECCION</Text>
              </Button>
            </CardItem>
          </Card>
          {addresses.length > 0 &&
            <Footer style={{ height: moderateScale(55), backgroundColor: colors.tertiary, elevation: 0, borderTopColor: 'transparent' }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('AssignCredit')}
                style={[styles.footerCard]}>
                <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                  <Icon style={{ color: colors.white }} type="FontAwesome5" name="arrow-right" />
                  <Text style={styles.textButton}>
                    {'SIGUIENTE \t'}
                  </Text>
                </View>
              </TouchableOpacity>
            </Footer>
          }
        </SafeAreaView>
			</Container>
		)
	}
}

const mapStateToProps = (state) => ({
  confiashop: state.confiashop,
})

const mapDispatchToProps = {
  getAddresses,
  onAddressChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressSelection)