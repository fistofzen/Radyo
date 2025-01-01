import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import StationsScreen from './src/screens/StationsScreen';
import PlayerScreen from './src/screens/PlayerScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Player" 
        component={PlayerScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconSource;

              if (route.name === 'Home') {
                iconSource = focused
                  ? require('./src/assets/icons/home-filled.png')
                  : require('./src/assets/icons/home.png');
              } else if (route.name === 'Stations') {
                iconSource = focused
                  ? require('./src/assets/icons/radio-filled.png')
                  : require('./src/assets/icons/radio.png');
              } else if (route.name === 'Player') {
                iconSource = focused
                  ? require('./src/assets/icons/play-filled.png')
                  : require('./src/assets/icons/play.png');
              } else if (route.name === 'Favorites') {
                iconSource = focused
                  ? require('./src/assets/icons/heart-filled.png')
                  : require('./src/assets/icons/heart.png');
              } else if (route.name === 'Profile') {
                iconSource = focused
                  ? require('./src/assets/icons/user-filled.png')
                  : require('./src/assets/icons/user.png');
              }

              return <Image source={iconSource} style={{ width: size, height: size, tintColor: color }} />;
            },
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#666',
            tabBarStyle: {
              paddingBottom: 5,
              height: 60,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              marginTop: -5,
            },
          })}
        >
          <Tab.Screen 
            name="Home" 
            component={HomeStack}
            options={{ headerShown: false }}
          />
          <Tab.Screen 
            name="Stations" 
            component={StationsScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen 
            name="Player" 
            component={PlayerScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen 
            name="Favorites" 
            component={FavoritesScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;