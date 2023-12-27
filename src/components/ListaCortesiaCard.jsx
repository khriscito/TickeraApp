import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

const ListaCortesiaCard = ({ events, listaData }) => {

  return (
    <Card containerStyle= {{ margin: 10, backgroundColor: '#a6a6a6', borderRadius: 60 }}>
    {listaData?.order.map((item, index) => (
      <View key={index}>
    <Text style={styles.cardValue}>
      <AntDesign name='gift' size={40} color='white' />
    </Text>
    <Text style={[styles.cardText, styles.leftAlign]}>
      Número de Orden: {item.id_purchase_order}
    </Text>
        <Text style={styles.methodText}>Fecha: {item.date}:</Text>
        <Text style={styles.methodValue}>Hora: {item.time} </Text>
      </View>
    ))}
  </Card>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    borderRadius: 80
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#a6a6a6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    alignSelf: 'flex-start',
    margin: 5
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  leftAlign: {
    alignSelf: 'flex-start',
  },
  methodText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  },
  methodValue: {
    fontSize: 16,
    marginBottom: 10
  },
});

export default ListaCortesiaCard
