import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

const EventCardResume = ({ event, thirdData }) => {
    return (
        <Card containerStyle={{ margin: 10, backgroundColor: '#a6a6a6', borderRadius: 60 }}>
            <View key={event.id_event}>
                <View>
                    <Text style={styles.headText}>
                        {event.name}
                    </Text> 
                    <View style={styles.orderContainer}>
                        <View style={styles.orderLeft}>
                        <AntDesign name='profile' size={40} color='white'/>
                            <Text style={styles.orderLabel}>Tickets vendidos:</Text>
                        </View>
                        <Text style={styles.orderText}>{(parseFloat(thirdData?.ordenes || 0)).toLocaleString('es-ES')}</Text>
                    </View>
                </View>
            </View>
        </Card>
    );

}

const styles = StyleSheet.create({
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
        fontSize: 20
    },
    orderText: {
        color: 'white',
        textAlign: 'right',
        flex: 1,
        fontSize: 25
    },   
});

export default EventCardResume;