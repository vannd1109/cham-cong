import {View, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const PayRoll = () => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedLanguage(itemValue)
        }>
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
    </View>
  );
};

export default PayRoll;
