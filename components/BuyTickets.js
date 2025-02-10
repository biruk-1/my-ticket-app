import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

const BuyTickets = ({ route, navigation }) => {
  const { eventId } = route.params;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ticketCounts, setTicketCounts] = useState({ Regular: 1, VIP: 0, VVIP: 0 });

  useEffect(() => {
    fetch(`https://zelesegna.com/myticket/app/`)
      .then((response) => response.json())
      .then((data) => {
        const event = data.events.find((e) => e.event_id === eventId);
        setEvent(event);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [eventId]);

  const handleCheckout = () => {
    navigation.navigate('Checkout', {
      eventId: event.event_id,
      ticketCounts,
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Event not found</Text>
      </View>
    );
  }

  const renderTicketOption = (type) => {
    const ticket = event.tickets.find((t) => t.ticket_type === type);
    return (
      <View style={styles.ticketOption} key={type}>
        {/* Ticket Type and Price */}
        <View style={styles.ticketInfo}>
          <Text style={styles.ticketLabel}>{type}</Text>
          <Text style={styles.price}>{ticket ? `${ticket.price} ETB` : 'Not Available'}</Text>
        </View>

        {/* Add and Subtract Buttons */}
        <View style={styles.counter}>
          <TouchableOpacity
            onPress={() =>
              setTicketCounts((prev) => ({
                ...prev,
                [type]: Math.max(prev[type] - 1, 0),
              }))
            }
          >
            <Text style={styles.counterButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.counterText}>{ticketCounts[type]}</Text>
          <TouchableOpacity
            onPress={() =>
              setTicketCounts((prev) => ({
                ...prev,
                [type]: prev[type] + 1,
              }))
            }
          >
            <Text style={styles.counterButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const calculateTotalPrice = () => {
    return Object.entries(ticketCounts).reduce((total, [type, count]) => {
      const ticket = event.tickets.find((ticket) => ticket.ticket_type === type);
      return total + count * (ticket?.price || 0);
    }, 0);
  };

  return (
    <View style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContainer}>
        <Image source={{ uri: event.poster }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{event.display_name}</Text>
          {['Regular', 'VIP', 'VVIP'].map(renderTicketOption)}
        </View>
      </ScrollView>

      {/* Fixed Checkout Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>
            Checkout               {calculateTotalPrice()} ETB
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
  },
  loadingText: {
    fontSize: 18,
    color: '#342b6b',
  },
  image: {
    width: '100%',
    height: 320,
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 80, // Add margin to avoid overlap with the fixed footer
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  ticketOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  ticketInfo: {
    alignItems: 'center',
  },
  ticketLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  price: {
    fontSize: 16,
    color: '#342b6b',
    marginTop: 5,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    fontSize: 20,
    padding: 8,
    backgroundColor: '#342b6b',
    color: '#fff',
    borderRadius: 25,
    width: 45,
    alignItems: 'center',
    textAlign: 'center',
  },
  counterText: {
    fontSize: 18,
    color: '#333',
    marginHorizontal: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  checkoutButton: {
    backgroundColor: '#342b6b',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: '#FF6F61',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default BuyTickets;