import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView } from 'react-native';


import Start from './src/Screens/Start';
import Login from './src/Screens/Login';
import Register from './src/Screens/Register';
import SearchPage from './src/Screens/SearchPage';
import Profile from './src/Screens/Profile';
import PasswordRest from './src/Screens/PasswordRest';
import Menu from './src/Screens/Menu';
import NewPost from './src/Screens/NewPost';
import PostPage from './src/Screens/PostPage';
import ManageRequests from './src/Screens/ManageRequests';
import EditPost from './src/Screens/EditPost';
import EditProfile from './src/Screens/EditProfile';
import ReportForm from './src/Screens/ReportForm';
import ReportPage from './src/Screens/ReportPage';
import MyPosts from './src/Screens/MyPosts';


import AppContextProvider from './src/Contexts/AppContext';
import { styles } from './src/Styles';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialCommunityIcons } from '@expo/vector-icons';



//Right To Left (Hebrew)
import { I18nManager } from 'react-native';
import { ScrollView } from 'react-native';
I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();




function LoggedUserTabs() {
  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //   style={[{ flex: 1 },]}
    // >
    <Tab.Navigator screenOptions={{ tabBarStyle: { position: 'relative' } }}>
      <Tab.Screen name='פרופיל' component={ProfileStack} options={{
        tabBarIcon: () => <MaterialCommunityIcons name="account" size={24} />,
        headerShown: false
      }} />

      <Tab.Screen name='פרסם פריט' component={NewPost} options={{ tabBarIcon: () => <MaterialCommunityIcons name="plus" size={24} />, headerShown: false }} />
      <Tab.Screen name='חיפוש' component={SearchStack} options={{
        tabBarIcon: () => <MaterialCommunityIcons name="archive-search" size={24} />,
        headerShown: false
      }} />
    </Tab.Navigator>
    // </KeyboardAvoidingView>
  )
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name='ManageRequests' component={ManageRequests} options={{ headerShown: false }} />
      <Stack.Screen name='EditPost' component={EditPost} options={{ headerShown: false }} />
      <Stack.Screen name='EditProfile' component={EditProfile} options={{ headerShown: false }} />
      <Stack.Screen name='ReportForm' component={ReportForm} options={{ headerShown: false }} />
      <Stack.Screen name='ReportPage' component={ReportPage} options={{ headerShown: false }} />
      <Stack.Screen name='MyPosts' component={MyPosts} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Search' component={SearchPage} options={{ headerShown: false }} />
      <Stack.Screen name='PostPage' component={PostPage} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default function App() {

  return (
    <SafeAreaView style={[{ width: '100%' }, { height: '100%' }]}>
      {/* <StatusBar hidden={true} /> */}
      <AppContextProvider>
        <NavigationContainer>
          <Stack.Navigator>

            <Stack.Screen name='Start' component={Start} options={{ headerShown: false }} />
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='reset password' component={PasswordRest} options={{ headerShown: false }} />
            <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
            <Stack.Screen name='LoggedIn' component={LoggedUserTabs} options={{ headerShown: false }} />
            {/* ********/}
            <Stack.Screen name='SearchPage' component={SearchPage} options={{ headerShown: false }} />
            <Stack.Screen name='Menu' component={Menu} options={{ headerShown: false }} />
            <Stack.Screen name='PostPage' component={PostPage} options={{ headerShown: false }} />
            <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />

          </Stack.Navigator>
        </NavigationContainer>
      </AppContextProvider>
    </SafeAreaView>
  );
}