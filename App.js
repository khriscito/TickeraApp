import React from 'react'
import { StyleSheet, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './src/components/Main.jsx';
import Dashboard from './src/Pages/Dashboard.jsx'
import Landing from './src/Pages/Landing.jsx'
import Login from './src/Pages/Login.jsx'
import Register from './src/Pages/Register.jsx'


function MainScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Main navigation={navigation}/>
    </View>
  );

  
}

function DashboardScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Dashboard navigation={navigation}/>
      <Button
        title="Go to Dashboard"
        onPress={() => navigation.navigate('Dashboard')}
      />
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


    function RegisterScreen({navigation}) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Register navigation={navigation}/>
          <Button
            title="Go to Register"
            onPress={() => navigation.navigate('Register')}
          />
        </View>
      );}

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Main'>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
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