import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';

const Footer = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Function to check if the route is active
  const isActive = (screenName) => route.name === screenName;

  // Animated values for icons
  const [scale] = useState(new Animated.Value(1));

  // Function to animate icons when pressed
  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 1.2, // Slightly enlarge icon
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1, // Return to original size
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.footerContainer}>
      <View style={styles.footerLinks}>
        {/* Home Link */}
        <TouchableOpacity
          style={styles.linkItem}
          onPress={() => navigation.navigate('EventPage')}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Animated.View style={{ transform: [{ scale }] }}>
            <Icon
              name="home-outline"
              size={24}
              color={isActive('EventPage') ? '#007BFF' : '#424242'} // Change color when active
            />
          </Animated.View>
        </TouchableOpacity>

        {/* About Link */}
        <TouchableOpacity
          style={styles.linkItem}
          onPress={() => navigation.navigate('Places')}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Animated.View style={{ transform: [{ scale }] }}>
            <Icon
              name="location-outline"
              size={24}
              color={isActive('Places') ? '#007BFF' : '#424242'} // Updated to correct screen name
            />
          </Animated.View>
        </TouchableOpacity>

        {/* Tickets Link */}
        <TouchableOpacity
          style={styles.linkItem}
          onPress={() => navigation.navigate('Tickets')}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Animated.View style={{ transform: [{ scale }] }}>
            <Icon
              name="ticket-outline"
              size={24}
              color={isActive('Tickets') ? '#007BFF' : '#424242'}
            />
          </Animated.View>
        </TouchableOpacity>

        {/* Game Controller Link */}
        <TouchableOpacity
          style={styles.linkItem}
          onPress={() => navigation.navigate('Contact')}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Animated.View style={{ transform: [{ scale }] }}>
            <Icon
              name="game-controller-outline"
              size={24}
              color={isActive('Contact') ? '#007BFF' : '#424242'}
            />
          </Animated.View>
        </TouchableOpacity>

        {/* Privacy Link */}
        <TouchableOpacity
          style={styles.linkItem}
          onPress={() => navigation.navigate('Privacy')}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Animated.View style={{ transform: [{ scale }] }}>
            <Icon
              name="person-outline"
              size={24}
              color={isActive('Privacy') ? '#007BFF' : '#424242'}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: '#fffcfc',
    paddingVertical: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#e2e1e1',
    borderRadius: 20,
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingBottom: 10,
  },
  linkItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default Footer;
