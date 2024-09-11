import React, { useState } from 'react';
import { Text, TextInput, Button, View } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Profile({ navigation }) {
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async () => {
    try {
      const accountData = await AsyncStorage.getItem('account');
      const account = JSON.parse(accountData);
      await axios.post('http://localhost:3000/profile', { newEmail, newPassword }, {
        headers: {
          'Authorization': account.token
        }
      });
      alert('Profile updated. Check your email for OTP.');
      navigation.navigate('Home');
    } catch (error) {
      alert('Profile update failed');
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-4xl font-bold">Profile</Text>
      <TextInput
        placeholder="New Email"
        value={newEmail}
        onChangeText={setNewEmail}
        className="border p-2"
      />
      <TextInput
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        className="border p-2"
        secureTextEntry
      />
      <Button title="Update Profile" onPress={handleSubmit} />
    </View>
  );
}

export default Profile;