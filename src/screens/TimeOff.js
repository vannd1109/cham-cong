/* eslint-disable jsx-quotes */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from "react-i18next";

const arrTimeOff = [
  {
    id: 'cong-tac',
    name: 'Đi công tá/Làm việc ngoài văn phòng',
    items: [
      'Đơn áp dụng cho các trường hợp nhân viên đi công việc ngoài văn phòng theo yêu cầu của công ty, không thể chấm công',
      'Quy trình phê duyệt: gửi đến quản lý trực tiếp',
    ],
  },
  {
    id: 'nghi-dot-xuat',
    name: 'Đơn nghỉ phép đột xuất',
    items: [
      'Đơn xin nghỉ phép(theo ca/ngày) áp dụng cho trường hợp nghỉ đột xuất',
      'Quy trình phê duyệt: gửi đến quản lý trực tiếp',
      'Nhân sự được tạo trễ 03 ngày so với ngày xin nghỉ phép',
      'Lưu ý: không tính chuyên cần',
    ],
  },
  {
    id: 'duoi-3-ngay',
    name: 'Đơn xin nghỉ phép dưới 3 ngày',
    items: [
      'Đón nghỉ phép theo ca/ngày áp dụng cho trường hợp nghỉ dưới 3 ngày',
      'Quy trình phê duyệt: gửi đến quản lý trực tiếp',
      'Nhân sự phảu tạo trước 01 ngày so với ngày xin nghỉ phép',
    ],
  },
  {
    id: 'tren-3-ngay',
    name: 'Đơn xin nghỉ phép trên 3 ngày',
    items: [
      'Đón nghỉ phép theo ca/ngày áp dụng cho trường hợp nghỉ trên 3 ngày',
      'Quy trình phê duyệt: gửi đến quản lý trực tiếp',
      'Nhân sự phảu tạo trước 03 ngày so với ngày xin nghỉ phép',
    ],
  },
  {
    id: 'bhxh',
    name: 'Nghỉ chế độ BHXH',
    items: [
      'Áp dụng trong trường hợp CBNV nghỉ hưởng chế độ BHXH: ốm đau, tai nạn, chăm sóc con ốm,...',
      'CBNV sẽ được hưởng lương từ nguồn trợ cấp ốm đau do cơ quan H+BHXH chi trả, CBNV có nghĩ vụ tập hợp đầy đủ chứng từ theo theo quy định của Luật BHXH để được thanh toán.',
      'Thời gian tạo: Muộn nhất vào ngày làm việc đầu tiên đi làm trở lại',
    ],
  },
  {
    id: 'co-luong',
    name: 'Nghỉ chế độ có hưởng lương',
    items: [
      'Nghỉ chế độ có hưởng lương: KHÔNG PHẢI NGHỈ PHÉP NĂM \n+ Bản thân kết hôn : nghỉ  3 ngày \n+ Con kết hôn: nghỉ 01 ngày\n+Bố đẻ, mẹ đẻ, bố vợ, mẹ vợ hoặc bố chồng, mẹ chồng chết, vợ chết hoặc chồng chết, con chết: nghỉ 3 ngày.\n+ Các trường hợp nghỉ khác được tính lương theo quy định của công ty.',
      'Thời gian tạo: Đối với nghỉ kết hôn cần tạo ít nhất trước 7 ngày.',
    ],
  },
  {
    id: 'khong-luong',
    name: 'Nghỉ không lương',
    items: [
      'Đơn xin nghỉ không lương dành cho trường hợp nhân viên hết ngày phép năm, xin nghỉ không tính lương.',
      'Quy trình phê duyệt: gửi đến quản lý trực tiếp',
      'Nhân viên phải tạo trước 01 ngày so với ngày xin nghỉ phép',
    ],
  },
  {
    id: 'theo-gio',
    name: 'Nghỉ phép theo giờ',
    items: [
      'Đơn xin nghỉ phép theo giờ',
      'Quy trình phê duyệt: gửi đến quản lý trực tiếp',
      'Nhân viên phải tạo trước 01 ngày so với ngày xin nghỉ phép',
    ],
  },
  {
    id: 'theo-gio-dot-xuat-trong-ngay',
    name: 'Nghỉ phép theo giờ(đột xuất trong ngày)',
    items: [
      'Đơn xin nghỉ phép theo giờ',
      'Quy trình phê duyệt: gửi đến quản lý trực tiếp',
      "Nhân viên phải tạo trong ngày nghỉ đột xuất \nLưu ý: Người phê duyệt chỉ được phê duyệt và Người xác nhận chỉ được xác nhận khi 'Giờ Xin Nghỉ Phép Đột Xuất' phải sau 'Giờ Chấm Công Vào' trong ngày nghỉ\nví dụ 1: người làm việc thuộc ca 2(7h45 - 16h45); neeys Giờ Chấm Công buổi sáng là 7h40, Giờ Xin Nghỉ Phép Đột Xuất được xem là Phù HỢP sẽ sau khung giờ từ 7h45 trở đi -> được Phê Duyệt và Xác Nhận Phiếu này\nví du 2: người làm việc thuộc ca 2; Giờ Chấm Công Vào buổi sáng là 8h15(tức là người này chấm công trễ 30 phút), nếu làm Phiếu này và ghi thời gian xin nghỉ là 7h45-8h15 thì KHÔNG PHÙ HỢP -> KHÔNG được Phê Duyệt và Xác Nhận",
    ],
  },
  {
    id: 'quen-cham-cong',
    name: 'Quên chấm công',
    items: [
      'Phiếu áp dụng cho các trường hợp quên chấm công (bao gồm chấm công đầu ngày hoặc cuối ngày).',
      'Phiếu được tạo trễ tối đa 1 ngày so với ngày quên.',
      'Chỉ được tạo tối đa 3 phiếu/tahngs',
      'Quy trình phê duyệt: quản lý trực tiếp (tổ trưởng/trưởng bộ phận) -> HCNS',
      'Lưu ý: Nếu quên chấm công đầu ngày thì chọn ca sáng, quên chấm công cuối ngày thì chọn ca chiều',
    ],
  },
];

