import React, {useContext} from "react";
import {View, Button} from 'react-native'
import StyledText from '../components/StyledText.jsx'
import {TokenContext} from '../components/tokenContext.js'

const Dashboard=({navigation})=>{
    const { token } = useContext(TokenContext);
    if (!token || token === null)
    return (
        <View>
          <StyledText>Solo puedes ingresar si has iniciado sesion previamente</StyledText>
          <Button
        title="Regresar a Login"
        onPress={() => navigation.navigate('Login')}
        />
        </View>
      );
    return(
        <View >
        <StyledText>
            Este es el dashboard
        </StyledText>
        </View>
    )
}

export default Dashboard