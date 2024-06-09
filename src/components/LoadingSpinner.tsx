import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const LoadingSpinner = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.spinnerContainer}>
      <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]} />
    </View>
  );
};

const styles = StyleSheet.create({
    spinnerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    spinner: {
      height: 150,
      width: 150,
      borderRadius: 75,
      borderWidth: 5,
      borderBottomColor: 'white',
      borderLeftColor: 'white',
      borderRightColor: 'white',
      borderTopColor: '#4CDFAA',
    },
  });

export default LoadingSpinner;