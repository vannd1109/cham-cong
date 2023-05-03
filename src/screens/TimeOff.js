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
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useState, useEffect, useRef} from 'react';

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
    name: "Nghỉ phép năm",
    icon : <FontAwesome name='star' size={24} style={{color: 'red'}} />,
    number: 0,
  },
  {
    name: "Ngày phép còn lại",
    icon : <FontAwesome name='star' size={24} style={{color: 'red'}} />,
    number: 7.5,
  },
  {
    name: "Nghỉ cá nhân",
    icon : <FontAwesome name='star' size={24} style={{color: 'red'}} />,
    number: 0,
  },
  {
    name: "Đi công tác",
    icon : <FontAwesome name='star' size={24} style={{color: 'red'}} />,
    number: 0,
  },
  {
    name: "Làm việc ngoài văn phòng",
    icon : <FontAwesome name='star' size={24} style={{color: 'red'}} />,
    number: 0,
  },
  {
    name: "Nghỉ không lương",
    icon : <FontAwesome name='star' size={24} style={{color: 'red'}} />,
    number: 0,
  },
  {
    name: "Các loại khác",
    icon : <FontAwesome name='star' size={24} style={{color: 'red'}} />,
    number: 0,
  },
  {
    name: "Nghỉ phép năm theo giờ",
    icon : <FontAwesome name='star' size={24} style={{color: 'red'}} />,
    number: 0,
  },
  {
    name: "Nghỉ không lương theo giờ",
    icon : <FontAwesome name='star' size={24} style={{color: 'red'}} />,
    number: 0,
  },
  {
    name: "Làm việc ngoài văn phòng theo giờ",
    icon : <FontAwesome name='star' size={24} style={{color: 'red'}} />,
    number: 0,
  },
]

const TotalScreen = () => {
  return (
    <View>
      <Text>Tổng</Text>
    </View>
  );
};

const TurnScreen = ({setShow}) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
      }}>
      <Text>
        Bạn chưa tạo bất kỳ đề xuất nghỉ phép nào.{' '}
        <Text
          style={{color: '#003868', fontWeight: '800'}}
          onPress={() => setShow(true)}>
          Tạo đề xuất?
        </Text>
      </Text>
    </View>
  );
};

const ApprovalOverdueScreen = ({setShow}) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
      }}>
      <Text>
        Bạn chưa tạo bất kỳ đề xuất nghỉ phép nào.{' '}
        <Text
          style={{color: '#003868', fontWeight: '800'}}
          onPress={() => setShow(true)}>
          Tạo đề xuất?
        </Text>
      </Text>
    </View>
  );
};

const PendingApprovalScreen = ({setShow}) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
      }}>
      <Text>
        Bạn chưa tạo bất kỳ đề xuất nghỉ phép nào.{' '}
        <Text
          style={{color: '#003868', fontWeight: '800'}}
          onPress={() => setShow(true)}>
          Tạo đề xuất?
        </Text>
      </Text>
    </View>
  );
};

const ApprovedScreen = ({setShow}) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
      }}>
      <Text>
        Bạn chưa tạo bất kỳ đề xuất nghỉ phép nào.{' '}
        <Text
          style={{color: '#003868', fontWeight: '800'}}
          onPress={() => setShow(true)}>
          Tạo đề xuất?
        </Text>
      </Text>
    </View>
  );
};

const DeniedScreen = ({setShow}) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
      }}>
      <Text>
        Bạn chưa tạo bất kỳ đề xuất nghỉ phép nào.{' '}
        <Text
          style={{color: '#003868', fontWeight: '800'}}
          onPress={() => setShow(true)}>
          Tạo đề xuất?
        </Text>
      </Text>
    </View>
  );
};

const CanceledScreen = ({setShow}) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
      }}>
      <Text>
        Bạn chưa tạo bất kỳ đề xuất nghỉ phép nào.{' '}
        <Text
          style={{color: '#003868', fontWeight: '800'}}
          onPress={() => setShow(true)}>
          Tạo đề xuất?
        </Text>
      </Text>
    </View>
  );
};

const KindOfWarningScreen = ({setShow}) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
      }}>
      <Text>
        Bạn chưa tạo bất kỳ đề xuất nghỉ phép nào.{' '}
        <Text
          style={{color: '#003868', fontWeight: '800'}}
          onPress={() => setShow(true)}>
          Tạo đề xuất?
        </Text>
      </Text>
    </View>
  );
};

const VerifiedScreen = ({setShow}) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
      }}>
      <Text>
        Bạn chưa tạo bất kỳ đề xuất nghỉ phép nào.{' '}
        <Text
          style={{color: '#003868', fontWeight: '800'}}
          onPress={() => setShow(true)}>
          Tạo đề xuất?
        </Text>
      </Text>
    </View>
  );
};

const WaitingForConfirmationScreen = ({setShow}) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
      }}>
      <Text>
        Bạn chưa tạo bất kỳ đề xuất nghỉ phép nào.{' '}
        <Text
          style={{color: '#003868', fontWeight: '800'}}
          onPress={() => setShow(true)}>
          Tạo đề xuất?
        </Text>
      </Text>
    </View>
  );
};

