import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Dimensions,
} from 'react-native';
import Footer from './Footer';

const { width, height } = Dimensions.get('window');

const EventPage = ({ route, navigation }) => {
  const type = route?.params?.type || "defaultType";
  const [topEvents, setTopEvents] = useState([]);
  const [regularEvents, setRegularEvents] = useState([]);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://zelesegna.com/myticket/app/')
      .then((response) => response.json())
      .then((data) => {
        setTopEvents(data.events.filter((event) => event.position === 'top'));
        setRegularEvents(data.events.filter((event) => event.position === 'regular'));
        setPlaces(data.places);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6A5ACD" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Curved Background */}
      <View style={styles.curvedBackground} />

      {/* Header */}
      <View style={styles.header}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          placeholderTextColor="#888"
          accessibilityLabel="Search events"
        />
        <TouchableOpacity accessibilityLabel="Notifications">
          <Text style={styles.icon}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {/* Top Events Banner */}
        <ScrollView
          horizontal
          style={styles.bannerScroll}
          showsHorizontalScrollIndicator={false}
          accessibilityLabel="Top events banner"
        >
          {topEvents.map((event, index) => (
            <View key={index} style={styles.banner}>
              <Text style={styles.eventDate}>{event.event_date_time}</Text>
              <Text style={styles.eventDiscount}>Discount: 10%</Text>
              <Image
                source={{ uri: event.poster }}
                style={styles.bannerImage}
                accessibilityLabel={`Banner image for ${event.display_name}`}
              />
              <TouchableOpacity
                style={styles.buyButton}
                onPress={() => navigation.navigate('EventDetails', { eventId: event.event_id })}
              >
                <Text style={styles.buyButtonText}>Buy Tickets</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Popular Events Section */}
        <View style={styles.eventsSection}>
          <SectionHeader title="Popular Events" onPress={() => navigation.navigate('AllEvents')} />
          <FlatList
            horizontal
            data={regularEvents}
            renderItem={({ item }) => (
              <EventCard item={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item.event_id.toString()}
            showsHorizontalScrollIndicator={false}
            accessibilityLabel="Popular events list"
          />

          {/* Popular Places Section */}
          <SectionHeader title="Popular Places" onPress={() => navigation.navigate('AllPlaces')} />
          <FlatList
            style={styles.places}
            data={places}
            renderItem={({ item }) => <PlaceCard item={item} />}
            keyExtractor={(item) => item.place_id.toString()}
            accessibilityLabel="Popular places list"
          />
        </View>
      </ScrollView>

      {/* Footer */}
      <Footer />
    </View>
  );
};

const SectionHeader = ({ title, onPress }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.seeAll}>See All</Text>
    </TouchableOpacity>
  </View>
);

const EventCard = ({ item, navigation }) => (
  <TouchableOpacity
    onPress={() => navigation.navigate('EventDetails', { eventId: item.event_id })}
    style={styles.eventCard}
    accessibilityLabel={`Event card for ${item.display_name}`}
  >
    <Image
      source={{ uri: item.poster }}
      style={styles.eventImage}
      accessibilityLabel={`Event image for ${item.display_name}`}
    />
    <View style={styles.eventDetail}>
      <Text style={styles.eventName}>{item.display_name}</Text>
      <Text style={styles.eventDateBackground}>
        <Text style={styles.eventDate}>{item.event_date_time}</Text>
      </Text>
    </View>
  </TouchableOpacity>
);

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
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, fontSize: 16, color: '#6200EE' },
  eventsSection: {
    backgroundColor: '#FFF', // Replace with a valid color
    zIndex: 10,
  },
  curvedBackground: {
    height: height * 0.33,
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    backgroundColor: '#342b6b', // Single smooth color
    position: 'absolute', // Position absolutely
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1, // Ensure it's below the header and content
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20, // Push the header to the top
    position: 'absolute', // Position absolutely
    top: 0,
    left: 0,
    right: 0,
    zIndex: 3, // Ensure it's above the curved background and content
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
  content: {
    flex: 1,
    marginTop: height * 0.1, // Start content below the header
    zIndex: 2, // Ensure content scrolls above the curved background
  },
  bannerScroll: { paddingHorizontal: 10 },
  banner: {
    marginRight: 10,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    position: 'relative',
  },
  eventDate: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FFA726',
    color: '#FFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    zIndex: 1,
    fontSize: 12,
    fontWeight: 'bold',
  },
  eventDiscount: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF6347',
    color: '#FFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    zIndex: 1,
    fontSize: 12,
    fontWeight: 'bold',
  },
  bannerImage: {
    width: 300,
    height: 250, // Increased size
  },
  buyButton: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: '#6A5ACD',
    padding: 10,
    borderRadius: 20,
  },
  buyButtonText: { color: '#FFF', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  seeAll: { color: '#6A5ACD', fontSize: 14 },
  eventCard: {
    marginRight: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    overflow: 'hidden',
    width: 200, // Increased size
    elevation: 3,
  },
  eventImage: {
    width: '100%', height: 150, // Increased size
  },
  eventName: { padding: 5, fontWeight: 'bold', fontSize: 16, color: '#333' }, // Adjusted text style
  eventDate: { padding: 5, fontSize: 12, color: '#777' },
  placeCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  places: { padding: 5 },
  placeImage: { width: 60, height: 60, borderRadius: 10, marginRight: 10 },
  placeName: { fontWeight: 'bold', fontSize: 16, color: '#333' },
  placeDescription: { fontSize: 14, color: '#777' },
  eventDetail: { padding: 10 },
});

export default EventPage;