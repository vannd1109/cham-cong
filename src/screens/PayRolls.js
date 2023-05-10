/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, ScrollView, LogBox, SafeAreaView, Platform } from 'react-native';
import { useState, useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import MonthPicker from 'react-native-month-year-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { Table, Row, Rows } from 'react-native-table-component';
import { AuthContext } from '../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

LogBox.ignoreLogs(['Invalid prop textStyle of type array supplied to Cell', 'Failed prop type: Invalid prop `textStyle` of type `array` supplied to `Cell`, expected `object`.']);

const PayRolls = ({ navigation }) => {
  const { userInfo } = useContext(AuthContext);
  const timeNow = new Date();
  const [date, setDate] = useState(timeNow);
  const [show, setShow] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [tableHeadLeft, setTableHead] = useState([
    'Họ và tên',
    `${userInfo?.fullname}`,
    '',
    '',
  ]);
  const [tableHeadRight, setTableRight] = useState([
    'Số giờ chuẩn trong tháng',
    '208',
    'T01/2023',
  ]);

  const tableHeadLeftFileds = [
    'Ngày',
    'Thứ',
    'Giờ công',
    'Tăng ca ngày thường',
    'Tăng ca CN',
    'Trừ phép',
    'Nghỉ BHXH',
    'Không lương',
    'Phép đột xuất',
    'Tăng ca ngày Lễ',
  ];

  const tableHeadRightFileds = ['Diễn giải', 'Giờ', 'Mức lương'];

  const [tableFooter, setTableFooter] = useState([
    'TC',
    '',
    '104',
    '-',
    '-',
    '-',
    '-',
    '24',
    '-',
    '-',
    'Liên hệ HCNS để biết giờ phép chính xác',
  ]);
  const [tableDataLeft, setTableData] = useState([
    ['26/12/2022', 'Hai', '-', '-', '-', '-', '-', '-', '-', '-'],
    ['27/12/2022', 'Ba', '', '', '', '', '', '', '', ''],
    ['28/12/2022', 'Tư', '', '', '', '', '', '', '', ''],
    ['29/12/2022', 'Năm', '', '', '', '', '', '', '', ''],
    ['30/12/2022', 'Sáu', '-', '-', '-', '-', '-', '-', '-', '-'],
    ['31/12/2022', 'Bảy', '-', '-', '-', '-', '-', '-', '-', '-'],
    ['01/01/2024', 'CN', '', '', '', '', '', '', '', ''],
    ['02/01/2024', 'Hai', '-', '-', '-', '-', '-', '-', '-', '-'],
    ['03/01/2024', 'Ba', '8,00', '-', '-', '-', '-', '-', '-', '-'],
    ['04/01/2024', 'Tư', '8,00', '-', '-', '-', '-', '-', '-'],
    ['05/01/2024', 'Năm', '8,00', '-', '-', '-', '-', '-', '-', '-'],
    ['06/01/2024', 'Sáu', '8,00', '-', '-', '-', '-', '-', '-', '-'],
    ['07/01/2024', 'Bảy', '8,00', '-', '-', '-', '-', '-', '-'],
    ['08/01/2024', 'CN', '-', '-', '-', '-', '-', '-', '-', '-'],
    ['09/01/2024', 'Hai', '8,00', '-', '-', '-', '-', '-', '-', '-'],
    ['10/01/2024', 'Ba', '8,00', '-', '-', '-', '-', '-', '-', '-'],
    ['11/01/2024', 'Tư', '8,00', '-', '-', '-', '-', '-', '-', '-'],
    ['12/01/2024', 'Năm', '8,00', '-', '-', '-', '-', '-', '-', '-'],
    ['13/01/2024', 'Sáu', '8,00', '-', '-', '-', '-', '-', '-', '-'],
    ['14/01/2024', 'Bảy', '8,00', '-', '-', '-', '-', '-', '-', '-'],
    ['15/01/2024', 'CN', '-', '-', '-', '-', '-', '-', '-', '-'],
    ['16/01/2024', 'Hai', '8,00', '-', '-', '-', '-', '-', '-', '-'],
    ['17/01/2024', 'Ba', '8,00', '-', '-', '-', '-', '-', '-', '-'],
    ['18/01/2024', 'Tư', '-', '-', '-', '-', '-', '8,00', '-', '-'],
    ['19/01/2024', 'Năm', '-', '-', '-', '-', '-', '8,00', '-', '-'],
    ['20/01/2024', 'Sáu', '-', '-', '-', '-', '-', '8,00', '-', '-'],
    ['21/01/2024', 'Bảy', '-', '-', '-', '-', '-', '-', '-'],
    ['22/01/2024', 'CN', '-', '-', '-', '-', '-', '-', '-', '-'],
    ['23/01/2024', 'Hai', '-', '-', '-', '-', '-', '-', '-', '-'],
    ['24/01/2024', 'Ba', '-', '-', '-', '-', '-', '-', '-', '-'],
    ['25/01/2024', 'Tư', '-', '-', '-', '-', '-', '-', '-', '-'],
    ['', '', '', '', '', '', '', '', '', ''],
  ]);

  const [tableDataRight, setTableDataRight] = useState([
    ['Mức lương', '', '10.000.000'],
    ['Lương BHXH', '', '-'],
    ['Đơn giá giờ công', '', '50,000'],
    ['Giờ làm việc', '104', '5.000.000'],
    ['Tiền cơm trưa', '', '-'],
    ['Nghỉ phép hưởng lương', '-', '-'],
    ['Nghỉ BHXH', '-', ''],
    ['Nghỉ OFF 70%', '-', '-'],
    ['Nghỉ OFF 50%', '-', '-'],
    ['Nghỉ chế độ', '32', '2.000.000'],
    ['Làm ngày lễ', '-', '-'],
    ['Tăng ca ngày thường', '-', '-'],
    ['Tăng ca ngày CN', '-', '-'],
    ['Tiền cơm tăng ca', '', '-'],
    ['Thu nhập/Trừ bổ sung', '', '-'],
    ['Chuyên cần', '', '-'],
    ['Chế độ BHXH & Công đoàn', '', '-'],
    ['Cộng', '', '9.600.000'],
    ['Các khoản trừ', '', ''],
    ['BHXH 8%', '8,0%', '-'],
    ['BHYT 1,5%', '1,5%', '-'],
    ['BHTN 1%', '1,0%', '-'],
    ['KPCĐ 1%', '1,0%', '-'],
    ['Thuế TNCN', '', '6789'],
    ['Trừ khác', '-', ''],
    ['Cộng', '', '6789'],
    ['Trừ nợ BHXH', '-', ''],
    ['Số tiền còn nợ:', '', ''],
    ['Lương thực nhận', '', '9.500.000'],
    ['Chuyển khoản', '', ''],
    ['Chênh lệch', '', ''],
    ['SỐ giờ phép còn lại(tạm tính)', '', '-'],
  ]);

  const showPicker = () => {
    setShow(true);
  };

  const onValueChange = (event, newDate) => {
    if (Boolean(newDate)) {
      setCurrentMonth(newDate.getMonth() + 1);
      setCurrentYear(newDate.getFullYear());
    }

    setShow(false);
    return true;
  };

  const _onReload = () => {
    setCurrentMonth(timeNow.getMonth() + 1);
    setCurrentYear(timeNow.getFullYear());
  };

  const widthArr = [80, 50, 50, 50, 50, 50, 50, 50, 50, 50];

  const widthArrHeaderLeft = [80, 350, 50, 50];
  const widthArrHeaderLeftFileds = [80, 50, 50, 50, 50, 50, 50, 50, 50, 50];

  const widthArrHeaderRight = [120, 50, 120];

  const widthArrFooter = [80, 50, 50, 50, 50, 50, 50, 50, 50, 50, 290];

  return (
    <SafeAreaView>
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
        <Text style={{ color: '#fff' }}>Bảng lương</Text>
        <View style={{ display: 'flex' }} />
      </View>
      <View>
        <View style={styles.payrollOption}>
          <View style={styles.payrollMonth}>
            <Text onPress={showPicker} style={styles.payrollMonthText}>
              Tháng {currentMonth}/{currentYear}
            </Text>
          </View>
          <View style={styles.payrollBtnBox}>
            <TouchableOpacity onPress={showPicker} style={styles.payrollBtn}>
              <Text style={styles.payrollBtnLabel}>Chọn tháng</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={_onReload} style={styles.payrollBtn}>
              <Icon name="reload" size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.payrollHeader}>
          <Text>Bộ phận: {userInfo?.department}</Text>
          <Text>MSNV: 0{userInfo?.id}</Text>
        </View>
        <View style={styles.payrollContent}>
          <ScrollView horizontal={true}>
            <View style={{ flexDirection: 'column', marginBottom: 110 }}>
              <View style={{ flexDirection: 'row' }}>
                <View>
                  <View>
                    <Table
                      borderStyle={{ borderWidth: 1, borderColor: '#727171' }}>
                      <Row
                        data={tableHeadLeft}
                        style={styles.head}
                        widthArr={widthArrHeaderLeft}
                        textStyle={styles.text}
                      />
                    </Table>
                  </View>
                  <View>
                    <Table
                      borderStyle={{ borderWidth: 1, borderColor: '#727171' }}>
                      <Row
                        data={tableHeadLeftFileds}
                        style={styles.head}
                        widthArr={widthArrHeaderLeftFileds}
                        textStyle={styles.text}
                      />
                    </Table>
                  </View>
                </View>
                <View>
                  <View>
                    <Table
                      borderStyle={{ borderWidth: 1, borderColor: '#727171' }}>
                      <Row
                        data={tableHeadRight}
                        style={styles.head}
                        widthArr={widthArrHeaderRight}
                        textStyle={styles.text}
                      />
                    </Table>
                  </View>
                  <View>
                    <Table
                      borderStyle={{ borderWidth: 1, borderColor: '#727171' }}>
                      <Row
                        data={tableHeadRightFileds}
                        style={styles.head}
                        widthArr={widthArrHeaderRight}
                        textStyle={styles.text}
                      />
                    </Table>
                  </View>
                </View>
              </View>
              <ScrollView style={{ marginBottom: 200 }}>
                <View style={{ flexDirection: 'row' }}>
                  <View>
                    <Table
                      borderStyle={{ borderWidth: 1, borderColor: '#727171' }}>
                      <Rows
                        data={tableDataLeft}
                        style={styles.head}
                        widthArr={widthArr}
                        textStyle={styles.text}
                      />
                    </Table>
                  </View>
                  <View>
                    <Table
                      borderStyle={{ borderWidth: 1, borderColor: '#727171' }}>
                      <Rows
                        data={tableDataRight}
                        style={styles.head}
                        widthArr={widthArrHeaderRight}
                        textStyle={styles.text}
                      />
                    </Table>
                  </View>
                </View>
                <View>
                  <Table borderStyle={{ borderWidth: 1, borderColor: '#727171' }}>
                    <Row
                      data={tableFooter}
                      style={styles.head}
                      widthArr={widthArrFooter}
                      textStyle={styles.text}
                    />
                  </Table>
                </View>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </View>
      {show && (
        <View style={{ position: 'relative', top: Platform.OS === 'ios' ? -200 : '' }}>
          <MonthPicker
            onChange={onValueChange}
            value={date}
            locale="vi"
            cancelButton="Đóng"
            okButton="Chọn"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default PayRolls;

const styles = StyleSheet.create({
  payrollHeader: {
    display: 'flex',
    flexDirection: 'row',
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#0e447a',
    justifyContent: 'space-around',
  },
  payrollOption: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#0e447a',
  },
  payrollBtnBox: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  payrollBtn: {
    display: 'flex',
    backgroundColor: '#d68f19',
    borderRadius: 4,
    minWidth: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payrollBtnLabel: {
    fontWeight: '600',
    fontSize: 14,
    display: 'flex',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 8,
    paddingBottom: 8,
  },
  payrollMonth: {
    display: 'flex',
    flex: 2,
  },
  payrollMonthText: {
    fontSize: 16,
    fontWeight: '600',
  },
  payrollContent: {
    display: 'flex',
    padding: 10,
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
  },
  head: {
    height: 60,
    backgroundColor: '#f1f8ff',
  },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: { height: 80 },
  text: { textAlign: 'center' },
});
