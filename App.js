import React, {useEffect, useContext} from 'react'
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './src/components/Main.jsx';
import Dashboard from './src/Pages/Dashboard.jsx'
import Landing from './src/Pages/Landing.jsx'
import Login from './src/Pages/Login.jsx'
import { TokenProvider, TokenContext } from './src/components/tokenContext.js'
import { BackHandler } from 'react-native';
import { Button } from '@rneui/themed'


function MainScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Main navigation={navigation}/>
    </View>
  );
}



function DashboardScreen({navigation}) {
  const { logout } = useContext(TokenContext);
  const handleLogout = () => {
    logout();
    navigation.navigate('Main');
  };
  useEffect(() => {
    const backAction = () => {
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Dashboard navigation={navigation}/>
      <Button 
          title="Logout" 
          buttonStyle={{
            backgroundColor: 'red',
            width: 200,
            height: 50,
            padding: 10,
            borderRadius: 30
            }} containerStyle={{
            justifyContent: 'center',
            alignItems: 'center'
            }}
            raised
       onPress={handleLogout} />
      </View>
  );
}

function LandingScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Landing navigation={navigation}/>
      <Button
        title="Go to Landing"
        onPress={() => navigation.navigate('Landing')}
      />
    </View>
  );}

  function LoginScreen({navigation}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Login navigation={navigation}/>
      </View>
    );}



const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <TokenProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Main'>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </TokenProvider>
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