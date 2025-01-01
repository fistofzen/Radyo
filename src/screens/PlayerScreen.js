import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { Player } from '@react-native-community/audio-toolkit';

const PlayerScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    setupPlayer();
    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, []);

  const setupPlayer = () => {
    const streamPlayer = new Player('https://stream.radyo45lik.com:4545/stream', {
      autoDestroy: false,
      continuesToPlayInBackground: true,
      mixWithOthers: true,
    });

    streamPlayer.prepare((err) => {
      if (err) {
        console.log('Error preparing player:', err);
        setError('Failed to prepare player: ' + err.message);
        setIsLoading(false);
        return;
      }

      console.log('Player prepared successfully');
      setPlayer(streamPlayer);
      setError(null);
      setIsLoading(false);
    });

    streamPlayer.on('error', (err) => {
      console.log('Player error:', err);
      setError('Player error: ' + err.message);
      setIsPlaying(false);
      setIsLoading(false);
    });
  };

  const togglePlayback = () => {
    if (!player || isLoading) return;

    try {
      if (isPlaying) {
        player.pause(() => {
          console.log('Stream paused');
          setIsPlaying(false);
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
      setError('Failed to play stream: ' + err.message);
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.stationInfo}>
        <Image 
          source={require('../assets/icons/audio.png')}
          style={styles.stationImage}
        />
        <Text style={styles.stationName}>Radyo 45'lik</Text>
        <Text style={styles.stationGenre}>Turkish Radio</Text>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>

      <View style={styles.controls}>
        <TouchableOpacity 
          style={styles.controlButton}
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <Icon 
            name={isFavorite ? 'heart' : 'heart-outline'} 
            size={24} 
            color={isFavorite ? '#ff4b4b' : '#666'} 
          />
          <Text style={styles.controlButtonText}>Favorite</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.playButton, !player && styles.playButtonDisabled]}
          onPress={togglePlayback}
          disabled={!player || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" size="large" />
          ) : (
            <Icon 
              name={isPlaying ? 'pause' : 'play'} 
              size={32} 
              color="#fff" 
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton}>
          <Icon 
            name="share-social-outline" 
            size={24} 
            color="#666" 
          />
          <Text style={styles.controlButtonText}>Share</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.nowPlayingContainer}>
        <View style={styles.nowPlayingInfo}>
          <Icon name="radio-outline" size={20} color="#666" />
          <Text style={styles.nowPlayingText}>
            {isLoading ? 'Connecting...' : 
             isPlaying ? 'Now Playing: Live Stream' : 
             'Stream Ready'}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  stationInfo: {
    alignItems: 'center',
    paddingTop: 40,
  },
  stationImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  stationName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  stationGenre: {
    fontSize: 16,
    color: '#666',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingHorizontal: 30,
    marginTop: 40,
  },
  controlButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
  },
  controlButtonText: {
    marginTop: 5,
    fontSize: 12,
    color: '#666',
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  playButtonDisabled: {
    backgroundColor: '#ccc',
  },
  nowPlayingContainer: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    paddingHorizontal: 20,
  },
  nowPlayingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  nowPlayingText: {
    marginLeft: 10,
    color: '#444',
    fontSize: 14,
    fontWeight: '500',
  },
  errorText: {
    color: '#ff4b4b',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '500',
  },
});

export default PlayerScreen; 