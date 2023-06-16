import React from "react";
import {View, Button} from 'react-native'
import StyledText from './StyledText.jsx'
import Constants from 'expo-constants'
import AppBar from './AppBar.jsx'

const Main = ({navigation}) => {
return(
  <View style={{marginTop: Constants.statusBarHeight,flexGrow:1}}>
    <AppBar />
    <StyledText fontWeight='bold' fontSize="subheading">Hola Mundo!</StyledText>
    <StyledText fontWeight='bold'>Hola Mundo!</StyledText>
    <StyledText >Hola Mundo!</StyledText>
    <StyledText >Hola Mundo!</StyledText>
    <StyledText >Hola Mundo!</StyledText>
    <StyledText >Hola Mundo!</StyledText>
    <StyledText >Hola Mundo!</StyledText>
    <StyledText >Hola Mundo!</StyledText>
    <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      />
      </View>
    )
}



export default Main
