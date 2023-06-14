import React from 'react'
import { Text, StyleSheet } from 'react-native'
import theme from '../../theme.js'

const styles= StyleSheet.create({

text:{
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal
},
colorPrimary:{
    color: theme.colors.primary
},
colorSecondary:{
    color: theme.colors.textSecondary
},
bold:{
    fontWeight: theme.fontWeights.bold
},
subheading:{
    fontSize: theme.fontSizes.subheading
},
container:{
    padding:20,
    paddingBottom: 5,
    paddingTop: 5
}
})

export default function StyledText ({children,color, fontSize, fontWeight,style, ...restOfProps}){

const textStyles= [
styles.text,
styles.container,
color === 'primary' && styles.colorPrimary,
color === 'secondary' && styles.colorSecondary,
fontSize === 'subheading' && styles.subheading,
fontWeight === 'bold' && styles.bold
]

return(
    <Text style={textStyles}{... restOfProps}>
        {children}
    </Text>


)

}