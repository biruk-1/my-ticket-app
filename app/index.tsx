import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

// Import Screens
import SplashScreen1 from '../components/SplashScreen1';
import SplashScreen2 from '../components/SplashScreen2';
import Login from '../components/Login';
import Register from '../components/Register';
import FilterOptions from '../components/FilterOptions';
import EventPage from '../components/EventPage';
import EventDetails from '../components/EventDetails';
import BuyTickets from '../components/BuyTickets';
import Checkout from '../components/Checkout';
import Footer from '../components/Footer';
import Tickets from '../components/Tickets';
import Places from '../components/places';
// import ChapaCheckout from '../components/ChapaChekout';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      {/* Set the status bar background color */}
      <StatusBar backgroundColor="#342b6b" barStyle="light-content" />
      <Stack.Navigator
        initialRouteName="SplashScreen1"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SplashScreen1" component={SplashScreen1} />
        <Stack.Screen name="SplashScreen2" component={SplashScreen2} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="FilterOptions" component={FilterOptions} />
        <Stack.Screen name="EventPage" component={EventPage} />
        <Stack.Screen name="EventDetails" component={EventDetails} />
        <Stack.Screen name="BuyTickets" component={BuyTickets} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="Places" component={Places} />
        <Stack.Screen name="Tickets" component={Tickets} />
        <Stack.Screen name="Footer" component={Footer} />
        {/* <Stack.Screen name="ChapaCheckout" component={ChapaCheckout} /> */}
      </Stack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#342b6b', // Match this with the header background color
    margin: 0,
    padding: 0,
  },
});
