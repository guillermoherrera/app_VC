import React, { Component } from 'react'
import { connect } from 'react-redux';
import { verticalScale, moderateScale, scale } from 'react-native-size-matters';
import { StyleSheet, Platform, Image, Text } from 'react-native'
import { Icon, Left, Body, Right, Title, Button, Header, Container, Content, Footer, Col } from 'native-base';
import { colors, images } from '../../assets';
import navigation from '../../services/navigation';
import { SafeAreaView } from 'react-navigation';
import { getVersion } from 'react-native-device-info';

class HeaderS extends Component {
  render() {
    let { props } = this;
    let color = props.color ? props.color : colors.secondary;
    return (
      <Container>
        <Header noShadow androidStatusBarColor={color} {...props} iosBarStyle="light-content" style={[styles.header, props.headerStyle, { backgroundColor: color }]}>
          <Left style={{ flex: 1, flexDirection: "row", paddingLeft: moderateScale(10) }}>
            {!props.noback ? <Button transparent onPress={() => navigation.goBack(props.noback)}>
              <Icon style={styles.iconBack} name='arrow-back' />
            </Button> : null}
          </Left>
          <Body style={styles.bodyNav}>
            <Col style={{ alignItems: 'center', justifyContent: 'flex-start'}}>
              {!props.title ? <Image style={{ width: moderateScale(150), height: moderateScale(100), marginTop: moderateScale(-10) }} source={!props.imageTitle ? images.logo : images.confiashop}></Image> : <Title style={styles.textTitle}>{props.title}</Title>}
              <Text style={[styles.textTitle, { marginTop: moderateScale(!props.title ? -25 : 0)}]}>v. {getVersion()}</Text>
            </Col>
          </Body>
          <Right style={{ flex: 1, paddingRight: moderateScale(10), alignItems: "center" }}>
            {props.contentLeft}
          </Right>
        </Header>
        <Content
          refreshControl={props.refreshControl}
          scrollEnabled={props.scroll == undefined ? true : props.scroll}
          style={[styles.content, props.contentStyle]}
          contentContainerStyle={props.containerStyle}>
          {props.children}
        </Content>
        {props.footer ? <SafeAreaView>
          <Footer style={{ height: Platform.OS === 'ios' ? scale(35) : scale(40), borderTopColor: 'white', backgroundColor: 'transparent', elevation: Platform.OS === 'android' ? 0 : 1 }}>
            {props.footer}
          </Footer>
        </SafeAreaView> : null}
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bodyNav: {
    flex: 3,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'center',
    alignContent: "center",
    alignSelf: 'center',
  },
  textTitle: {
    fontSize: moderateScale(20),
    marginBottom: moderateScale(20),
    color: colors.white,
    textAlign: 'center',
    alignSelf: 'center',
    lineHeight: moderateScale(23),
    fontWeight: "bold",
    fontFamily: "Roboto"
  },
  iconBack: {
    fontSize: moderateScale(28),
    color: colors.white,
    fontWeight: "bold",
  },
  content: {
    paddingTop: verticalScale(20),
    paddingLeft: moderateScale(25),
    paddingRight: moderateScale(25),
    borderTopRightRadius: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
    marginTop: moderateScale(-15),
    backgroundColor: colors.white
  },
  header: {
    height: verticalScale(130),
    backgroundColor: colors.secondary,
    borderBottomColor: 'transparent'
  },
  fotter: {
    marginBottom: moderateScale(100)
  },
  cart: {
    fontSize: moderateScale(20),
    marginRight: moderateScale(14),
    color: colors.black,
  }
});
const mapStateToProps = (state) => ({ user: state.profile })

const mapDispatchToProps = {}

const HeaderQ = connect(mapStateToProps, mapDispatchToProps)(HeaderS)

export { HeaderQ }