import React, { PureComponent } from 'react';
import { getVersion } from "react-native-device-info";
import { View, Image, Text } from 'react-native';
import { Container, Root, Header, Content } from 'native-base';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { colors, images } from '../../../assets';
import { connect } from 'react-redux';
import Form from './Form';
import LoginStyles from './Login.styles';

class Login extends PureComponent {
  render() {
    return (
      <Root>
        <Container style={{ backgroundColor: colors.secondary }}>
          <Header noShadow androidStatusBarColor={colors.secondary} iosBarStyle="light-content" style={{ height: verticalScale(20), backgroundColor: colors.secondary }} />
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: moderateScale(8) }}>
            <Image source={images.logo} style={{ width: scale(180), height: verticalScale(75) }} />
            <Text style={[LoginStyles.textInput, { fontSize: moderateScale(20), color: 'white' }]}>v. {getVersion()}</Text>
            <Image source={images.sublogo} style={{ width: scale(180), height: verticalScale(75) }} />
          </View>
          <Content padder contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
            <Form />
          </Content>
        </Container>
      </Root>
    );
  }
}

const mapStateToProps = state => ({
  ...state.user
});

const mapDispatchToProps = dispatch => ({
  // fnBlaBla: () => dispatch(action.name()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

