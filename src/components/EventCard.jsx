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
                      <AntDesign name='filetext1' size={20} color='white' style={{ marginRight: 10 }}/>   Nombre: {event.name}
                    </Text>
                    
                    <Text style={styles.propertyText}>
                        <AntDesign name='calendar' size={20} color='white'/>   Fecha: {event.event_date}
                    </Text>

                    <Text style={styles.title}>ESTATUS DE ORDENES </Text>
                    <Text style={styles.propertyText}> <AntDesign name='calendar' size={20} color='white'/>   Ordenes:{secondData.ordenes}</Text>
                    <Text style={styles.propertyText}><AntDesign name='pluscircleo' size={20} color='white'/>   Abiertas:{secondData.abiertas}</Text>
                    <Text style={styles.propertyText}><AntDesign name='checkcircleo' size={20} color='white'/>   Verificadas:{secondData.verificacion}</Text>
                    <Text style={styles.propertyText}><AntDesign name='creditcard' size={20} color='white'/>   Pagadas:{secondData.pagado}</Text>
                    <Text style={styles.propertyText}><AntDesign name='printer' size={20} color='white'/>   Impresas:{secondData.impreso}</Text>
                    <Text style={styles.propertyText}> <AntDesign name='closesquare' size={20} color='white'/>   No impresas:{secondData.noimpreso}</Text>

                </View>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    propertyText: {
        marginBottom: 30,  // margen inferior para cada propiedad
        fontSize: 15
    },
    title:{
        marginBottom: 30,
        fontWeight: 'bold', 
        fontSize: 25,
        textAlign: 'center',        
    }
});
export default EventCard;



