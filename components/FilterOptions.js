import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FilterOptions = ({ navigation }) => {
  const eventTypes = [
    'Music & Entertainment', 'Travel', 'Film & Media', 'Food & Drinks',
    'Art & Design', 'Fashion', 'Health & Wellness', 'Sport',
    'Gaming', 'Science & Tech', 'School & Education', 'Business',
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
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Favourite Event</Text>
      <Text style={styles.subtitle}>Get Personalized Event Recommendations</Text>
      <View style={styles.buttonContainer}>
        {eventTypes.map((type, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.button, selectedTypes.includes(type) && styles.buttonSelected]}
            onPress={() => toggleSelection(type)}
          >
            <Text style={styles.buttonText}>{type}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6200ea',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
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
    borderWidth: 2,
    borderColor: '#6200ea',
    elevation: 3,
    width: '45%',
  },
  buttonSelected: {
    backgroundColor: '#6200ea',
    borderColor: '#ffffff',
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  getStartedButton: {
    backgroundColor: '#6200ea',
    padding: 18,
    borderRadius: 50,
    marginTop: 20,
    width: '80%',
    shadowColor: '#6200ea',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  getStartedButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default FilterOptions;
