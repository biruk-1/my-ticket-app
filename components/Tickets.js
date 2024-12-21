import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import Footer from './Footer';

const Tickets = ({ navigation }) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch('https://zelesegna.com/myticket/app/')
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.events || []); // Assuming the API provides an "events" array
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search tickets"
          placeholderTextColor="#888"
          accessibilityLabel="Search tickets"
        />
        <TouchableOpacity accessibilityLabel="Notifications">
          <Text style={styles.icon}>🔔</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.ticketsText}>Tickets</Text>

      <FlatList
        style={styles.ticketList}
        data={tickets}
        renderItem={({ item }) => <TicketCard event={item} />}
        keyExtractor={(item) => item.event_id.toString()}
        accessibilityLabel="Ticket purchase history list"
      />

      <Footer />
    </View>
  );
};

const TicketCard = ({ event }) => (
  <View style={styles.ticketCard} accessibilityLabel={`Event card for ${event.display_name}`}>
    <Image
      source={{ uri: event.poster }}
      style={styles.ticketImage}
      accessibilityLabel={`Poster for ${event.display_name}`}
    />
    <View style={styles.ticketInfo}>
      <Text style={styles.ticketName}>{event.display_name}</Text>
      {event.tickets.length > 0 ? (
        event.tickets.map((ticket, index) => (
          <Text key={index} style={styles.ticketDetails}>
            {ticket.ticket_type}: ${ticket.price}
          </Text>
        ))
      ) : (
        <Text style={styles.noTickets}>No tickets available</Text>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
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
  ticketsText: {
    backgroundColor: 'black',
    color: 'gray',
    fontSize: 25,
    fontWeight: 'bold',
    padding: 10,
  },
  ticketList: { padding: 15 },
  ticketCard: {
    flexDirection: 'row',
    backgroundColor: '#4a4949',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    alignItems: 'center',
  },
  ticketImage: { width: 60, height: 60, borderRadius: 10, marginRight: 15 },
  ticketInfo: { flex: 1 },
  ticketName: { fontSize: 16, fontWeight: 'bold', color: '#381b5d' },
  ticketDetails: { fontSize: 14, color: '#bdbbbb', marginTop: 5 },
  noTickets: { fontSize: 14, color: '#bdbbbb', marginTop: 5 },
  emptyText: { textAlign: 'center', fontSize: 16, color: '#888', marginTop: 20 },
});

export default Tickets;
