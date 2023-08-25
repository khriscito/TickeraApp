import React, { useEffect, useContext } from 'react';
import { StyleSheet, View, Text, Alert, Appearance  } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './src/components/Main.jsx';
import Dashboard from './src/Pages/Dashboard.jsx';
import Landing from './src/Pages/Landing.jsx';
import Login from './src/Pages/Login.jsx';
import MisVentas from './src/components/MisVentas.jsx';
import VentaResumen from './src/components/VentaResumen.jsx';
import Graficas from './src/components/Graficas.jsx';
import Sillas from './src/components/Sillas.jsx'
import { APIProvider, APIContext } from './src/components/APIContext.js';
import { BackHandler } from 'react-native';
import { Button } from '@rneui/themed';
import ResumenIncomes from './src/components/ResumenIncomes.jsx';
import { AntDesign } from '@expo/vector-icons';
import ReportesDescargables from './src/components/ReportesDescargables.jsx';
import Mesas from './src/components/Mesas.jsx';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function MainScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Main navigation={navigation} />
    </View>
  );
}

function DashboardScreen() {
  const { token, logout, events, secondData } = useContext(APIContext);
  const navigation = useNavigation();


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

function CustomDrawerContent(props) {
  const { navigation } = props;
  const { logout, nameLastname } = useContext(APIContext);

  const handleLogout = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro de que deseas cerrar sesión?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => {
            logout();
            navigation.navigate('Main');
        }}
      ]
    );
  };

  Appearance.setColorScheme('dark');

  return (
    <View style={{ flex: 1}}>

    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
    <AntDesign name="user" size={30} color="white" /><Text style={styles.profile}>{nameLastname}</Text>
      </View>
      <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <Button
        title="    Cerrar Sesión"
        icon={<AntDesign name="lock" size={25} color="white" />}
        buttonStyle={{
          backgroundColor: 'red',
          width: 200,
          height: 50,
          padding: 10,
          borderRadius: 30
        }}
        containerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
          marginBottom: 30,
        }}
        raised
        onPress={handleLogout}
        />
</View>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Dashboard" drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Dashboard" component={DashboardScreen}          
      options={{
          drawerIcon: ({ color, size }) => (
            <AntDesign name="dashboard" size={25} color={'white'} />
          ),
        }}/>
      <Drawer.Screen name="Estatus Ordenes" component={MisVentas} 
      options={{
        drawerIcon: ({ color, size }) => (
          <AntDesign name="shoppingcart" size={25} color={'white'} />
        ),
      }}/>
      <Drawer.Screen name="Resumen Incomes" component={ResumenIncomes} 
      options={{
        drawerIcon: ({ color, size }) => (
          <AntDesign name="profile" size={25} color={'white'} />
        ),
      }}/>
      <Drawer.Screen name="Resumen de Ventas" component={VentaResumen} 
      options={{
        drawerIcon: ({ color, size }) => (
          <AntDesign name="areachart" size={25} color={'white'} />
        ),
      }}/>

<Drawer.Screen name="Graficas" component={Graficas} 
      options={{
        drawerIcon: ({ color, size }) => (
          <AntDesign name="piechart" size={25} color={'white'} />
        ),
      }}/>


<Drawer.Screen name="Reportes Descargables" component={ReportesDescargables} 
      options={{
        drawerIcon: ({ color, size }) => (
          <AntDesign name="areachart" size={25} color={'white'} />
        ),
      }}/>


<Drawer.Screen name="Sillas" component={Sillas} 
      options={{
        drawerIcon: ({ color, size }) => (
          <AntDesign name="team" size={25} color={'white'} />
        ),
      }}/>

<Drawer.Screen name="Mesas" component={Mesas} 
      options={{
        drawerIcon: ({ color, size }) => (
          <AntDesign name="profile" size={25} color={'white'} />
        ),
      }}/>
    </Drawer.Navigator>

    
  );
}





export default function App() {
  return (
    <APIProvider>
      <NavigationContainer>
        <Stack.Navigator   screenOptions={{
    cardStyle: { backgroundColor: '#FFFFFF' }
  }}>
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
  profile:{
    fontSize: 15, 
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 5,
    padding: 5,
  },
  profileContainer: {
    backgroundColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});

