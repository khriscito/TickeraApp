import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SeatTable = ({ seatData }) => {
  return (
    <View style={styles.tableContainer}>
      {seatData.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {row.map((seat, columnIndex) => (
            <View
              key={`seat-${rowIndex}-${columnIndex}`}
              style={[
                styles.seat,
                { backgroundColor: seat.color, opacity: seat.sold ? 0.5 : 1 },
              ]}
            >
              <Text style={styles.seatText}>{seat.name}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  seat: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    margin: 2,
  },
  seatText: {
    color: '#000',
    fontSize: 10,
    textAlign: 'center',
  },
});

export default SeatTable;