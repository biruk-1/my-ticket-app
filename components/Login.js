import React, { useState, useEffect } from 'react';
import {
  View,
  Platform,
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
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

// Responsive scaling function
const scale = (size) => (width / 375) * size; // 375 is the base width (iPhone 6/7/8)

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          navigation.replace('FilterOptions');
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      } finally {
        setIsCheckingLogin(false);
      }
    };
    checkLoginStatus();
  }, [navigation]);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await AsyncStorage.setItem('user', JSON.stringify(user));
      Alert.alert('Login Successful', 'You are now logged in!');
      navigation.replace('FilterOptions');
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }
  
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        'Password Reset Email Sent',
        'A password reset email has been sent to your email address. Please check your inbox (and spam folder).'
      );
    } catch (error) {
      let errorMessage = 'An error occurred while sending the password reset email.';
  
      // Handle specific Firebase errors
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'The email address is invalid. Please enter a valid email address.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No user found with this email address. Please check the email and try again.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many requests. Please try again later.';
          break;
        default:
          errorMessage = error.message || errorMessage;
      }
  
      Alert.alert('Error', errorMessage);
    }
  };

  if (isCheckingLogin) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Checking login status...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/circledT.png')}
            style={styles.logo}
          />
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>Login</Text>
          <TextInput
            placeholder="Email or Phone Number"
            placeholderTextColor="#bbb"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#bbb"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={handlePasswordReset}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogin} style={styles.signInButton}>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
          <Text style={styles.orText}>Or</Text>
          <TouchableOpacity style={styles.googleButton}>
            <Image
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png',
              }}
              style={styles.googleIcon}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.createAccountText}>Create Account</Text>
        </TouchableOpacity> 
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
  logoContainer: {
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
    backgroundColor: '#3e3d3d',
  },
  forgotPasswordText: {
    alignSelf: 'flex-end',
    color: '#bbb',
    fontSize: scale(14),
    marginBottom: scale(20),
  },
  signInButton: {
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
  signInText: {
    color: '#fff',
    fontSize: scale(18),
    fontWeight: 'bold',
  },
  orText: {
    color: '#aaa',
    fontSize: scale(14),
    marginVertical: scale(10),
  },
  googleButton: {
    width: scale(50),
    height: scale(50),
    backgroundColor: '#fff',
    borderRadius: scale(25),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  googleIcon: {
    width: scale(30),
    height: scale(30),
  },
  createAccountText: {
    marginTop: scale(20),
    color: '#fff',
    fontSize: scale(16),
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4A148C',
  },
  loadingText: {
    color: '#fff',
    fontSize: scale(18),
    fontWeight: 'bold',
  },
});

export default Login;