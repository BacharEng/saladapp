import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  View,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import LottieComponent from "./LottieComponent";

interface place {
  id: number;
  title: string;
  latitude: number;
  longitude: number;
}

const LocationComponent: React.FC = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [places, setPlaces] = useState<place[]>([
    {
      id: 1,
      title: "פאבדה",
      latitude: 31.961664217934544,
      longitude: 34.878245022716136,
    },
    {
      id: 2,
      title: "דוקטור לייף",
      latitude: 31.962028312045188,
      longitude: 34.87781586932097,
    },
    {
      id: 3,
      title: "גינת אביב",
      latitude: 31.96197369802062,
      longitude: 34.87582030603343,
    },
    {
      id: 4,
      title: "דוקטור תאנוס",
      latitude: 31.960462697128573,
      longitude: 34.87756910625921,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("We need your location to track you");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setIsLoading(false);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <>
          <LottieComponent />
        </>
      ) : (
        <>
          {location && (
            <>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: 0.09,
                  longitudeDelta: 0.09,
                }}
              >
                <Marker
                  title="הבית שלי כפרה"
                  coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  }}
                />
                {places.map((place) => (
                  <Marker
                    key={place.id}
                    title={place.title}
                    coordinate={{
                      latitude: place.latitude,
                      longitude: place.longitude,
                    }}
                  />
                ))}
              </MapView>
            </>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  container: {
    flex: 1,
    backgroundColor: "#00cc99",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LocationComponent;
