import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

const { width, height } = Dimensions.get('window');

// Responsive scaling function
const scale = (size) => (width / 375) * size; // 375 is the base width (iPhone 6/7/8)

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleRegister = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }
    if (!isChecked) {
      Alert.alert('Error', 'Please accept the Privacy Policy and Terms.');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert('Success', 'Account created successfully!');
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Error', error.message);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Image source={require('../assets/images/circledT.png')} style={styles.logo} />
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>Create Account</Text>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#aaa"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            placeholder="Re-Type Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={() => setIsChecked(!isChecked)} style={styles.checkbox}>
              {isChecked && <View style={styles.checkboxChecked} />}
            </TouchableOpacity>
            <Text style={styles.checkboxText}>I accept the Privacy Policy and Terms</Text>
          </View>
          <TouchableOpacity onPress={handleRegister} style={styles.signUpButton}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'linear-gradient(180deg, #7f00ff, #e100ff)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(20),
  },
  header: {
    alignItems: 'center',
    marginBottom: scale(20),
  },
  logo: {
    width: scale(100),
    height: scale(100),
    resizeMode: 'contain',
  },
  card: {
    width: '90%',
    backgroundColor: '#222',
    borderRadius: scale(15),
    padding: scale(20),
    alignItems: 'center',
    elevation: 8,
  },
  title: {
    fontSize: scale(26),
    fontWeight: 'bold',
    color: '#eaeaea',
    marginBottom: scale(20),
  },
  input: {
    width: '100%',
    height: scale(50),
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: scale(8),
    paddingHorizontal: scale(15),
    marginBottom: scale(15),
    color: '#fff',
    backgroundColor: '#333',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(20),
  },
  checkbox: {
    width: scale(20),
    height: scale(20),
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    width: scale(14),
    height: scale(14),
    backgroundColor: '#8a2be2',
  },
  checkboxText: {
    color: '#bbb',
    fontSize: scale(14),
  },
  signUpButton: {
    width: '100%',
    height: scale(50),
    backgroundColor: '#8a2be2',
    borderRadius: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  signUpText: {
    color: '#fff',
    fontSize: scale(18),
    fontWeight: 'bold',
  },
});

export default Register;