import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import PatientDetailsScreen from './screens/PatientDetailsScreen';
import SignupScreen from './screens/SignupScreen';
import AddSymptomScreen from './screens/AddSymptomScreen';
import { Provider as PaperProvider } from "react-native-paper";
import DocterDashboard from './screens/DocterDashboard';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <PaperProvider>
      
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Start with Welcome Screen */}
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="DocterDashboard" component={DocterDashboard} />
      <Stack.Screen name="PatientDetails" component={PatientDetailsScreen} />
    </Stack.Navigator>
   
    </PaperProvider>
  );
};

export default AppNavigator;
