/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  ImageBackground,
  Modal,
  Platform,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../context/AuthContext';
import { TextInput } from 'react-native-gesture-handler';
import ImageCropPicker from 'react-native-image-crop-picker';

const ProfileScreen = ({ navigation }) => {
  const [showChooseImageOrCamera, setShowChooseImageOrCamera] = useState(false);
  const [show, setShow] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [values, setValues] = useState(null);
  const { userInfo } = useContext(AuthContext);
  const [image, setImage] = useState(
    'https://data-gcdn.basecdn.net/avatar/sys7115/08/92/d1/89/23/d684814d59f43e63dad5aa1abd55759e/0.lamhoang03450_7115.jpg?ts=1670553549',
  );
  const [pwd, setPwd] = useState({
    currentPwd: {
      val: '',
      security: true,
    },
    newPwd: {
      val: '',
      security: true,
    },
    retypePwd: {
      val: '',
      security: true,
    },
  });
  const [info, setInfo] = useState({
    fullname: '',
    avatar: '',
    birthday: {
      day: '',
      month: '',
      year: '',
    },
  });
  const SID = `0${userInfo?.id}`;
  const configCurrent = {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 9,
  };

  const handleShowModal = val => {
    setShow(true);
    setTitleModal(val === 'pwd' ? 'Cập nhật mật khẩu' : 'Chỉnh sửa thông tin');
    setValues(val);
  };

  const handleSavePass = () => {
    console.log(pwd);
    setShow(false);
  };

  const handleSaveInfo = () => {
    console.log(info);
    setShow(false);
  };

  const handleCancel = () => {
    setShow(false);
    setPwd({
      currentPwd: {
        val: '',
        security: true,
      },
      newPwd: {
        val: '',
        security: true,
      },
      retypePwd: {
        val: '',
        security: true,
      },
    });
    setInfo({
      fullname: '',
      avatar: '',
      birthday: '',
    });
  };

  const handleShowImage = () => {
    setShow(false);
    setShowChooseImageOrCamera(true);
  }

  const handleCloseShowChooseImageOrCamera = () => {
    setShow(true);
    setShowChooseImageOrCamera(false);
  }

  const takePhotoFromCamera = () => {
    ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setShowChooseImageOrCamera(false);
      setShow(true);
      setImage(image.path);
      setInfo({
        avatar: image.path,
        fullname: info.fullname,
        birthday: info.birthday
      })
    })
  }

  const choosePhotoFromLibarary = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      ropping: true,
    }).then(image => {
      setShowChooseImageOrCamera(false);
      setShow(true);
      setImage(image.path);
      setInfo({
        avatar: image.path,
        fullname: info.fullname,
        birthday: info.birthday
      })
    })
  }

  return (
    <>
      <SafeAreaView>
        <SafeAreaView style={{ display: 'flex', flexDirection: 'column' }}>
          <View
            style={{
              height: '8%',
              backgroundColor: '#003868',
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 10,
              paddingRight: 10,
            }}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Feather name="menu" style={{ fontSize: 20, color: '#fff' }} />
            </TouchableOpacity>
            <Text style={{ color: '#fff' }}>
              Thông tin cá nhân
            </Text>
            <View style={{ display: 'flex' }} />
          </View>
          <ScrollView
            style={{
              display: 'flex',
              height: '80%',
              padding: 16,
            }}>
            {/* Avatar */}
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={require('../assets/images/user-profile.jpg')}
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                  marginBottom: 10,
                }}
              />
            </View>
            {/* SID */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                height: 50,
                flex: 1,
              }}>
              <Text style={{ fontSize: 12, fontWeight: '600', minWidth: 95 }}>
                SID:
              </Text>
              <TextInput
                style={{
                  borderColor: '#00000222',
                  borderWidth: 1,
                  padding: 4,
                  flex: 1,
                  borderRadius: 2,
                  fontSize: 12,
                  paddingLeft: 8,
                  color: '#003868',
                }}
                editable={false}
                selectTextOnFocus={false}
                value={SID}
              />
            </View>
            {/* Fullname */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                height: 50,
                flex: 1,
              }}>
              <Text style={{ fontSize: 12, fontWeight: '600', minWidth: 95 }}>
                Họ và tên:
              </Text>
              <TextInput
                style={{
                  borderColor: '#00000222',
                  borderWidth: 1,
                  padding: 4,
                  flex: 1,
                  borderRadius: 2,
                  fontSize: 12,
                  paddingLeft: 8,
                  color: '#003868',
                }}
                editable={false}
                selectTextOnFocus={false}
                value={userInfo?.fullname}
              />
            </View>
            {/* Department */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                height: 50,
                flex: 1,
              }}>
              <Text style={{ fontSize: 12, fontWeight: '600', minWidth: 95 }}>
                Bộ phận:
              </Text>
              <TextInput
                style={{
                  borderColor: '#00000222',
                  borderWidth: 1,
                  padding: 4,
                  flex: 1,
                  borderRadius: 2,
                  fontSize: 12,
                  paddingLeft: 8,
                  color: '#003868',
                }}
                editable={false}
                selectTextOnFocus={false}
                value={userInfo?.department}
              />
            </View>
            {/* Base Salary */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                height: 50,
                flex: 1,
              }}>
              <Text style={{ fontSize: 12, fontWeight: '600', minWidth: 95 }}>
                Lương CB :
              </Text>
              <TextInput
                style={{
                  borderColor: '#00000222',
                  borderWidth: 1,
                  padding: 4,
                  flex: 1,
                  borderRadius: 2,
                  fontSize: 12,
                  paddingLeft: 8,
                  color: '#003868',
                }}
                editable={false}
                selectTextOnFocus={false}
                value={new Intl.NumberFormat('vi-VN', configCurrent).format(
                  userInfo?.['base-salary'] || 9000000,
                )}
              />
            </View>
            {/* Commuting Assistance */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                height: 50,
                flex: 1,
              }}>
              <Text style={{ fontSize: 12, fontWeight: '600', minWidth: 95 }}>
                Hỗ trợ đi lại :
              </Text>
              <TextInput
                style={{
                  borderColor: '#00000222',
                  borderWidth: 1,
                  padding: 4,
                  flex: 1,
                  borderRadius: 2,
                  fontSize: 12,
                  paddingLeft: 8,
                  color: '#003868',
                }}
                editable={false}
                selectTextOnFocus={false}
                value={new Intl.NumberFormat('vi-VN', configCurrent).format(
                  userInfo?.['commuting-assistance'] || 1000000,
                )}
              />
            </View>
            {/* Housing assistance */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                height: 50,
                flex: 1,
              }}>
              <Text style={{ fontSize: 12, fontWeight: '600', minWidth: 95 }}>
                Hỗ trợ nhà ở :
              </Text>
              <TextInput
                style={{
                  borderColor: '#00000222',
                  borderWidth: 1,
                  padding: 4,
                  flex: 1,
                  borderRadius: 2,
                  fontSize: 12,
                  paddingLeft: 8,
                  color: '#003868',
                }}
                editable={false}
                selectTextOnFocus={false}
                value={new Intl.NumberFormat('vi-VN', configCurrent).format(
                  userInfo?.['housing-assistance'] || 3000000,
                )}
              />
            </View>
            {/* Phone fee */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                height: 50,
                flex: 1,
              }}>
              <Text style={{ fontSize: 12, fontWeight: '600', minWidth: 95 }}>
                Tiền điện thoại :
              </Text>
              <TextInput
                style={{
                  borderColor: '#00000222',
                  borderWidth: 1,
                  padding: 4,
                  flex: 1,
                  borderRadius: 2,
                  fontSize: 12,
                  paddingLeft: 8,
                  color: '#003868',
                }}
                editable={false}
                selectTextOnFocus={false}
                value={new Intl.NumberFormat('vi-VN', configCurrent).format(
                  userInfo?.['phone-fee'] || 1000000,
                )}
              />
            </View>
            {/* Slippage support */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                height: 50,
                flex: 1,
              }}>
              <Text style={{ fontSize: 12, fontWeight: '600', minWidth: 95 }}>
                Hỗ trợ trượt giá :
              </Text>
              <TextInput
                style={{
                  borderColor: '#00000222',
                  borderWidth: 1,
                  padding: 4,
                  flex: 1,
                  borderRadius: 2,
                  fontSize: 12,
                  paddingLeft: 8,
                  color: '#003868',
                }}
                editable={false}
                selectTextOnFocus={false}
                value={new Intl.NumberFormat('vi-VN', configCurrent).format(
                  userInfo?.['slippage-support'] || 1000000,
                )}
              />
            </View>
            {/* BHXH */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                height: 50,
                flex: 1,
              }}>
              <Text style={{ fontSize: 12, fontWeight: '600', minWidth: 95 }}>
                BHXH :
              </Text>
              <TextInput
                style={{
                  borderColor: '#00000222',
                  borderWidth: 1,
                  padding: 4,
                  flex: 1,
                  borderRadius: 2,
                  fontSize: 12,
                  paddingLeft: 8,
                  color: '#003868',
                }}
                editable={false}
                selectTextOnFocus={false}
                value={Number(userInfo?.bhxh / 100 || 8 / 100).toLocaleString(
                  undefined,
                  { style: 'percent', minimumFractionDigits: 1 },
                )}
              />
            </View>
            {/* BHYT */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                height: 50,
                flex: 1,
              }}>
              <Text style={{ fontSize: 12, fontWeight: '600', minWidth: 95 }}>
                BHYT :
              </Text>
              <TextInput
                style={{
                  borderColor: '#00000222',
                  borderWidth: 1,
                  padding: 4,
                  flex: 1,
                  borderRadius: 2,
                  fontSize: 12,
                  paddingLeft: 8,
                  color: '#003868',
                }}
                editable={false}
                selectTextOnFocus={false}
                value={Number(userInfo?.bhyt / 100 || 1.5 / 100).toLocaleString(
                  undefined,
                  { style: 'percent', minimumFractionDigits: 1 },
                )}
              />
            </View>
            {/* BHTN */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                height: 50,
                flex: 1,
              }}>
              <Text style={{ fontSize: 12, fontWeight: '600', minWidth: 95 }}>
                BHTN :
              </Text>
              <TextInput
                style={{
                  borderColor: '#00000222',
                  borderWidth: 1,
                  padding: 4,
                  flex: 1,
                  borderRadius: 2,
                  fontSize: 12,
                  paddingLeft: 8,
                  color: '#003868',
                }}
                editable={false}
                selectTextOnFocus={false}
                value={Number(userInfo?.bhtn / 100 || 1 / 100).toLocaleString(
                  undefined,
                  { style: 'percent', minimumFractionDigits: 1 },
                )}
              />
            </View>
            {/* KPCĐ */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                height: 50,
                flex: 1,
                marginBottom: 12,
              }}>
              <Text style={{ fontSize: 12, fontWeight: '600', minWidth: 95 }}>
                KPCĐ :
              </Text>
              <TextInput
                style={{
                  borderColor: '#00000222',
                  borderWidth: 1,
                  padding: 4,
                  flex: 1,
                  borderRadius: 2,
                  fontSize: 12,
                  paddingLeft: 8,
                  color: '#003868',
                }}
                editable={false}
                selectTextOnFocus={false}
                value={Number(userInfo?.kpcd / 100 || 1 / 100).toLocaleString(
                  undefined,
                  { style: 'percent', minimumFractionDigits: 1 },
                )}
              />
            </View>
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              justifyContent: 'center',
              height: '10%',
            }}>
            <TouchableOpacity
              onPress={() => handleShowModal('pwd')}
              style={{ backgroundColor: '#003868', padding: 12, borderRadius: 4 }}>
              <Text style={{ color: '#fff', fontSize: 14 }}>Cập nhật mật khẩu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleShowModal('info')}
              style={{ backgroundColor: '#0ea5e9', padding: 12, borderRadius: 4 }}>
              <Text style={{ color: '#fff', fontSize: 14 }}>
                Chỉnh sửa thông tin
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        {show && (
          <Modal
            visible={show}
            onDismiss={() => setShow(false)}
            animationType="slide"
            transparent={true}>
            <>
              <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#00000042',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    zIndex: 1,
                  }}
                  onPress={() => setShow(false)}
                />
                <View
                  style={{
                    backgroundColor: '#fff',
                    marginLeft: 16,
                    marginRight: 16,
                    overflow: 'scroll',
                    position: 'absolute',
                    zIndex: 2,
                    width: '80%',
                    borderRadius: 8,
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      padding: 8,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: '#e5e1e1',
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        textTransform: 'uppercase',
                        fontWeight: '600',
                      }}>
                      {titleModal}
                    </Text>
                    <TouchableOpacity onPress={handleCancel}>
                      <Ionicons
                        name="close"
                        style={{ fontSize: 20, color: '#003868' }}
                      />
                    </TouchableOpacity>
                  </View>
                  <ScrollView style={{ padding: 16, marginBottom: 16 }}>
                    {values === 'pwd' && (
                      <>
                        <View style={{ display: 'flex', gap: 4 }}>
                          {/* Current Password */}
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 8,
                              height: 40,
                              flex: 1,
                            }}>
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: '600',
                                minWidth: 110,
                              }}>
                              Mật khẩu hiện tại:
                            </Text>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                              <TextInput
                                style={{
                                  borderColor: '#00000222',
                                  borderWidth: 1,
                                  padding: 10,
                                  flex: 1,
                                  borderRadius: 2,
                                  fontSize: 12,
                                  paddingLeft: 8,
                                  color: '#003868',
                                  borderRadius: 4,
                                }}
                                value={pwd?.currentPwd?.val}
                                secureTextEntry={pwd?.currentPwd?.security}
                                onChangeText={text =>
                                  setPwd({
                                    currentPwd: {
                                      val: text,
                                      security: true,
                                    },
                                    newPwd: {
                                      val: pwd.newPwd.val,
                                      security: true,
                                    },
                                    retypePwd: {
                                      val: pwd.retypePwd.val,
                                      security: true,
                                    },
                                  })
                                }
                              />
                              {pwd.currentPwd.val && (
                                <TouchableOpacity onPress={() => setPwd({
                                  currentPwd: {
                                    val: pwd.currentPwd.val,
                                    security: !pwd.currentPwd.security,
                                  },
                                  newPwd: {
                                    val: pwd.newPwd.val,
                                    security: pwd.newPwd.security,
                                  },
                                  retypePwd: {
                                    val: pwd.retypePwd.val,
                                    security: pwd.retypePwd.security,
                                  },
                                })}>
                                  <Feather name={`${pwd.currentPwd.security ? 'eye-off' : 'eye'}`} size={20} />
                                </TouchableOpacity>
                              )}

                            </View>
                          </View>
                          {/* Current Password */}
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 8,
                              height: 40,
                              flex: 1,
                            }}>
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: '600',
                                minWidth: 110,
                              }}>
                              Mật khẩu mới:
                            </Text>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                              <TextInput
                                style={{
                                  borderColor: '#00000222',
                                  borderWidth: 1,
                                  padding: 10,
                                  flex: 1,
                                  borderRadius: 2,
                                  fontSize: 12,
                                  paddingLeft: 8,
                                  color: '#003868',
                                  borderRadius: 4,
                                }}
                                value={pwd?.newPwd?.val}
                                secureTextEntry={pwd?.newPwd?.security}
                                onChangeText={text =>
                                  setPwd({
                                    currentPwd: {
                                      val: pwd.currentPwd.val,
                                      security: true,
                                    },
                                    newPwd: {
                                      val: text,
                                      security: true,
                                    },
                                    retypePwd: {
                                      val: pwd?.retypePwd.val,
                                      security: true,
                                    },
                                  })
                                }
                              />
                              {pwd.newPwd.val && (
                                <TouchableOpacity onPress={() => setPwd({
                                  currentPwd: {
                                    val: pwd.currentPwd.val,
                                    security: pwd.currentPwd.security,
                                  },
                                  newPwd: {
                                    val: pwd.newPwd.val,
                                    security: !pwd.newPwd.security,
                                  },
                                  retypePwd: {
                                    val: pwd.retypePwd.val,
                                    security: pwd.retypePwd.security,
                                  },
                                })}>
                                  <Feather name={`${pwd.newPwd.security ? 'eye-off' : 'eye'}`} size={20} />
                                </TouchableOpacity>
                              )}
                            </View>
                          </View>
                          {/* Retype Password */}
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 8,
                              height: 40,
                              flex: 1,
                            }}>
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: '600',
                                minWidth: 110,
                              }}>
                              Nhập lại mật khẩu:
                            </Text>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                              <TextInput
                                style={{
                                  borderColor: '#00000222',
                                  borderWidth: 1,
                                  padding: 10,
                                  flex: 1,
                                  borderRadius: 2,
                                  fontSize: 12,
                                  paddingLeft: 8,
                                  color: '#003868',
                                }}
                                value={pwd?.retypePwd?.val}
                                secureTextEntry={pwd?.retypePwd?.security}
                                onChangeText={text =>
                                  setPwd({
                                    currentPwd: {
                                      val: pwd.currentPwd.val,
                                      security: true,
                                    },
                                    newPwd: {
                                      val: pwd.newPwd.val,
                                      security: true,
                                    },
                                    retypePwd: {
                                      val: text,
                                      security: true,
                                    },
                                  })
                                }
                              />
                              {pwd.retypePwd.val && (
                                <TouchableOpacity onPress={() => setPwd({
                                  currentPwd: {
                                    val: pwd.currentPwd.val,
                                    security: pwd.currentPwd.security,
                                  },
                                  newPwd: {
                                    val: pwd.newPwd.val,
                                    security: pwd.newPwd.security,
                                  },
                                  retypePwd: {
                                    val: pwd.retypePwd.val,
                                    security: !pwd.retypePwd.security,
                                  },
                                })}>
                                  <Feather name={`${pwd.retypePwd.security ? 'eye-off' : 'eye'}`} size={20} />
                                </TouchableOpacity>
                              )}
                            </View>
                          </View>
                        </View>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 16,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 8,
                          }}>
                          <TouchableOpacity
                            onPress={handleSavePass}
                            style={{
                              backgroundColor: '#059669',
                              padding: 12,
                              borderRadius: 4,
                              paddingLeft: 20,
                              paddingRight: 20,
                            }}>
                            <Text style={{ color: '#fff' }}>Cập nhật</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={handleCancel}
                            style={{
                              backgroundColor: '#e11d48',
                              padding: 12,
                              borderRadius: 4,
                              paddingLeft: 20,
                              paddingRight: 20,
                            }}>
                            <Text style={{ color: '#fff' }}>Hủy bỏ</Text>
                          </TouchableOpacity>
                        </View>
                      </>
                    )}
                    {values === 'info' && (
                      <>
                        <View style={{ alignItems: 'center' }}>
                          <TouchableOpacity onPress={handleShowImage}>
                            {/* Avatar */}
                            <View
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 100,
                                width: 100,
                                borderRadius: 15,
                              }}>
                              <ImageBackground
                                source={{
                                  uri: image,
                                }}
                                style={{
                                  height: 100,
                                  width: 100,
                                }}
                                imageStyle={{ borderRadius: 15 }}>
                                <View
                                  style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  <Icon
                                    name="camera"
                                    size={35}
                                    color="#fff"
                                    style={{
                                      opacity: 0.7,
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      borderWidth: 1,
                                      borderColor: '#fff',
                                      borderRadius: 10,
                                    }}
                                  />
                                </View>
                              </ImageBackground>
                            </View>
                          </TouchableOpacity>
                          {/* Fullname */}
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 8,
                              height: 50,
                              flex: 1,
                            }}>
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: '600',
                                minWidth: 70,
                              }}>
                              Tên hiển thị:
                            </Text>
                            <TextInput
                              style={{
                                borderColor: '#00000222',
                                borderWidth: 1,
                                padding: 10,
                                flex: 1,
                                borderRadius: 2,
                                fontSize: 12,
                                paddingLeft: 8,
                                color: '#003868',
                              }}
                              value={info.fullname}
                              onChangeText={text =>
                                setPwd({
                                  fullname: text,
                                  avatar: info.avatar,
                                  birthday: info.birthday,
                                })
                              }
                            />
                          </View>
                          {/* Birthday */}
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 8,
                              height: 50,
                            }}>
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: '600',
                                minWidth: 70,
                              }}>
                              Ngày sinh:
                            </Text>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 8,
                                flex: 1,
                              }}>
                              <TextInput
                                style={{
                                  borderColor: '#00000222',
                                  borderWidth: 1,
                                  padding: 10,
                                  borderRadius: 2,
                                  fontSize: 12,
                                  paddingLeft: 8,
                                  color: '#003868',
                                  flex: 1,
                                }}
                                value={info?.birthday?.day}
                                placeholder={'Ngày'}
                                placeholderTextColor={'#666666'}
                                keyboardType={'numeric'}
                                onChangeText={text =>
                                  setInfo({
                                    fullname: info.fullname,
                                    avatar: info.avatar,
                                    birthday: {
                                      day: text,
                                      month: info.birthday.month,
                                      year: info.birthday.year,
                                    },
                                  })
                                }
                              />
                              <TextInput
                                style={{
                                  borderColor: '#00000222',
                                  borderWidth: 1,
                                  padding: 10,
                                  borderRadius: 2,
                                  fontSize: 12,
                                  paddingLeft: 8,
                                  color: '#003868',
                                  flex: 1,
                                }}
                                value={info?.birthday?.month}
                                placeholder={'Tháng'}
                                keyboardType={'numeric'}
                                placeholderTextColor={'#666666'}
                                onChangeText={text =>
                                  setInfo({
                                    fullname: info.fullname,
                                    avatar: info.avatar,
                                    birthday: {
                                      day: info.birthday.day,
                                      month: text,
                                      year: info.birthday.year,
                                    },
                                  })
                                }
                              />
                              <TextInput
                                style={{
                                  borderColor: '#00000222',
                                  borderWidth: 1,
                                  padding: 10,
                                  borderRadius: 2,
                                  fontSize: 12,
                                  paddingLeft: 8,
                                  color: '#003868',
                                  flex: 1,
                                }}
                                value={info?.birthday?.year}
                                placeholder={'Năm'}
                                keyboardType={'numeric'}
                                placeholderTextColor={'#666666'}
                                onChangeText={text =>
                                  setInfo({
                                    fullname: info.fullname,
                                    avatar: info.avatar,
                                    birthday: {
                                      day: info.birthday.day,
                                      month: info.birthday.month,
                                      year: text,
                                    },
                                  })
                                }
                              />
                            </View>
                          </View>
                        </View>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 16,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 8,
                          }}>
                          <TouchableOpacity
                            onPress={handleSaveInfo}
                            style={{
                              backgroundColor: '#059669',
                              padding: 12,
                              borderRadius: 4,
                              paddingLeft: 20,
                              paddingRight: 20,
                            }}>
                            <Text style={{ color: '#fff' }}>Cập nhật</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={handleCancel}
                            style={{
                              backgroundColor: '#e11d48',
                              padding: 12,
                              borderRadius: 4,
                              paddingLeft: 20,
                              paddingRight: 20,
                            }}>
                            <Text style={{ color: '#fff' }}>Hủy bỏ</Text>
                          </TouchableOpacity>

                        </View>
                      </>
                    )}
                  </ScrollView>
                </View>
              </View>
            </>
          </Modal>
        )}
        {showChooseImageOrCamera && (
          <Modal
            visible={showChooseImageOrCamera}
            onDismiss={handleCloseShowChooseImageOrCamera}
            animationType="slide"
            transparent={true}>
            <View style={{ width: '100%', height: '100%', justifyContent: 'flex-end' }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#00000042',
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  zIndex: 1,
                }}
                onPress={handleCloseShowChooseImageOrCamera}
              />
              <View
                style={{
                  backgroundColor: '#fff',
                  overflow: 'scroll',
                  position: 'absolute',
                  zIndex: 2,
                  width: '100%',
                  borderRadius: 8,
                  padding: 16,
                  paddingBottom: 32,
                }}>
                <View style={{ display: 'flex', gap: 16 }}>
                  <View style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Tải ảnh đại diện</Text>
                    <Text style={{ color: '#666666', fontSize: 12 }}>Chọn ảnh của bạn</Text>
                  </View>
                  <View style={{ display: 'flex', gap: 8 }}>
                    <TouchableOpacity onPress={takePhotoFromCamera} style={{ backgroundColor: '#f97316', display: 'flex', alignItems: 'center', padding: 16, borderRadius: 8 }}>
                      <Text style={{ color: '#fff', fontSize: 17 }}>Chụp ảnh</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={choosePhotoFromLibarary} style={{ backgroundColor: '#f97316', display: 'flex', alignItems: 'center', padding: 16, borderRadius: 8 }}>
                      <Text style={{ color: '#fff', fontSize: 17 }}>Chọn ảnh từ thư viện</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleCloseShowChooseImageOrCamera} style={{ backgroundColor: '#f97316', display: 'flex', alignItems: 'center', padding: 16, borderRadius: 8 }}>
                      <Text style={{ color: '#fff', fontSize: 17 }}>Huỷ bỏ</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        )}
      </SafeAreaView>
      
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={{ position: 'absolute', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, zIndex: 999, backgroundColor: '#22c55e', bottom: 24, right: 20 }}>
        <FontAwesome name="home" size={24} color={'#fff'} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 1 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});

export default ProfileScreen;
