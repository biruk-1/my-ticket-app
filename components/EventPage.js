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

// Helper function to format the date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('default', { month: 'short', day: '2-digit' });
};

// Helper function to format the time
const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('default', { hour: '2-digit', minute: '2-digit', hour12: false });
};

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
              {/* <Text style={styles.eventDate}>{formatDate(event.event_date_time)}</Text> */}
              <Text style={styles.eventDate}>
                {formatDate(event.event_date_time)}
              </Text>
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
      {/* Updated Date and Time Section */}
      <View style={styles.dateTimeContainer}>
        <Text style={styles.eventDate}>{formatDate(item.event_date_time)}</Text>
        <Text style={styles.eventTime}>{formatTime(item.event_date_time)}</Text>
      </View>
      {/* Added Location */}
      <Text style={styles.eventLocation}>{item.location}</Text>
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
    backgroundColor: '#FFF',
    zIndex: 10,
  },
  curvedBackground: {
    height: height * 0.33,
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    backgroundColor: '#342b6b',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 3,
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
    marginTop: height * 0.1,
    zIndex: 2,
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
  eventDate: {
    backgroundColor: '#FFF', // White background
    color: '#6A5ACD', // Purple text color
    fontWeight: 'bold', // Bold text
    paddingHorizontal: 8, // Horizontal padding
    paddingVertical: 4, // Vertical padding
    borderRadius: 5, // Slightly rounded corners
    textAlign: 'center', // Center the text
    fontSize: 14, // Font size
    overflow: 'hidden', // Ensure the background color doesn't overflow
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
    height: 250,
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
    marginVertical: 16,
  },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: '#131313' },
  seeAll: { color: '#131313', fontSize: 14, fontWeight: '800' },
  eventCard: {
    marginLeft:10,
    // marginRight: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    overflow: 'hidden',
    width: 200,
    elevation: 3,
  },
  eventImage: {
    width: '100%', height: 130,resizeMode: 'stretch',
  },
  eventName: {  fontWeight: 'bold', fontSize: 16, color: '#FFF' },
  eventDetail: { padding: 3, backgroundColor: '#40319e' },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 5,
  },
  eventDate: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFF',
  },
  eventTime: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 10,
  },
  eventLocation: {
    fontSize: 12,
    color: '#FFF',
    marginTop: 2,
  },
  placeCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  places: { padding: 5 },
  placeImage: { width: 120, height: 120, borderRadius: 10, marginRight: 10 },
  placeName: { fontWeight: '800', fontSize: 20, color: '#40319e' },
  placeDescription: { fontSize: 14, color: '#777' },
});

export default EventPage;