import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Icon, Title } from 'native-base';
import { HeaderQ as Content } from '../../common';
import { onValeChanged, getValesDeadlines, onAmountIncreases, onAmountDecreases } from '../../../store/actions';
import styles from './Vale.style';
import { moderateScale } from 'react-native-size-matters';
import { colors } from '../../../assets';

class ValeSection extends Component {
  _nextPage() {
    this.props.navigation.navigate('Reasons')
  }

  componentDidMount() {
    let { customer_details, methods } = this.props.vale
    let desembolsoId = methods.find(method => method.active).desembolsoTipoId;
    this.props.getValesDeadlines(customer_details.clienteId, desembolsoId)
  }

  _renderFooter() {
    let { loading, fortnights } = this.props.vale;
    if (!loading) {
      return (
        fortnights.length > 0 ? <TouchableOpacity
          onPress={() => this._nextPage()}
          style={[styles.footerCard]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <Icon style={styles.iconButton} type="FontAwesome5" name="arrow-right" />
            <Text style={styles.textButton}>
              {'SIGUIENTE \t'}
            </Text>
          </View>
        </TouchableOpacity> : <TouchableOpacity
          onPress={() => {}}
          style={[styles.footerCard]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <Text style={styles.textButton}>
              {''}
            </Text>
          </View>
        </TouchableOpacity>
      )
    }
  }

  render() {
    let { vale } = this.props
    let { fortnights, deadline_selected, amount_selected, methods } = vale
    let desembolsoId = null;
    if(methods.find(method => method.active) != undefined){
      desembolsoId = methods.find(method => method.active).desembolsoTipoId;
    }

    return (
      <Content
        title="Nuevo Vale"
        navigation={this.props.navigation}
        contentStyle={[styles.containerStyle, { backgroundColor: desembolsoId == 14 ? colors.tertiary : colors.secondary}]}
        noPaddingBottom
        scroll={false}
        footer={this._renderFooter()}
        color={desembolsoId == 14 ? colors.tertiary : null}
      >
        <View style={styles.headerVale}>
          <Title style={styles.titleCalculate}>Calcula tu vale</Title>
          {fortnights.length > 0 ? <View style={[styles.cardMoney, {backgroundColor: desembolsoId == 14 ? colors.blue_light : colors.green_light}]}>
            <View style={styles.wrapperNumbers}>
              {amount_selected > 0 && <TouchableOpacity onPress={() => this.props.onAmountDecreases()}>
                <Icon style={[styles.iconCant, { marginTop: moderateScale(10), color: desembolsoId == 14 ? colors.tertiary : colors.green }]} type="FontAwesome5" name="minus-circle" />
              </TouchableOpacity>}
              <Text style={[styles.textCamt]}>${fortnights[deadline_selected].tipoPlazos[0].importes[amount_selected].importe.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
              {fortnights[deadline_selected].tipoPlazos[0].importes.length > (amount_selected + 1) && <TouchableOpacity onPress={() => this.props.onAmountIncreases()}>
                <Icon style={[styles.iconCant, { marginTop: moderateScale(10), color: desembolsoId == 14 ? colors.tertiary : colors.green }]} type="FontAwesome5" name="plus-circle" />
              </TouchableOpacity>}
            </View>
            <View style={styles.wrapperFooterVale}>
              <Text style={styles.textPayment}>Pago quincenal</Text>
              <Text style={styles.textCantPayment}>${fortnights[deadline_selected].tipoPlazos[0].importes[amount_selected].importePagoPlazo.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
            </View>
          </View> : <View style={styles.cardMoney}><Text style={styles.textPayment}>...</Text></View>}
        </View>
        <View style={[styles.bodyCard]}>
          <View
            >
            <Text style={styles.titleBodyCenter}>
              {'Quincenas'}
            </Text>
            <ScrollView>
              {fortnights.length > 0 ? <View style={[styles.wrapperButtonsNumbers, { marginTop: moderateScale(10) }]}>
                {fortnights.map((deadline, index) =>
                  <TouchableOpacity
                    key={index}
                    onPress={() => this.props.onValeChanged({ deadline, index })}
                    style={[styles.itemNumber, deadline.active ? (desembolsoId == 14 ? styles.activeNumberCS : styles.activeNumber) : null]}>
                    <Text style={[styles.textNumber, deadline.active ? styles.activeNumberText : null]}>
                      {deadline.plazo}
                    </Text>
                  </TouchableOpacity>
                )}
              </View> : <View style={[styles.wrapperButtonsNumbers, { marginTop: moderateScale(10) }]}><Text style={styles.textPayment}>...</Text></View>}
            </ScrollView>
          </View>
        </View>
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
  vale: state.vale,
})

const mapDispatchToProps = {
  onValeChanged,
  getValesDeadlines,
  onAmountIncreases,
  onAmountDecreases
}

export default connect(mapStateToProps, mapDispatchToProps)(ValeSection)
