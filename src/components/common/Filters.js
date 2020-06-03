import React from 'react';
import moment from 'moment';
import ModalDatePicker from 'react-native-datepicker-modal'
import { moderateScale } from 'react-native-size-matters';
import { Text, View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { DatePicker, CheckBox } from 'native-base';
import { colors } from '../../assets';
import styles from '../screens/Loans/Loans.style';
import { CustomPickerInput } from './Input';

const style = StyleSheet.create({
  placeholderText: {
    color: colors.gray,
    marginLeft: moderateScale(8)
  },
  text: {
    width: '100%',
    fontFamily: 'Roboto',
    marginLeft: moderateScale(8),
    color: colors.white
  }
})
const Filters = ({ orderBy, orderByPress, statuses, statusPress, onDateChange, valeSelector, valeSelected, onValeTypeChanged }) => (
  <View style={styles.wrapperFilter}>
    {onValeTypeChanged && <View>
      <View>
        <Text style={styles.txtTitleFilter}>
          MOSTRAR CRÉDITOS DE
      </Text>
      </View>
      <View style={styles.itemWrapperFilter}>
        <CustomPickerInput items={valeSelector} value={valeSelected} onChangeText={onValeTypeChanged} pickerStyle={{ borderColor: colors.white }} placeholder={false} />
      </View>
    </View>}
    <View>
      <Text style={styles.txtTitleFilter}>
        ORDENAR POR
      </Text>
    </View>
    <View style={styles.itemWrapperFilter}>
      <TouchableOpacity onPress={() => orderByPress('asc')} style={[styles.buttonFilter, orderBy == 'asc' ? styles.buttonFilterActive : null, styles.buttonFilterLeftBordered]}>
        <Text style={styles.txtButtonFilter}>A-Z</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => orderByPress('desc')} style={[styles.buttonFilter, orderBy == 'desc' ? styles.buttonFilterActive : null]}>
        <Text style={styles.txtButtonFilter}>Z-A</Text>
      </TouchableOpacity> */}
      <TouchableOpacity onPress={() => orderByPress('desc')} style={[styles.buttonFilter, orderBy == 'desc' ? styles.buttonFilterActive : null, styles.buttonFilterRightBordered]}>
        <Text style={styles.txtButtonFilter}>Z-A</Text>
      </TouchableOpacity>
    </View>
    <View>
      <Text style={styles.txtTitleFilter}>
        ESTATUS DE PRÉSTAMO
      </Text>
      <View style={[styles.wrapperFilterChecks, { marginBottom: moderateScale(10) }]}>
        {
          statuses.map((status, index) => (
            <TouchableOpacity key={`status-${index}`} onPress={() => statusPress({ key: index, value: !status.checked })}>
              <View style={[styles.itemCheck, { flex: 0 }]}>
                <CheckBox onPress={() => statusPress({ key: index, value: !status.checked })} color={colors.primary} checked={status.checked} />
                <Text style={styles.txtCheckbox}>{status.name}</Text>
              </View>
            </TouchableOpacity>
          ))
        }
      </View>
    </View>
    {onDateChange && <View>
      <Text style={styles.txtTitleFilter}>
        FECHA
      </Text>
      <View style={[styles.wrapperFilterChecks]}>
        <View style={styles.itemCheck}>
          <Text style={styles.txtCheckbox}>DESDE: </Text>
          {Platform.OS === 'ios' ? <ModalDatePicker
            modalButtonText="Listo"
            renderDate={({ year, month, day, date }) => {
              if (!date) {
                return <Text style={[style.text, style.placeholderText]}>{moment().format('DD-MM-YYYY')}</Text>
              }

              const dateStr = `${day}-${month}-${year}`
              return <Text style={style.text}>{dateStr}</Text>
            }}
            onDateChanged={(value) => onDateChange({ key: 'dateFrom', value })}
          /> :
            <DatePicker
              androidMode="spinner"
              placeHolderText={moment().format('DD-MM-YYYY')}
              placeHolderTextStyle={[style.text, style.placeholderText]}
              textStyle={style.text}
              onDateChange={(value) => onDateChange({ key: 'dateFrom', value })}
            />}
        </View>
        <View style={styles.itemCheck}>
          <Text style={styles.txtCheckbox}>HASTA: </Text>
          {Platform.OS === 'ios' ? <ModalDatePicker
            modalButtonText="Listo"
            renderDate={({ year, month, day, date }) => {
              if (!date) {
                return <Text style={[style.text, style.placeholderText]}>{moment().format('DD-MM-YYYY')}</Text>
              }

              const dateStr = `${day}-${month}-${year}`
              return <Text style={style.text}>{dateStr}</Text>
            }}
            onDateChanged={(value) => onDateChange({ key: 'dateTo', value })}
          /> :
            <DatePicker
              androidMode="spinner"
              placeHolderText={moment().format('DD-MM-YYYY')}
              placeHolderTextStyle={[style.text, style.placeholderText]}
              textStyle={style.text}
              onDateChange={(value) => onDateChange({ key: 'dateTo', value })}
            />}
        </View>
      </View>
    </View>}
  </View>
);

export { Filters };
