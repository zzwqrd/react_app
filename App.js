import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/presentation/splash/screens/SplashScreen';
import IndexScreen from './src/presentation/IndexScreen/IndexScreen';
import AppRoutes from './src/presentation/core/routes/AppRoutes'; 

const Stack = createStackNavigator();

export default function App() {
  return <AppRoutes />;
  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator initialRouteName="Splash">
  //       <Stack.Screen 
  //         name="Splash"
  //         component={SplashScreen} 
  //         options={{ headerShown: false }} 
  //       />
  //       <Stack.Screen 
  //         name="Index" 
  //         component={IndexScreen} 
  //         options={{ headerShown: false }} 
  //       />
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );
}


// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>sss</Text>
//       <StatusBar style="auto" />
//     </View>
//   );

// }


// const styles = StyleSheet.create({
//   container: {
//     marginTop: 50,
//   flex:3,

//   },
//   text: {
//     width: 100,
//     height: 100,
//     backgroundColor: 'skyblue',
//   }
// });
