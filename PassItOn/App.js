import { I18nManager } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Start from './scr/Screens/Start.jsx'

export default function App() {

  //Right To Left (no need for additional libraries, the app will be hebrew only)
  I18nManager.forceRTL(true);
  I18nManager.allowRTL(true);

  return (
    <View style={styles.container}>
      <Start />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
