import { StatusBar } from 'expo-status-bar'; 
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import MainAppBar from './components/MainAppBar.js';
import * as Location from 'expo-location'; 
import Map from './screens/Map.js';

const settings = {
  background: '#00a484',
};

const icons = {
  location_not_know: 'crosshairs',
  location_searching: 'crosshairs-question',
  location_found: 'crosshairs-gps',
};

export default function App() {
  const [icon, setIcon] = useState(icons.location_not_know);

  const getUserPosition = async () => {
    try {
      setIcon(icons.location_searching);
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High, 
      });

      setIcon(icons.location_found);
      console.log('Location found:', position); 
    } catch (error) {
      console.log('Error getting location', error);
    }
  };

  useEffect(() => {
    getUserPosition();
  }, []);

  return (
    <PaperProvider>
      <MainAppBar
        title="Map"
        backgroundColor={settings.background} 
        icon={icon}
      />
      <Map />
      {userLocation && <Map initialLocation={userLocation} />}
      <StatusBar style="auto" />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: settings.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});