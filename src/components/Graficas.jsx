import React, { useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import { APIContext } from './APIContext';
import DropDownPicker from 'react-native-dropdown-picker';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';


const Graficas = () => {
  const { events, fifthDataArray } = useContext(APIContext);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDropdownChange = (itemValue) => {
    setValue(itemValue);
    setSelectedEvent(itemValue);
  };

  const filteredEvents = selectedEvent
    ? events.filter((event) => event.name === selectedEvent)
    : events;
  const filteredfifthData = selectedEvent
    ? fifthDataArray.filter(
        (_, index) => events[index]?.name === selectedEvent
      )
    : fifthDataArray;

  const dropdownItems = events.map((event) => ({
    label: event.name,
    value: event.name,
  }));


  const transformDataFecha = (data) => {
    const labels = data.flatMap((item) => item.fechas);
    const dataSet = data.flatMap((item) => (item.fechaCant));

    
    return {
      labels: labels,
      datasets: [{ data: dataSet }],
    };
  };
  

  const transformDataArticulo = (data) => {
    const labels = data.flatMap((item) => item.nameArticulo);
    const dataSet = data.flatMap((item) => (item.cantArticulo));    
    return {
      labels: labels,
      datasets: [{ data: dataSet }],
    };
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff', // Cambiar a color blanco
    backgroundGradientFromOpacity: 1, // Cambiar a opacidad completa
    backgroundGradientTo: '#ffffff', // Cambiar a color blanco
    backgroundGradientToOpacity: 1, // Cambiar a opacidad completa
    fillShadowGradient: '#ed0c0c',
    fillShadowGradientOpacity: 1,
    barPercentage: 0.5,
    labelFontSize: 50,
    color: (opacity = 1) => `#007BFF`,
    labelColor: (opacity = 1) => `#333`,
    propsForLabels: {
      fontSize: 8,
    },
  };

  const transformDataForPieChart = (data) => {
    const response = data[0]; // Assuming the data is an array containing a single object
    return [
      {
        name: 'Taquilla',
        population: response?.taquilla || 0, // Use optional chaining to handle undefined values
        color: '#498AF4', // Choose an appropriate color
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Web',
        population: response?.web || 0, // Use optional chaining to handle undefined values
        color: '#FEB249', // Choose an appropriate color
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
    ];
  };
  
  
  
  

  const screenWidth = Dimensions.get('window').width;


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
          <View
          key={item.id_event}
          style={styles.cardContainer}
          >
          </View>
        )}
        />
        
        <ScrollView>
        <Text style={styles.title}>Por 7 días:</Text>
<BarChart
        data={transformDataFecha(filteredfifthData)}
        width={screenWidth}
        height={450}
        chartConfig={chartConfig}
        fromZero={true}
        style={{ marginVertical: 60  }}
        verticalLabelRotation={90}
        />
<Text style={styles.title}>Por articulo:</Text>
<BarChart
        data={transformDataArticulo(filteredfifthData)}
        width={screenWidth}
        height={600}
        chartConfig={chartConfig}
        fromZero={true}
        style={{ marginVertical: 40 }}
        verticalLabelRotation={90}
        />

<Text style={styles.title}>Ventas Online vs Taquilla:</Text>
<PieChart
  data={transformDataForPieChart(filteredfifthData)}
  width={screenWidth}
  height={220}
  chartConfig={chartConfig}
  accessor={'population'}
  backgroundColor={'transparent'}
  paddingLeft={'15'}
/>




      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    position: 'absolute',
    zIndex: 9999,
    marginBottom: 20
  },
  
  title: {
    marginTop: 30,
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
},
  cardContainer: {
    marginTop: 25
  },
});
  

export default Graficas;