const arrOverview = [
  {
    name: 'Nghỉ phép năm',
    icon: <FontAwesome name="check" size={24} style={{ color: '#32a858' }} />,
    number: 0,
    bg: '#aae68c',
  },
  {
    name: 'Ngày phép còn lại',
    icon: <FontAwesome name="star-o" size={24} style={{ color: '#e0d55c' }} />,
    number: 7.5,
    bg: '#e8e089',
  },
  {
    name: 'Nghỉ cá nhân',
    icon: (
      <FontAwesome name="birthday-cake" size={24} style={{ color: '#8f56db' }} />
    ),
    number: 0,
    bg: '#d4b6fa',
  },
  {
    name: 'Đi công tác',
    icon: (
      <MaterialCommunityIcons
        name="airplane"
        size={24}
        style={{ color: '#4ea9de' }}
      />
    ),
    number: 0,
    bg: '#b9e2fa',
  },
  {
    name: 'Làm việc ngoài văn phòng',
    icon: <FontAwesome5 name="building" size={24} style={{ color: '#58d69f' }} />,
    number: 0,
    bg: '#acfad8',
  },
  {
    name: 'Nghỉ không lương',
    icon: (
      <MaterialIcons name="money-off" size={24} style={{ color: '#d12c31' }} />
    ),
    number: 0,
    bg: '#faa2a5',
  },
  {
    name: 'Các loại khác',
    icon: <Feather name="settings" size={24} style={{ color: '#bfbdbb' }} />,
    number: 0,
    bg: '#f2f2f2',
  },
  {
    name: 'Nghỉ phép năm theo giờ',
    icon: <Fontisto name="clock" size={24} style={{ color: '#db7d39' }} />,
    number: 0,
    bg: '#fad0b1',
  },
  {
    name: 'Nghỉ không lương theo giờ',
    icon: (
      <MaterialIcons name="money-off" size={24} style={{ color: '#d12c31' }} />
    ),
    number: 0,
    bg: '#faa2a5',
  },
  {
    name: 'Làm việc ngoài văn phòng theo giờ',
    icon: <FontAwesome5 name="building" size={24} style={{ color: '#58d69f' }} />,
    number: 0,
    bg: '#acfad8',
  },
];

