import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

const IncomesCard = ({ events, fourthData }) => {
  return (
    <View style={styles.cardContainer}>
      <Card containerStyle={styles.card}>
        <Text style={styles.cardValue}>
      <AntDesign name='wallet' size={40} color='white'/>
                    </Text>
         <Text style={[styles.cardText, styles.leftAlign]}>
          Total dinero recaudado</Text>
        <Text style={[styles.cardValue]}>{(parseFloat(fourthData.recaudado) || 0).toLocaleString('es-ES')} $</Text>
      </Card>

      <Card containerStyle={styles.card}>
      <Text style={styles.cardValue}>
      <AntDesign name='creditcard' size={40} color='white'/>
                    </Text>
        <Text style={[styles.cardText, styles.leftAlign]}>Total recaudado hoy:</Text>
        <Text style={[styles.cardValue]}>{(parseFloat(fourthData.recaudadoDia) || 0).toLocaleString('es-ES')} $</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    borderRadius: 80
  },
  card: {
    marginBottom: 10,
    backgroundColor: '#a6a6a6',
    height: 120, 
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
    margin: 5,
  },
  leftAlign: {
    alignSelf: 'flex-start', // Aligns the text to the left within the entire card
  },
  rightAlign: {
    alignSelf: 'flex-end', // Aligns the text to the right within the entire card
  },
});

export default IncomesCard;
