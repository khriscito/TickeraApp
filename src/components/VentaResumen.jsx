import React, { useContext, useState, useEffect } from "react";
import { View, FlatList, StyleSheet, ScrollView } from 'react-native';
import { APIContext } from '../components/APIContext.js';
import VentaResumenCard from "../components/VentaResumenCard.jsx";
import DropDownPicker from 'react-native-dropdown-picker';

const VentaResumen = () => {
  const { events, token } = useContext(APIContext);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [thirdData, setThirdData] = useState([]);

  const totalData = {
    aforo: 0,
    tickets: 0,
    bloqueados: 0, 
    ticketsDia: 0,
    ticketsAyer: 0,
    cortesia: 0,
    descuento: 0,
    venta: "0" , 
    taquilla: 0,
    articulo: 0
  };


  useEffect(() => {
    const fetchThirdData = async () => {
      try {
        const thirdDataPromises = events.map(async (event) => {
          const thirdApiUrl = `https://makeidsystems.com/makeid/index.php?r=site/ventaresumen&key=${token}&id_event=${event.id_event}`;
          const response = await fetch(thirdApiUrl);
          const thirdEventData = await response.json();
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
  
  const handleDropdownChange = (itemValue) => {
    setValue(itemValue);
    setSelectedEvent(itemValue);
  };

  const filteredEvents = selectedEvent ? events.filter(event => event.name === selectedEvent) : events;
  const filteredthirdData = selectedEvent ? thirdData.filter((_, index) => events[index].name === selectedEvent) : thirdData;

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
      {selectedEvent ? (
      <FlatList
      data={filteredEvents}
      keyExtractor={(event) => event.id_event.toString()}
      renderItem={({ item, index }) => (
        <View key={item.id_event}
        style={styles.cardContainer}
        >
            <VentaResumenCard event={item} thirdData={filteredthirdData[index]} key={item.id_event} />
          </View>
        )}
        />):(
        <ScrollView style={styles.cardContainer}>
        <VentaResumenCard event={{ name: 'Sin evento seleccionado' }} thirdData={totalData} />
      </ScrollView>
    )}
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
    marginTop: 50
  },
});

export default VentaResumen;