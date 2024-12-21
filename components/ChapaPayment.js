import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert, Linking } from 'react-native';
import { initializePayment } from '../assets/chapaService'; // Adjust the import path based on your folder structure

const ChapaPayment = () => {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // const handlePayment = async () => {
  //   const tx_ref = `txn-${Date.now()}`;
  //   const data = {
  //     amount: Number(amount),
  //     email,
  //     first_name: firstName,
  //     last_name: lastName,
  //     phone_number: phoneNumber,
  //     tx_ref,
  //     callback_url: 'https://www.yourcallbackurl.com',
  //     return_url: 'https://www.yourreturnurl.com',
  //     customization: {
  //       title: 'Pay Merchant', // Ensure title is ≤16 characters
  //     },
  //   };

  //   console.log('Payload:', data); // Log data for debugging

  //   try {
  //     const checkoutUrl = await initializePayment(data);
  //     if (checkoutUrl) {
  //       Alert.alert('Redirecting to Chapa...');
  //       Linking.openURL(checkoutUrl);
  //     } else {
  //       Alert.alert('Error initializing payment');
  //     }
  //   } catch (error) {
  //     console.error('Error during payment:', error.response?.data || error.message);
  //     Alert.alert('Payment failed:', error.response?.data?.message || error.message);
  //   }
  // };

  const handlePayment = async () => {
    const tx_ref = `txn-${Date.now()}`;
    const data = {
      amount: Number(amount),
      email,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      tx_ref,
      callback_url: 'https://yourcallbackurl.com', // Ensure this is valid
      return_url: 'https://yourreturnurl.com', // Ensure this is valid
      customization: {
        title: 'Pay Merchant',
      },
    };
  
    try {
      console.log('Initiating payment with data:', data);
      const checkoutUrl = await initializePayment(data);
  
      if (checkoutUrl) {
        Alert.alert('Redirecting to Chapa...');
        Linking.openURL(checkoutUrl);
      } else {
        Alert.alert('Error initializing payment', 'Checkout URL is empty');
      }
    } catch (error) {
      console.error('Error during payment:', error.response?.data || error.message);
      Alert.alert(
        'Payment failed',
        `Error: ${error.response?.data?.message || error.message}`
      );
    }
  };
  
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Chapa Payment Integration</Text>
      <TextInput
        placeholder="Enter your first name"
        value={firstName}
        onChangeText={setFirstName}
        style={{ borderWidth: 1, marginVertical: 8, padding: 10, borderRadius: 5 }}
      />
      <TextInput
        placeholder="Enter your last name"
        value={lastName}
        onChangeText={setLastName}
        style={{ borderWidth: 1, marginVertical: 8, padding: 10, borderRadius: 5 }}
      />
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={{ borderWidth: 1, marginVertical: 8, padding: 10, borderRadius: 5 }}
      />
      <TextInput
        placeholder="Enter your phone number (e.g., +251...)"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        style={{ borderWidth: 1, marginVertical: 8, padding: 10, borderRadius: 5 }}
      />
      <TextInput
        placeholder="Enter amount (in ETB)"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginVertical: 8, padding: 10, borderRadius: 5 }}
      />
      <Button title="Pay with Chapa" onPress={handlePayment} />
    </View>
  );
};

export default ChapaPayment;
