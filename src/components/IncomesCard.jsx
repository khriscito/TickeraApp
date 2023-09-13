import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

const IncomesCard = ({ events, fourthData }) => {
  const [totalIngresoSegunTipoPago, setTotalIngresoSegunTipoPago] = useState(0);

  useEffect(() => {
    if (fourthData && fourthData.html) {
      const total = fourthData.html.reduce((accumulator, item) => {
        return accumulator + parseFloat(item.total);
      }, 0);

      setTotalIngresoSegunTipoPago(total);
    }
  }, [fourthData]);

  const precioCard = fourthData && fourthData.html ? (
    <Card containerStyle={styles.card}>
      <Text style={styles.cardValue}>
        <AntDesign name='wallet' size={40} color='white' />
      </Text>
      <Text style={[styles.cardText, styles.leftAlign]}>
        Total de ingreso según tipo de pago
      </Text>

      <Text style={[styles.cardText, styles.leftAlign]}>
        Métodos de Pago:
      </Text>
      {fourthData.html.map((item, index) => (
        <View key={index} style={styles.methodRow}>
          <Text style={styles.methodText}>{item.metodo}:</Text>
          <Text style={styles.methodValue}>{item.total} $</Text>
        </View>
      ))}
      <View style={styles.total}>
        <Text style={styles.methodText}>Total:</Text>
        <Text style={styles.methodValue}>
          {totalIngresoSegunTipoPago.toLocaleString('es-ES')} $
        </Text>
      </View>
    </Card>
  ) : null;

  return (
    <View style={styles.cardContainer}>
      <Card containerStyle={styles.card}>
        <Text style={styles.cardValue}>
          <AntDesign name='wallet' size={40} color='white' />
        </Text>
        <Text style={[styles.cardText, styles.leftAlign]}>
          Recaudación total $: 
        </Text>
        <Text style={[styles.cardValue]}>
          {(parseFloat(fourthData.recaudado) || 0).toLocaleString('es-ES')} $
        </Text>
      </Card>      
      <Card containerStyle={styles.card}>
        <Text style={styles.cardValue}>
          <AntDesign name='creditcard' size={40} color='white' />
        </Text>
        <Text style={[styles.cardText, styles.leftAlign]}>Recaudación total BSS</Text>
        <Text style={[styles.cardValue]}>
          {(parseFloat(fourthData.recaudadobs) || 0).toLocaleString('es-ES')} BSS
        </Text>
      </Card>
      <Card containerStyle={styles.card}>
        <Text style={styles.cardValue}>
          <AntDesign name='creditcard' size={40} color='white' />
        </Text>
        <Text style={[styles.cardText, styles.leftAlign]}>BS equivalente con contización</Text>
        <Text style={[styles.cardValue]}>
          {(parseFloat(fourthData.recaudadocoti) || 0).toLocaleString('es-ES')} $
        </Text>
      </Card>
      <Card containerStyle={styles.card}>
        <Text style={styles.cardValue}>
          <AntDesign name='creditcard' size={40} color='white' />
        </Text>
        <Text style={[styles.cardText, styles.leftAlign]}>Perdida $ por inflación:</Text>
        <Text style={[styles.cardValue]}>
          {(parseFloat(fourthData.recaudadocoper) || 0).toLocaleString('es-ES')} $
        </Text>
      </Card>
      <Card containerStyle={styles.card}>
        <Text style={styles.cardValue}>
          <AntDesign name='creditcard' size={40} color='white' />
        </Text>
        <Text style={[styles.cardText, styles.leftAlign]}>Total $:</Text>
        <Text style={[styles.cardValue]}>
          {(parseFloat(fourthData.recaudadocoti) + parseFloat(fourthData.recaudado) || 0).toLocaleString('es-ES')} $
        </Text>
      </Card>

      <Card containerStyle={styles.card}>
        <Text style={styles.cardValue}>
          <AntDesign name='creditcard' size={40} color='white' />
        </Text>
        <Text style={[styles.cardText, styles.leftAlign]}>Total recaudado hoy:</Text>
        <Text style={[styles.cardValue]}>
          {(parseFloat(fourthData.recaudadoDia) || 0).toLocaleString('es-ES')} $
        </Text>
      </Card>
      {precioCard}
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
    alignSelf: 'flex-start',
  },
  methodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  methodText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  methodValue: {
    fontSize: 16,
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20
  },
});

export default IncomesCard;



