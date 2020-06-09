import React, { Component } from 'react'
import moment from 'moment';
import { connect } from 'react-redux'
import { HeaderQ, ItemQ } from '../../common'
import { View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Row, Left, Title, Text, Right, Icon } from 'native-base';
import styles from './Loans.style';
import { images, colors } from '../../../assets';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { getDetailsCredit, onCancelVale } from '../../../store/actions';
import linking from '../../../services/linking';
import 'moment/locale/es';


class LoanDetails extends Component {
	componentWillMount() {
		let noCredito = this.props.navigation.getParam('noCredito')

		this.props.getDetailsCredit(noCredito)
	}
	_openPhone(phone) {
		linking.callNumber(phone)
	}
	_renderFooter() {
		let { loan, navigation } = this.props;
		let { loading, creditDetails } = loan
		let isFrom = navigation.getParam('isFrom')
		if (creditDetails) {
			if (!loading && isFrom == 'FolioDigital' && !creditDetails.cancelado) {
				return (
					<TouchableOpacity
						onPress={() => this.props.onCancelVale(creditDetails)}
						style={[styles.footerCard]}>
						<View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
							<Icon style={styles.iconCancel} type="FontAwesome5" name="times" />
							<Text style={styles.textButton}>
								{'CANCELAR \t'}
							</Text>
						</View>
					</TouchableOpacity>
				)
			}
		}
	}
	render() {
		let { navigation, loan } = this.props
		let { loading, creditDetails } = loan
		let isFrom = navigation.getParam('isFrom')
		let color = navigation.getParam('backgroundColor')
		return (
			<HeaderQ
				navigation={navigation}
				imageTitle={isFrom == 'ConfiaShop'}
				contentStyle={[styles.containerStyle, { backgroundColor: color }]}
				noPaddingBottom
				scroll={true}
				color={color}
				footer={this._renderFooter()}>
				{loading || !creditDetails ? <ActivityIndicator style={{ marginTop: moderateScale(8) }} color={colors.primary} /> : <View style={styles.bodyCard}>
					<View style={styles.bodyItem}>
						<Row>
							<Left>
								{isFrom != 'FolioDigital' && <Title style={styles.titleCardTab}>#{creditDetails.noCredito}</Title>}
								<Text style={[styles.txtButtonFilter, { color }]}>{isFrom}</Text>
								<Text note>{moment(isFrom != 'FolioDigital' ? creditDetails.fechaCredito : creditDetails.fhRegistro).format('DD/MM/YY HH:mm a')}</Text>
							</Left>
							<Right>
								<Title style={styles.itemTextLeft}>ESTATUS</Title>
								<Text style={[styles.txtButtonFilter, { color: creditDetails.status == "ACTIVO" ? colors.success : colors.warning }]}>{creditDetails.status}</Text>
							</Right>
						</Row>
						<Row>
							<Left>
								<Row style={{ marginTop: verticalScale(10) }}>
									<View>
										<Text style={styles.titleProduct}>{creditDetails.nombreCliente}</Text>
										{isFrom == 'ValeDinero' && <Text style={styles.itemTextLeft}>{creditDetails.telefono}</Text>}
									</View>
								</Row>
							</Left>
							{creditDetails.telefono && <Right>
								<TouchableOpacity onPress={this._openPhone.bind(this)}>
									<Image resizeMode="contain" style={{ width: scale(35), height: verticalScale(35) }} source={images.phone} />
								</TouchableOpacity>
							</Right>}
						</Row>
					</View>
					<View style={[styles.bodyItem, { height: null, flex: 0 }]}>
						<Text style={[styles.titleBodyNew, { flex: 0 }]}>
							{'Información General'}
						</Text>
						{
							isFrom == 'ConfiaShop' && <View style={[styles.contentProduct, { flex: 0, justifyContent: 'flex-start', alignItems: 'flex-start' }]}>
								{(creditDetails.detalleVenta || []).map(product => <Text key={`product-${product.idSku}`} style={styles.titleProduct}>- {product.jerarquia01}, {product.jerarquia02}, {product.jerarquia03}, {product.jerarquia04}</Text>)}
							</View>
						}
						<View style={[styles.datesContent, { flex: 0 }]}>
							<View style={[styles.itemDate, { flex: 0 }]}>
								<Text style={styles.itemTextLeft}>Monto Total:</Text>
								<Text style={styles.itemTextRight}>${isFrom != 'FolioDigital' ? creditDetails.monto ? creditDetails.monto.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0.00' : creditDetails.importe ? creditDetails.importe.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ''}</Text>
							</View>
							{isFrom != 'FolioDigital' && <View style={[styles.itemDate, { flex: 0 }]}>
								<Text style={styles.itemTextLeft}>Monto pagos:</Text>
								<Text style={styles.itemTextRight}>${creditDetails.montoPago ? creditDetails.montoPago.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0.00'}</Text>
							</View>}
							<View style={[styles.itemDate, { flex: 0 }]}>
								<Text style={styles.itemTextLeft}>No. Quincenas:</Text>
								<Text style={styles.itemTextRight}>{creditDetails.plazos}</Text>
							</View>
						</View>
					</View>
					{isFrom != 'FolioDigital' && <View style={[styles.bodyItem, { height: null, flex: 1 }]}>
						<Text style={[styles.titleBodyNew, { flex: 0 }]}>
							{'Estado de cuenta'}
						</Text>
						<View style={[styles.datesContent, { flex: 0 }]}>
							<View style={[styles.itemDate, { flex: 0 }]}>
								<Text style={styles.itemTextLeft}>Monto Total Pagado:</Text>
								<Text style={styles.itemTextRight}>${creditDetails.saldoPagado ? creditDetails.saldoPagado.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0.00'}</Text>
							</View>
							{/* <View style={[styles.itemDate, { flex: 0 }]}>
								<Text style={styles.itemTextLeft}>Monto para líquidar:</Text>
								<Text style={styles.itemTextRight}>$3,000</Text>
							</View> */}
							<View style={[styles.itemDate, { flex: 0 }]}>
								<Text style={styles.itemTextLeft}>Quincena Actual:</Text>
								<Text style={styles.itemTextRight}>{creditDetails.plazoActual}/{creditDetails.plazos}</Text>
							</View>
						</View>
					</View>}
				</View>}
			</HeaderQ>
		)
	}
}

const mapStateToProps = (state) => ({
	loan: state.loan
})

const mapDispatchToProps = {
	getDetailsCredit,
	onCancelVale
}

export default connect(mapStateToProps, mapDispatchToProps)(LoanDetails)