const TotalScreen = () => {
  return (
    <View>
      <Text>Tổng</Text>
    </View>
  );
};

const TurnScreen = ({ setShow }) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
      }}>
      <Text>
        Bạn chưa tạo bất kỳ đề xuất nghỉ phép nào.
        <Text
          style={{ color: '#003868', fontWeight: '800' }}
          onPress={() => setShow(true)}>
          Tạo đề xuất?
        </Text>
      </Text>
    </View>
  );
};

const ApprovalOverdueScreen = ({ setShow }) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
      }}>
      <Text style={{ fontSize: 12 }}>
        Bạn chưa tạo bất kỳ đề xuất nghỉ phép nào.
        <Text
          style={{ color: '#003868', textDecorationLine: 'underline', fontWeight: '800' }}
          onPress={() => setShow(true)}>
          Tạo đề xuất?
        </Text>
      </Text>
    </View>
  );
};

const PendingApprovalScreen = ({ setShow }) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
      }}>
      <Text style={{ fontSize: 12 }}>
        Bạn chưa tạo bất kỳ đề xuất nghỉ phép nào.
        <Text
          style={{ color: '#003868', textDecorationLine: 'underline', fontWeight: '800' }}
          onPress={() => setShow(true)}>
          Tạo đề xuất?
        </Text>
      </Text>
    </View>
  );
};

const ApprovedScreen = ({ setShow }) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
      }}>
      <Text style={{ fontSize: 12 }}>
        Bạn chưa tạo bất kỳ đề xuất nghỉ phép nào.
        <Text
          style={{ color: '#003868', textDecorationLine: 'underline', fontWeight: '800' }}
          onPress={() => setShow(true)}>
          Tạo đề xuất?
        </Text>
      </Text>
    </View>
  );
};

const DeniedScreen = ({ setShow }) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
      }}>
      <Text style={{ fontSize: 12 }}>
        Bạn chưa tạo bất kỳ đề xuất nghỉ phép nào.
        <Text
          style={{ color: '#003868', textDecorationLine: 'underline', fontWeight: '800' }}
          onPress={() => setShow(true)}>
          Tạo đề xuất?
        </Text>
      </Text>
    </View>
  );
};

const CanceledScreen = ({ setShow }) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
      }}>
      <Text style={{ fontSize: 12 }}>
        Bạn chưa tạo bất kỳ đề xuất nghỉ phép nào.
        <Text
          style={{ color: '#003868', textDecorationLine: 'underline', fontWeight: '800' }}
          onPress={() => setShow(true)}>
          Tạo đề xuất?
        </Text>
      </Text>
    </View>
  );
};

const KindOfWarningScreen = ({ setShow }) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
      }}>
      <Text style={{ fontSize: 12 }}>
        Bạn chưa tạo bất kỳ đề xuất nghỉ phép nào.
        <Text
          style={{ color: '#003868', textDecorationLine: 'underline', fontWeight: '800' }}
          onPress={() => setShow(true)}>
          Tạo đề xuất?
        </Text>
      </Text>
    </View>
  );
};

const VerifiedScreen = ({ setShow }) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
      }}>
      <Text style={{ fontSize: 12 }}>
        Bạn chưa tạo bất kỳ đề xuất nghỉ phép nào.
        <Text
          style={{ color: '#003868', textDecorationLine: 'underline', fontWeight: '800' }}
          onPress={() => setShow(true)}>
          Tạo đề xuất?
        </Text>
      </Text>
    </View>
  );
};

const WaitingForConfirmationScreen = ({ setShow }) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
      }}>
      <Text style={{ fontSize: 12 }}>
        Bạn chưa tạo bất kỳ đề xuất nghỉ phép nào.
        <Text
          style={{ color: '#003868', textDecorationLine: 'underline', fontWeight: '800' }}
          onPress={() => setShow(true)}>
          Tạo đề xuất?
        </Text>
      </Text>
    </View>
  );
};

