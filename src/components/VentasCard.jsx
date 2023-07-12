import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

const VentasCard = ({ event, secondData }) => {
  return (
    <View style={styles.cardContainer}>
      <Card containerStyle={styles.card}>
        <Text style={styles.cardValue}>
      <AntDesign name='calendar' size={40} color='white'/>
                    </Text>
         <Text style={[styles.cardText, styles.leftAlign]}>
          Total de Ordenes:</Text>
        <Text style={[styles.cardValue]}>{secondData.ordenes}</Text>
      </Card>

      <Card containerStyle={styles.card}>
      <Text style={styles.cardValue}>
      <AntDesign name='pluscircleo' size={40} color='white'/>
                    </Text>
        <Text style={[styles.cardText, styles.leftAlign]}>Abiertas:</Text>
        <Text style={[styles.cardValue]}>{secondData.abiertas}</Text>
      </Card>

      <Card containerStyle={styles.card}>
      <Text style={styles.cardValue}>
      <AntDesign name='checkcircleo' size={40} color='white'/>
                    </Text>
        <Text style={[styles.cardText, styles.leftAlign]}>Verificadas:</Text>
        <Text style={[styles.cardValue]}>{secondData.verificacion}</Text>
      </Card>

      <Card containerStyle={styles.card}>
      <Text style={styles.cardValue}>
      <AntDesign name='creditcard' size={40} color='white'/>
                    </Text>
        <Text style={[styles.cardText, styles.leftAlign]}>Pagadas:</Text>
        <Text style={[styles.cardValue]}>{secondData.pagado}</Text>
      </Card>

      {/* <Card containerStyle={styles.card}>
      <Text style={styles.cardValue}>
      <AntDesign name='printer' size={40} color='white'/>
                    </Text>
        <Text style={[styles.cardText, styles.leftAlign]}>Impresas:</Text>
        <Text style={[styles.cardValue]}>{secondData.impreso}</Text>
      </Card>

      <Card containerStyle={styles.card}>
      <Text style={styles.cardValue}>
      <AntDesign name='closesquare' size={40} color='white'/>
                    </Text>
        <Text style={[styles.cardText, styles.leftAlign]}>No impresas:</Text>
        <Text style={[styles.cardValue]}>{secondData.noimpreso}</Text>
      </Card> */}
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

export default VentasCard;


