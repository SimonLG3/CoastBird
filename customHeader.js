import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colours from './screens/src/utilities/Colour';

const CustomHeader = ({ title, selectedPlace, distanceUnit }) => {
  // Converts temperature from Celsius to Fahrenheit.
  const convertTemperature = (tempC) => {
    return (tempC * 9/5) + 32;
  };

  // Converts distance from kilometers to miles.
  const convertDistance = (distanceKm) => {
    return (distanceKm * 0.621371).toFixed(2);
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
      {selectedPlace && (
        <View style={styles.placeInfo}>
          <View style={styles.infoRow}>
            <Ionicons name="thermometer-outline" size={26} color={Colours.LIGHT_CREAM} />
            <Text style={styles.placeText}>
              {selectedPlace.weather && selectedPlace.weather.current
                ? `${selectedPlace.weather.current.temp_c}°C / ${convertTemperature(selectedPlace.weather.current.temp_c).toFixed(1)}°F`
                : 'N/A'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="cloudy-outline" size={26} color={Colours.LIGHT_CREAM} />
            <Text style={styles.placeText}>
              {selectedPlace.weather && selectedPlace.weather.current
                ? selectedPlace.weather.current.condition.text
                : 'N/A'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="sunny-outline" size={26} color={Colours.LIGHT_CREAM} />
            <Text style={styles.placeText}>
              UV Index: {selectedPlace.weather && selectedPlace.weather.current
                ? selectedPlace.weather.current.uv
                : 'N/A'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="navigate-outline" size={26} color={Colours.LIGHT_CREAM} />
            <Text style={styles.placeText}>
              Wind: {selectedPlace.weather && selectedPlace.weather.current
                ? `${selectedPlace.weather.current.wind_kph} kph ${selectedPlace.weather.current.wind_dir}`
                : 'N/A'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={26} color={Colours.LIGHT_CREAM} />
            <Text style={styles.placeText}>
              Distance: {selectedPlace.distance
                ? `${selectedPlace.distance} ${distanceUnit} / ${convertDistance(selectedPlace.distance)} miles`
                : 'N/A'}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: '40%',
    width: '100%',
    backgroundColor: Colours.NAVY_BLUE,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 40,
  },
  headerTitle: {
    color: Colours.LIGHT_CREAM,
    fontSize: 22,
    fontWeight: '400',
    paddingTop: 20,
  },
  placeInfo: {
    marginTop: 25,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  placeText: {
    color: Colours.LIGHT_CREAM,
    fontSize: 15,
    marginLeft: 10,
  },
});

export default CustomHeader;
