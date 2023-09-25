import React, { useContext, useEffect, useState } from "react";
import { View, Button, ScrollView, ActivityIndicator, Text, StyleSheet, Image } from 'react-native';
import StyledText from '../components/StyledText.jsx';
import { APIContext } from '../components/APIContext.js';
import EventCard from "../components/EventCard.jsx";

const Dashboard = ({ navigation }) => {
  const { token, events } = useContext(APIContext);
  const [isLoading, setIsLoading] = useState(true);
  const [thirdData, setThirdData] = useState([]);

  useEffect(() => {
    const fetchThirdData = async () => {
      try {
        const thirdDataPromises = events.map(async (event) => {
          const thirdApiUrl = `https://makeidsystems.com/makeid/index.php?r=site/ventaresumen&key=${token}&id_event=${event.id_event}`;
          const response = await fetch(thirdApiUrl);
          const thirdEventData = await response.json();
          setIsLoading(false);
          return thirdEventData;
        });
        const allThirdData = await Promise.all(thirdDataPromises); 
        setThirdData(allThirdData); 

      } catch (error) {
        console.error('Error fetching third data:', error);
        setIsLoading(true);
      }
    };
    fetchThirdData();
  }, [events, token]);  

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.loading}>Estamos cargando los datos de la aplicación, por favor espere...</Text>
        <Image
          style={{ width: 400, height: 400 }}
          source={require("../../assets/defaultImage.png")}
        />
        <ActivityIndicator size={120} />
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.header}>Resumen de tus eventos</Text>
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
              <EventCard event={event} thirdData={thirdData[index]} key={event.id_event} />
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    margin: 5,
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    color: 'white'
  },
  header: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
});

export default Dashboard;




