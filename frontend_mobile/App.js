import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import LoginScreen from './src/screens/LoginScreen.js'
import RegisterScreen from './src/screens/RegisterScreen.js'
import ConfirmEmailScreen from './src/screens/ConfirmEmailScreen.js'
import NavBar from './src/screens/NavBar.js';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen.js'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScheduleScreen from './src/screens/ScheduleScreen.js';
const Stack = createNativeStackNavigator();


export default function App() {
  return (
    // <SafeAreaView style={styles.root}>
    //   <LoginScreen/>
    // </SafeAreaView> 

    <NavigationContainer>
      {/* <SafeAreaView style={styles.root}> */}
    <Stack.Navigator initialRouteName="LogIn">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
        />
      <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{headerShown: false}}/>
      <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} options={{headerShown: false}}/>
      <Stack.Screen name="NavBar" component={NavBar} options={{headerShown: false}}/>
      <Stack.Screen name="ScheduleScreen" component={ScheduleScreen} options={{headerShown: false}}/>

    </Stack.Navigator>
        {/* </SafeAreaView>  */}
  </NavigationContainer>
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
