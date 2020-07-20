import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, SafeAreaView, TouchableOpacity, View, FlatList } from 'react-native'
import { Container, Header, Left, Button, Icon, Card, CardItem, Body, Right, Footer, Col, Radio } from 'native-base'
import { colors } from '../../../assets';
import styles from './ConfiaShop.styles';
import { moderateScale} from 'react-native-size-matters';
import navigation from '../../../services/navigation';
import { getAddresses } from '../../../store/actions';

export class AddressSelection extends Component{
  componentDidMount() {
    console.log("111", this.props.confiashop.addresses)
    if (!this.props.confiashop.addresses) {
      this.props.getAddresses()
      console.log("!!!", this.props.confiashop.addresses)
    }
  }

	render(){
    
    let { confiashop } = this.props
    let { addresses } = confiashop

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
            <FlatList
              numColumns={1}
              data={addresses}
              keyExtractor={(item, index) => `address-${index.toString()}`}
              renderItem={({ item, index }) => <CardItem style={{borderRadius: moderateScale(25) }}>
                {item.direccion == 1 ? <TouchableOpacity
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
                        {'Nombre de Calle '+item.direccion+' #1234 nombre de colonia 0000 municipio, Estado Pais '+item.direccion}
                      </Text>
                    </View>
                    <View style={[styles.contentButton]}>
                      <View style={{ flex: .3 }}/>
                      <Button icon onPress={() => {}} style={[styles.buttonNewVale]}>
                        <Text style={styles.textButtonNew}><Icon type="FontAwesome5" name="edit" style={styles.iconNew} /> EDITAR</Text>
                      </Button>
                      <Button icon onPress={() => {}} style={[styles.buttonNewVale]}>
                        <Text style={styles.textButtonNew}><Icon type="FontAwesome5" name="trash" style={styles.iconNew} /> ELIMINAR</Text>
                      </Button>
                    </View>
                  </Col>
                </TouchableOpacity> : <TouchableOpacity
                  onPress={() => {}}
                  style={[styles.addressCardUnChecked]}>
                  <Col>
                    <View style={{  flexDirection: 'row' }}>
                      <Radio selectedColor={colors.tertiary} selected={false} color='white'/>
                      <Text style={styles.textButtonAddress}>
                        {'Nombre de Calle '+item.direccion+' #1234 nombre de colonia2 0000 municipio2, Estado2 Pais'}
                      </Text>
                    </View>
                  </Col>
                </TouchableOpacity>}
              </CardItem>
              } />
            <CardItem style={{ borderRadius: moderateScale(25) }}>
              <Button icon onPress={() => {}} style={[styles.buttonAddAddress]}>
                <Text style={styles.textButtonNew2}><Icon type="FontAwesome5" name="plus" style={styles.iconNew} /> AÑADIR OTRA DIRECCION</Text>
              </Button>
            </CardItem>
          </Card>
          {true &&
            <Footer style={{ height: moderateScale(55), backgroundColor: colors.tertiary, elevation: 0, borderTopColor: 'transparent' }}>
              <TouchableOpacity
                onPress={() => {}}
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
  getAddresses
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressSelection)