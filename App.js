import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';


import Start from './src/Screens/Start';
import Login from './src/Screens/Login';
import Register from './src/Screens/Register';
import Home from './src/Screens/Home';
import SearchPage from './src/Screens/SearchPage';
import Profile from './src/Screens/Profile';
import PasswordRest from './src/Screens/PasswordRest';


import AppContextProvider from './src/Contexts/AppContext';
import { styles } from './src/Styles';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialCommunityIcons } from '@expo/vector-icons';



//Right To Left (Hebrew)
import { I18nManager } from 'react-native';
I18nManager.forceRTL(true);
I18nManager.allowRTL(true);



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function LoggedUserTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={Home} options={{ tabBarIcon: () => <MaterialCommunityIcons name="home" size={24} />, headerShown: false }} />
      <Tab.Screen name='Search' component={SearchPage} options={{
        tabBarIcon: () => <MaterialCommunityIcons name="archive-search" size={24} />,
        headerShown: false
      }} />
      <Tab.Screen name='Profile' component={Profile} options={{
        tabBarIcon: () => <MaterialCommunityIcons name="account" size={24} />,
        headerShown: false
      }} />
    </Tab.Navigator>
  )
}

export default function App() {

  return (
    <AppContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Start' component={Start} options={{ headerShown: false }} />
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
          <Stack.Screen name='reset password' component={PasswordRest} options={{ headerShown: false }} />
          <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
          <Stack.Screen name='LoggedIn' component={LoggedUserTabs} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  );
}


