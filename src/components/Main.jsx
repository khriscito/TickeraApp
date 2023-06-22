import React from "react";
import {View, Button} from 'react-native'
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
    <StyledText fontWeight='bold' fontSize="heading" color="secondary">¿Preparado para vivir la experiencia de tu vida?</StyledText>
    <View style={{flex: 1, justifyContent: 'flex-end'}}>
    <StyledText fontWeight='bold' fontSize="subheading" color="secondary">ingresa aqui para la gestion de todos los eventos</StyledText>
    <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
        />
        </View>
      </View>
      </ImageBackground>
    )
}



export default Main
