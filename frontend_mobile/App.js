import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import LoginScreen from './src/screens/LoginScreen.js'
import RegisterScreen from './src/screens/RegisterScreen.js'
import ConfirmEmailScreen from './src/screens/ConfirmEmailScreen.js'
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen.js'


export default function App() {
  return (
    <SafeAreaView style={styles.root}>
      <LoginScreen/>
    </SafeAreaView> 
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
