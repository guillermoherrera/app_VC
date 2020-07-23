import React from 'react';
import { connect } from 'react-redux';
import { Text, SafeAreaView, View } from 'react-native'
import { Container, Header, Left, Button, Icon, Card, CardItem, Body, Right, Row, Title} from 'native-base'
import { colors } from '../../../assets';
import styles from './Loans.style';
import { moderateScale} from 'react-native-size-matters';
import navigation from '../../../services/navigation';
import { Loading } from '../../common';

class DeliveryDetails extends React.Component {
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
            {this.props.confiashop.loading ? <Loading /> : <View style={styles.bodyItem}>
                <Row>
                    <Left>
                        <Text>Punto 1</Text>
                    </Left>
                    <Right>
                        <Title style={styles.itemTextLeft}>ESTATUS</Title>
                    </Right>
                </Row>
            </View>}
          </Card>
        </SafeAreaView>
    </Container>)
  }
}

const mapStateToProps = (state) => ({
  confiashop: state.confiashop,
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryDetails)