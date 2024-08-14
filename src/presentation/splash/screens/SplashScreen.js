import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import NamedRoutes from '../../core/routes/NamedRoutes';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
   
    const timer = setTimeout(() => {
      navigation.replace(NamedRoutes.index);
    }, 3000);

   
    return () => clearTimeout(timer);
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
    backgroundColor: '#000', 
  },
  title: {
    fontSize: 30,
    color: '#fff',
  },
});

export default SplashScreen;
