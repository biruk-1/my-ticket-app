import React, { useEffect } from "react";
import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const SplashScreen1 = ({ navigation }) => {
  const logoScale = new Animated.Value(0);
  const logoOpacity = new Animated.Value(0);

  useEffect(() => {
    // Animate logo scale and opacity
    Animated.parallel([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 800,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to the next screen after 2 seconds
    const timer = setTimeout(() => navigation.navigate("SplashScreen2"), 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={["#6a11cb", "#2575fc", "#1d2671"]}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [{ scale: logoScale }],
            opacity: logoOpacity,
          },
        ]}
      >
        <Text style={styles.logoText}>T</Text>
      </Animated.View>

      <Animated.Text
        style={[
          styles.title,
          {
            opacity: logoOpacity,
            transform: [
              {
                translateY: logoOpacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
          },
        ]}
      >
        Ticket
      </Animated.Text>

      <Animated.Text
        style={[
          styles.subtitle,
          {
            opacity: logoOpacity,
            transform: [
              {
                translateY: logoOpacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
          },
        ]}
      >
        Explore and Buy
      </Animated.Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SplashScreen2")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 50,
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  logoText: {
    fontSize: 72,
    fontWeight: "bold",
    color: "#6a11cb",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#f0f0f0",
    marginTop: 10,
    textAlign: "center",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6a11cb",
    textAlign: "center",
  },
});

export default SplashScreen1;