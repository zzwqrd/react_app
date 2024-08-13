import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IndexScreen from '../../IndexScreen/IndexScreen';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Index");
    }, 3000); // Display splash screen for 3 seconds
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Zein</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Customize the background color
  },
  title: {
    fontSize: 30,
    color: '#fff', // Customize the text color
  },
});

export default SplashScreen;
