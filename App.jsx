/**
 * Time Keeping App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import NavigationProvider from './src/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as StoreProvider} from 'react-redux';
import store from './src/store.js';

const App = () => {
  return (
    <StoreProvider store={store}>
      <SafeAreaProvider style={{flex: 1}}>
        <NavigationProvider />
      </SafeAreaProvider>
    </StoreProvider>
  
  )
};

export default App;
