import React from "react";
import { View, Image, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import defaultImage from '../../assets/defaultImage.png';

const EventCard = ({ event, thirdData }) => {
    const imageSource = event.url ? { uri: event.image } : defaultImage;
    const ordenesVenta = thirdData
  ? thirdData.aforo - thirdData.ordenes - thirdData.bloqueo - thirdData.ordenesDia - thirdData.ordenesAyer - thirdData.ordenesCortesia - thirdData.ordenesDescuento
  : 0;
    return (
        <Card containerStyle={{ margin: 10, backgroundColor: '#a6a6a6', borderRadius: 60 }}>
            <View key={event.id_event}>
                <Image source={imageSource} style={{ width: 300, height: 300 }} resizeMode="contain" />
                <View>
                    <Text style={styles.headText}>
                        {event.name}
                    </Text>
                    
                    <Text style={styles.propertyText}>
                        <AntDesign name='calendar' size={20} color='white'/> Día del evento: {event.event_date}
                    </Text>

                    <Text style={styles.title}>ESTATUS DE ORDENES </Text>
                    <View style={styles.orderContainer}>
                        <View style={styles.orderLeft}>
                        <AntDesign name='team' size={20} color='white'/>
                            <Text style={styles.orderLabel}>Total Aforo:</Text>
                        </View>
                        <Text style={styles.orderText}>{(parseFloat(thirdData?.aforo || 0)).toLocaleString('es-ES')}</Text>
                    </View>
                    <View style={styles.orderContainer}>
                        <View style={styles.orderLeft}>
                        <AntDesign name='profile' size={20} color='white'/>
                            <Text style={styles.orderLabel}>Tickets vendidos:</Text>
                        </View>
                        <Text style={styles.orderText}>{(parseFloat(thirdData?.ordenes || 0)).toLocaleString('es-ES')}</Text>
                    </View>
                    <View style={styles.orderContainer}>
                        <View style={styles.orderLeft}>
                        <AntDesign name='closesquareo' size={20} color='white'/>
                            <Text style={styles.orderLabel}>Asientos bloqueados:</Text>
                        </View>
                        <Text style={styles.orderText}>{(parseFloat(thirdData?.bloqueo || 0)).toLocaleString('es-ES')}</Text>
                    </View>
                    <View style={styles.orderContainer}>
                        <View style={styles.orderLeft}>
                        <AntDesign name='carryout' size={20} color='white'/>
                            <Text style={styles.orderLabel}>Tickets vendidos hoy:</Text>
                        </View>
                        <Text style={styles.orderText}>{(parseFloat(thirdData?.ordenesDia || 0)).toLocaleString('es-ES')}</Text>
                    </View>
                    <View style={styles.orderContainer}>
                        <View style={styles.orderLeft}>
                        <AntDesign name='back' size={20} color='white'/>
                            <Text style={styles.orderLabel}>Tickets vendidos ayer:</Text>
                        </View>
                        <Text style={styles.orderText}>{(parseFloat(thirdData?.ordenesAyer || 0)).toLocaleString('es-ES')}</Text>
                    </View>
                    <View style={styles.orderContainer}>
                        <View style={styles.orderLeft}>
                        <AntDesign name='smileo' size={20} color='white'/>
                            <Text style={styles.orderLabel}>Tickets en cortesía:</Text>
                        </View>
                        <Text style={styles.orderText}>{(parseFloat(thirdData?.ordenesCortesia || 0)).toLocaleString('es-ES')}</Text>
                    </View>
                    <View style={styles.orderContainer}>
                        <View style={styles.orderLeft}>
                        <AntDesign name='minuscircleo' size={20} color='white'/>
                            <Text style={styles.orderLabel}>Tickets con descuento:</Text>
                        </View>
                        <Text style={styles.orderText}>{(parseFloat(thirdData?.ordenesDescuento || 0)).toLocaleString('es-ES')}</Text>
                    </View>
                    <View style={styles.orderContainer}>
                        <View style={styles.orderLeft}>
                        <AntDesign name='shoppingcart' size={20} color='white'/>
                            <Text style={styles.orderLabel}>Disponibles para la venta:</Text>
                        </View>
                        <Text style={styles.orderText}>{(ordenesVenta).toLocaleString('es-ES')}</Text>
                    </View>
                </View>
                <View style={styles.orderContainer}>
                        <View style={styles.orderLeft}>
                            <Text style={styles.orderCenter}>Venta por artículo</Text>
                    </View>
                    </View>
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
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    propertyText: {
        marginBottom: 30,
        fontSize: 15
    },
    headText: {
        marginBottom: 30,
        fontSize: 26,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    title: {
        marginBottom: 30,
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
    },
    orderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    orderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    orderLabel: {
        color: 'white',
        marginLeft: 5,
    },
    orderCenter: {
        color: 'white',
        alignItems: 'center',
        fontSize: 25,
        fontWeight: 'bold',
    },
    orderText: {
        color: 'white',
        textAlign: 'right',
        flex: 1,
    },
    cardValue: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 5,
      },
      cardText: {
        fontSize: 18, 
        fontWeight: 'bold', 
        textAlign: 'left',
        alignSelf: 'flex-start',
        margin: 5
      },
      articuloValue: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 5,
      },
      methodRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
      },
      leftAlign: {
        alignSelf: 'flex-start',
      },
      rightAlign: {
        alignSelf: 'flex-end', 
      },      
});

export default EventCard;





