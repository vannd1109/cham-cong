/**
 * Time Keeping App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { Text } from 'react-native';
import {AuthProvider} from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';

const App = () => {
  return (
    <AuthProvider>
        <AppNav />
    </AuthProvider>
  );
};

export default App;
