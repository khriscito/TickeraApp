import React from "react";
import { View, Image } from 'react-native';
import Text from '../components/StyledText.jsx';
import { Card } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import defaultImage from '../../assets/defaultImage.png';

const EventCard = ({ event }) => {
const imageSource = event.url ? { uri: event.image } : defaultImage;
console.log(imageSource)
  return (
    <Card containerStyle={{ margin: 10, backgroundColor: '#a6a6a6', borderRadius: 80 }}>
      <View key={event.id_event} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={imageSource} style={{ width: 300, height: 300 }} resizeMode="contain" />
        <View>
          <Text>
            <Icon
              reverse
              name='description'
              color='#a6a6a6'
              size={17}
            />
            Nombre: {event.name}
          </Text>
          <Text>
            <Icon
              reverse
              name='event'
              color='#a6a6a6'
              size={17}
            />
            Fecha: {event.event_date}
          </Text>
        </View>
      </View>
    </Card>
  );
}
export default EventCard;
