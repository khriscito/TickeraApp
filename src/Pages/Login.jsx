import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Button } from 'react-native'
import StyledText from '../components/StyledText.jsx'
import { Formik, useField } from "formik";
import StyledTextInput from "../components/StyledTextInput.jsx";
import { loginValidationSchema } from "../validationsSchemas/login.js";
import { Dimensions } from 'react-native';
import { ImageBackground } from 'react-native';
import { TokenContext } from "../components/tokenContext.js";

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

const initialValues = {
  email: '',
  password: ''
}

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 50,
    marginTop: -5
  }
})

const FormikInputValue = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name)
  return (
    <>
      <StyledTextInput
        error={meta.error}
        value={field.value}
        onChangeText={value => helpers.setValue(value)}
        {...props}
      />
      {meta.error && <StyledText style={styles.error}>{meta.error}</StyledText>}
    </>
  )
}

const Login = ({ navigation }) => {
  const image = require('../../assets/background.jpg');
  const [apiResponse, setApiResponse] = useState(null);
  const [error, setError] = useState(null);
  const { token, setToken } = useContext(TokenContext);
  

  useEffect(() => {
    console.log(apiResponse);
    if (apiResponse && apiResponse.success) {
      setToken(apiResponse.token);
      console.log(apiResponse.token);
      navigation.navigate('Dashboard');
    } else if (apiResponse && !apiResponse.success) {
      setError(apiResponse.status);
    }
  }, [apiResponse]);

  const handleSubmit = async (values) => {
    try {
      const apiUrl = `https://makeidsystems.com/makeid/index.php?r=site/LoginApi&email=${values.email}&password=${values.password}`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      const data = await response.json();
      setApiResponse(data);
      setToken(null);

      if (data.success) {
        setToken(data.token);
        setError(null);
        navigation.navigate('Dashboard');
      } else {
        setError(data.status);
        setToken(null);
      }
    } catch (error) {
      console.log(error);
      // Manejar el error de la llamada a la API
    }
  };


  return (
    <ImageBackground source={image} style={{ flex: 1, resizeMode: 'cover' }}>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => {
          return (
            <View style={{ width: screenWidth, height: screenHeight, flex: 1, justifyContent: 'flex-end' }}>
              <View style={{ width: screenWidth, height: screenHeight, flex: 1, justifyContent: 'flex-start' }}>
                <Button title="Go to Main" onPress={() => navigation.navigate('Main')} />
                <Button title="Go to Register" onPress={() => navigation.navigate('Register')} />
                <Button title="Go to Dashboard" onPress={() => navigation.navigate('Dashboard')} />
              </View>
              <FormikInputValue
                name='email'
                placeholder='email'
              />
              <FormikInputValue
                name='password'
                placeholder='password'
                secureTextEntry
              />
              {error && <StyledText style={styles.error}>{error}</StyledText>}
              <Button title="Login" onPress={handleSubmit} />
            </View>
          );
        }}
      </Formik>
    </ImageBackground>
  );
};

export default Login;