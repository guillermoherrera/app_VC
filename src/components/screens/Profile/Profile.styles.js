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
  logout:{
    fontWeight:"800",
    marginTop: verticalScale(10),
    textAlign:"center",
    color: colors.white
  },
  thumbnail:{
    // backgroundColor: trans,
    width: scale(110),
    height: scale(110)
  },
  title:{
    marginBottom: verticalScale(5),
    color: colors.white,
    fontSize: moderateScale(15)
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
    backgroundColor: colors.primary,
    borderRadius: moderateScale(15),
    paddingBottom: moderateScale(15),
    marginTop: moderateScale(20)
  },
  wrapperItems:{
    height: height * .7,
   },//.897,
   bodyCard:{
    flex:1,
    height: height * .897,
    backgroundColor: colors.white,
    borderTopRightRadius: moderateScale(40),
    borderTopLeftRadius: moderateScale(40),
    borderBottomLeftRadius:0,
    borderBottomRightRadius:0,
    paddingLeft: moderateScale(25),
    paddingRight: moderateScale(25),
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
    height: moderateScale(130),
    flexWrap:"wrap",
    marginTop: moderateScale(10),
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(10)
  },
  containerStyle:{
    paddingLeft:0,
    paddingRight:0,
    paddingTop: 0
  },
  footerCard:{
    flex:1,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    height: moderateScale(60),
    backgroundColor: colors.primary,
    borderTopRightRadius: moderateScale(10),
    borderTopLeftRadius: moderateScale(10),
    borderBottomLeftRadius:0,
    borderBottomRightRadius:0,
    // paddingLeft: moderateScale(25),
    // paddingRight: moderateScale(25),
    // paddingTop: moderateScale(15),
    // marginTop: moderateScale(-260),
    // position: "absolute",
    // left:0,
    // bottom: moderateScale(10),
    // alignSelf:"flex-end"
  },
  titleBodyNew:{
    flex:1,
    fontSize: moderateScale(24),
    color: colors.black,
    fontWeight: '900',
    textAlign:"left",
    flexWrap: "wrap",
    // marginBottom: moderateScale(10),
    flexDirection: "row",
  },
  datesContent:{
    flex:1,
    flexDirection:"column",
    justifyContent:"flex-start",
    alignItems:"stretch"
  },
  itemDate:{
    // flex:1,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginTop: moderateScale(20),    
  },
  itemTextRight:{
    fontWeight: "400",
    fontSize: moderateScale(15),
    flexWrap:"wrap"
  },
  itemTextLeft:{
    color: colors.gray_normal,
    fontSize: moderateScale(15),
  },
  textButton:{
    color: colors.white,
    fontWeight: "bold",
    fontSize: moderateScale(16),
    textAlign:"center",
    alignSelf:"center",
    // marginBottom: moderateScale(22)
  },
});
