import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FavoritesScreen = ({ navigation }) => {
  const favoriteStations = [
    {
      id: '1',
      name: 'Smooth Jazz',
      genre: 'Jazz',
      image: 'https://example.com/station1.jpg',
      listeners: '2.5k'
    },
    {
      id: '2',
      name: 'Rock Radio',
      genre: 'Rock',
      image: 'https://example.com/station2.jpg',
      listeners: '3.1k'
    },
    // Add more favorite stations
  ];

  const renderFavoriteStation = ({ item }) => (
    <TouchableOpacity 
      style={styles.stationItem}
      onPress={() => navigation.navigate('Player')}
    >
      <Image source={{ uri: item.image }} style={styles.stationImage} />
      <View style={styles.stationInfo}>
        <Text style={styles.stationName}>{item.name}</Text>
        <Text style={styles.stationGenre}>{item.genre}</Text>
        <View style={styles.listenerInfo}>
          <Image 
            source={require('../assets/icons/headphones.png')}
            style={styles.listenerIcon}
          />
          <Text style={styles.listenerCount}>{item.listeners}</Text>
        </View>
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorites</Text>
      </View>
      {favoriteStations.length > 0 ? (
        <FlatList
          data={favoriteStations}
          renderItem={renderFavoriteStation}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Image 
            source={require('../assets/icons/heart.png')}
            style={styles.emptyStateIcon}
          />
          <Text style={styles.emptyStateText}>No favorite stations yet</Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => navigation.navigate('Stations')}
          >
            <Text style={styles.browseButtonText}>Browse Stations</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  listenerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  listenerIcon: {
    width: 12,
    height: 12,
    marginRight: 4,
    tintColor: '#666',
  },
  listenerCount: {
    fontSize: 12,
    color: '#666',
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateIcon: {
    width: 60,
    height: 60,
    tintColor: '#ccc',
    marginBottom: 20,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  browseButton: {
    backgroundColor: '#000',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default FavoritesScreen; 