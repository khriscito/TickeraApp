import React, { useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import { APIContext } from './APIContext';
import DropDownPicker from 'react-native-dropdown-picker';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryPie, VictoryTheme, VictoryLabel } from 'victory-native';
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
    return data.flatMap((item) =>
      item.fechas.map((fecha, index) => ({
        x: fecha,
        y: item.fechaCant[index],
        label: item.fechaCant[index].toString(),
      }))
    );
  };

  const transformDataArticulo = (data) => {
    return data.flatMap((item) =>
      item.nameArticulo.map((name, index) => ({
        x: name,
        y: item.cantArticulo[index],
        label: item.cantArticulo[index].toString(),
      }))
    );
  };

  const transformDataForPieChart = (data) => {
    const response = data[0];
    console.log(response);
    return [
      { x: 'Taquilla', y: response?.taquilla || 0 },
      { x: 'Web', y: response?.web || 0 },
    ];
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={{flex:1}}>
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
          <View key={item.id_event} style={styles.cardContainer}></View>
        )}
      />

      <ScrollView>
        <Text style={styles.title}>Por 7 días:</Text>
        <VictoryChart width={screenWidth} theme={VictoryTheme.material} domainPadding={10}>
          <VictoryBar
            data={transformDataFecha(filteredfifthData)}
            style={{ data: { fill: '#c43a31' } }}
            labelComponent={<VictoryLabel style={{ fill: 'white' }}  />}
            labels={({ datum }) => datum.y} // Show y value as label at the top of each bar
          />
          <VictoryAxis dependentAxis />
        </VictoryChart>

        <Text style={styles.title}>Por articulo:</Text>
        <VictoryChart width={screenWidth} theme={VictoryTheme.material} domainPadding={10}>
          <VictoryBar
            data={transformDataArticulo(filteredfifthData)}
            style={{ data: { fill: '#c43a31' } }}
            labelComponent={<VictoryLabel style={{ fill: 'white' }} />}
            labels={({ datum }) => datum.y.toString()} // Show y value as label at the top of each bar
            width={200}
            height={100}
          />
          <VictoryAxis dependentAxis />
        </VictoryChart>

        <Text style={styles.title}>Ventas Online vs Taquilla:</Text>
        <VictoryPie
          data={transformDataForPieChart(filteredfifthData)}
          colorScale={['#498AF4', '#FEB249']}
          labelComponent={<VictoryLabel style={{ fill: 'white' }} />}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    position: 'absolute',
    zIndex: 9999,
    marginBottom: 20,
  },
  title: {
    marginTop: 40,
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
  },
  cardContainer: {
    marginTop: 25,
  },
});

export default Graficas;