const TimeOff = ({navigation}) => {
  const [title, setTitle] = useState('Danh sách đề xuất');
  const [show, setShow] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [tab, setTab] = useState(<TotalScreen />);
  const [currentTab, setCurrentTab] = useState(0);
  const [loading, setLoading] = useState(false);
  let timer = useRef().current;

  const tabs = {
    total: {
      name: 'Tổng',
      component: <TotalScreen />,
    },
    turn: {
      name: 'Đến lượt duyệt',
      component: <TurnScreen setShow={setShow} />,
    },
    approvalOverdue: {
      name: 'Quá hạn duyệt',
      component: <ApprovalOverdueScreen setShow={setShow} />,
    },
    pendingApproval: {
      name: 'Đang chờ duyệt',
      component: <PendingApprovalScreen setShow={setShow} />,
    },
    approved: {
      name: 'Đã phê duyệt',
      component: <ApprovedScreen setShow={setShow} />,
    },
    denied: {
      name: 'Đã từ chối',
      component: <DeniedScreen setShow={setShow} />,
    },
    canceled: {
      name: 'Đã hủy bỏ',
      component: <CanceledScreen setShow={setShow} />,
    },
    kindOfWarning: {
      name: 'Loại cảnh báo',
      component: <KindOfWarningScreen setShow={setShow} />,
    },
    verified: {
      name: 'Đã xác thực',
      component: <VerifiedScreen setShow={setShow} />,
    },
    waitingForConfirmation: {
      name: 'Đang chờ xác nhận',
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

  const Tab = ({item, key}) => {
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

  const Tabs = ({data}) => {
    return (
      <View style={{width: '100%'}}>
        <ScrollView horizontal style={{display: 'flex', flexDirection: 'row'}}>
          {data.map(item => {
            return <Tab key={item.key} item={item} />;
          })}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={{display: 'flex', flexDirection: 'column'}}>
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
          <Ionicons name="menu" style={{fontSize: 20, color: '#fff'}} />
        </TouchableOpacity>
        <Text style={{color: '#fff'}}>{title}</Text>
        <View style={{display: 'flex', flexDirection: 'row', gap: 8}}>
          <MaterialIcons
            name="bar-chart"
            style={{fontSize: 20, color: '#fff'}}
            onPress={() => setShowOverview(true)}
          />
          <AntDesign
            name="pluscircleo"
            style={{fontSize: 20, color: '#fff'}}
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
            backgroundColor: '#00000021',
          }}>
          <ActivityIndicator size="large" />
        </View>
      )}
      {!loading && <View style={{padding: 8}}>{tab}</View>}

      {show && (
        <Modal
          visible={show}
          onDismiss={() => setShow(false)}
          animationType="slide"
          transparent={true}>
          <View>
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
                height: '90%',
                position: 'relative',
                zIndex: 2,
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
                  Tìm nhóm đề xuất
                </Text>
                <TouchableOpacity onPress={() => setShow(false)}>
                  <Ionicons
                    name="close"
                    style={{fontSize: 16, color: '#003868'}}
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
                  style={{fontSize: 12, color: '#00000042'}}
                />
                <TextInput placeholder="Tìm nhanh" style={{fontSize: 13}} />
              </View>
              <ScrollView>
                {arrTimeOff.map(itemTimeOff => (
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
                        <Text style={{fontSize: 10, color: 'gray'}}>
                          {idx + 1}. {item}
                        </Text>
                      </View>
                    ))}
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
      {showOverview && (
        <Modal
          visible={showOverview}
          onDismiss={() => setShowOverview(false)}
          animationType="slide"
          transparent={true}>
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: '#00000042',
                width: '100%',
                height: '100%',
                position: 'absolute',
                zIndex: 1,
              }}
              onPress={() => setShowOverview(false)}
            />
            <View
              style={{
                backgroundColor: '#fff',
                marginLeft: 16,
                marginRight: 16,
                overflow: 'scroll',
                height: '100%',
                position: 'relative',
                zIndex: 2,
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
                  Thống kê nghỉ phép
                </Text>
                <TouchableOpacity onPress={() => setShowOverview(false)}>
                  <Ionicons
                    name="close"
                    style={{fontSize: 16, color: '#003868'}}
                  />
                </TouchableOpacity>
              </View>
              <ScrollView style={{padding: 16}}>
                {arrOverview.map(itemOverview => (
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 16,
                      borderBottomColor: '#003868',
                      borderBottomWidth: 1,
                      padding: 8,
                    }}>
                    <View style={{backgroundColor: '#00000021', width: 40, height: 40, borderRadius: 50, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                      {itemOverview.icon}
                    </View>
                    <View>
                      <Text style={{color: '#000', fontWeight: '800', fontSize: 16}}>{itemOverview.number}</Text>
                      <Text>{itemOverview.name}</Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default TimeOff;
