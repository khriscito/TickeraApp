import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

const StyledPasswordInput = ({ value, onChangeText, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TextInput
        style={{ flex: 1, padding: 10, borderColor: 'gray', borderWidth: 1, borderRadius: 5 }}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!showPassword}
        {...rest}
      />
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        <Text style={{ color: 'blue', textDecorationLine: 'underline', marginLeft: 5 }}>
          {showPassword ? 'Ocultar' : 'Mostrar'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default StyledPasswordInput;
