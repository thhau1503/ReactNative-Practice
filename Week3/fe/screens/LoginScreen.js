import React, { useState } from 'react';
import { Text, TextInput, Button, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });
      const account = { email, token: response.data.accessToken };
      await AsyncStorage.setItem('account', JSON.stringify(account));
      alert('Login successful');
      navigation.navigate('Home');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-4xl font-bold">Login</Text>
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
      <Button title="Login" onPress={handleSubmit} />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text className="text-blue-500 mt-4">Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;