import { View, StyleSheet, SafeAreaView, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

export default function Map({initialLocation}) {
  const [location, setLocation] = useState(initialLocation)
  const [markers, setMarkers] = useState([]);
  

  
  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log("Geolocation not granted");
      return;
    }
    
    const position = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    
    setLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00421,
    });
  };

 
  const handleMapLongPress = (event) => {
    const coordinate = event.nativeEvent.coordinate;
    const newMarker = {
      coordinate,
      key: Math.random().toString(), 
    };
    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    console.log('Marker added at:', newMarker); 
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        region={location} 
        onLongPress={handleMapLongPress} 
        mapType='hybrid'
      >
        {markers.map((marker) => (
          <Marker key={marker.key} coordinate={marker.coordinate} />
        ))}
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
  },
  map: {
    height: '100%',
    width: '100%',
  },
});