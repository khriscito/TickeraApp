import React from 'react'
import { StyleSheet, TextInput } from 'react-native'


const styles =StyleSheet.create({
textInput:{
borderRadius:35,
backgroundColor:'#918e8e',
paddingHorizontal: 30,
paddingVertical: 10, 
marginBottom: 10
},
error: {
    borderColor:'red'
}
})



const StyledTextInput= ({style={}, error, ...props})=>{

    const inputStyle=[
styles.textInput,
style,
error && styles.error
]
    

    return <TextInput style={inputStyle} {...props}/>
}

export default StyledTextInput