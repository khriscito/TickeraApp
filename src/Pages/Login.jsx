import React from "react";
import {StyleSheet, View, Button} from 'react-native'
import StyledText from '../components/StyledText.jsx'
import { Formik, useField } from "formik";
import StyledTextInput from "../components/StyledTextInput.jsx";
import { loginValidationSchema } from "../validationsSchemas/login.js";
import { Dimensions } from 'react-native';
import { ImageBackground } from 'react-native';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;


const initialValues={

    email: '',
    password: ''
}

const styles= StyleSheet.create({

  error:{
    color:'red',
    fontSize: 12,
    marginBottom: 50,
    marginTop: -5
  }
  })

const FormikInputValue= ({name, ...props})=>{
    const [field,meta,helpers] =useField(name)
    return(

      <>
        <StyledTextInput
        error={meta.error}
        value={field.value}
        onChangeText={value =>helpers.setValue(value)}
        {...props}
        />
        {meta.error && <StyledText style={styles.error}>{meta.error}</StyledText>}
        </>
    )
}

const Login = ({ navigation }) => {
  const image = require('../../assets/background.jpg');
    return (
      <ImageBackground source={image} style={{flex: 1, resizeMode: 'cover'}}>
      <Formik validationSchema={loginValidationSchema} initialValues={initialValues} onSubmit={values => console.log(values)}>
        {({ handleSubmit }) => {
          return (
            <View style={{width: screenWidth, height: screenHeight, flex:1, justifyContent: 'flex-end'}}>
              <View style={{width: screenWidth, height: screenHeight, flex:1, justifyContent: 'flex-start'}}>
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
              <Button title="Login" onPress={handleSubmit} />              
            </View>
          );
        }}
      </Formik>
        </ImageBackground>
    );
  };
  
  export default Login;