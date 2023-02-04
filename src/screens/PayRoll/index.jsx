import {View, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useRef, useState} from 'react';

const PayRoll = () => {
  const [selectedLanguage, setSelectedLanguage] = useState();

  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }
  return (
    <View>
      <View style={styles.payrollOption}>
        <View style={styles.payrollLabel}>
          <Text>Chọn tháng</Text>
        </View>
        <View style={styles.payrollMoth}>
          <Picker
            ref={pickerRef}
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }>
            <Picker.Item label="Tháng 1" value="java" />
            <Picker.Item label="Tháng 2" value="js" />
          </Picker>
        </View>
      </View>
      <View style={styles.payrollContent}>
        <Text>Bảng lương</Text>
      </View>
    </View>
  );
};

export default PayRoll;

const styles = StyleSheet.create({
  payrollOption: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderBottomWidth: 1
  },
  payrollLabel: {
    display: 'flex',
    flex: 1,
  },
  payrollMoth: {
    display: 'flex',
    justifyContent: 'flex-end',
    flex: 2
  },
  payrollContent: {
    padding: 5
  }
});
