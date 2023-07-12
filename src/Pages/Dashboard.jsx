import React, { useContext, useEffect, useState } from "react";
import { View, Button, ScrollView, ActivityIndicator, Text, StyleSheet } from 'react-native';
import StyledText from '../components/StyledText.jsx';
import { APIContext } from '../components/APIContext.js';
import EventCard from "../components/EventCard.jsx";
import { Image } from 'react-native'

const Dashboard = ({ navigation }) => {
  const { token, events, secondData } = useContext(APIContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular la carga de datos de la API
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.loading}>Estamos cargando los datos de la aplicación por favor espere...</Text>
        <Image 
                style={{width:400, height:400}}
                source={require("../../assets/defaultImage.png")}
                ></Image>
        <ActivityIndicator size={120}/>

      </View>
    );
  }

  return (
    <ScrollView>
      {!token || token === null ? (
        <>
          <StyledText>Solo puedes ingresar si has iniciado sesión previamente</StyledText>
          <Button
            title="Regresar a Login"
            onPress={() => navigation.navigate('Login')}
          />
        </>
      ) : (
        events.map((event, index) => (
          <View key={event.id_event}>
            <EventCard event={event} secondData={secondData[index]} key={event.id_event} />
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loading:{
      margin: 5,
      fontWeight: 'bold', 
      fontSize: 30,
      textAlign: 'center',        
  }
});

export default Dashboard;

