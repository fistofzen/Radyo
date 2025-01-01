import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { Player } from '@react-native-community/audio-toolkit';
import MiniPlayer from '../components/MiniPlayer';

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [player, setPlayer] = useState(null);
  const [currentStation, setCurrentStation] = useState(null);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);

  const handlePlayPause = () => {
    if (!player || isLoading) return;
    
    try {
      if (isPlaying) {
        player.pause(() => {
          console.log('Stream paused');
          setIsPlaying(false);
          if (player) {
            player.destroy();
            setPlayer(null);
          }
        });
      } else {
        setIsLoading(true);
        player.play(() => {
          console.log('Stream playing');
          setIsPlaying(true);
          setIsLoading(false);
        });
      }
    } catch (err) {
      console.log('Playback error:', err);
      setIsLoading(false);
    }
  };

  const handleStationPress = (station) => {
    if (player) {
      player.destroy();
    }
    setIsLoading(true);
    setShowMiniPlayer(true);
    const streamPlayer = new Player(station.streamUrl, {
      autoDestroy: false,
      continuesToPlayInBackground: true,
      mixWithOthers: true,
    });

    streamPlayer.prepare((err) => {
      if (err) {
        console.log('Error preparing player:', err);
        setIsLoading(false);
        return;
      }

      setPlayer(streamPlayer);
      setCurrentStation(station);
      setIsLoading(false);
      
      // Auto-play when ready
      streamPlayer.play(() => {
        setIsPlaying(true);
      });
    });
  };

  const featuredStations = [
    {
      id: '1',
      name: 'Smooth Jazz',
      genre: 'Jazz',
      image: 'https://example.com/station1.jpg',
      listeners: '2.5k',
      streamUrl: 'https://stream.radyo45lik.com:4545'
    },
    {
      id: '2',
      name: 'Rock Radio',
      genre: 'Rock',
      image: 'https://example.com/station2.jpg',
      listeners: '3.1k',
      streamUrl: 'https://stream.radyo45lik.com:4545'
    },
    {
      id: '3',
      name: 'Classical FM',
      genre: 'Classical',
      image: 'https://example.com/station3.jpg',
      listeners: '1.8k',
      streamUrl: 'https://stream.example.com/classical'
    }
  ];

  const categories = [
    { id: '1', name: 'Rock', count: '45 stations', color: '#FF6B6B' },
    { id: '2', name: 'Jazz', count: '32 stations', color: '#4ECDC4' },
    { id: '3', name: 'Classical', count: '28 stations', color: '#45B7D1' },
    { id: '4', name: 'Pop', count: '50 stations', color: '#96CEB4' }
  ];

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']}>
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome back!</Text>
            <Text style={styles.headerTitle}>Discover Radio</Text>
          </View>
          <TouchableOpacity style={styles.searchButton}>
            <Icon name="search-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        contentInset={{ bottom: 85 }}
        contentInsetAdjustmentBehavior="automatic"
      >
        {/* Now Playing (if any) */}
        <TouchableOpacity 
          style={styles.nowPlayingBar}
          onPress={() => navigation.navigate('Player')}
        >
          <Icon name="radio-outline" size={24} color="#000" />
          <Text style={styles.nowPlayingText}>Now Playing: Smooth Jazz</Text>
          <TouchableOpacity style={styles.miniPlayButton}>
            <Icon name="pause" size={16} color="#fff" />
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Featured Stations */}
        <View style={styles.featuredSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Stations</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Stations')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {featuredStations.map(station => (
              <TouchableOpacity 
                key={station.id}
                style={styles.featuredCard}
                onPress={() => handleStationPress(station)}
              >
                <Image
                  source={{ uri: station.image }}
                  style={styles.stationImage}
                />
                <View style={styles.listenersBadge}>
                  <Icon name="headphones" size={12} color="#fff" />
                  <Text style={styles.listenersText}>{station.listeners}</Text>
                </View>
                <Text style={styles.stationName}>{station.name}</Text>
                <Text style={styles.stationGenre}>{station.genre}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Browse by Category</Text>
          <View style={styles.categoriesGrid}>
            {categories.map(category => (
              <TouchableOpacity 
                key={category.id}
                style={[styles.categoryItem, { backgroundColor: category.color }]}
              >
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.stationCount}>{category.count}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {showMiniPlayer && (
        <MiniPlayer
          isPlaying={isPlaying}
          isLoading={isLoading}
          onPlayPause={handlePlayPause}
          station={currentStation}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 80,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  featuredSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 15,
  },
  featuredCard: {
    width: 160,
    marginRight: 15,
  },
  stationImage: {
    width: 160,
    height: 160,
    borderRadius: 10,
  },
  stationName: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
  },
  stationGenre: {
    fontSize: 14,
    color: '#666',
  },
  categoriesSection: {
    padding: 20,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '48%',
    height: 80,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '500',
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  searchButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 12,
  },
  nowPlayingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    margin: 20,
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  waveIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  nowPlayingText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  miniPlayButton: {
    backgroundColor: '#000',
    padding: 8,
    borderRadius: 20,
  },
  miniPlayIcon: {
    width: 16,
    height: 16,
    tintColor: '#fff',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  seeAllText: {
    color: '#666',
    fontSize: 14,
  },
  listenersBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderRadius: 12,
  },
  headphonesIcon: {
    width: 12,
    height: 12,
    tintColor: '#fff',
    marginRight: 4,
  },
  listenersText: {
    color: '#fff',
    fontSize: 12,
  },
  categoryName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  stationCount: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
});

export default HomeScreen; 