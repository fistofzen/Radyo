import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
  const userStats = {
    listeningTime: '45h 30m',
    favoriteStations: 12,
    favoriteGenre: 'Jazz'
  };

  const menuItems = [
    { id: '1', title: 'Listening History', icon: require('../assets/icons/history.png') },
    { id: '2', title: 'Download Settings', icon: require('../assets/icons/download.png') },
    { id: '3', title: 'Audio Quality', icon: require('../assets/icons/audio.png') },
    { id: '4', title: 'Notifications', icon: require('../assets/icons/notification.png') },
    { id: '5', title: 'About', icon: require('../assets/icons/info.png') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.profileInfo}>
            <Image 
              source={{ uri: 'https://example.com/profile.jpg' }}
              style={styles.profileImage}
            />
            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.userEmail}>john.doe@example.com</Text>
          </View>
        </View>

        {/* User Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userStats.listeningTime}</Text>
            <Text style={styles.statLabel}>Listening Time</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userStats.favoriteStations}</Text>
            <Text style={styles.statLabel}>Favorite Stations</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userStats.favoriteGenre}</Text>
            <Text style={styles.statLabel}>Favorite Genre</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map(item => (
            <TouchableOpacity key={item.id} style={styles.menuItem}>
              <Image source={item.icon} style={styles.menuIcon} />
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Image 
                source={require('../assets/icons/chevron-right.png')}
                style={styles.chevronIcon}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
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
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#f8f8f8',
    marginHorizontal: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#ddd',
    marginHorizontal: 10,
  },
  menuContainer: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
  },
  chevronIcon: {
    width: 20,
    height: 20,
    tintColor: '#666',
  },
  logoutButton: {
    margin: 20,
    backgroundColor: '#ff4444',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ProfileScreen; 