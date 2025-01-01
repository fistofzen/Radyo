import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import WaveAnimation from './WaveAnimation';

const MiniPlayer = ({ 
  isPlaying, 
  onPlayPause, 
  station = { name: 'Radyo 45\'lik', genre: 'Turkish Radio' },
  isLoading 
}) => {
  const navigation = useNavigation();

  return (
    <Pressable style={styles.container} onPress={() => navigation.navigate('Player')}>
      <View style={styles.content}>
        <View style={styles.info}>
          <Icon name="radio-outline" size={24} color="#666" />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{station?.name}</Text>
            <Text style={styles.subtitle}>{station?.genre}</Text>
          </View>
          <WaveAnimation isPlaying={isPlaying} />
        </View>

        <TouchableOpacity 
          style={styles.playButton} 
          onPress={onPlayPause}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Icon 
              name={isPlaying ? 'pause' : 'play'} 
              size={24} 
              color="#fff" 
            />
          )}
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 1000,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingBottom: 12,
    height: 80,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default MiniPlayer; 