import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const SplashScreen2 = ({ navigation }) => {
  const slides = [
    {
      image: require("../assets/images/image1.png"),
      title: "Explore Events",
      subtitle: "Discover amazing events near you.",
    },
    {
      image: require("../assets/images/image2.png"),
      title: "Explore Places",
      subtitle: "Find the best places for your adventures.",
    },
    {
      image: require("../assets/images/image3.png"),
      title: "Buy Tickets",
      subtitle: "Secure your spot with just a few clicks.",
    },
  ];
  const screenWidth = Dimensions.get("window").width;

  const [currentIndex, setCurrentIndex] = useState(0);
  const buttonOpacity = new Animated.Value(0);

  useEffect(() => {
    if (currentIndex === slides.length - 1) {
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(buttonOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [currentIndex]);

  useEffect(() => {
    const timer = setTimeout(() => navigation.navigate("Login"), 15000);
    return () => clearTimeout(timer);
  }, [navigation]);

  const onViewRef = React.useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0]?.index || 0);
  });

  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        pagingEnabled
        data={slides}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <ImageBackground source={item.image} style={styles.slide}>
            <LinearGradient
              colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.8)"]}
              style={styles.overlay}
            >
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </LinearGradient>
          </ImageBackground>
        )}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />
      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
      {/* Animated Button */}
      <Animated.View
        style={[styles.buttonContainer, { opacity: buttonOpacity }]}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  slide: {
    width: Dimensions.get("window").width,
    height: "100%",
    justifyContent: "flex-end",
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#ddd",
    textAlign: "center",
    lineHeight: 24,
  },
  pagination: {
    position: "absolute",
    bottom: 120,
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: "#fff",
  },
  inactiveDot: {
    backgroundColor: "#555",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#6a11cb",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default SplashScreen2;
