import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider, Box } from "native-base";
import { Button } from "native-base";
import Main from './src/components/Main.jsx';

export default function App() {
  return (
<View style={styles.container}> 
<Text>Hola Mundo!</Text>
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
