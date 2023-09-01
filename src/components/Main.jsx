import React from "react";
import {View} from 'react-native'
import { Button } from '@rneui/themed';
import StyledText from './StyledText.jsx'
import { Dimensions } from 'react-native';
import { ImageBackground } from 'react-native';
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;


const Main = ({navigation}) => {
const image = require('../../assets/background.jpg');
return(
  <ImageBackground source={image} style={{flex: 1, resizeMode: 'cover'}}>
  <View style={{width: screenWidth, height: screenHeight, flex:1, justifyContent: 'flex-end'}}>
    <StyledText fontWeight='bold' fontSize="heading" color="secondary">¿Preparado para disfrutar del mejor evento de tu vida?</StyledText>
    <View style={{flex: 1, justifyContent: 'flex-end'}}>
    <StyledText fontWeight='bold' fontSize="subheading" color="secondary">Ingresa aquí para la gestión de todos los eventos</StyledText>
    <Button

title="Ir al Login"
buttonStyle={{
backgroundColor: 'blue',
width: 200,
height: 50,
padding: 10,
borderRadius: 30,
marginTop: 20,
marginBottom: 40
}} containerStyle={{
justifyContent: 'center',
alignItems: 'center'
}}
raised
        onPress={() => navigation.navigate('Login')}
        />
        </View>
      </View>
      </ImageBackground>
    )
}



export default Main
