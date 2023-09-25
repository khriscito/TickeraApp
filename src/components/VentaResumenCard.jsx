import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

const VentaResumenCard = ({ event, thirdData }) => {
  const ordenesVenta = thirdData
  ? thirdData.aforo - thirdData.ordenes - thirdData.bloqueo - thirdData.ordenesDia - thirdData.ordenesAyer - thirdData.ordenesCortesia - thirdData.ordenesDescuento
  : 0;
  return (
    <View style={styles.cardContainer}>
      <Card containerStyle={styles.card}>
        <Text style={styles.cardValue}>
      <AntDesign name='team' size={40} color='white'/>
                    </Text>
         <Text style={[styles.cardText, styles.leftAlign]}>
          Total Aforo</Text>
        <Text style={[styles.cardValue]}>{(parseFloat(thirdData?.aforo || 0)).toLocaleString('es-ES')}</Text>
      </Card>

      <Card containerStyle={styles.card}>
      <Text style={styles.cardValue}>
      <AntDesign name='profile' size={40} color='white'/>
                    </Text>
        <Text style={[styles.cardText, styles.leftAlign]}>Total tickets:</Text>
        <Text style={[styles.cardValue]}>{(parseFloat(thirdData?.ordenes || 0)).toLocaleString('es-ES')}</Text>
      </Card>


      <Card containerStyle={styles.card}>
      <Text style={styles.cardValue}>
      <AntDesign name='closesquareo' size={40} color='white'/>
                    </Text>
        <Text style={[styles.cardText, styles.leftAlign]}>Total tickets bloqueados:</Text>
        <Text style={[styles.cardValue]}>{(parseFloat(thirdData?.bloqueo || 0)).toLocaleString('es-ES')}</Text>
      </Card>


      <Card containerStyle={styles.card}>
      <Text style={styles.cardValue}>
      <AntDesign name='carryout' size={40} color='white'/>
                    </Text>
        <Text style={[styles.cardText, styles.leftAlign]}>Total tickets del día:</Text>
        <Text style={[styles.cardValue]}>{(parseFloat(thirdData?.ordenesDia || 0)).toLocaleString('es-ES')}</Text>
      </Card>



      <Card containerStyle={styles.card}>
      <Text style={styles.cardValue}>
      <AntDesign name='back' size={40} color='white'/>
                    </Text>
        <Text style={[styles.cardText, styles.leftAlign]}>Tickets de ayer:</Text>
        <Text style={[styles.cardValue]}>{(parseFloat(thirdData?.ordenesAyer || 0)).toLocaleString('es-ES')}</Text>
      </Card>


      <Card containerStyle={styles.card}>
      <Text style={styles.cardValue}>
      <AntDesign name='smileo' size={40} color='white'/>
                    </Text>
        <Text style={[styles.cardText, styles.leftAlign]}>Tickets de cortesía:</Text>
        <Text style={[styles.cardValue]}>{(parseFloat(thirdData?.ordenesCortesia || 0)).toLocaleString('es-ES')}</Text>
      </Card>

      <Card containerStyle={styles.card}>
      <Text style={styles.cardValue}>
      <AntDesign name='minuscircleo' size={40} color='white'/>
                    </Text>
        <Text style={[styles.cardText, styles.leftAlign]}>Tickets por descuento:</Text>
        <Text style={[styles.cardValue]}>{(parseFloat(thirdData?.ordenesDescuento || 0)).toLocaleString('es-ES')}</Text>
      </Card>


      <Card containerStyle={styles.card}>
      <Text style={styles.cardValue}>
      <AntDesign name='shoppingcart' size={40} color='white'/>
                    </Text>
        <Text style={[styles.cardText, styles.leftAlign]}>Total de tickets para la venta:</Text>
        <Text style={[styles.cardValue]}>{(ordenesVenta).toLocaleString('es-ES')}</Text>
      </Card>



      <Card containerStyle={styles.card}>
      <Text style={styles.cardValue}>
      <AntDesign name='back' size={40} color='white'/>
                    </Text>
        <Text style={[styles.cardText, styles.leftAlign]}>Venta por taquilla:</Text>
        {thirdData?.html && thirdData?.html.map((item, index) => (
          <View key={index} style={styles.methodRow}>
            <Text  style={styles.articuloValue}>Taquilla: {item.taquilla}</Text>
            <Text  style={styles.articuloValue}>Cantidad: {item.cantidad}</Text>
          </View>
        ))}
      </Card>



      <Card containerStyle={styles.card}>
  <Text style={styles.cardValue}>
    <AntDesign name='back' size={40} color='white'/>
  </Text>
  <Text style={[styles.cardText, styles.leftAlign]}>Venta por artículo:</Text>
  <View style={styles.methodRow}>
    <Text style={[styles.articuloValue, styles.leftAlign,]}>Artículo</Text>
    <Text style={[styles.articuloValue, styles.rightAlign,]}>Cantidad</Text>
  </View>
  {thirdData?.html && thirdData?.html2.map((item, index) => (
    <View key={index} style={styles.methodRow}>
      <Text style={[styles.articuloValue, styles.leftAlign,]}> {item.articulo}:</Text>
      <Text style={[styles.articuloValue, styles.rightAlign,]}> {item.cantidad}</Text>
    </View>
  ))}
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
  articuloValue: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 5,
  },
  leftAlign: {
    alignSelf: 'flex-start',
  },
  rightAlign: {
    alignSelf: 'flex-end', 
  },
  methodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});

export default VentaResumenCard;