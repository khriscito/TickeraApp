import React from "react";
import { View, Image, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import defaultImage from '../../assets/defaultImage.png';

const EventCard = ({ event, thirdData }) => {
    const imageSource = event.url ? { uri: event.image } : defaultImage;
    const ordenesVenta = thirdData.aforo - thirdData.ordenes - thirdData.bloqueo - thirdData.ordenesDia - thirdData.ordenesAyer - thirdData.ordenesCortesia - thirdData.ordenesDescuento;
    return (
        <Card containerStyle={{ margin: 10, backgroundColor: '#a6a6a6', borderRadius: 80 }}>
            <View key={event.id_event} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
                            <Text style={styles.orderLabel}>Aforo:</Text>
                        </View>
                        <Text style={styles.orderText}>{(parseFloat(thirdData.aforo || 0)).toLocaleString('es-ES')}</Text>
                    </View>
                    <View style={styles.orderContainer}>
                        <View style={styles.orderLeft}>
                        <AntDesign name='profile' size={20} color='white'/>
                            <Text style={styles.orderLabel}>Total tickets:</Text>
                        </View>
                        <Text style={styles.orderText}>{(parseFloat(thirdData.ordenes || 0)).toLocaleString('es-ES')}</Text>
                    </View>
                    <View style={styles.orderContainer}>
                        <View style={styles.orderLeft}>
                        <AntDesign name='closesquareo' size={20} color='white'/>
                            <Text style={styles.orderLabel}>Total tickets bloqueados:</Text>
                        </View>
                        <Text style={styles.orderText}>{(parseFloat(thirdData.bloqueo || 0)).toLocaleString('es-ES')}</Text>
                    </View>
                    <View style={styles.orderContainer}>
                        <View style={styles.orderLeft}>
                        <AntDesign name='carryout' size={20} color='white'/>
                            <Text style={styles.orderLabel}>Total tickets del día:</Text>
                        </View>
                        <Text style={styles.orderText}>{(parseFloat(thirdData.ordenesDia || 0)).toLocaleString('es-ES')}</Text>
                    </View>
                    <View style={styles.orderContainer}>
                        <View style={styles.orderLeft}>
                        <AntDesign name='back' size={20} color='white'/>
                            <Text style={styles.orderLabel}>Tickets de ayer:</Text>
                        </View>
                        <Text style={styles.orderText}>{(parseFloat(thirdData.ordenesAyer || 0)).toLocaleString('es-ES')}</Text>
                    </View>
                    <View style={styles.orderContainer}>
                        <View style={styles.orderLeft}>
                        <AntDesign name='smileo' size={20} color='white'/>
                            <Text style={styles.orderLabel}>Tickets de cortesía:</Text>
                        </View>
                        <Text style={styles.orderText}>{(parseFloat(thirdData.ordenesCortesia || 0)).toLocaleString('es-ES')}</Text>
                    </View>
                    <View style={styles.orderContainer}>
                        <View style={styles.orderLeft}>
                        <AntDesign name='minuscircleo' size={20} color='white'/>
                            <Text style={styles.orderLabel}>Tickets por descuento:</Text>
                        </View>
                        <Text style={styles.orderText}>{(parseFloat(thirdData.ordenesDescuento || 0)).toLocaleString('es-ES')}</Text>
                    </View>
                    <View style={styles.orderContainer}>
                        <View style={styles.orderLeft}>
                        <AntDesign name='shoppingcart' size={20} color='white'/>
                            <Text style={styles.orderLabel}>Total de tickets para la venta:</Text>
                        </View>
                        <Text style={styles.orderText}>{(ordenesVenta).toLocaleString('es-ES')}</Text>
                    </View>
                </View>
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
    orderText: {
        color: 'white',
        textAlign: 'right',
        flex: 1,
    },
});

export default EventCard;





