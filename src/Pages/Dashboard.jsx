import React, { useContext } from "react";
import { View, Button } from 'react-native'
import StyledText from '../components/StyledText.jsx'
import { TokenContext } from '../components/tokenContext.js'

const Dashboard = ({ navigation }) => {
  const { token } = useContext(TokenContext);
  return (
    <View>
      {!token || token === null ?
        (<><StyledText>Solo puedes ingresar si has iniciado sesion previamente</StyledText>
        <Button
      title="Regresar a Login"
      onPress={() => navigation.navigate('Login')}
      /></>)
        :
        <StyledText>
          Este es el dashboard
        </StyledText>}</View>
  )
}

export default Dashboard