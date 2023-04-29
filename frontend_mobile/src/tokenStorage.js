import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (tok) => {
  try {
    await AsyncStorage.setItem('token_data', tok.accessToken);
    console.log(tok.accessToken);
  } catch (e) {
    console.log(e.message);
  }
}

export const retrieveToken = async () => {
  try {
    const ud = await AsyncStorage.getItem('token_data');
    return ud;
  } catch (e) {
    console.log(e.message);
    return null;
  }
}
