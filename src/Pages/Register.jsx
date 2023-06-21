import React from "react";
import {StyleSheet, View, Button} from 'react-native'
import StyledText from '../components/StyledText.jsx'
import { Formik, useField } from "formik";
import StyledTextInput from "../components/StyledTextInput.jsx";
import { registerValidationSchema } from "../validationsSchemas/register.js";

const initialValues={

    email: '',
    password: '',
    phone: ''
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


const Register = ({ navigation }) => {
    return (
      <Formik validationSchema={registerValidationSchema} initialValues={initialValues} onSubmit={values => console.log(values)}>
        {({ handleSubmit }) => {
          return (
            <View>
              <StyledText>Este es el Register</StyledText>
              <FormikInputValue
                name='email'
                placeholder='email'
              />
              <FormikInputValue
                name='password'
                placeholder='password'
                secureTextEntry
              />
               <FormikInputValue
                name='phone'
                placeholder='phone'
              />
              <Button title="Go to Main" onPress={() => navigation.navigate('Main')} />
              <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
              <Button  title="Register" onPress={handleSubmit} />
            </View>
          );
        }}
      </Formik>
    );
  };

export default Register