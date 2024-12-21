import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import Footer from './Footer';

const Places = ({ navigation }) => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetch('https://zelesegna.com/myticket/app/')
      .then((response) => response.json())
      .then((data) => {
        setPlaces(data.places);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          placeholderTextColor="#888"
          accessibilityLabel="Search places"
        />
        <TouchableOpacity accessibilityLabel="Notifications">
          <Text style={styles.icon}>🔔</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.placesText}>Places</Text>

      <FlatList
        style={styles.places}
        data={places}
        renderItem={({ item }) => <PlaceCard item={item} />}
        keyExtractor={(item) => item.place_id.toString()}
        accessibilityLabel="Popular places list"
      />

      <Footer />
    </View>
  );
};

const PlaceCard = ({ item }) => (
  <View style={styles.placeCard} accessibilityLabel={`Place card for ${item.place_name}`}>
    <Image
      source={{ uri: item.place_photo }}
      style={styles.placeImage}
      accessibilityLabel={`Image of ${item.place_name}`}
    />
    <View>
      <Text style={styles.placeName}>{item.place_name}</Text>
      <Text style={styles.placeDescription}>{item.description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F4F8' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#342b6b',
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    height: 40,
  },
  icon: { fontSize: 20, color: '#FFF', marginLeft: 15 },
  placesText :{
      backgroundColor:'black',
      color:'gray',
      fontSize: 25,
      fontWeight:'bold',
      padding:10,
  },
  places: { backgroundColor: 'black', padding: 5 },
  placeCard: {
    flexDirection: 'row',
    backgroundColor: '#4a4949',
    borderRadius: 10,
    padding: 25,
    marginVertical: 5,
    alignItems: 'center',
  },
  placeImage: { width: 60, height: 60, borderRadius: 10, marginRight: 10 },
  placeName: { fontWeight: 'bold', fontSize: 16, color: '#381b5d' },
  placeDescription: { fontSize: 14, color: '#bdbbbb' },
});

export default Places;
