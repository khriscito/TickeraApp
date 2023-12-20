import React, { useContext, useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, Linking, ScrollView } from 'react-native';
import { Button } from '@rneui/themed';
import { AntDesign } from '@expo/vector-icons';
import { APIContext } from './APIContext.js';
import DropDownPicker from 'react-native-dropdown-picker';

const ReportesDescargables = () => {
  const { events, token } = useContext(APIContext);

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

  const filteredEvents = selectedEvent ? events.filter((event) => event.name === selectedEvent) : events;

  const dropdownItems = events.map((event) => ({ label: event.name, value: event.name }));

  const handleDownloadReportSemanal = () => {
    if (selectedEvent) {
      const selectedEventObject = events.find((event) => event.name === selectedEvent);
      const url = `https://www.makeidsystems.com/makeid/index.php?r=site/pdfSemanal&id_event=${selectedEventObject.id_event}&key=${token}`;
      Linking.openURL(url);
    } else {
      alert('Por favor seleccione un evento primero');
    }
  };

  const handleDownloadReportDiaAnterior = () => {
    if (selectedEvent) {
      const selectedEventObject = events.find((event) => event.name === selectedEvent);
      const url = `https://www.makeidsystems.com/makeid/index.php?r=site/pdfDiaAnterior&id_event=${selectedEventObject.id_event}&key=${token}`;
      Linking.openURL(url);
    } else {
      alert('Por favor seleccione un evento primero');
    }
  };

  const handleDownloadReportOnline = () => {
    if (selectedEvent) {
      const selectedEventObject = events.find((event) => event.name === selectedEvent);
      const url = `https://www.makeidsystems.com/makeid/index.php?r=site/pdfOnlines&id_event=${selectedEventObject.id_event}&key=${token}`;
      Linking.openURL(url);
    } else {
      alert('Por favor seleccione un evento primero');
    }
  };


  const handleDownloadReportDiario = () => {
    if (selectedEvent) {
      const selectedEventObject = events.find((event) => event.name === selectedEvent);
      const url = `https://www.makeidsystems.com/makeid/index.php?r=site/pdfDiario&id_event=${selectedEventObject.id_event}&key=${token}`;
      Linking.openURL(url);
    } else {
      alert('Por favor seleccione un evento primero');
    }
  };


  const handleDownloadReportSillas = () => {
    if (selectedEvent) {
      const selectedEventObject = events.find((event) => event.name === selectedEvent);
      const url = `https://www.makeidsystems.com/makeid/index.php?r=site/pdfSillas&id_event=${selectedEventObject.id_event}&key=${token}`;
      Linking.openURL(url);
    } else {
      alert('Por favor seleccione un evento primero');
    }
  };


  const handleDownloadReportAforo = () => {
    if (selectedEvent) {
      const selectedEventObject = events.find((event) => event.name === selectedEvent);
      const url = `https://www.makeidsystems.com/makeid/index.php?r=site/pdfTotal&id_event=${selectedEventObject.id_event}&key=${token}`;
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
    <ScrollView>
      <View style={styles.buttonContainer}>
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
          containerStyle={{
            ...styles.buttonContainer,
            overflow: 'hidden',
            borderRadius: 30,
          }}
          raised
          onPress={handleDownloadReportSemanal} 
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="   Descargar informe día anterior"
          icon={<AntDesign name="download" size={25} color="white" />}
          buttonStyle={{
            backgroundColor: 'green',
            width: 300,
            height: 50,
            padding: 10,
            borderRadius: 30,
          }}
          containerStyle={{
            ...styles.buttonContainer,
            overflow: 'hidden',
            borderRadius: 30,
          }}
          raised
          onPress={handleDownloadReportDiaAnterior} // Attach the onPress handler to the function
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="   Descargar informe venta online"
          icon={<AntDesign name="download" size={25} color="white" />}
          buttonStyle={{
            backgroundColor: 'green',
            width: 300,
            height: 50,
            padding: 10,
            borderRadius: 30,
          }}
          containerStyle={{
            ...styles.buttonContainer,
            overflow: 'hidden',
            borderRadius: 30,
          }}
          raised
          onPress={handleDownloadReportOnline} // Attach the onPress handler to the function
        />
      </View>


      <View style={styles.buttonContainer}>
        <Button
          title="   Descargar informe diario"
          icon={<AntDesign name="download" size={25} color="white" />}
          buttonStyle={{
            backgroundColor: 'green',
            width: 300,
            height: 50,
            padding: 10,
            borderRadius: 30,
            overflow: 'hidden',
          }}
          containerStyle={{
            ...styles.buttonContainer,
            overflow: 'hidden',
            borderRadius: 30,
          }}
          raised
          onPress={handleDownloadReportDiario} // Attach the onPress handler to the function
        />
      </View>



      <View style={styles.buttonContainer}>

<Button
  title="   Descargar informe sillas impresas"
  icon={<AntDesign name="download" size={25} color="white" />}
  buttonStyle={{
    backgroundColor: 'green',
    width: 310,
    height: 50,
    padding: 10,
    borderRadius: 30,
  }}
  containerStyle={{
    ...styles.buttonContainer,
    overflow: 'hidden',
    borderRadius: 30,
  }}
  raised
  onPress={handleDownloadReportSillas} // Attach the onPress handler to the function
/>
</View>


<View style={styles.buttonContainer}>

<Button
  title="       Descargar informe aforo"
  icon={<AntDesign name="download" size={25} color="white" />}
  buttonStyle={{
    backgroundColor: 'green',
    width: 310,
    height: 50,
    padding: 10,
    borderRadius: 30,
  }}
  containerStyle={{
    ...styles.buttonContainer,
    overflow: 'hidden',
    borderRadius: 30,
  }}
  raised
  onPress={handleDownloadReportAforo} // Attach the onPress handler to the function
/>
</View>


      </ScrollView>
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
    marginTop: 40,
    backgroundColor: "black"
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

export default ReportesDescargables;



