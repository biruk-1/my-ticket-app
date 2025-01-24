import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Dimensions, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For icons

const { width, height } = Dimensions.get('window');

const FilterOptions = ({ navigation }) => {
  const eventTypes = [
    { name: 'Music & Entertainment', icon: 'music-note' },
    { name: 'Travel', icon: 'flight' },
    { name: 'Film & Media', icon: 'movie' },
    { name: 'Food & Drinks', icon: 'restaurant' },
    { name: 'Art & Design', icon: 'palette' },
    { name: 'Fashion', icon: 'checkroom' },
    { name: 'Health & Wellness', icon: 'favorite' },
    { name: 'Sport', icon: 'sports-soccer' },
    { name: 'Gaming', icon: 'sports-esports' },
    { name: 'Science & Tech', icon: 'science' },
    { name: 'School & Education', icon: 'school' },
    { name: 'Business', icon: 'business' },
  ];

  const [selectedTypes, setSelectedTypes] = useState([]);

  const toggleSelection = (type) => {
    setSelectedTypes((prevSelectedTypes) =>
      prevSelectedTypes.includes(type)
        ? prevSelectedTypes.filter((item) => item !== type)
        : [...prevSelectedTypes, type]
    );
  };

  const savePreferences = async () => {
    try {
      await AsyncStorage.setItem('selectedTypes', JSON.stringify(selectedTypes));
      Alert.alert('Preferences Saved', 'Your preferences have been saved!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save preferences.');
    }
  };

  const loadPreferences = async () => {
    try {
      const storedTypes = await AsyncStorage.getItem('selectedTypes');
      if (storedTypes) {
        setSelectedTypes(JSON.parse(storedTypes));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load preferences.');
    }
  };

  const checkLoginStatus = async () => {
    const user = await AsyncStorage.getItem('user');
    if (!user) {
      navigation.replace('Login'); // Redirect to login if user is not authenticated
    }
  };

  useEffect(() => {
    checkLoginStatus();
    loadPreferences();
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#6a11cb', '#2575fc']}
      style={styles.container}
    >
      <Text style={styles.title}>Choose Your Favourite Event</Text>
      <Text style={styles.subtitle}>Get Personalized Event Recommendations</Text>
      <View style={styles.buttonContainer}>
        {eventTypes.map((type, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              selectedTypes.includes(type.name) && styles.buttonSelected,
            ]}
            onPress={() => toggleSelection(type.name)}
          >
            <Icon
              name={type.icon}
              size={24}
              color={selectedTypes.includes(type.name) ? '#fff' : '#6200ea'}
              style={styles.icon}
            />
            <Text
              style={[
                styles.buttonText,
                selectedTypes.includes(type.name) && styles.buttonTextSelected,
              ]}
            >
              {type.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={styles.getStartedButton}
        onPress={() => {
          savePreferences();
          navigation.navigate('EventPage', { selectedTypes });
        }}
      >
        <Text style={styles.getStartedButtonText}>Get Started</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: width * 0.06, // Responsive font size
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  subtitle: {
    fontSize: width * 0.04, // Responsive font size
    color: '#f0f0f0',
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    margin: 8,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 2,
    width: width * 0.4, // Responsive width
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSelected: {
    backgroundColor: '#6200ea',
    borderColor: '#6200ea',
  },
  buttonText: {
    color: '#333',
    fontSize: width * 0.035, // Responsive font size
    textAlign: 'center',
    fontWeight: '500',
    marginLeft: 10,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  buttonTextSelected: {
    color: '#fff',
  },
  icon: {
    marginRight: 5,
  },
  getStartedButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 25,
    marginTop: 20,
    width: width * 0.8, // Responsive width
    shadowColor: '#6200ea',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  getStartedButtonText: {
    color: '#6200ea',
    fontSize: width * 0.045, // Responsive font size
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
});

export default FilterOptions;