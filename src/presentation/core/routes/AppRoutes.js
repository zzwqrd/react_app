// AppRoutes.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashView from "../../splash/screens/SplashScreen";
import IndexScreen from "../../IndexScreen/IndexScreen";
import NavigatorAnimation from "./NavigatorAnimation";

import NamedRoutes from "./NamedRoutes";
import getTransition from "./getTransition";

const Stack = createStackNavigator();

const AppRoutes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={NamedRoutes.splash}>
        <Stack.Screen
          name={NamedRoutes.splash}
          component={SplashView}
        />
        <Stack.Screen
          name={NamedRoutes.index}
          component={IndexScreen}
          options={{
            title: 'My Home',
            headerStyle: {
              backgroundColor: '#fff', // Background color of the AppBar
            },
            headerTintColor: '#f00', // Color of the back button and title
            headerTitleStyle: {
              fontSize:15,
              fontWeight: 'bold', // Custom style for the title
            },
          }}
          // options={getTransition(NavigatorAnimation.SCALE)}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
