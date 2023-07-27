import React, { useContext, useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from 'react-native';
import { APIContext } from '../components/APIContext.js';
import VentasCard from "../components/VentasCard.jsx";
import DropDownPicker from 'react-native-dropdown-picker';

const MisVentas = () => {
  const { events, secondData } = useContext(APIContext);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    if (filteredEvents.length > 0) {
      setSelectedEvent(filteredEvents[0].name);
    }
  }, [filteredEvents]);
  

  const handleDropdownChange = (itemValue) => {
    setValue(itemValue);
    setSelectedEvent(itemValue);
  };

  const filteredEvents = selectedEvent ? events.filter(event => event.name === selectedEvent) : events;
  const filteredSecondData = selectedEvent ? secondData.filter((_, index) => events[index].name === selectedEvent) : secondData;

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

      <FlatList
        data={filteredEvents}
        keyExtractor={(event) => event.id_event.toString()}
        renderItem={({ item, index }) => (
          <View key={item.id_event}
          style={styles.cardContainer}
          >
            <VentasCard event={item} secondData={filteredSecondData[index]} key={item.id_event} />
          </View>
        )}
      />
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

export default MisVentas;




