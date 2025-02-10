import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const EventDetails = ({ route, navigation }) => {
  const { eventId } = route.params;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://zelesegna.com/myticket/app/`)
      .then((response) => response.json())
      .then((data) => {
        const event = data.events.find(event => event.event_id === eventId);
        setEvent(event);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [eventId]);

  if (loading) {
    return <View style={styles.loadingContainer}><Text>Loading...</Text></View>;
  }

  if (!event) {
    return <View style={styles.loadingContainer}><Text>Event not found</Text></View>;
  }

  return (
    <ScrollView style={styles.container}>
      {/* Image Banner */}
      <View style={styles.bannerContainer}>
        <Image source={{ uri: event.poster }} style={styles.bannerImage} />
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>50% OFF</Text>
        </View>
        <View style={styles.dateBadge}>
          <Text style={styles.dateText}>Oct 29</Text>
        </View>
      </View>

      {/* Share and Save Icons Below the Image */}
      <View style={styles.shareSaveContainer}>
  {/* "Will be attending" Text */}
  <View>
    <Text style={styles.attendingText}>Will be attending</Text>
  </View>

  {/* Share and Save Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="share-social" size={20} color="#6A5ACD" />
            <Text style={styles.iconText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="bookmark" size={20} color="#6A5ACD" />
            <Text style={styles.iconText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Event Details */}
      <View style={styles.cardContainer}>
        {/* Event Name */}
        <View style={styles.titleContainer}>
          <Ionicons name="musical-notes" size={24} color="#6A5ACD" />
          <Text style={styles.eventTitle}>{event.display_name}</Text>
        </View>

        {/* Event Date */}
        <View style={styles.dateContainer}>
          <Ionicons name="calendar" size={20} color="#6A5ACD" />
          <Text style={styles.eventDate}>2024-09-04 20:52:52</Text>
        </View>

        {/* Artists */}
        <View style={styles.artistsContainer}>
          <Ionicons name="people" size={20} color="#6A5ACD" />
          <Text style={styles.artistsText}>
            Yohana, Kassmasse, Hewan, MicSolo, Jemberu Demeke
          </Text>
        </View>

        {/* Divider Line */}
        <View style={styles.divider} />

        {/* About Event Section */}
        <View style={styles.aboutContainer}>
          <Ionicons name="information-circle" size={24} color="#6A5ACD" />
          <Text style={styles.aboutEventTitle}>About Event</Text>
        </View>
        <Text style={styles.eventDescription}>{event.event_description}</Text>

        {/* Call, Location, and Reserve Spot Buttons */}
        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="call" size={24} color="#6A5ACD" />
            <Text style={styles.iconText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome name="map-marker" size={24} color="#6A5ACD" />
            <Text style={styles.iconText}>Location</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.reserveButton}
            onPress={() => navigation.navigate('BuyTickets', { eventId: event.event_id })}
          >
            <Text style={styles.reserveButtonText}>Reserve Spot</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  bannerContainer: { position: 'relative' },
  bannerImage: { width: '100%', height: height * 0.4, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  discountBadge: {
    position: 'absolute', top: 20, right: 20,
    backgroundColor: '#6A5ACD', padding: 8, borderRadius: 8,
  },
  discountText: { color: '#FFF', fontSize: 14, fontWeight: 'bold' },
  dateBadge: {
    position: 'absolute', top: 20, left: 20,
    backgroundColor: '#FFF', padding: 8, borderRadius: 8, elevation: 2,
  },
  dateText: { color: '#6A5ACD', fontSize: 14, fontWeight: 'bold' },
  shareSaveContainer: {
    flexDirection: 'row', justifyContent: 'center', gap: 10, marginVertical: 5,
  },
  iconButton: { alignItems: 'center' },
  iconText: { fontSize: 14, color: '#6A5ACD', marginTop: 5 },
  cardContainer: { backgroundColor: '#FFF', margin: -3, padding: 20, borderRadius: 12, elevation: 3 },
  titleContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  eventTitle: { fontSize: 24, fontWeight: 'bold', color: '#333', marginLeft: 10 },
  dateContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  eventDate: { fontSize: 16, color: '#6A5ACD', marginLeft: 10 },
  artistsContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  artistsText: { fontSize: 14, color: '#555', marginLeft: 10, fontStyle: 'italic' },
  divider: { height: 1, backgroundColor: '#E0E0E0', marginVertical: 20 },
  aboutContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  aboutEventTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginLeft: 10 },
  eventDescription: { fontSize: 14, color: '#555', marginBottom: 20 },
  bottomButtonsContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  reserveButton: { backgroundColor: '#6A5ACD', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 8 },
  reserveButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  shareSaveContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  attendingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 20, // Space between Share and Save buttons
  },
  iconButton: {
    alignItems: 'center',
  },
  iconText: {
    fontSize: 14,
    color: '#6A5ACD',
    marginTop: 5,
  },
});

export default EventDetails;