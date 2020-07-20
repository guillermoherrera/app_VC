import {  StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { colors } from '../../../assets';
export default styles = StyleSheet.create({
  contImageProfile:{
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    padding: moderateScale(20),
  },
  thumbnail:{
    width: scale(110),
    height: scale(110)
  },
  title:{
    marginBottom: verticalScale(5),
    color:colors.white_light
  },
  row:{
    flex:1,
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:"center",
  },
  containerStyle:{
    paddingLeft:0,
    paddingRight:0,
    paddingTop: 0
  },
  iconTitle:{
    color: colors.primary,
    fontWeight:"bold",
    marginLeft: moderateScale(10)
  },
  titleTravels:{
    fontWeight:"normal",
    fontSize: moderateScale(14),
    lineHeight: moderateScale(16),
    color: colors.primary
  },
  terms:{
    color: colors.primary,
    fontWeight:'bold'
  },
  textPrimary:{
    color: colors.primary
  },
  footer:{
    flex:1,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    paddingLeft:moderateScale(20),
    paddingRight:moderateScale(20),
  },
  textFooter:{
    textAlign:"center"
  },
  extraInfo:{
    marginTop:40
  },
  textSkip:{
    fontWeight:'bold',
    marginTop:moderateScale(10)
  },
  contButton:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    marginBottom: verticalScale(10)
  },
  contentModal:{
    flex:1,
    flexDirection:"column",
    alignItems:"stretch",
    justifyContent:"flex-start",
  },
  footerModal:{
    flex:1,
    flexDirection:"column",
    alignItems:"stretch",
    justifyContent:"flex-start",
    backgroundColor:"#fff",
  },
  headerModal:{
    flex:1,
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"flex-start"
  },
  itemHeader:{
    flex:1,
    alignItems:"flex-start",
    justifyContent:"center",
  },
  closeModal:{
    flex:1,
    alignItems:"flex-start",
    justifyContent:"flex-end",
    alignSelf:"flex-end",
    marginRight:moderateScale(15),
    padding: moderateScale(10),
    paddingBottom:0,
  },
  iconClose:{
    fontWeight:"bold",
    fontSize: moderateScale(19),
    color: colors.primary
  },
  bodyModal:{
    flex:6,
    height: moderateScale(340),
    // width: moderateScale(620),
    flexDirection:"column",
    alignItems:"flex-start",
    justifyContent:"flex-start",
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(15),
  },
  scrollContent:{
    width: moderateScale(420),
  },
  titleModal:{
    fontSize: moderateScale(20),
    color: colors.primary,
    textAlign:'center',
    alignSelf:'center',
    lineHeight: moderateScale(23),
    fontWeight: "900",
    fontFamily:"Roboto"
  },
  itemBody:{
    flex:1,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"flex-start",
  },
  wrapperItems:{
    height: height * .5,
  },//.897,
  inputsWrapper:{
    height: moderateScale(40),
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"flex-start",
    marginTop: moderateScale(20)
  },
  titleForm:{
    color: colors.black,
    fontWeight:"bold",
    fontSize:moderateScale(20),
    marginTop: moderateScale(30),
    textAlign:"left"
  },
  bodyCard:{
    flex:1,
    height: height * .657,
    backgroundColor: colors.white,
    borderTopRightRadius: moderateScale(40),
    borderTopLeftRadius: moderateScale(40),
    borderBottomLeftRadius:0,
    borderBottomRightRadius:0,
    // paddingLeft: moderateScale(15),
    paddingRight: moderateScale(15),
    paddingTop: moderateScale(15),
    flexWrap:"wrap",
  },
  bodyCardItems:{
    flex:1,
    flexDirection: 'column',
    alignItems:"stretch",
  },
  bodyItem:{
    borderBottomColor: colors.white_strong,
    borderBottomWidth: moderateScale(.5),
    height: moderateScale(190),
    flexWrap:"wrap",
    marginTop: moderateScale(10),
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(10)
  },
  wrapperInput:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    alignSelf:"center",
    height: moderateScale(50),
    marginBottom: moderateScale(15),
    marginLeft: moderateScale(13),
  },
  tab:{
    backgroundColor: colors.primary
  },
  tabStyle:{
    backgroundColor: colors.primary
  },
  activeTabStyle:{
    backgroundColor: colors.secondary, 
  },
  tabBar:{
    backgroundColor:'transparent',
    height:0,
  },
  textActive:{
    color: colors.white,
    fontWeight:"900",
    fontSize: moderateScale(15)    
  },
  textTab:{
    color: colors.gray,
    fontWeight:"500",
    fontSize: moderateScale(15)    
  },
  titleCardTab:{
    color: colors.black_strong,
    fontWeight:"bold",
    fontSize: moderateScale(22)
  },
  titleCard: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: moderateScale(25),
    fontSize: moderateScale(20),
    color: colors.black_light
  },
  wrapperTitle:{
    flex:1,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"flex-start",
    marginLeft: moderateScale(13),
    marginTop: moderateScale(10),
    marginBottom: moderateScale(10)
  },
  wrapperFilters:{
    flex:1,
    padding: moderateScale(15),
    paddingRight: moderateScale(20),
    paddingLeft: moderateScale(20),
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:"center",
  },
  txtFilter:{
    color: colors.white,
    fontWeight:"900",
    fontSize: moderateScale(17)
  },
  iconFilter:{
    fontSize: moderateScale(15),
    color: colors.white,
    marginLeft: moderateScale(10)
  },
  wrapperFilter:{
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "column",
    alignItems: "stretch",
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(15)
  },
  buttonFilterLeftBordered:{
    borderTopLeftRadius: moderateScale(10),
    borderBottomLeftRadius: moderateScale(10)
  },
  buttonFilterRightBordered:{
    borderTopRightRadius: moderateScale(10),
    borderBottomRightRadius: moderateScale(10)
  },
  txtTitleFilter:{
    textAlign:"left",
    fontWeight:"bold",
  },
  itemWrapperFilter:{
    flex:1,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"flex-start",
    marginTop: moderateScale(12),
    marginBottom: moderateScale(10)
  },
  buttonFilter:{
    backgroundColor: colors.white_light,
    flex:1,
    padding: moderateScale(10),
    justifyContent:"center",
    alignItems:"center"
  },
  txtButtonFilter:{
    fontWeight:"500",
    textAlign:"center",
    color: colors.secondary
  },
  buttonFilterActive:{
    backgroundColor: colors.white
  },
  wrapperFilterChecks:{
    flex:1,
    flexDirection:"row",
    flexWrap:"wrap",
    alignItems:"center",
    justifyContent:"flex-start",
    marginTop: moderateScale(10),
    marginBottom: moderateScale(15)
  },  
  itemCheck:{
    flex:1,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"flex-start",
  },
  txtCheckbox:{
    fontWeight:"700",
    textAlign:"center",
    marginLeft: moderateScale(20)
  },
  contentFilterChecks:{
    marginBottom: moderateScale(15)
  },
  wrapperFilterChecks:{
    flex:1,
    flexDirection:"row",
    flexWrap:"wrap",
    alignItems:"center",
    justifyContent:"space-between",
    marginTop: moderateScale(10),
    marginBottom: moderateScale(5)
  },  
  itemCheck:{
    flex:1,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"flex-start",
  },
  txtCheckbox:{
    fontWeight:"700",
    textAlign:"center",
    marginLeft: moderateScale(20)
  },
  textTab:{
    color: colors.gray,
    fontWeight:"500",
    fontSize: moderateScale(15)    
  },
  titleBodyNew:{
    flex:1,
    fontSize: moderateScale(24),
    color: colors.black,
    fontWeight: '900',
    textAlign:"left",
    flexWrap: "wrap",
    marginBottom:0,
    flexDirection: "row",
  },
  titleBodyCenter:{
    fontSize: moderateScale(24),
    color: colors.black,
    fontWeight: '900',
    textAlign:"center",
    flexWrap: "wrap",
    marginBottom:0,
    flexDirection: "row",
  },
  datesContent:{
    flex:1,
    flexDirection:"column",
    justifyContent:"flex-start",
    alignItems:"stretch"
  },
  contentProduct:{
    flex:1,
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    marginTop: moderateScale(15)
  },
  titleProduct:{
    fontWeight:"bold",
    fontSize: moderateScale(16),
    color: colors.black
  },
  itemDate:{
    flex:1,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  itemTextRight:{
    fontWeight: "400",
    margin: moderateScale(8),
    fontSize: moderateScale(15),
  },
  itemTextLeft:{
    color: colors.gray_normal,
    margin: moderateScale(8),
    fontSize: moderateScale(15),
  },
  footerCard: {    
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",    
    width: '100%',
    backgroundColor: colors.secondary,
    borderTopColor: 'white',
    borderTopRightRadius: moderateScale(10),
    borderTopLeftRadius: moderateScale(10),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,    
  },
  addressCard: {    
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",    
    width: '100%',
    backgroundColor: colors.secondary,
    borderTopColor: 'white',
    borderTopRightRadius: moderateScale(10),
    borderTopLeftRadius: moderateScale(10),
    borderBottomLeftRadius: moderateScale(10),
    borderBottomRightRadius: moderateScale(10),
    padding: moderateScale(20),    
  },
  addressCardUnChecked: {    
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",    
    width: '100%',
    backgroundColor: 'lightgrey',
    borderTopColor: 'white',
    borderTopRightRadius: moderateScale(10),
    borderTopLeftRadius: moderateScale(10),
    borderBottomLeftRadius: moderateScale(10),
    borderBottomRightRadius: moderateScale(10),
    paddingLeft: moderateScale(20),
    paddingBottom:  moderateScale(10),
    paddingTop:  moderateScale(10),
    paddingRight:  moderateScale(20),    
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
  textButtonAddress: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: moderateScale(16),
    textAlign: "center",
    alignSelf: "center",
    //marginLeft: moderateScale(8),
    paddingLeft: moderateScale(8),
    paddingRight: moderateScale(8)
    // marginBottom: moderateScale(22)
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
  },
  contentButton:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    paddingTop: moderateScale(16),
  },
  buttonNewVale:{    
    width: undefined,
    flex: 1,
    backgroundColor: colors.white,   
    margin: moderateScale(6),
    justifyContent: 'center',   
    borderRadius: moderateScale(10)
  },
  buttonAddAddress:{    
    width: undefined,
    flex: 1,
    backgroundColor: colors.tertiary,   
    margin: moderateScale(6),
    justifyContent: 'center',   
    borderRadius: moderateScale(10)
  },
  iconNew:{
    color: colors.secondary,    
    fontSize: moderateScale(14),
  },
  textButtonNew:{
    color: colors.secondary,   
    textAlign: 'left', 
    fontSize: moderateScale(14),    
    fontWeight: 'bold'
  },
  textButtonNew2:{
    color: colors.white,   
    textAlign: 'left', 
    fontSize: moderateScale(14),    
    fontWeight: 'bold'
  },
});
