import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { colors } from '../../assets';

const Spinner = ({ color, size }) => (
  <View style={{ flex: 1, justifyContent: 'center' }}>
    <ActivityIndicator size={size || 'large'} color={color || colors.secondary} />
  </View>
);

export { Spinner };
