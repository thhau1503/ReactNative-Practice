import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import axios from 'axios';

export default function ForgetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleForgetPassword = async () => {
    try {
      await axios.post('http://localhost:3000/forget-password', { email });
      alert('OTP sent to email');
      navigation.navigate('ResetPassword', { email });
    } catch (error) {
      alert('Error sending OTP');
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Forget Password</Title>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        mode="outlined"
      />
      <Button mode="contained" onPress={handleForgetPassword} style={styles.button}>
        Send OTP
      </Button>
      <Button mode="text" onPress={() => navigation.navigate('Login')} style={styles.link}>
        Back to Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  link: {
    marginTop: 10,
    textAlign: 'center',
  },
});