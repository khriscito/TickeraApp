import React from "react";
import {View, Text, StyleSheet, Image} from 'react-native'
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
    <Text style={styles.landing}>Tu ventana personalizada a los mejores eventos y espectáculos en un solo lugar.</Text>
    <Image
          style={{ width: 400, height: 400 }}
          source={require("../../assets/defaultImage.png")}
        />
    <View style={{flex: 1, justifyContent: 'flex-end'}}>
    <Text style={styles.landing}>Ingresa aquí para la gestión de todos los eventos</Text>
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
        onPress={() => navigation.navigate('Login')}
        />
        </View>
      </View>
      </ImageBackground>     
      )    
}
const styles = StyleSheet.create({
  landing: {
    margin: 10,
    marginTop: 25,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },})



export default Main
