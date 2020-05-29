import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { colors } from '../../../assets';
export default styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapperInput: {
    marginTop: moderateScale(20),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  inputBox: {
    width: width * .79,
    borderRadius: 140,
    backgroundColor: colors.white,
  },
  textInput: {
    color: colors.black,
    margin: moderateScale(5),
    fontSize: moderateScale(12),
    fontWeight: 'bold',
    fontFamily: 'Roboto'
  },
  contButton: {
    flex: 1,
    marginTop: moderateScale(6),
    flexDirection: "row",
    justifyContent: "center"
  },
  button: {
    width: width * .59,
    marginTop: moderateScale(25),
  },
  textFooter: {
    fontWeight: "bold",
    color: colors.white,
    marginTop: moderateScale(10)
  },
  contForgot: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(15)
  },
  txtWhite: {
    color: colors.white,
    fontSize: moderateScale(12)
  },
  card: {
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
    borderBottomLeftRadius: moderateScale(10),
    borderBottomRightRadius: moderateScale(10),
    padding: moderateScale(20),
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 1,
  },
  pickerContainer: {
    borderWidth: 2.5, 
    borderColor: colors.gray_strong,
    marginBottom: moderateScale(10), 
    marginLeft: moderateScale(6), 
    marginRight: moderateScale(8)
  },
  picker: { 
    width: undefined, 
    paddingRight: moderateScale(10) 
  }
});
