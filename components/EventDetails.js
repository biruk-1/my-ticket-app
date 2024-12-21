import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

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

      {/* Horizontal Menu */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}><Text style={styles.menuText}>Info</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.menuItem, styles.activeMenu]}><Text style={styles.activeMenuText}>Menu</Text></TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}><Text style={styles.menuText}>Rating</Text></TouchableOpacity>
      </View>

      {/* Event Details */}
      <View style={styles.cardContainer}>
        <Text style={styles.eventTitle}>{event.display_name}</Text>
        <Text style={styles.eventDescription}>{event.event_description}</Text>
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="call" size={20} color="#6A5ACD" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome name="map-marker" size={20} color="#6A5ACD" />
          </TouchableOpacity>

          <TouchableOpacity
          style={styles.reserveButton}
          onPress={() => navigation.navigate('BuyTickets', { eventId: event.event_id })}
        >
          <Text style={styles.reserveButtonText}>Reserve Spot</Text>
        </TouchableOpacity>
        </View>
        {/* Reserve Spot */}
        {/* <TouchableOpacity
          style={styles.reserveButton}
          onPress={() => navigation.navigate('BuyTickets', { eventId: event.event_id })}
        >
          <Text style={styles.reserveButtonText}>Reserve Spot</Text>
        </TouchableOpacity> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  bannerContainer: { position: 'relative' },
  bannerImage: { width: '100%', height: 320, borderBottomLeftRadius: 20, borderBottomRightRadius: 20,  borderRadius: 15,marginVertical: 20,},
  
  discountBadge: {
    position: 'absolute', top: 20, right: 20,
    backgroundColor: '#6A5ACD', padding: 8, borderRadius: 8,
  },
  discountText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  dateBadge: {
    position: 'absolute', top: 20, left: 20,
    backgroundColor: '#FFF', padding: 8, borderRadius: 8, elevation: 2,
  },
  dateText: { color: '#6A5ACD', fontSize: 12, fontWeight: 'bold' },
  menuContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, backgroundColor: '#FFF', padding: 10, borderRadius: 8 },
  menuItem: { paddingVertical: 8 },
  menuText: { color: '#777', fontSize: 14 },
  activeMenu: { borderBottomWidth: 2, borderColor: '#6A5ACD' },
  activeMenuText: { color: '#6A5ACD', fontSize: 14, fontWeight: 'bold' },
  cardContainer: { backgroundColor: '#FFF', margin: 10, padding: 20, borderRadius: 12, elevation: 3 },
  eventTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  eventDescription: { fontSize: 14, color: '#555', marginBottom: 20 },
  iconRow: { flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 20 },
  iconButton: { backgroundColor: '#F0F0F0', padding: 10, borderRadius: 50, marginRight: 10 },
  reserveButton: { backgroundColor: '#6A5ACD' ,width: '60%' ,paddingVertical: 15, borderRadius: 8, alignItems: 'center' },
  reserveButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default EventDetails;
