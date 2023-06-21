import React from "react";
import {StyleSheet, View, Button} from 'react-native'
import StyledText from '../components/StyledText.jsx'
import { Formik, useField } from "formik";
import StyledTextInput from "../components/StyledTextInput.jsx";
import { loginValidationSchema } from "../validationsSchemas/login.js";

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
    return (
      <Formik validationSchema={loginValidationSchema} initialValues={initialValues} onSubmit={values => console.log(values)}>
        {({ handleSubmit }) => {
          return (
            <View>
              <StyledText>Este es el Login</StyledText>
              <FormikInputValue
                name='email'
                placeholder='email'
              />
              <FormikInputValue
                name='password'
                placeholder='password'
                secureTextEntry
              />
              <Button title="Go to Main" onPress={() => navigation.navigate('Main')} />
              <Button title="Go to Register" onPress={() => navigation.navigate('Register')} />
              <Button title="Login" onPress={handleSubmit} />
              
            </View>
          );
        }}
      </Formik>
    );
  };
  
  export default Login;