import React, { useContext, useState, useEffect } from "react";
import { View, FlatList, StyleSheet, ScrollView, Text } from 'react-native';
import { APIContext } from '../components/APIContext.js';
import IncomesCard from "../components/IncomesCard.jsx";
import DropDownPicker from 'react-native-dropdown-picker';
import ListaCortesiaCard from "./ListaCortesiaCard.jsx";

const ListaCortesia = () => {
  const { events, token } = useContext(APIContext);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [ListaData, setListaData] = useState([]);
  const [order, setOrder] = useState([]);

  const totalData = {
    Orden: 0,
    Fecha: 0,
    Hora: 0,
  };

  useEffect(() => {
    const fetchListaData = async () => {
      if(!token){
        return
      }
      try {
        const ListaDataPromises = events.map(async (event) => {
          const ListaApiUrl = `https://makeidsystems.com/makeid/index.php?r=site/CortesiaList&key=${token}&id_event=${event.id_event}`;
          const response = await fetch(ListaApiUrl);
          const ListaEventData = await response.json();
          return ListaEventData;
        });
        const allListaData = await Promise.all(ListaDataPromises); 
        setListaData(allListaData); 
      } catch (error) {
        console.error('Problema fetcheando ListaData', error);
      }
    };
    fetchListaData();
  }, [events, token]);  


  const handleDropdownChange = (itemValue) => {
    setValue(itemValue);
    setSelectedEvent(itemValue);
 };

  if(!token){
    return
  }
  const filteredEvents = selectedEvent ? events.filter(event => event.name === selectedEvent) : events;
  const filteredListaData = selectedEvent ? ListaData.filter((_, index) => events[index].name === selectedEvent) : ListaData;

  const dropdownItems = events.map(event => ({ label: event.name, value: event.name }));
  

  return (
    <View>
      <View style={styles.dropdownContainer}>
        <DropDownPicker
          open={open}
          value={value}
          items={dropdownItems}
          setOpen={setOpen}
          setValue={handleDropdownChange}
          placeholder="Seleccione su evento"
        />
      </View>
      
      {selectedEvent? (
     <FlatList
       data={filteredEvents}
       keyExtractor={(event) => event.id_event.toString()}
       renderItem={({ item, index }) => (
         <View key={item.id_event}
         style={styles.cardContainer}
         >
         <ListaCortesiaCard event={item} listaData={filteredListaData[index]} key={item.id_event} />
         </View>
       )}
     />) : null}
   </View>
 );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    position: 'absolute',
    zIndex: 9999,
    marginBottom: 20
  },

  cardContainer: {
    marginTop: 50,
    spaceBetween: 50,
  },
});

export default ListaCortesia;