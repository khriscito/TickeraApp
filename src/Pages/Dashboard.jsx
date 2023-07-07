import React, { useContext } from "react";
import { View, Button, ScrollView } from 'react-native';
import StyledText from '../components/StyledText.jsx';
import { APIContext } from '../components/APIContext.js';
import EventCard from "../components/EventCard.jsx";

const Dashboard = ({ navigation }) => {
  const { token, events, secondData } = useContext(APIContext);

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

export default Dashboard;
