import React, { useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './src/components/Main.jsx';
import Dashboard from './src/Pages/Dashboard.jsx';
import Landing from './src/Pages/Landing.jsx';
import Login from './src/Pages/Login.jsx';
import MisVentas from './src/components/MisVentas.jsx';
import { APIProvider, APIContext } from './src/components/APIContext.js';
import { BackHandler } from 'react-native';
import { Button } from '@rneui/themed';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function MainScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Main navigation={navigation} />
    </View>
  );
}

function DashboardScreen({ navigation }) {
  const { token, logout, events, secondData } = useContext(APIContext);
  
  const handleLogout = () => {
    logout();
    navigation.navigate('Main');
  };

  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Dashboard navigation={navigation} events={events} secondData={secondData} />
      <Button
        title="Logout"
        buttonStyle={{
          backgroundColor: 'red',
          width: 200,
          height: 50,
          padding: 10,
          borderRadius: 30
        }}
        containerStyle={{
          justifyContent: 'center',
          alignItems: 'center'
        }}
        raised
        onPress={handleLogout}
      />
    </View>
  );
}

function LandingScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Landing navigation={navigation} />
      <Button title="Go to Landing" onPress={() => navigation.navigate('Landing')} />
    </View>
  );
}

function LoginScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Login navigation={navigation} />
    </View>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Estatus Ordenes" component={MisVentas} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <APIProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </APIProvider>
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
