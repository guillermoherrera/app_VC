import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { colors } from '../../../assets';
const { height } = Dimensions.get('window');

export default styles = StyleSheet.create({
  containerStyle: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0
  },
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
    borderBottomColor: colors.white_strong,
    borderBottomWidth: moderateScale(.5),    
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginTop: moderateScale(10),
  },
  tab: {
    backgroundColor: colors.secondary
  },
  tabStyle: {
    backgroundColor: colors.secondary
  },
  activeTabStyle: {
    backgroundColor: colors.secondary,
  },
  tabBar: {
    backgroundColor: 'transparent',
    height: 0,
  },
  textActive: {
    color: colors.white,
    fontWeight: "900",
    fontSize: moderateScale(15)
  },
  textTab: {
    color: colors.gray,
    fontWeight: "500",
    fontSize: moderateScale(15)
  },
  wrapperFilters: {
    flex: 1,
    padding: moderateScale(15),
    paddingRight: moderateScale(20),
    paddingLeft: moderateScale(20),
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
  },
  txtFilter: {
    color: colors.white,
    fontWeight: "900",
    fontSize: moderateScale(17)
  },
  iconFilter: {
    fontSize: moderateScale(15),
    color: colors.white,
    marginLeft: moderateScale(10)
  },
  titleBodyNew: {
    flex: 1,
    fontSize: moderateScale(24),
    color: colors.black,
    fontWeight: '900',
    textAlign: "left",
    flexWrap: "wrap",
    marginBottom: moderateScale(10),
    flexDirection: "row",
  },
  contentTitle: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    marginTop: moderateScale(10),
    justifyContent: "space-between"
  },
  itemTextRight: {
    flex: 2,
    fontWeight: "400",
    fontSize: moderateScale(15),
    flexWrap: "wrap",
    textAlign: "right"
  },
  itemTextLeft: {
    flex: 1,
    color: colors.gray_normal,
    fontSize: moderateScale(15),
  },
  footerCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderTopRightRadius: moderateScale(10),
    borderTopLeftRadius: moderateScale(10),
  },
  textButton: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: moderateScale(16),
    textAlign: "center",
    alignSelf: "center",
  },
  textItem: {
    color: colors.black,    
    fontSize: moderateScale(12),    
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  },
  containerCard: {
    backgroundColor: colors.white,
    borderTopRightRadius: moderateScale(40),
    borderTopLeftRadius: moderateScale(40),
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(15),
    paddingTop: moderateScale(15),
  },
  iconItem: {
    fontSize: moderateScale(15),
    color: colors.secondary,
    marginLeft: moderateScale(10)
  },
  listItem: { 
    marginLeft: moderateScale(8), 
    marginRight: moderateScale(8) 
  },
  dateContainer: {
    marginLeft: moderateScale(8), 
    marginRight: moderateScale(8),
    paddingBottom: moderateScale(8),
    borderBottomColor: colors.gray_strong,
    borderBottomWidth: 1
  },
  labelStyle: {
    marginLeft: moderateScale(3),
    marginBottom: moderateScale(8)
  }
});
