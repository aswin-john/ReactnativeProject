import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  FlatList,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  Alert,
  Image,
  Linking,
  Dimensions
} from "react-native";


import { BackHandler } from "react-native";

export default function CountryList() {
  const [postList, setPostList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [filterType, setFilterType] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const fetchData = async () => {
    const response = await fetch(`https://restcountries.com/v3.1/all`);
    const data = await response.json();
    setPostList(data);
  };

  useEffect(() => {
    fetchData();
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

   const handleImageClick = () => {
    Linking.openURL(item.maps.googleMaps)
  };

  const backAction = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to exit?',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: false }
    );
    return true;
  };

  const filterCountries = () => {
    let filteredCountries = postList;

    if (selectedFilter && filterType) {
      if (filterType === "continent") {
        filteredCountries = filteredCountries.filter(
          (item) => item.continents === selectedFilter
        );
      } else if (filterType === "region") {
        filteredCountries = filteredCountries.filter(
          (item) => item.region === selectedFilter
        );
      }
    }

    return filteredCountries.filter((item) =>
      item.name.common.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const renderFilterModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter By</Text>
            <TouchableOpacity
              onPress={() => {
                setFilterType("continent");
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalOption}>Continent</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFilterType("region");
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalOption}>Region</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalClose}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.headerText}>Country List</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search countries..."
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.filterButton}>Filter</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={filterCountries()}
            renderItem={({ item }) => {
              return (
                <View style={styles.card}>
                   <Image source={{ uri: item.flags.svg }} style={styles.image} 
                   onPress={handleImageClick}></Image>
                  <Text style={styles.titleText}>{item.name.common}</Text>
                  <Text style={styles.officialName}>{item.name.official}</Text>
                  <Text style={styles.bodyText}>
                    Independence: {item.independent ? "Yes" : "No"}
                  </Text>
                  <Text style={styles.bodyText}>
                    Currency:{" "}
                    {item.currencies &&
                      item.currencies[item.currency?.primary]?.name}{" "}
                    (
                    {item.currencies &&
                      item.currencies[item.currency?.primary]?.symbol}
                    )
                  </Text>
                  <Text style={styles.bodyText}>Region: {item.region}</Text>
                  <Text style={styles.bodyText}>
                    Sub-region: {item.subregion}
                  </Text>
                  <Text style={styles.bodyText}>
                    Languages:{" "}
                    {item.languages
                      ? Object.values(item.languages).join(", ")
                      : "N/A"}
                  </Text>
                  <Text style={styles.bodyText}>
                    Latitude: {item.latlng[0]}
                  </Text>
                  <Text style={styles.bodyText}>
                    Longitude: {item.latlng[1]}
                  </Text>
                  <Text style={styles.bodyText}>Area: {item.area} sq. km</Text>
                  <Text style={styles.bodyText}>
                    Population: {item.population}
                  </Text>
                  <Text style={styles.bodyText}>
                    Time Zones: {item.timezones.join(", ")}
                  </Text>
                  <Text style={styles.bodyText}>
                    Continent: {item.continents}
                  </Text>
                </View>
              );
            }}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            ListEmptyComponent={<Text>No Post Found</Text>}
            ListFooterComponent={
              <Text style={styles.footerText}>End Of List</Text>
            }
          />
        </View>
        {renderFilterModal()}
      </SafeAreaView>
    </>
  );
}
const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: StatusBar.currentHeight,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  searchBar: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  filterButton: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#007bff",
    borderRadius: 5,
    color: "#fff",
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: screenWidth *0.25, 
    aspectRatio: 1,
  },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  titleText: {
    fontSize: 30,
  },
  bodyText: {
    fontSize: 24,
    color: "#666666",
  },
  officialName: {
    fontSize: 16,
    color: "#666",
  },
  headerText: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 25,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 25,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalOption: {
    fontSize: 16,
    paddingVertical: 10,
  },
  modalClose: {
    fontSize: 16,
    paddingVertical: 10,
    color: "red",
  },
});
