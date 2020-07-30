import React from 'react'
import moment from 'moment';
import ModalDatePicker from 'react-native-datepicker-modal'
import { verticalScale, moderateScale } from 'react-native-size-matters';
import { StyleSheet, Platform } from 'react-native'
import { Input } from 'react-native-elements';
import { Icon, View, Label, Picker, DatePicker } from 'native-base';
import { colors } from '../../assets';

export const InputQ = (props) => {
  return (
    <View style={[styles.inputBox, props.styleContent]}>
      <Input
        inputStyle={styles.input}
        label={props.label}
        labelStyle={styles.label}
        onChangeText={props.onChangeText}
        value={props.value}
        placeholder={props.placeholder ? props.placeholder : props.label}
        secureTextEntry={props.secureTextEntry}
        placeholderTextColor={colors.gray_strong}
        onSubmitEditing={props.onSubmitEditing}
        keyboardType= {props.kType ? props.kType :'default'}
        maxLength={props.maxLength ? props.maxLength :100}
        leftIcon={
          props.icon && <Icon
            type="FontAwesome5"
            name={props.icon}
            solid
            style={[styles.icon, props.styleIcon]}
          />
        } />
    </View>
  )
}

export const CustomDateInput = (props) => (
  <View style={[styles.inputBox, props.styleContent]}>
    <Label style={[styles.label, props.labelStyle]}>{props.label}</Label>
    {Platform.OS === 'ios' ? <ModalDatePicker
      modalButtonText="Listo"
      renderDate={({ year, month, day, date }) => {
        if (!date) return <Label style={styles.dateLabel}>Selecciona la fecha</Label>

        const dateStr = `${day}-${month}-${year}`
        return <Label>{dateStr}</Label>
      }}
      startDate={moment().subtract(18, 'years').toDate()}
      maxDate={moment().subtract(18, 'years').toDate()}
      minDate={moment().subtract(80, 'years').toDate()}
      onDateChanged={props.onChangeText}
    /> :
      <DatePicker
        androidMode="spinner"
        placeHolderText="Selecciona la fecha"
        placeHolderTextStyle={styles.dateLabel}
        textStyle={styles.label}
        maximumDate={moment().subtract(18, 'years').toDate()}
        onDateChange={props.onChangeText}
      />}
  </View >
)

export const CustomPickerInput = (props) => (
  <View style={[{ flex: 1 }, props.containerStyle]}>
  {props.label && <Label style={[styles.pickerLabel]}>{props.label}</Label>}
    <View style={[styles.pickerContainer, props.pickerStyle]}>
      <Picker
        mode="dropdown"
        placeholder={props.placeholder && "Selecciona"}
        headerBackButtonText="Regresar"
        iosHeader="Seleccionar"
        iosIcon={<Icon name="arrow-down" />}
        style={styles.picker}
        selectedValue={props.value}
        onValueChange={props.onChangeText}
      >
        <Picker.Item label="Selecciona"></Picker.Item>
        {props.items.map((item, index) => <Picker.Item key={`picker-${index}`} label={item.label} value={item.value}></Picker.Item>)}
      </Picker>
    </View>
  </View>
)

const styles = StyleSheet.create({
  label: {
    color: colors.black,
    marginBottom: verticalScale(4),
    marginTop: verticalScale(5),
    fontSize: moderateScale(12),
    lineHeight: moderateScale(14),
    fontWeight: 'bold',
    fontFamily: 'Roboto'
  },
  inputBox: {
    marginBottom: verticalScale(10)
  },
  input: {
    fontFamily: 'Roboto'
  },
  icon: {
    color: colors.black_strong,
    marginRight: moderateScale(10),
    fontSize: moderateScale(15)
  },
  dateLabel: {
    color: colors.gray_strong
  },
  pickerLabel: {
    color: colors.black,
    margin: moderateScale(5),
    fontSize: moderateScale(12),
    fontWeight: 'bold',
    fontFamily: 'Roboto'
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
