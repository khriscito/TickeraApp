import React from "react";
import { View, Image, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import defaultImage from '../../assets/defaultImage.png';

const EventCard = ({ event, secondData }) => {
    const imageSource = event.url ? { uri: event.image } : defaultImage;
    console.log(imageSource)
    return (
        <Card containerStyle={{ margin: 10, backgroundColor: '#a6a6a6', borderRadius: 80 }}>
            <View key={event.id_event} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={imageSource} style={{ width: 300, height: 300 }} resizeMode="contain" />
                <View>
                    <Text style={styles.propertyText}>
                        <AntDesign name='filetext1' size={20} color='white' style={{ marginRight: 10 }}/> Nombre: {event.name}
                    </Text>
                    
                    <Text style={styles.propertyText}>
                        <AntDesign name='calendar' size={20} color='white'/> Fecha: {event.event_date}
                    </Text>

                    <Text style={styles.title}>ESTATUS DE ORDENES </Text>
                    <View style={styles.orderContainer}>
                        <View style={styles.orderLeft}>
                            <AntDesign name='calendar' size={20} color='white'/>
                            <Text style={styles.orderLabel}>Ordenes:</Text>
                        </View>
                        <Text style={styles.orderText}>{secondData.ordenes}</Text>
                    </View>
                    <View style={styles.orderContainer}>
                        <View style={styles.orderLeft}>
                            <AntDesign name='pluscircleo' size={20} color='white'/>
                            <Text style={styles.orderLabel}>Abiertas:</Text>
                        </View>
                        <Text style={styles.orderText}>{secondData.abiertas}</Text>
                    </View>
                    <View style={styles.orderContainer}>
                        <View style={styles.orderLeft}>
                            <AntDesign name='checkcircleo' size={20} color='white'/>
                            <Text style={styles.orderLabel}>Verificadas:</Text>
                        </View>
                        <Text style={styles.orderText}>{secondData.verificacion}</Text>
                    </View>
                    <View style={styles.orderContainer}>
                        <View style={styles.orderLeft}>
                            <AntDesign name='creditcard' size={20} color='white'/>
                            <Text style={styles.orderLabel}>Pagadas:</Text>
                        </View>
                        <Text style={styles.orderText}>{secondData.pagado}</Text>
                    </View>
                    <View style={styles.orderContainer}>
                        <View style={styles.orderLeft}>
                            <AntDesign name='printer' size={20} color='white'/>
                            <Text style={styles.orderLabel}>Impresas:</Text>
                        </View>
                        <Text style={styles.orderText}>{secondData.impreso}</Text>
                    </View>
                    <View style={styles.orderContainer}>
                        <View style={styles.orderLeft}>
                            <AntDesign name='closesquare' size={20} color='white'/>
                            <Text style={styles.orderLabel}>No impresas:</Text>
                        </View>
                        <Text style={styles.orderText}>{secondData.noimpreso}</Text>
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





