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
    <View style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContainer}>
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
        </View>

        {/* Payment Methods */}
        <View style={styles.paymentMethodsContainer}>
          <Text style={styles.sectionTitle}>Other Payment Methods</Text>
          <Text style={styles.infoText}>
            Additional payment methods will be available soon.
          </Text>
        </View>
      </ScrollView>

      {/* Fixed Proceed to Payment Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.payButton}>
          <Text style={styles.payButtonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Light background
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    color: "#000000",
  },
  errorText: {
    fontSize: 18,
    textAlign: "center",
    color: "#FF6F61",
  },
  eventDetailsContainer: {
    backgroundColor: "#F5F5F5", // Light gray background
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
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
    color: "#333333", // Dark text
  },
  eventDate: {
    fontSize: 14,
    color: "#666666", // Gray text
  },
  eventLocation: {
    fontSize: 14,
    color: "#666666", // Gray text
  },
  ticketSummary: {
    backgroundColor: "#F5F5F5", // Light gray background
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  ticketTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6A5ACD", // Purple text
    marginBottom: 10,
  },
  ticketText: {
    fontSize: 14,
    color: "#333333", // Dark text
    marginBottom: 5,
  },
  chapaContainer: {
    backgroundColor: "#FFFFFF", // White background
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6A5ACD", // Purple text
    marginBottom: 10,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333", // Dark text
    marginVertical: 10,
  },
  input: {
    backgroundColor: "#FFFFFF", // White background
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: "100%",
    color: "#333333", // Dark text
    borderWidth: 1,
    borderColor: "#E0E0E0", // Light gray border
  },
  paymentMethodsContainer: {
    backgroundColor: "#F5F5F5", // Light gray background
    borderRadius: 10,
    padding: 20,
    marginBottom: 100, // Add margin to avoid overlap with the fixed footer
  },
  infoText: {
    fontSize: 14,
    color: "#666666", // Gray text
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF", // White background
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0", // Light gray border
  },
  payButton: {
    backgroundColor: "#6A5ACD", // Purple background
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
  },
  payButtonText: {
    color: "#FFFFFF", // White text
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Checkout;