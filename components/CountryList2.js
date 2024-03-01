import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";

export default function CountryList() {
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    fetchData();
    backAction();
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    };
  }, []);

  const backAction = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to exit?",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "Yes", onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: false }
    );
    return true;
  };
  const fetchData = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setCountryList(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const openGoogleMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => openGoogleMaps(item.latlng[0], item.latlng[1])}
    >
      <View style={styles.countryContainer}>
        <Image source={{ uri: item.flags.svg }} style={styles.flag} />
        <ScrollView style={styles.countryDetails}>
          <Text style={styles.countryName}>{item.name.common}</Text>
          <Text style={styles.officialName}>{item.name.official}</Text>
          <Text>Independence: {item.independent ? "Yes" : "No"}</Text>
          {item.currency && item.currency.primary && (
            <Text>
              Currency: {item.currencies[item.currency.primary].name} (
              {item.currencies[item.currency.primary].symbol})
            </Text>
          )}
          <Text>Region: {item.region}</Text>
          <Text>Sub-region: {item.subregion}</Text>
          <Text>
            Languages:{" "}
            {item.languages ? Object.values(item.languages).join(", ") : "N/A"}
          </Text>
          <Text>Latitude: {item.latlng[0]}</Text>
          <Text>Longitude: {item.latlng[1]}</Text>
          <Text>Area: {item.area} sq. km</Text>
          <Text>Population: {item.population}</Text>
          <Text>Time Zones: {item.timezones.join(", ")}</Text>
          <Text>Continent: {item.continents}</Text>
        </ScrollView>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={countryList}
        renderItem={renderItem}
        keyExtractor={(item) => item.cca3}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight,
  },
  countryContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  flag: {
    width: "25%",
    aspectRatio: 1,
    marginRight: 10,
  },
  countryDetails: {
    flex: 1,
  },
  countryName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  officialName: {
    fontSize: 16,
    color: "#666",
  },
});
