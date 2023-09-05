import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native'
import { Button } from '@rneui/themed';
import StyledText from '../components/StyledText.jsx'
import { Formik, useField } from "formik";
import StyledTextInput from "../components/StyledTextInput.jsx";
import { loginValidationSchema } from "../validationsSchemas/login.js";
import { Dimensions } from 'react-native';
import { ImageBackground, Image } from 'react-native';
import { APIContext } from "../components/APIContext";

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
  },
  prelogin: {
    margin: 10,
    marginTop: 25,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
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
  const { setToken, setNameLastname } = useContext(APIContext);
  const [loading, setLoading] = useState(false);
  const [formInteracted, setFormInteracted] = useState(false); // Track if the form has been interacted with

  useEffect(() => {
    if (apiResponse && apiResponse.success) {
      setToken(apiResponse.data.token);
      setNameLastname(apiResponse.data.name_lastname);
      navigation.navigate('Drawer', { screen: 'Dashboard' });
    } else if (apiResponse && !apiResponse.success) {
      setError(apiResponse.status);
    }
  }, [apiResponse, setToken, setNameLastname, navigation]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const apiUrl = `https://makeidsystems.com/makeid/index.php?r=site/LoginApi&email=${values.email}&password=${values.password}`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }

      });
      setLoading(false);
      const data = await response.json();
      setApiResponse(data);


      if (data.success) {
        setError(null);
      } else {
        setError(data.status);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleFormInteract = () => {
    setFormInteracted(true);
  };

  return (
    <KeyboardAvoidingView 
    behavior={Platform.OS === "ios" ? "position" : "default"} 
    style={{ flex: 1 }}
  >
    <ImageBackground source={image} style={{ flex: 1, resizeMode: 'cover' }}>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => {
          return (
            <View style={{ width: screenWidth, height: screenHeight, flex: 1, justifyContent: 'flex-end' }}>
              <View style={{ width: screenWidth, height: screenHeight, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  style={{ width: 400, height: 400 }}
                  source={require("../../assets/defaultImage.png")}
                ></Image>
                {!formInteracted && (
                  <Text style={styles.prelogin}>Utilice su correo electrónico y su contraseña para ingresar</Text>
                )}
              </View>
              <FormikInputValue
                name='email'
                placeholder='Correo electrónico'
                onFocus={handleFormInteract}
              />
              <FormikInputValue
                name='password'
                placeholder='Contraseña'
                secureTextEntry
                onFocus={handleFormInteract} 
              />
              {error && <StyledText style={styles.error}>{error}</StyledText>}
              <Button
                title="Login"
                buttonStyle={{
                  backgroundColor: 'green',
                  width: 200,
                  height: 50,
                  padding: 10,
                  borderRadius: 30,
                  marginBottom: 10
                  
                }}
                containerStyle={{
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                loading={loading}
                onPress={handleSubmit}
              />
            </View>
          );
        }}
      </Formik>
    </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Login;


