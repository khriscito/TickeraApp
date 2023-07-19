import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

const VentaResumenCard = ({ event, thirdData }) => {
  const ordenesVenta = thirdData.aforo - thirdData.ordenes - thirdData.bloqueo - thirdData.ordenesDia - thirdData.ordenesAyer - thirdData.ordenesCortesia - thirdData.ordenesDescuento;
  
  return (
    <View style={styles.cardContainer}>
      <Card containerStyle={styles.card}>
        <Text style={styles.cardValue}>
      <AntDesign name='team' size={40} color='white'/>
                    </Text>
         <Text style={[styles.cardText, styles.leftAlign]}>
          Total Aforo</Text>
        <Text style={[styles.cardValue]}>{(parseFloat(thirdData.aforo || 0)).toLocaleString('es-ES')}</Text>
      </Card>

      <Card containerStyle={styles.card}>
      <Text style={styles.cardValue}>
      <AntDesign name='profile' size={40} color='white'/>
                    </Text>
        <Text style={[styles.cardText, styles.leftAlign]}>Total tickets:</Text>
        <Text style={[styles.cardValue]}>{(parseFloat(thirdData.ordenes || 0)).toLocaleString('es-ES')}</Text>
      </Card>


      <Card containerStyle={styles.card}>
      <Text style={styles.cardValue}>
      <AntDesign name='closesquareo' size={40} color='white'/>
                    </Text>
        <Text style={[styles.cardText, styles.leftAlign]}>Total tickets bloqueados:</Text>
        <Text style={[styles.cardValue]}>{(parseFloat(thirdData.bloqueo || 0)).toLocaleString('es-ES')}</Text>
      </Card>


      <Card containerStyle={styles.card}>
      <Text style={styles.cardValue}>
      <AntDesign name='carryout' size={40} color='white'/>
                    </Text>
        <Text style={[styles.cardText, styles.leftAlign]}>Total tickets del día:</Text>
        <Text style={[styles.cardValue]}>{(parseFloat(thirdData.ordenesDia || 0)).toLocaleString('es-ES')}</Text>
      </Card>



      <Card containerStyle={styles.card}>
      <Text style={styles.cardValue}>
      <AntDesign name='back' size={40} color='white'/>
                    </Text>
        <Text style={[styles.cardText, styles.leftAlign]}>Tickets de ayer:</Text>
        <Text style={[styles.cardValue]}>{(parseFloat(thirdData.ordenesAyer || 0)).toLocaleString('es-ES')}</Text>
      </Card>


      <Card containerStyle={styles.card}>
      <Text style={styles.cardValue}>
      <AntDesign name='smileo' size={40} color='white'/>
                    </Text>
        <Text style={[styles.cardText, styles.leftAlign]}>Tickets de cortesía:</Text>
        <Text style={[styles.cardValue]}>{(parseFloat(thirdData.ordenesCortesia || 0)).toLocaleString('es-ES')}</Text>
      </Card>

      <Card containerStyle={styles.card}>
      <Text style={styles.cardValue}>
      <AntDesign name='minuscircleo' size={40} color='white'/>
                    </Text>
        <Text style={[styles.cardText, styles.leftAlign]}>Tickets por descuento:</Text>
        <Text style={[styles.cardValue]}>{(parseFloat(thirdData.ordenesDescuento || 0)).toLocaleString('es-ES')}</Text>
      </Card>


      <Card containerStyle={styles.card}>
      <Text style={styles.cardValue}>
      <AntDesign name='shoppingcart' size={40} color='white'/>
                    </Text>
        <Text style={[styles.cardText, styles.leftAlign]}>Total de tickets para la venta:</Text>
        <Text style={[styles.cardValue]}>{(ordenesVenta).toLocaleString('es-ES')}</Text>
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

export default VentaResumenCard;