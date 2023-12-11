import React, { useContext, useEffect, useState, memo } from "react";
import { View, Button, FlatList, ActivityIndicator, Text, StyleSheet, Image } from 'react-native';
import StyledText from '../components/StyledText.jsx';
import { APIContext } from '../components/APIContext.js';
import EventCardResume from "../components/EventCardResume.jsx";

const EventsResume = ({ navigation }) => {
  const { token, events,readyEvents } = useContext(APIContext);
  const [isLoading, setIsLoading] = useState(true);
  const [thirdData, setThirdData] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [readyData, setreadyData] = useState(false);
  const EventCardMemoized = memo(EventCardResume);

  useEffect(() => {
    const fetchData = async () => {
      try {
      } catch (error) {
        console.log('Error fetching data:', error);
      } finally {
      }
    };

    fetchData();
  }, [events, token, scrollOffset]);

  const fetchThirdData = async (offset = 0) => {
    try {
      setLoadingMore(true);
      setIsLoading(true);   
      const thirdDataPromises = events.slice(offset, offset + 10).map(async (event) => {
        setreadyData(false)
        const thirdApiUrl = `https://makeidsystems.com/makeid/index.php?r=site/ventaresumen&key=${token}&id_event=${event.id_event}&page=${page}`;
        console.log(thirdApiUrl)
        const response = await fetch(thirdApiUrl);
        const thirdEventData = await response.json();
        setreadyData(true)
        return thirdEventData;
      });
      const allThirdData = await Promise.all(thirdDataPromises);
      setThirdData((prevData) => [...prevData, ...allThirdData]);
      return true;
    } catch (error) {
      console.error('Error fetching third data:', error);
      return false;
    } finally {
      setLoadingMore(false);
      setIsLoading(false);
    }
   };
   
   useEffect(() => {
    fetchThirdData();
   }, [events, token]);
   

  const loadMoreData = () => {
    if (!loadingMore && events.length > 0) {
      setScrollOffset((prevOffset) => prevOffset + 10);
    }
  };


  return (
    <View>
      <View><Text style={styles.header}>Resumen de tus eventos</Text></View>
      {(!readyEvents && events.length == 0) && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.loading}>Estamos cargando los datos de la aplicación, por favor espere...</Text>
          <Image
            style={{ width: 400, height: 400 }}
            source={require("../../assets/defaultImage.png")}
          />
          <ActivityIndicator size={120} />
        </View>
      )}

      {readyEvents && events.length == 0 && (
        <View>
          <Text style={styles.loading}>No hay eventos para mostrar</Text>
        </View>
      )}

      {readyEvents && events.length > 0 && (
        <FlatList
          data={events}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.3}
          initialNumToRender={10}
          windowSize={5}
          maxToRenderPerBatch={5}
          keyExtractor={(event) => event.id_event.toString()}
          renderItem={({ item: event, index }) => (
            <View key={event.id_event}>
              <EventCardMemoized event={event} thirdData={thirdData[index]} key={event.id_event} />
            </View>
          )}
          ListFooterComponent={() => (
            loadingMore && (
              <View style={{ paddingVertical: 20, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  style={{ width: 200, height: 200 }}
                  source={require("../../assets/defaultImage.png")}
                />
                <Text style={{ fontSize: 20 }}>Aguarde mientras cargamos más eventos para usted</Text>
                <ActivityIndicator size={60} />
              </View>
            )
          )}
        />
      )}
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

export default EventsResume;
