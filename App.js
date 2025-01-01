import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomTabBar from './src/components/CustomTabBar';

import HomeScreen from './src/screens/HomeScreen';
import PlayerScreen from './src/screens/PlayerScreen';
import StationsScreen from './src/screens/StationsScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            borderTopWidth: 0,
          },
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="Player" 
          component={PlayerScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="radio-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="Stations" 
          component={StationsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="list-outline" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App; 