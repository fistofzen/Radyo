import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PlayerScreen = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']}>
        {/* ... header content if any ... */}
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { flexGrow: 1, justifyContent: 'center' }
        ]}
        contentInset={{ bottom: 85 }}
        contentInsetAdjustmentBehavior="automatic"
      >
        {/* ... screen content ... */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 85, // Height of the tab bar
  },
});

export default PlayerScreen; 