import React, { useState } from 'react';
import { Text, TextInput, Button, View } from 'react-native';
import axios from 'axios';

function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post('http://192.168.100.124:3000/register', { email, password });
      alert('Registration successful. Check your email for OTP.');
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
      alert('Registration failed');
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-4xl font-bold">Register</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="border p-2"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        className="border p-2"
        secureTextEntry
      />
      <Button title="Register" onPress={handleSubmit} />
    </View>
  );
}

export default Register;