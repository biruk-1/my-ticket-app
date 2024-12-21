import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import ChapaPayment from "./ChapaPayment";

const Checkout = ({ route, navigation }) => {
  const { eventId, ticketCounts } = route.params;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://zelesegna.com/myticket/app/`)
      .then((response) => response.json())
      .then((data) => {
        const fetchedEvent = data.events.find(
          (event) => event.event_id === eventId
        );
        setEvent(fetchedEvent);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [eventId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Event not found</Text>
      </View>
    );
  }

  const total = Object.entries(ticketCounts).reduce(
    (total, [type, count]) =>
      total +
      count *
        (event.tickets.find((ticket) => ticket.ticket_type === type)?.price || 0),
    0
  );

  return (
    <ScrollView style={styles.container}>
      {/* Event Details */}
      <View style={styles.eventDetailsContainer}>
        <Image source={{ uri: event.poster }} style={styles.eventImage} />
        <View style={styles.eventInfoContainer}>
          <Text style={styles.eventName}>{event.display_name}</Text>
          <Text style={styles.eventDate}>{event.event_date_time}</Text>
          <Text style={styles.eventLocation}>{event.location}</Text>
        </View>
      </View>

      {/* Ticket Summary */}
      <View style={styles.ticketSummary}>
        <Text style={styles.ticketTitle}>Ticket Summary</Text>
        {Object.entries(ticketCounts).map(([type, count]) => (
          <Text key={type} style={styles.ticketText}>
            {type}: {count} x{" "}
            {event.tickets.find((ticket) => ticket.ticket_type === type)?.price}{" "}
            ETB
          </Text>
        ))}
      </View>

      {/* Pay with Chapa */}
      <View style={styles.chapaContainer}>
        <Text style={styles.sectionTitle}>Pay with Chapa</Text>
        <ChapaPayment total={total} />
        <Text style={styles.totalText}>Total: {total} ETB</Text>
        <TextInput style={styles.input} placeholder="Name" />
        <TextInput style={styles.input} placeholder="Phone number" keyboardType="phone-pad" />
        <TouchableOpacity style={styles.payButton}>
          <Text style={styles.payButtonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </View>

      {/* Payment Methods */}
      <View style={styles.paymentMethodsContainer}>
        <Text style={styles.sectionTitle}>Other Payment Methods</Text>
        <Text style={styles.infoText}>
          Additional payment methods will be available soon.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 20,
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    color: "#FFFFFF",
  },
  errorText: {
    fontSize: 18,
    textAlign: "center",
    color: "#FF6F61",
  },
  eventDetailsContainer: {
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  eventInfoContainer: {
    flex: 1,
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  eventDate: {
    fontSize: 14,
    color: "#BBBBBB",
  },
  eventLocation: {
    fontSize: 14,
    color: "#BBBBBB",
  },
  ticketSummary: {
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  ticketTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FD61E3",
    marginBottom: 10,
  },
  ticketText: {
    fontSize: 14,
    color: "#FFFFFF",
    marginBottom: 5,
  },
  chapaContainer: {
    backgroundColor: "#3b3b3b",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FD61E3",
    marginBottom: 10,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginVertical: 10,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: "100%",
    color: "#0b0b0b",
  },
  payButton: {
    backgroundColor: "#FD61E3",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  payButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  paymentMethodsContainer: {
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
  },
  infoText: {
    fontSize: 14,
    color: "#BBBBBB",
    textAlign: "center",
  },
});

export default Checkout;
