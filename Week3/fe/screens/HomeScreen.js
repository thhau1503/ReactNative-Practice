import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Home() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const loadAccount = async () => {
      const accountData = await AsyncStorage.getItem('account');
      if (accountData) {
        setAccount(JSON.parse(accountData));
      }
    };
    loadAccount();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-4xl font-bold">Home Page</Text>
      {account && (
        <View>
          <Text>Email: {account.email}</Text>
          <Text>Token: {account.token}</Text>
        </View>
      )}
    </View>
  );
}

export default Home;