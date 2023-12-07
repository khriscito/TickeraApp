import React, { useContext, useEffect, useState, memo } from "react";
import { View, Button, FlatList, ActivityIndicator, Text, StyleSheet, Image } from 'react-native';
import StyledText from '../components/StyledText.jsx';
import { APIContext } from '../components/APIContext.js';
import EventCardResume from "./EventCardResume.jsx";

const EventResume = ({ navigation }) => {
 const { token, events } = useContext(APIContext);
 const [isLoading, setIsLoading] = useState(true);
 const [thirdData, setThirdData] = useState([]);
 const [page, setPage] = useState(1);
 const [loadingMore, setLoadingMore] = useState(false);
 const [scrollOffset, setScrollOffset] = useState(0);
 const EventCardMemoized = memo(EventCardResume);
 const [isDataEmpty, setIsDataEmpty] = useState(false);

 const fetchThirdData = async (offset = 0) => {
  if (!events || events.length == 0) {
    setIsLoading(false);
    setIsDataEmpty(true);
    return;
  }
  try {
    setLoadingMore(true);
    const thirdDataPromises = events.map(async (event, index) => {
      if (index >= offset && index < offset + 10) {
        const thirdApiUrl = `https://makeidsystems.com/makeid/index.php?r=site/ventaresumen&key=${token}&id_event=${event.id_event}&page=${page}`;
        const response = await fetch(thirdApiUrl);
        const thirdEventData = await response.json();
        setIsLoading(false);
        return thirdEventData;
      }
    });
    const allThirdData = await Promise.all(thirdDataPromises); 
    setThirdData(prevData => [...prevData, ...allThirdData]);
    setLoadingMore(false);
  } catch (error) {
    console.error('Error fetching third data:', error);
    setIsLoading(true);
    setLoadingMore(false);
  }
};

useEffect(() => {
  fetchThirdData(scrollOffset);
}, [events, token, scrollOffset]);

const loadMoreData = () => {
  setScrollOffset(prevOffset => prevOffset + 10);
};

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
 else if (isDataEmpty) {
  return (
    <View >
      <Text style={styles.loading}>No hay eventos para mostrar</Text>
    </View>
  );}

 return (
   <View>
     <Text style={styles.header}>Resumen de tus eventos</Text>
     {!token || token === null ? (
       <>
         <StyledText>Solo puedes ingresar si has iniciado sesión previamente</StyledText>
         <Button
           title="Regresar a Login"
           onPress={() => navigation.navigate('Login')}
         />
       </>
     ) : (
       <FlatList
         data={events}
         onEndReached={loadMoreData}
         onEndReachedThreshold={0.3}
         initialNumToRender={5}
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
             <View style={{ paddingVertical: 20, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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

export default EventResume;