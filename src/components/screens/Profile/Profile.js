import React, { Component } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import { moderateScale, scale } from 'react-native-size-matters';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getProfile, onChangeProfile, onSubmitProfile, getProfilePicture, logout } from '../../../store/actions';
import { HeaderQ, UserInfo } from '../../common';
import { images, colors } from '../../../assets';
import styles from './Profile.styles';
import { Row, Left, Right } from 'native-base';

class Profile extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      header: false,
      gesturesEnabled: params && params.enableGestures
    };
  };

  state = {
    hasFieldChanged: false,
    iconStyle: "primary",
    icon: "pencil-alt"
  }

  componentWillMount() {
    this.props.getProfile(false);
    this.props.getProfilePicture();
    this.props.navigation.setParams({ enableGestures: true });
  }

  logout() {
    this.props.logout();
  }

  _renderFooter() {
    let { profile } = this.props;
    let { loading_logout } = profile
    if (loading_logout) return (<ActivityIndicator style={{ marginTop: moderateScale(8) }} color={colors.primary} />)
    return (
      <TouchableOpacity
        onPress={this.state.hasFieldChanged ? () => this.props.onSubmitProfile(this.props.profile, this.props.navigation) : this.logout.bind(this)}
        style={[styles.footerCard, { height: undefined }]}>
        <Text style={styles.textButton}>
          {this.state.hasFieldChanged ? 'Guardar' : 'Cerrar Sesión'}
        </Text>
      </TouchableOpacity>
    )
  }

  _onCancelPress() {
    this.setState({ hasFieldChanged: false, iconStyle: "primary", icon: "pencil-alt" })
    this.props.navigation.setParams({ enableGestures: true });
    this.props.onChangeProfile({ key: 'user_photo', value: null })
    this.props.onChangeProfile({ key: 'mimeType', value: null })
  }

  openCamera() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      cropperToolbarTitle: 'Editar Foto',
      cropperStatusBarColor: colors.secondary,
      cropperToolbarColor: colors.secondary,
      includeBase64: true
    }).then(image => {
      this.setState({ hasFieldChanged: true, iconStyle: "danger", icon: "times" })
      this.props.navigation.setParams({ enableGestures: false });
      this.props.onChangeProfile({ key: 'user_photo', value: image.data })
      this.props.onChangeProfile({ key: 'mimeType', value: image.mime })
    }).catch(error => {
      console.log(error)
    });
  }

  render() {
    let { icon, iconStyle, hasFieldChanged } = this.state
    let { navigation, profile } = this.props;
    let { user, user_photo, loading, mimeType } = profile
    return (
      <HeaderQ
        navigation={navigation}
        title="Perfil"
        contentStyle={[styles.containerStyle, { backgroundColor: colors.secondary }]}
        noback={this.state.hasFieldChanged}
        footer={!loading && this._renderFooter()}
      >
        <UserInfo
          photo={loading ? images.photo : user_photo ? { uri: `data:${mimeType || 'image/jpeg'};base64,${user_photo}` } : images.nophoto}
          onPress={loading ? null : hasFieldChanged ? this._onCancelPress.bind(this) : this.openCamera.bind(this)}
          username={loading ? 'Cargando...' : user ? `${user.primerNombre} ${user.primerApellido}` : ''}
          iconStyle={iconStyle}
          icon={icon}
        />

        {loading ? <View style={styles.bodyCard}><ActivityIndicator style={{ marginTop: moderateScale(8) }} color={colors.primary} size="large" /></View> : <View style={[styles.bodyCard, { height: scale(300) }]}>
          {/* <View style={styles.bodyCardItems}>
            <View style={[styles.bodyItem, { height: null }]}> */}
          <Text style={[styles.titleBodyNew, { flex: 0 }]}>
            {'Datos personales'}
          </Text>
          <Row>
            <Left><Text style={styles.itemTextLeft}>Numero distribuidor:</Text></Left>
            <Right><Text style={[styles.itemTextRight, { textAlign: 'right'}]}>#{user.distribuidorId}</Text></Right>
          </Row>
          {user.telefonos && <Row>
            <Left><Text style={styles.itemTextLeft}>Télefono:</Text></Left>
            <Right><Text style={[styles.itemTextRight, { textAlign: 'right'}]}>{user.telefonos[0].telefonoTipo}</Text></Right>
          </Row>}
          {user.direcciones && <Row>
            <Left><Text style={styles.itemTextLeft}>Dirección:</Text></Left>
            <Right><Text style={[styles.itemTextRight, { textAlign: 'right'}]}>{`${user.direcciones[0].calle} #${user.direcciones[0].numExterior}, ${user.direcciones[0].colonia}`}</Text></Right>
          </Row>}
          {user.categoria && <Row>
            <Left><Text style={styles.itemTextLeft}>Categoría:</Text></Left>
            <Right><Text style={[styles.itemTextRight, { textAlign: 'right'}]}>{user.categoria.categoriaDesc}</Text></Right>
          </Row>}
          {user.coordinador && <Row>
            <Left><Text style={styles.itemTextLeft}>Coordinador:</Text></Left>
            <Right><Text style={[styles.itemTextRight, { textAlign: 'right'}]}>{user.coordinador.coordinadorDesc}</Text></Right>
          </Row>}
          {/* </View>
          </View> */}
        </View>}
      </HeaderQ>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.user
});

const mapDispatchToProps = {
  getProfile,
  onChangeProfile,
  onSubmitProfile,
  getProfilePicture,
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
