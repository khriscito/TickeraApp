import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

const IncomesCard = ({ events, fourthData }) => {
  let totalIngresoSegunTipoPago = 0;

  const precioCard = fourthData && fourthData.html ? (
    <Card containerStyle={styles.card}>
      <Text style={styles.cardValue}>
        <AntDesign name='wallet' size={40} color='white' />
      </Text>
      <Text style={[styles.cardText, styles.leftAlign]}>
        Total de ingreso según tipo de pago
      </Text>
      <Text style={[styles.cardValue]}>
        {(parseFloat(fourthData.recaudado) || 0).toLocaleString('es-ES')} $
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
    </Card>
  ) : null;

  if (precioCard) {
    totalIngresoSegunTipoPago = parseFloat(fourthData.recaudado) || 0;
  }

  return (
    <View style={styles.cardContainer}>
      <Card containerStyle={styles.card}>
        <Text style={styles.cardValue}>
          <AntDesign name='wallet' size={40} color='white' />
        </Text>
        <Text style={[styles.cardText, styles.leftAlign]}>
          Total dinero recaudado
        </Text>
        <Text style={[styles.cardValue]}>
          {(parseFloat(fourthData.recaudado) || 0).toLocaleString('es-ES')} $
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
      <Card containerStyle={styles.card}>
        <Text style={styles.cardValue}>
          <AntDesign name='creditcard' size={40} color='white' />
        </Text>
        <Text style={[styles.cardText, styles.leftAlign]}>BS equivalente a cotización:</Text>
        <Text style={[styles.cardValue]}>
          {(parseFloat(fourthData.recaudadobs) || 0).toLocaleString('es-ES')} BSS
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
        <Text style={[styles.cardText, styles.leftAlign]}>Recaudado total divisas:</Text>
        <Text style={[styles.cardValue]}>
          {(parseFloat(fourthData.recaudadocoti) || 0).toLocaleString('es-ES')} $
        </Text>
      </Card>
      {precioCard}
      {!precioCard && (
        <Card containerStyle={styles.card}>
          <Text style={styles.cardValue}>
            <AntDesign name='creditcard' size={40} color='white' />
          </Text>
          <Text style={[styles.cardText, styles.leftAlign]}>
            Total de ingreso según tipo de pago:
          </Text>
          <Text style={[styles.cardValue]}> {(totalIngresoSegunTipoPago).toLocaleString('es-ES')} $</Text>
        </Card>
      )}
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
});

export default IncomesCard;


