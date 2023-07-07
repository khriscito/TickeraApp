import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View} from 'react-native'
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
  const { token, setToken } = useContext(APIContext);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    if (apiResponse && apiResponse.success) {
      setToken(apiResponse.data.token);
      navigation.navigate('Drawer', { screen: 'Dashboard' });
    } else if (apiResponse && !apiResponse.success) {
      setError(apiResponse.status);
    }
  }, [apiResponse, setToken, navigation]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const apiUrl = `https://makeidsystems.com/makeid/index.php?r=site/LoginApi&email=${values.email}&password=${values.password}`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
      setLoading(false);

      const data = await response.json();
      setApiResponse(data);
      setToken(null);

      if (data.success) {
        setToken(data.token);
        setError(null);
        navigation.navigate('Drawer', { screen: 'Dashboard' });
      } else {
        setError(data.status);
        setToken(null);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
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
              <View style={{ width: screenWidth, height: screenHeight, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image 
                style={{width:400, height:400}}
                source={require("../../assets/defaultImage.png")}
                ></Image>
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
              <Button title="Login" 
              buttonStyle={{
          backgroundColor: 'green',
          width: 200,
          height: 50,
          padding: 10,
          borderRadius: 30
        }} containerStyle={{
          justifyContent: 'center',
          alignItems: 'center'
        }}
        loading={loading} onPress={handleSubmit} />
              
            </View>
          );
        }}
      </Formik>
    </ImageBackground>
  );
};

export default Login;
