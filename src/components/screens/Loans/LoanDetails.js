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
		let { loading, creditDetails, articleDetail } = loan
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
								<Row style={{ marginTop: verticalScale(10) }}>
									<TouchableOpacity onPress={this._openPhone.bind(this)}>
										<Image resizeMode="contain" style={{ width: scale(35), height: verticalScale(35) }} source={images.phone} />
									</TouchableOpacity>
								</Row>
							</Right>}
						</Row>
					</View>
					<View style={[styles.bodyItem, { height: null, flex: 0 }]}>
						<Text style={[styles.titleBodyNew, { flex: 0 }]}>
							{'Información General'}
						</Text>
						
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
					{
						isFrom == 'ConfiaShop' && <View style={[styles.bodyItem, { height: null, flex: 1, paddingBottom: 37 }]}>
							<Text style={[styles.titleBodyNew, { flex: 0 }]}>
								{'Artículo detalle'}
							</Text>
						
							{(creditDetails.detalleVenta || []).map(product => <Row style={[{ flex: 0 }]}>
								<Image resizeMode="contain" style={{ width: moderateScale(95), height: moderateScale(70) }} source={{uri:product.url}} />
								<View style={[styles.datesContent, { flex: 0, paddingTop: moderateScale(10), }]}>
									<View style={[styles.itemDate, { flex: 0 }]}>
										<Text style={styles.itemTextLeftCS}>Marca:</Text>
										<Text style={styles.itemTextRightCS}>{product.marca.substring(0,10)}</Text>
									</View>
									<View style={[styles.itemDate, { flex: 0 }]}>
										<Text style={styles.itemTextLeftCS}>Estilo:</Text>
										<Text style={styles.itemTextRightCS}>{product.estilo.substring(0,10)}</Text>
									</View>
									<View style={[styles.itemDate, { flex: 0 }]}>
										<Text style={styles.itemTextLeftCS}>Cantidad:</Text>
										<Text style={styles.itemTextRightCS}>{product.cantidad}</Text>
									</View>
									<View style={[styles.itemDate, { flex: 0 }]}>
										<Text style={styles.itemTextLeftCS}>Color:</Text>
										<Text style={styles.itemTextRightCS}>{product.color.substring(0,10)}</Text>
									</View>
									<View style={[styles.itemDate, { flex: 0 }]}>
										<Text style={styles.itemTextLeftCS}>Talla:</Text>
										<Text style={styles.itemTextRightCS}>{articleDetail.talla}</Text>
									</View>
								</View>
								<View style={[styles.datesContent, { flex: 0, paddingTop: moderateScale(10), }]}>
									<View style={[styles.itemDate, { flex: 0 }]}>
										<Text style={styles.itemTextLeftCS}>sku:</Text>
										<Text style={styles.itemTextRightCS}>{product.idSku}</Text>
									</View>
									<View style={[styles.itemDate, { flex: 0 }]}>
										<Text style={styles.itemTextLeftCS}>Desc:</Text>
										<Text style={styles.itemTextRightCS}>{product.jerarquia04+'\n'+product.jerarquia03+'\n'+product.jerarquia02+'\n'+product.jerarquia01}</Text>
									</View>
								</View>
							</Row>)}
							{/*<Row style={[{ flex: 0 }]}>
								<Right>
									<TouchableOpacity onPress={() => navigation.navigate('DeliveryDetails')}>
										<Text style={{color: colors.primary}}>Detalle del envío</Text>
									</TouchableOpacity>
								</Right>
							</Row>*/}
							{/*(creditDetails.detalleVenta || []).map(product => <Text key={`product-${product.idSku}`} style={styles.titleProduct}>- {product.jerarquia01}, {product.jerarquia02}, {product.jerarquia03}, {product.jerarquia04}</Text>)*/}
						</View>
					}
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
