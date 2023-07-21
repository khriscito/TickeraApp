import React, { useContext, useState } from 'react';
import { View, FlatList, StyleSheet, Text, Linking } from 'react-native';
import { Button } from '@rneui/themed';
import { AntDesign } from '@expo/vector-icons';
import { APIContext } from '../components/APIContext.js';
import DropDownPicker from 'react-native-dropdown-picker';

const Reportes = () => {
  const { events, thirdData, token } = useContext(APIContext);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDropdownChange = (itemValue) => {
    setValue(itemValue);
    setSelectedEvent(itemValue);
  };

  const filteredEvents = selectedEvent ? events.filter((event) => event.name === selectedEvent) : events;
  const filteredthirdData = selectedEvent ? thirdData.filter((_, index) => events[index].name === selectedEvent) : thirdData;

  const dropdownItems = events.map((event) => ({ label: event.name, value: event.name }));

  const handleDownloadReport = () => {
    if (selectedEvent) {
      const selectedEventObject = events.find((event) => event.name === selectedEvent);
      const url = `https://www.makeidsystems.com/makeid/index.php?r=site/pdfSemanal&id_event=${selectedEventObject.id_event}&key=${token}`;
      console.log('Este es el zelda', url);
      Linking.openURL(url);
    } else {
      alert('Por favor seleccione un evento primero');
    }
  };

 

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
      />

      <View style={styles.buttonContainer}>
      <Text style={styles.title}>Reportes de Ventas</Text>
        <Button
          title="   Descargar informe de ventas"
          icon={<AntDesign name="download" size={25} color="white" />}
          buttonStyle={{
            backgroundColor: 'green',
            width: 300,
            height: 50,
            padding: 10,
            borderRadius: 30,
          }}
          containerStyle={styles.buttonContainer}
          raised
          onPress={handleDownloadReport} // Attach the onPress handler to the function
        />
      </View>

      <View>
      <Text style={styles.title}>Otro reporte distinto</Text>
        <Button
          title="   Descargar informe"
          icon={<AntDesign name="download" size={25} color="white" />}
          buttonStyle={{
            backgroundColor: 'green',
            width: 300,
            height: 50,
            padding: 10,
            borderRadius: 30,
          }}
          containerStyle={styles.buttonContainer}
          raised
          onPress={handleDownloadReport} // Attach the onPress handler to the function
        />
      </View>

      <View>
      <Text style={styles.title}>Otro reporte mas</Text>
        <Button
          title="   Descargar informe"
          icon={<AntDesign name="download" size={25} color="white" />}
          buttonStyle={{
            backgroundColor: 'green',
            width: 300,
            height: 50,
            padding: 10,
            borderRadius: 30,
          }}
          containerStyle={styles.buttonContainer}
          raised
          onPress={handleDownloadReport} // Attach the onPress handler to the function
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  title: {
    marginTop: 30,
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
},
  buttonContainer: {
    alignItems: 'center',
    marginTop: 50
  },
  dropdownContainer: {
    position: 'absolute',
    zIndex: 9999,
    marginBottom: 20,
  },

  cardContainer: {
    marginTop: 50,
  },
});

export default Reportes;



