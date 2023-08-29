import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { APIContext } from './APIContext';
import DropDownPicker from 'react-native-dropdown-picker';
import { PieChart } from 'react-native-chart-kit';

const Graficas = () => {
  const { events, fifthDataArray } = useContext(APIContext);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const colors = [
    "#FF5733", "#33FF57", "#5733FF", "#FF33A1", "#33A1FF",
    "#A1FF33", "#FF33E6", "#33E6FF", "#E6FF33", "#FF3333",
    "#33FF33", "#3333FF", "#FFFF33", "#FF33FF", "#33FFFF",
    "#FF9933", "#33FF99", "#9933FF", "#FF3399", "#3399FF",
    "#99FF33", "#FF33CC", "#33CCFF", "#CCFF33", "#FF6633",
    "#3366FF", "#FF3366", "#66FF33", "#FF3366", "#33FF66",
    "#66FF66", "#FF6666", "#6666FF", "#FF6666", "#66FFFF",
    "#FF6699", "#6699FF", "#FF9966", "#99FF66", "#FF66CC",
    "#66CCFF", "#CCFF66", "#FF66FF", "#66FFCC", "#FF99CC",
    "#99CCFF", "#FFCC99", "#CCFF99", "#FF99FF", "#99FF99",
    "#FFFF99", "#FFCCFF", "#CCFFFF", "#FFCCCC", "#CCCCCC"
  ];

  useEffect(() => {
    if (filteredEvents.length > 0) {
      setSelectedEvent(filteredEvents[0].name);
    }
  }, [filteredEvents]);

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
    const dataSet = data.flatMap((item) => item.fechaCant); 
  
    return dataSet.map((data, index) => ({
      name: labels[index],
      population: data,
      color: colors[index % colors.length], // Use the colors array
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    }));
  };
  

  const transformDataArticulo = (data) => {
    const labels = data.flatMap((item) => item.nameArticulo);
    const dataSet = data.flatMap((item) => item.cantArticulo); 
  
    return dataSet.map((data, index) => ({
      name: labels[index],
      population: data,
      color: colors[index % colors.length], // Use the colors array
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    }));
  };
  

  const chartConfig = {
    backgroundGradientFrom: '#ffffff', 
    backgroundGradientFromOpacity: 1, 
    backgroundGradientTo: '#ffffff', 
    backgroundGradientToOpacity: 1, 
    fillShadowGradient: '#ed0c0c',
    fillShadowGradientOpacity: 1,
    color: (opacity = 1) => `#007BFF`,
    labelColor: (opacity = 1) => `#333`,
    propsForLabels: {
      fontSize: 1
    },
  };

  const transformDataForPieChart = (data) => {
    const response = data[0]; 
    return [
      {
        name: 'Taquilla',
        population: response?.taquilla || 0, 
        color: getRandomColor(), // Asignar un color aleatorio
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Web',
        population: response?.web || 0, 
        color: getRandomColor(), // Asignar un color aleatorio
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
    ];
  };
  

  const getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  
    
  const screenWidth = Dimensions.get('window').width;

  return (
    <>
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
      <ScrollView>
  <Text style={styles.title}>Por 7 días:</Text>
  <PieChart
    data={transformDataFecha(filteredfifthData)}
    width={screenWidth}
    height={280}
    chartConfig={chartConfig}
    accessor={'population'}
    backgroundColor={'transparent'}
    paddingLeft={'15'}
    style={{ marginVertical: 60 }}
  />
  <Text style={styles.title}>Por articulo:</Text>
  <PieChart
    data={transformDataArticulo(filteredfifthData)}
    width={screenWidth}
    height={280}
    chartConfig={chartConfig}
    accessor={'population'}
    backgroundColor={'transparent'}
    paddingLeft={'15'}
    style={{ marginVertical: 40, marginHorizontal: 80}}
    hasLegend={false}
  />
        <View style={styles.legendContainer}>
        <Text style={styles.legendTitle}>Leyenda:</Text>
        {transformDataArticulo(filteredfifthData).map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
            <Text style={styles.legendLabel}>{item.name}</Text>
          </View>
        ))}
      </View>
      
  <Text style={styles.title}>Ventas Online vs Taquilla:</Text>
  <PieChart
    data={transformDataForPieChart(filteredfifthData)}
    width={screenWidth}
    height={280}
    chartConfig={chartConfig}
    accessor={'population'}
    backgroundColor={'transparent'}
    
    paddingLeft={'15'}
  />
</ScrollView>
    </>
  );
};


const styles = StyleSheet.create({
  dropdownContainer: {
    position: 'absolute',
    zIndex: 9999,
    marginBottom: 20
  },
  
  title: {
    marginTop: 60,
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
},
  cardContainer: {
    marginTop: 25
  },
  centeredChart: {
    alignItems: 'center',
  },
  legendContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  legendTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  colorIndicator: {
    width: 15,
    height: 15,
    marginRight: 8,
  },
  legendLabel: {
    fontSize: 15,
  },
});

export default Graficas;