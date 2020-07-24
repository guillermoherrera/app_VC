import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { colors } from '../../../assets';
export default styles = StyleSheet.create({
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: moderateScale(15)
  },
  content: {
    flex: 1,
    marginBottom: verticalScale(10),
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(15)
  },
  wrapperInput: {
    backgroundColor: colors.white,
    width: moderateScale(340),
    height: moderateScale(30),
    borderColor: colors.black_lighter,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  containerStyle: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0
  },
  contDetails: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  titleCard: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: moderateScale(25),
    fontSize: moderateScale(20),
    color: colors.black_light
  },
  subtitle: {
    marginLeft: moderateScale(5),
    color: colors.primary,
    fontSize: moderateScale(13),
    fontFamily: 'Heebo',
    fontWeight: '300',
    lineHeight: moderateScale(17),
    color: colors.black_lighter
  },
  wrapperSubtitle: {
    flex: 1,
    flexDirection: "row",
    marginTop: moderateScale(4)
  },
  icon: {
    color: colors.success,
    fontSize: moderateScale(15)
  },
  wrapperItems: {
    height: height,
  },//.897,
  bodyCard: {
    flex: 1,
    height: height * .897,
    backgroundColor: colors.white,
    borderTopRightRadius: moderateScale(40),
    borderTopLeftRadius: moderateScale(40),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(15),
    paddingTop: moderateScale(15),
    //flexWrap: "wrap",
  },
  bodyCardItems: {
    flex: 1,
    flexDirection: 'column',
    alignItems: "stretch",
  },
  bodyItem: {
    borderBottomColor: colors.gray_strong,
    borderBottomWidth: moderateScale(.5),
    height: moderateScale(130),
    //flexWrap: "wrap",
    marginTop: moderateScale(10),
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(10)
  },
  bodyItemNumber: {
    flexWrap: "wrap",
    height: moderateScale(240),
    flexDirection: "column",
    alignItems: "stretch",
    marginBottom: moderateScale(10),
  },
  titleBodyNew: {
    flex: 1,
    fontSize: moderateScale(24),
    color: colors.black,
    fontWeight: '900',
    textAlign: "left",
    flexWrap: "wrap",    
    margin: moderateScale(8),
    flexDirection: "row",
  },
  wrapperButtonsNumbers: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  itemNumber: {
    width: moderateScale(90),
    height: moderateScale(60),
    borderColor: colors.gray_normal,
    borderWidth: moderateScale(2),
    borderRadius: moderateScale(20),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: moderateScale(10),
    marginBottom: moderateScale(10)
  },
  wrapperReasons: {
    // flex:1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: moderateScale(15)
  },
  activeNumber: {
    backgroundColor: colors.secondary,
    borderColor: 'transparent',
    borderWidth: 0

  },
  activeNumberCS: {
    backgroundColor: colors.tertiary,
    borderColor: 'transparent',
    borderWidth: 0

  },
  activeNumberText: {
    color: colors.white
  },
  textNumber: {
    color: colors.gray_normal,
    fontSize: moderateScale(20),
    fontWeight: "500",
    textAlign: "center"
  },
  titleBodyCenter: {
    fontSize: moderateScale(24),
    color: colors.black,
    fontWeight: '900',
    textAlign: "center",
    flexWrap: "wrap",
    marginBottom: 0,
    flexDirection: "row",
  },
  subtitleBodyCenter: {
    fontSize: moderateScale(12),
    color: colors.gray_strong,
    fontWeight: '900',
    textAlign: "center",
    flexWrap: "wrap",
    marginBottom: moderateScale(5),
  },
  datesContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch"
  },
  itemDate: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  itemTextRight: {
    fontWeight: "400",
    fontSize: moderateScale(15),
  },
  itemTextLeft: {
    color: colors.gray_normal,
    fontSize: moderateScale(15),
  },
  wrapperInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    height: moderateScale(50),
    marginBottom: moderateScale(15),
    marginLeft: moderateScale(13),
  },
  wrapperClients: {
    height: moderateScale(400),
  },
  contentModal: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  footerModal: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
  },
  headerModal: {
    flex: 2,
    flexDirection: "column",
    alignItems: "stretch",
  },
  itemHeader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bodyModal: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(15),
  },
  titleModal: {
    fontSize: moderateScale(20),
    color: colors.primary,
    textAlign: 'center',
    alignSelf: 'center',
    lineHeight: moderateScale(23),
    fontWeight: "900",
    fontFamily: "Roboto"
  },
  itemBody: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  footerCard: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // height: moderateScale(60),
    width: '100%',
    backgroundColor: colors.primary,
    borderTopColor: 'white',
    borderTopRightRadius: moderateScale(10),
    borderTopLeftRadius: moderateScale(10),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    // paddingLeft: moderateScale(25),
    // paddingRight: moderateScale(25),
    // paddingTop: moderateScale(15),
    // marginTop: moderateScale(-100),
    // position: "absolute",
    // left:0,
    // bottom: moderateScale(10),
    // alignSelf:"flex-end"
  },
  footerCardCalculate: {
    marginTop: moderateScale(-129),
  },
  textButton: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: moderateScale(16),
    textAlign: "center",
    alignSelf: "center",
    marginLeft: moderateScale(8)
    // marginBottom: moderateScale(22)
  },
  iconButton: {
    color: colors.white,
    // marginLeft: moderateScale(13),
    fontWeight: "normal"
  },
  cardMoney: {
    flex: 1,
    height: moderateScale(120),
    borderRadius: moderateScale(12),
    backgroundColor: colors.green_light,
    padding: moderateScale(10),
    paddingTop: moderateScale(12),
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: 'flex-start',
  },
  wrapperFooterVale: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textPayment: {
    fontWeight: "bold",
    fontSize: moderateScale(20),
    //color: colors.green,
    marginLeft: moderateScale(12)
  },
  textCantPayment: {
    color: colors.black_strong,
    fontSize: moderateScale(20),
    fontWeight: "bold",
    marginRight: moderateScale(12)
  },
  wrapperNumbers: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: moderateScale(10),
  },
  textCamt: {
    marginLeft: moderateScale(15),
    marginRight: moderateScale(15),
    fontSize: moderateScale(45),
    color: colors.black_strong
  },
  iconCant: {
    fontSize: moderateScale(30),
    color: colors.green
  },
  bodyCardCalculate: {
    height: height * .697,
  },
  headerVale: {
    flex: 1,
    marginLeft: moderateScale(15),
    marginRight: moderateScale(15),
    marginBottom: moderateScale(12),
    flexDirection: "column",
    alignItems: "stretch",
  },
  titleCalculate: {
    textAlign: "left",
    fontWeight: "bold",
    color: colors.white,
    fontSize: moderateScale(28),
    marginBottom: moderateScale(10)
  },
  celdaPin: {
    borderWidth: 1,
    borderRadius: 24,
    borderColor: colors.secondary
  },
  celdaEnfocadaPin: {
    borderColor: colors.tertiary
  },
  espacioInferiorEstandar: {
    marginBottom: moderateScale(8),
    marginTop: moderateScale(30)
  }
});