const TimeOff = ({ navigation }) => {
  const [title, setTitle] = useState('Danh sách đề xuất');
  const [show, setShow] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [tab, setTab] = useState(<TotalScreen />);
  const [currentTab, setCurrentTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentArrayTimeOff, setCurrentArrayTimeOff] = useState([...arrTimeOff]);
  let timer = useRef().current;
  const { t } = useTranslation();

  const tabs = {
    all: {
      name: t('all'),
      component: <TotalScreen />,
    },
    on_my_turn: {
      name: t('on_my_turn'),
      component: <TurnScreen setShow={setShow} />,
    },
    overdue: {
      name: t('overdue'),
      component: <ApprovalOverdueScreen setShow={setShow} />,
    },
    pending: {
      name: t('pending'),
      component: <PendingApprovalScreen setShow={setShow} />,
    },
    approved: {
      name: t('approved'),
      component: <ApprovedScreen setShow={setShow} />,
    },
    rejected: {
      name: t('rejected'),
      component: <DeniedScreen setShow={setShow} />,
    },
    canceled: {
      name: t('canceled'),
      component: <CanceledScreen setShow={setShow} />,
    },
    warning: {
      name: t('Loại cảnh báo'),
      component: <KindOfWarningScreen setShow={setShow} />,
    },
    confirmed: {
      name: t('confirmed'),
      component: <VerifiedScreen setShow={setShow} />,
    },
    needs_confirming: {
      name: t('needs_confirming'),
      component: <WaitingForConfirmationScreen setShow={setShow} />,
    },
  };

  const data = Object.values(tabs).map((item, idx) => ({
    key: idx,
    title: item.name,
    tab: item.component,
  }));

  useEffect(() => {
    setLoading(true);
    timer = setTimeout(() => {
      setLoading(false);
      clearTimeout(timer);
    }, 500);
  }, []);

  const handleChangeTab = item => {
    setTab(item.tab);
    setCurrentTab(item.key);
    setTitle(item.key !== 0 ? item.title : 'Danh sách đề xuất');
    setLoading(true);
    timer = setTimeout(() => {
      setLoading(false);
      clearTimeout(timer);
    }, 1000);
  };

  const Tab = ({ item }) => {
    return (
      <View>
        <Text
          style={{
            fontSize: 12,
            backgroundColor: '#003868',
            padding: 8,
            color: item.key === currentTab ? '#efcb6a' : '#d9d9d9',
          }}
          onPress={() => handleChangeTab(item)}>
          {item.title}
        </Text>
      </View>
    );
  };

  const Tabs = ({ data }) => {
    return (
      <View style={{ width: '100%' }}>
        <ScrollView horizontal style={{ display: 'flex', flexDirection: 'row' }}>
          {data.map(item => {
            return <Tab key={item.key} item={item} />;
          })}
        </ScrollView>
      </View>
    );
  };

  const handleShowSearch = () => {
    setShow(false);
    setCurrentArrayTimeOff([...arrTimeOff]);
  };

  const handleSearch = (txtSearch) => {
    const _arrTimeOff = [];
    for (let i = 0; i < arrTimeOff.length; i++) {
      if (arrTimeOff[i].name.includes(txtSearch)) {
        _arrTimeOff.push(arrTimeOff[i]);
      }
    }
    setCurrentArrayTimeOff(_arrTimeOff);
  };

  return (
    <>
      <SafeAreaView style={{ display: 'flex', flexDirection: 'column' }}>
        <View
          style={{
            height: 40,
            backgroundColor: '#003868',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 10,
            paddingRight: 10,
          }}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons name="menu" style={{ fontSize: 24, color: '#fff' }} />
          </TouchableOpacity>
          <Text style={{ color: '#fff' }}>{title}</Text>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
            <MaterialIcons
              name="bar-chart"
              style={{ fontSize: 24, color: '#fff' }}
              onPress={() => setShowOverview(true)}
            />
            <AntDesign
              name="pluscircleo"
              style={{ fontSize: 24, color: '#fff' }}
              onPress={() => setShow(true)}
            />
          </View>
        </View>
        <Tabs data={data} />
        {loading && (
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              height: '90%',
              backgroundColor: '#00000008',
            }}>
            <ActivityIndicator size="large" />
          </View>
        )}
        {!loading && <View style={{ padding: 8 }}>{tab}</View>}

        {show && (
          <Modal
            visible={show}
            onDismiss={handleShowSearch}
            animationType="slide"
            transparent={true}>
            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ width: '100%', height: '100%', backgroundColor: '#00000042', }}>
                <TouchableOpacity style={{ width: '100%', height: '100%' }} onPress={() => setShow(false)} />
              </View>
              <SafeAreaView style={{ position: 'absolute', width: '80%', backgroundColor: '#FFF' }}>
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
                    Tìm nhóm đề xuất
                  </Text>
                  <TouchableOpacity onPress={() => setShow(false)}>
                    <Ionicons
                      name="close"
                      style={{ fontSize: 24, color: '#003868' }}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: 8,
                    borderBottomColor: '#003868',
                    borderBottomWidth: 1,
                    height: 40,
                  }}>
                  <Ionicons
                    name="search"
                    style={{ fontSize: 12, color: '#00000042' }}
                  />
                  <TextInput placeholder="Tìm nhanh" style={{ fontSize: 13, fontStyle: 'italic', padding: 12, flex: 1 }}
                    placeholderTextColor="#003868" onChangeText={text => handleSearch(text)} />
                </View>
                <View style={{ maxHeight: 500, minHeight: 500 }}>
                  <ScrollView>
                    {currentArrayTimeOff.map(itemTimeOff => (
                      <View
                        key={itemTimeOff.id}
                        style={{
                          borderBottomColor: '#00000042',
                          padding: 8,
                          borderBottomWidth: 0.5,
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#003868',
                            fontWeight: '600',
                          }}>
                          {itemTimeOff.name}
                        </Text>
                        {itemTimeOff.items.map((item, idx) => (
                          <View key={idx}>
                            <Text style={{ fontSize: 10, color: 'gray' }}>
                              {idx + 1}. {item}
                            </Text>
                          </View>
                        ))}
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </SafeAreaView>
            </View>
          </Modal>
        )}
        {showOverview && (
          <Modal
            visible={showOverview}
            onDismiss={() => setShowOverview(false)}
            animationType="slide"
            transparent={true}
          >
            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ width: '100%', height: '100%', backgroundColor: '#00000042', }}>
                <TouchableOpacity style={{ width: '100%', height: '100%' }} onPress={() => setShowOverview(false)} />
              </View>
              <SafeAreaView style={{ position: 'absolute', width: '80%', backgroundColor: '#FFF' }}>
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
                    Thống kê nghỉ phép
                  </Text>
                  <TouchableOpacity onPress={() => setShowOverview(false)}>
                    <Ionicons
                      name="close"
                      style={{ fontSize: 24, color: '#003868' }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ maxHeight: 500 }}>
                  <ScrollView style={{ padding: 16, marginBottom: 16 }}>
                    {arrOverview.map((itemOverview, idx) => (
                      <View
                        key={idx}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 16,
                          borderBottomColor: '#003868',
                          borderBottomWidth: 1,
                          padding: 8,
                          paddingBottom: 16,
                        }}>
                        <View
                          style={{
                            backgroundColor: `${itemOverview?.bg}`,
                            width: 40,
                            height: 40,
                            borderRadius: 50,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          {itemOverview.icon}
                        </View>
                        <View>
                          <Text
                            style={{
                              color: '#000',
                              fontWeight: '800',
                              fontSize: 16,
                            }}>
                            {itemOverview.number.toFixed(2)}
                          </Text>
                          <Text style={{ fontSize: 12 }}>{itemOverview.name}</Text>
                        </View>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </SafeAreaView>
            </View>
          </Modal>
        )}
      </SafeAreaView>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={{ position: 'absolute', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, zIndex: 999, backgroundColor: '#22c55e', bottom: 24, right: 20 }}>
        <FontAwesome name="home" size={24} color={'#fff'} />
      </TouchableOpacity>
    </>
  );
};

export default TimeOff;
