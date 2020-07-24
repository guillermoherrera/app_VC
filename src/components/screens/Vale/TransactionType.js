import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { HeaderQ as Content, ItemQ, ItemMethodTransaction } from '../../common';
import { moderateScale } from 'react-native-size-matters';
import { getTransactionTypes, onTransactionChanged } from '../../../store/actions';
import { Icon } from 'native-base';
import { colors } from '../../../assets';
import styles from './Vale.style';

class TransactionType extends Component {
  componentDidMount() {
    let { vale } = this.props
    let { customer_details } = vale
    console.log("ClienteId",customer_details.clienteId)
    this.props.getTransactionTypes(customer_details.clienteId);    
  }

  componentDidUpdate(){
    console.log("Desembolsos",this.props.vale.methods)
  }

  _nextPage() {
    this.props.navigation.navigate('ValeSection')
  }

  _renderFooter() {
    let { methods, loading } = this.props.vale;
    let hasSelected = methods.find(method => method.active);
    if (methods.length && !loading && hasSelected) {
      return (
        <TouchableOpacity
          onPress={() => this._nextPage()}
          style={[styles.footerCard]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <Icon style={styles.iconButton} type="FontAwesome5" name="arrow-right" />
            <Text style={styles.textButton}>
              {'SIGUIENTE \t'}
            </Text>
          </View>
        </TouchableOpacity>
      )
    }
  }

  render() {
    let { vale } = this.props
    let { loading, customer_details, methods } = vale
    let desembolsoId = null;
    if(methods.find(method => method.active) != undefined){
      desembolsoId = methods.find(method => method.active).desembolsoTipoId;
    }

    return (
      <Content
        title="Nuevo Vale"
        contentStyle={styles.containerStyle}        
        footer={this._renderFooter()}
        color={desembolsoId == 14 ? colors.tertiary : null}
      >
        {loading ? <ActivityIndicator style={{ marginTop: moderateScale(8) }} color={colors.primary} /> : <View style={[styles.bodyCard, { height: undefined }]}>
          <ItemQ client={customer_details} />
          <View
            style={[styles.bodyItem, { justifyContent: "center", height: moderateScale(70), borderBottomColor: 'transparent' }]}>
            <Text style={styles.titleBodyCenter}>
              {'Selecciona el tipo de desembolso'}
            </Text>
          </View>
          <FlatList
            data={methods}
            keyExtractor={(item, index) => `method-${index}`}
            renderItem={({ item, index }) => <ItemMethodTransaction onPress={() => this.props.onTransactionChanged({ desembolsoTipoId: item.desembolsoTipoId, index })} {...item} />}
          />          
        </View>}
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
  vale: state.vale,
})

const mapDispatchToProps = {
  getTransactionTypes,
  onTransactionChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionType)
