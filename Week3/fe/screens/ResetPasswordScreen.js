import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import axios from 'axios';

export default function ResetPasswordScreen({ route, navigation }) {
  const { email } = route.params;
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleResetPassword = async () => {
    try {
      await axios.post('http://localhost:3000/reset-password', { email, otp, newPassword });
      alert('Password reset successful');
      navigation.navigate('Login');
    } catch (error) {
      alert('Invalid OTP or OTP expired');
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Reset Password</Title>
      <TextInput
        label="OTP"
        value={otp}
        onChangeText={setOtp}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        style={styles.input}
        mode="outlined"
      />
      <Button mode="contained" onPress={handleResetPassword} style={styles.button}>
        Reset Password
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