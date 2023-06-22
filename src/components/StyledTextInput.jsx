import React from 'react'
import { StyleSheet, TextInput } from 'react-native'


const styles =StyleSheet.create({
textInput:{
borderRadius:35,
borderWidth: 3,
borderColor: '#5e5d5d',
backgroundColor:'#918e8e',
paddingHorizontal: 20,
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