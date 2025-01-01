import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const StationsScreen = ({ route }) => {
  const { onStationPress } = route.params;

  const handleStationPress = (station) => {
    onStationPress(station);
  };

  const stations = [
    { id: '1', name: 'Jazz FM', genre: 'Jazz', image: 'https://example.com/station1.jpg' },
    // Add more stations
  ];

  const renderStation = ({ item }) => (
    <TouchableOpacity 
      style={styles.stationItem}
      onPress={() => handleStationPress(item)}
    >
      <Image source={{ uri: item.image }} style={styles.stationImage} />
      <View style={styles.stationInfo}>
        <Text style={styles.stationName}>{item.name}</Text>
        <Text style={styles.stationGenre}>{item.genre}</Text>
      </View>
      <TouchableOpacity style={styles.playButton}>
        <Image 
          source={require('../assets/icons/play.png')}
          style={styles.playIcon}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>All Stations</Text>
        </View>
      </SafeAreaView>
      
      <FlatList
        data={stations}
        renderItem={renderStation}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        contentInset={{ bottom: 85 }}
        contentInsetAdjustmentBehavior="automatic"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    paddingBottom: 85, // Height of the tab bar
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  stationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  stationImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  stationInfo: {
    flex: 1,
    marginLeft: 15,
  },
  stationName: {
    fontSize: 18,
    fontWeight: '500',
  },
  stationGenre: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
});

export default StationsScreen; 