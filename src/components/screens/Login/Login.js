import React, { PureComponent } from 'react';
import { View, Image } from 'react-native';
import { Container, Root, Header, Content } from 'native-base';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { colors, images } from '../../../assets';
import { connect } from 'react-redux';
import Form from './Form';

class Login extends PureComponent {
  render() {
    return (
      <Root>
        <Container style={{ backgroundColor: colors.secondary }}>
          <Header noShadow transparent androidStatusBarColor={colors.secondary} iosBarStyle="light-content" style={{ height: verticalScale(50) }}/>            
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: moderateScale(8) }}>
            <Image source={images.logo} style={{ width: scale(180), height: verticalScale(75) }} />
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

