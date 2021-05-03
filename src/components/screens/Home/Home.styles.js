import {  StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { colors } from '../../../assets';
export default styles = StyleSheet.create({
  title:{
    fontWeight:"bold",
    fontSize: moderateScale(28)
  },
  textTitle:{
    textAlign:"right",
    color: colors.green
  },
  totalDetail:{
    fontSize: moderateScale(18),
    color: colors.green,
    fontWeight: '900'
  },
  totalDetailIOS:{
    fontSize: moderateScale(14),
    color: colors.green,
    fontWeight: '900'
  },
  totalPrice:{
    fontWeight: '900',
    fontSize: moderateScale(18),
    color:      colors.green_strong,
    textAlign:"right"
  },
  textPrimary:{
    color: colors.primary
  },
  textSteps:{
    fontFamily:'Roboto',
    fontSize: moderateScale(14),
    lineHeight: moderateScale(18),
    color:colors.black,
    fontWeight:'normal',
    textAlign:"justify",
    marginBottom: moderateScale(15)
  },
  wrappInput:{
    marginTop: moderateScale(-23),
  },
  wrapperInput:{
    marginLeft: moderateScale(14),
    marginBottom: moderateScale(10)
  },
  inputContent:{
    borderColor: colors.black,
    width: moderateScale(190),
    height: moderateScale(30)
  },
  iconInput:{
    color: colors.black_lighter,
  },
  inputStyle:{
    height: moderateScale(2),
  },
  rowCategory:{
    flex:1,
    flexDirection:'row',
    alignItems:"center",
    justifyContent:"space-evenly",
    marginBottom: moderateScale(10),
    flexWrap:'wrap',
  },
  content:{
    flex:1,
    marginBottom: verticalScale(10),
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(15) 
  },
  containerStyle:{
    paddingLeft:0,
    paddingRight:0,
  },
  contDetails:{
    flex:1,
    flexDirection:"column",
    alignItems:"flex-start",
    justifyContent:"center"
  }, 
  titleCard:{
    fontWeight:'bold',
    fontFamily:'Heebo',
    fontStyle:'normal',
    lineHeight: moderateScale(25),
    fontSize: moderateScale(24),
    color: colors.black_light
   },
   subtitle:{
     marginLeft: moderateScale(5),
     color: colors.primary,
     fontSize: moderateScale(13),
     fontFamily:'Heebo',
     fontWeight:'300',
     lineHeight: moderateScale(17),
     color: colors.black_lighter
   },
   wrapperSubtitle:{
     flex:1,
     flexDirection:"row",
     marginTop: moderateScale(4)
   },
   legend:{
     color: colors.primary,
     fontWeight: '500',
     fontSize: moderateScale(10),
     lineHeight: moderateScale(15),
     fontFamily: 'Heebo'
   },
   icon:{
     color: colors.success,
     fontSize: moderateScale(15)
   },
   footerDetails:{
     flex:1,
     flexDirection:"row",
     justifyContent: 'space-evenly',
     alignItems: "center",
   },
   wrapperButton:{
    flex:1,
    flexDirection:"row",
    justifyContent:"flex-end"
   },
   button:{
     backgroundColor: colors.success,
     color: colors.white,
     paddingTop: 0,
     paddingBottom: 0,
     height: moderateScale(25),
     paddingLeft: moderateScale(28),
     paddingRight: moderateScale(28),
   },
   textButton:{
     color: colors.white,
     fontFamily: 'Heebo',
     fontStyle:'normal',
     fontWeight:'normal',
     alignItems:"center",
     fontSize:moderateScale(10),
     lineHeight:moderateScale(15)
   },
   contMap:{
     flex:1,
     backgroundColor:"#000",
     height: scale(320)
   },
   backgroundContent:{
    flex:1,
    alignItems:"center",
    justifyContent:"flex-end",
    paddingBottom: verticalScale(10),
   },
   mrt15:{
    marginTop: moderateScale(10)
   },
  mrb10:{
    marginBottom: moderateScale(10)
  },
  valeButtons: {
    flex:1,
    height: moderateScale(200),
    backgroundColor: colors.green_light,    
    borderTopRightRadius: moderateScale(40),
    borderTopLeftRadius: moderateScale(40),  
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(15),    
    paddingTop: moderateScale(17),
    marginTop: moderateScale(12),    
  },
  headerNew:{
    flex:1,
    height: moderateScale(200),
    backgroundColor: colors.green_light,
    borderRadius: moderateScale(40),
    borderBottomLeftRadius:0,
    borderBottomRightRadius:0,
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(15),
    flexDirection: "column",
    justifyContent:"flex-start",
    alignItems:"stretch",
    paddingTop: moderateScale(17),
    marginTop: moderateScale(12)
  },
  bodyCard:{
    flex:1,
    // height: moderateScale(900),
    backgroundColor: colors.white,
    borderTopRightRadius: moderateScale(40),
    borderTopLeftRadius: moderateScale(40),
    //borderBottomLeftRadius:0,
    //borderBottomRightRadius:0,
    //paddingLeft: moderateScale(15),
    //paddingRight: moderateScale(12),
    paddingTop: moderateScale(15),
    marginTop: moderateScale(-32),
    //flexWrap:"wrap"
  },
  footerCard:{
    flex:1,
    height: moderateScale(170),
    backgroundColor: colors.white_strong,
    borderTopRightRadius: moderateScale(40),
    borderTopLeftRadius: moderateScale(40),
    borderBottomLeftRadius:0,
    borderBottomRightRadius:0,
    paddingLeft: moderateScale(25),
    paddingRight: moderateScale(25),
    paddingTop: moderateScale(15),
    marginTop: moderateScale(-32),
  },
  bodyCardItems:{
    flex:1,
    margin: moderateScale(10),
    flexDirection: 'column',
    alignItems:"stretch",
  },
  bodyItem:{
    borderBottomColor: colors.white_strong,
    borderBottomWidth: moderateScale(.5),    
    // height: moderateScale(230),
    //flexWrap:"wrap",
  },
  bodyItemLarge:{
    height: moderateScale(380),
  },
  headerContent:{
    paddingLeft:0,
    paddingRight: 0,
    paddingBottom:0,
  },
  itemTextRight:{
    fontWeight: "400",
  },
  itemTextLeft:{
    color: colors.gray_normal
  },
  paddingContent:{
    paddingLeft: moderateScale(25),
    paddingRight: moderateScale(25),
  },
  titleHeaderNew:{
    fontSize: moderateScale(32),
    color: colors.green_lighter,
    fontWeight: 'bold',
    textAlign:"left"
  },
  subtitleHeaderNew:{
    fontWeight:"100",
    fontSize: moderateScale(16),
    color: colors.green,
  },
  contentButton:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    paddingTop: moderateScale(16),
  },
  contentButtonFooter:{
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
  buttonFooter:{
    width: moderateScale(150),
    backgroundColor: colors.primary,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    borderRadius: moderateScale(10)
  },
  textButtonFooter:{
    color: colors.white,
    fontWeight: "bold"
  },
  textButtonNew:{
    color: colors.secondary,   
    textAlign: 'left', 
    fontSize: moderateScale(14),    
    fontWeight: 'bold'
  },
  iconNew:{
    color: colors.secondary,    
    fontSize: moderateScale(14),
  },
  titleBodyNew:{
    flex:1,
    fontSize: moderateScale(34),
    fontWeight: "bold",
    color: colors.black,
    //fontWeight: '900',
    textAlign:"left",
    flexWrap: "wrap",
    marginBottom: moderateScale(10),
    flexDirection: "row",
  },
  titleFooter:{
    fontSize: moderateScale(24),
    color: colors.black,
    fontWeight: '900',
    textAlign:"left",
    flexWrap: "wrap",
    marginBottom:0,
    flexDirection: "row",
  },
  subtitleBodyNew:{
    marginTop: moderateScale(5),
    paddingTop: moderateScale(10),
    color:colors.gray_strong,
    fontWeight: "100",
    textAlign:"justify",
    fontSize: moderateScale(13)
  },
  textFooterItem:{
    color:colors.secondary,
    fontSize: moderateScale(14),
    fontWeight:"bold",
    textAlign:"left",
    marginTop: moderateScale(20),
    marginBottom: moderateScale(10)
  },
  contentTitleBody:{
    flexDirection:"row",
    justifyContent:"flex-start",
    alignItems:"center",
    flexWrap:"wrap",
    flexShrink:2,
  },
  listItem:{
    flex:1,
    flexDirection:"column",
    justifyContent:"flex-start",
    alignItems:"stretch"
  },
  datesContent:{
    flex:1,
    flexDirection:"column",
    justifyContent:"flex-start",
    alignItems:"stretch"
  },
  itemDate:{
    flex:1,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  cardMoney:{
    flex:1,
    marginHorizontal: moderateScale(10),
    padding: moderateScale(10),
    borderRadius: moderateScale(12),
    backgroundColor: colors.green_light,
    flexDirection:"column",
    alignItems:"stretch",
    justifyContent: 'flex-start',
  },
  textCard:{
    fontSize: moderateScale(16),
    color: colors.red,
    fontWeight: '200',
    textAlign:"left"
   },
});
