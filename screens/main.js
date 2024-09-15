import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import MapView, { Callout, Marker } from 'react-native-maps';
import Colours from './src/utilities/Colour';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeader from '../customHeader';
import Slider from '@react-native-community/slider';
import { GOOGLE_PLACES_API_KEY, WEATHER_API_KEY,} from '@env';

export default function Main({ route }) {
  const { temperatureUnit: propTemperatureUnit, distanceUnit: propDistanceUnit } = route.params || {};
  const [location, setLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [useFahrenheit, setUseFahrenheit] = useState(propTemperatureUnit === 'F');
  const [useMiles, setUseMiles] = useState(propDistanceUnit === 'mi');
  const [radius, setRadius] = useState(5000);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const alertShown = useRef(false); 

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Please grant location permissions');
        setLoading(false);
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
      console.log('Location:', currentLocation.coords);

      // Fetches beach data using initial radius.
      fetchPlaces(currentLocation.coords.latitude, currentLocation.coords.longitude, radius);
    };

    const getSettings = async () => {
      const useFahrenheitValue = await AsyncStorage.getItem('useFahrenheit');
      if (useFahrenheitValue !== null) {
        setUseFahrenheit(JSON.parse(useFahrenheitValue));
      }

      const useMilesValue = await AsyncStorage.getItem('useMiles'); // Gets the distance unit in miles.
      if (useMilesValue !== null) {
        setUseMiles(JSON.parse(useMilesValue));
      }
    };

    getSettings().then(getPermissions);
  }, []);

  useEffect(() => {
    if (location) {
      setLoading(true);
      // Clears places before fetching new data.
      setPlaces([]);
      fetchPlaces(location.latitude, location.longitude, radius);
    }
  }, [radius]);

  const fetchPlaces = async (latitude, longitude, radius) => {
    try {
      const response = await axios.get(
        'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
        {
          params: {
            location: `${latitude},${longitude}`,
            radius: radius,
            keyword: 'beach',
            key: GOOGLE_PLACES_API_KEY,
          },
        }
      );

      const placesWithWeather = await Promise.all(
        response.data.results.map(async (place) => {
          const weather = await fetchWeatherData(place.geometry.location.lat, place.geometry.location.lng);
          return { ...place, weather, category: 'beach,',  };
        })
      );

      setPlaces(placesWithWeather);
    } catch (error) {
      console.error('Error fetching places:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const response = await axios.get(`http://api.weatherapi.com/v1/current.json`, {
        params: {
          key: WEATHER_API_KEY,
          q: `${latitude},${longitude}`,
          aqi: 'yes',
        },
      });

      const weatherData = response.data;

      // If UV index meets the criteria, alert message will be displayed.
      if (weatherData.current.uv > 8 && !alertShown.current) {
        Alert.alert(
          "High UV Index Warning",
          "The UV index is very high. It's very dangerous to be exposed to the sun for extended periods. Please take strong precautions!"
        );
        alertShown.current = true; // Updates ref to indicate alert has been shown already (avoiding multiple showings of the message.)
      } else if (weatherData.current.uv > 5 && !alertShown.current) {
        Alert.alert(
          "UV Index Warning",
          "The UV index is moderately high, please take precautions when heading out."
        );
        alertShown.current = true; 
      }

      return weatherData;
    } catch (error) {
      console.error('Error fetching weather data:', error.response ? error.response.data : error.message);
      return null;
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = useMiles ? 3958.8 : 6371; 
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance.toFixed(2);
  };

  const temperatureUnit = useFahrenheit ? '°F' : '°C'; // Uses Fahrenheit & Celsius.

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title={places.length === 0 ? "No beaches found, try increasing the radius" : (selectedPlace ? selectedPlace.name : 'No beach selected')}
        selectedPlace={selectedPlace}
        temperatureUnit={temperatureUnit}
        distanceUnit={useMiles ? 'miles' : 'km'} // Uses miles & kilometers.
      />
      <View style={styles.mapContainer}>
        <View style={styles.mapBorder}>
          {loading ? (
            <ActivityIndicator size="large" color={Colours.NAVY_BLUE} />
          ) : (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location ? location.latitude : 50.72181783419016,
                longitude: location ? location.longitude : -1.8666080427744944,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {places.map((place, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: place.geometry.location.lat,
                    longitude: place.geometry.location.lng,
                  }}
                  pinColor='#115D81' // Beach pin colour(NAVY_BLUE).
                  onPress={() => setSelectedPlace({
                    ...place,
                    distance: location ? calculateDistance(location.latitude, location.longitude, place.geometry.location.lat, place.geometry.location.lng) : null
                  })} 
                >
                  <Callout>
                    <View>
                      <Text style={styles.placeName}>{place.name}</Text>
                    </View>
                  </Callout>
                </Marker>
              ))}
              {location && (
                <Marker
                  coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                  }}
                  pinColor='#F7DEC0' // user location colour(CREAM).
                >
                  <Callout>
                    <Text>Current location</Text>
                  </Callout>
                </Marker>
              )}
            </MapView>
          )}
        </View>
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={1000}
            maximumValue={100000}
            step={1000}
            value={radius}
            onValueChange={(value) => setRadius(value)}
            minimumTrackTintColor={Colours.NAVY_BLUE}
            maximumTrackTintColor={Colours.LIGHT_GREY}
            thumbTintColor={Colours.NAVY_BLUE}
          />
          <Text style={styles.radiusText}>Radius: {radius / 1000} km</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.LIGHT_CREAM
  },
  mapContainer: {
    flex: 1,
  },
  mapBorder: {
    flex: 1,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#000000'
  },
  map: {
    flex: 1,
  },
  sliderContainer: {
    width:'80%',
    alignSelf:'center',
    padding: 10,
    backgroundColor: Colours.WHITE,
  },
  slider: {
    height: 40,
  },
  radiusText: {
    fontSize: 16,
    color: Colours.NAVY_BLUE,
    textAlign: 'center',
    marginVertical: 8
  },
  placeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
