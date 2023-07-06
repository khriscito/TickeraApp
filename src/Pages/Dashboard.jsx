import React, { useContext, useEffect, useState } from "react";
import { View, Button, ScrollView } from 'react-native';
import StyledText from '../components/StyledText.jsx';
import { TokenContext } from '../components/tokenContext.js';
import EventCard from "../components/EventCard.jsx";

const Dashboard = ({ navigation }) => {
  const { token } = useContext(TokenContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const apiUrl = `https://makeidsystems.com/makeid/index.php?r=site/EventUserApi&key=${token}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.success) {
          setEvents(data.events);
        } else {
        }
      } catch (error) {
      }
    };

    fetchEvents();
  }, [token]);

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
        events.map((event) => (
          <View key={event.id_event}>
            <EventCard event={event} key={event.id_event} />
            </View>
        ))
      )}
    </ScrollView>
  );
};

export default Dashboard;

