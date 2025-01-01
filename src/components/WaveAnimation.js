import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const WaveAnimation = ({ isPlaying }) => {
  const bars = [0.3, 0.6, 0.4, 0.8, 0.5];
  const animations = useRef(bars.map(() => new Animated.Value(0.3))).current;

  useEffect(() => {
    if (isPlaying) {
      const animations_sequence = bars.map((targetValue, index) => {
        return Animated.sequence([
          Animated.timing(animations[index], {
            toValue: targetValue,
            duration: 500 + Math.random() * 200,
            useNativeDriver: true,
          }),
          Animated.timing(animations[index], {
            toValue: 0.3,
            duration: 500 + Math.random() * 200,
            useNativeDriver: true,
          }),
        ]);
      });

      Animated.loop(
        Animated.parallel(animations_sequence)
      ).start();
    } else {
      animations.forEach(anim => {
        anim.setValue(0.3);
        anim.stopAnimation();
      });
    }
  }, [isPlaying]);

  return (
    <View style={styles.container}>
      {animations.map((anim, index) => (
        <Animated.View
          key={index}
          style={[
            styles.bar,
            {
              transform: [{ scaleY: anim }],
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
    marginHorizontal: 8,
  },
  bar: {
    width: 3,
    height: 20,
    backgroundColor: '#666',
    marginHorizontal: 1,
    borderRadius: 1.5,
  },
});

export default WaveAnimation; 