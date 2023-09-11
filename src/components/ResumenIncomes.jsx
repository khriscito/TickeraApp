import React, { useContext, useState, useEffect } from "react";
import { View, FlatList, StyleSheet, ScrollView } from 'react-native';
import { APIContext } from '../components/APIContext.js';
import IncomesCard from "../components/IncomesCard.jsx";
import DropDownPicker from 'react-native-dropdown-picker';


const ResumenIncomes = () => {
  const { events, fourthData } = useContext(APIContext);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const totalData = {
    Recaudado: 0,
    RecaudadoHoy: 0,
    precioCard: 0,
  };


  const handleDropdownChange = (itemValue) => {
    setValue(itemValue);
    setSelectedEvent(itemValue);
  };


  const filteredEvents = selectedEvent ? events.filter(event => event.name === selectedEvent) : events;
  const filteredFourthData = selectedEvent ? fourthData.filter((_, index) => events[index].name === selectedEvent) : fourthData;

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
            <IncomesCard event={item} fourthData={filteredFourthData[index]} key={item.id_event} />
          </View>
        )}
      />):
      (
        <ScrollView style={styles.cardContainer}>
          <IncomesCard event={{ name: 'Sin evento seleccionado' }} fourthData={totalData} />
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

export default ResumenIncomes;