//~  IMPORTS  -  React / React Native / React Native Paper / Styles:
import React, { useState, useContext, useEffect, } from 'react';
import { StatusBar } from 'expo-status-bar'; //! do not delete this
import { Text, View, SafeAreaView, KeyboardAvoidingView, Linking } from 'react-native';
import { Menu, PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles, logo, headerTitleStyle, theme, tabsColor, tabsBackgroundColor } from './src/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';



//~ IMPORTS  -  Components and Screens:
import Start from './src/Screens/Start';
import Login from './src/Screens/Login';
import Register from './src/Screens/Register';
import SearchPage from './src/Screens/SearchPage';
import Profile from './src/Screens/Profile';
import PasswordRest from './src/Screens/PasswordRest';
import NewPost from './src/Screens/NewPost';
import PostPage from './src/Screens/PostPage';
import ManageRequests from './src/Screens/ManageRequests';
import EditPost from './src/Screens/EditPost';
import EditProfile from './src/Screens/EditProfile';
import ReportForm from './src/Screens/ReportForm';
import ReportPage from './src/Screens/ReportPage';
import MyPosts from './src/Screens/MyPosts';
import RequestPage from './src/Screens/RequestPage';
import MyReports from './src/Screens/MyReports';
import OnBoarding from './src/Screens/OnBoarding';
import Loading from './src/Screens/Loading';
import ErrorsUI from './src/ErrorHandling/ErrorsUI';
import Logo from './src/Components/Logo';
import MenuTop from './src/Components/MenuTop';
import Overlay from './src/Components/Overlay';



import AppContextProvider, { AppContext } from './src/Contexts/AppContext';

import 'react-native-gesture-handler';

//~ IMPORT  -  Navigations:
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';






//~ Right To Left (Hebrew)
import { I18nManager } from 'react-native';
I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


// - stops warnings from blocking the screen
if (__DEV__) {
  console.warn = () => { };
}


//~ ----------------------------------NAVIGATIONS:------------------------------------------

function LoggedUserTabs() {

  return (
    //*not working:
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //   style={[{ flex: 1 },]}
    // >
    <Tab.Navigator screenOptions={{ tabBarStyle: { position: 'static', } }}  >
      <Tab.Screen name='פרופיל' component={ProfileStack} options={{
        tabBarIcon: (props) => <MaterialCommunityIcons name="account" size={24} color={props.focused ? tabsColor : 'black'} />,
        headerShown: false,
        tabBarActiveTintColor: tabsColor,
        tabBarActiveBackgroundColor: tabsBackgroundColor,
      }} />

      <Tab.Screen name='פרסם פריט' component={NewPost} options={{ tabBarIcon: (props) => <MaterialCommunityIcons name="plus" size={24} color={props.focused ? tabsColor : 'black'} />, headerShown: false, tabBarActiveTintColor: tabsColor, tabBarActiveBackgroundColor: tabsBackgroundColor, }} />
      <Tab.Screen name='חיפוש' component={SearchStack} options={{
        tabBarIcon: (props) => <MaterialCommunityIcons name="archive-search" size={24} color={props.focused ? tabsColor : 'black'} />,
        headerShown: false,
        tabBarActiveTintColor: tabsColor,
        tabBarActiveBackgroundColor: tabsBackgroundColor,
      }} />
    </Tab.Navigator>
  )
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name='ManageRequests' component={ManageRequests} options={{ headerShown: false }} />
      <Stack.Screen name='EditProfile' component={EditProfile} options={{ headerShown: false }} />
      <Stack.Screen name='MyPosts' component={MyPosts} options={{ headerShown: false }} />
      <Stack.Screen name='MyReports' component={MyReports} options={{ headerShown: false }} />
      <Stack.Screen name='common' component={CommonScreens} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Search' component={SearchPage} options={{ headerShown: false }} />
      <Stack.Screen name='common' component={CommonScreens} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

function CommonScreens() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='PostPage' component={PostPage} options={{ headerShown: false }} />
      <Stack.Screen name='ReportForm' component={ReportForm} options={{ headerShown: false }} />
      <Stack.Screen name='ReportPage' component={ReportPage} options={{ headerShown: false }} />
      <Stack.Screen name='EditPost' component={EditPost} options={{ headerShown: false }} />
      <Stack.Screen name='RequestPage' component={RequestPage} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}




export default function App() {

  const [loading, setLoading] = useState(true);
  const [displayOnboarding, setDisplayOnboarding] = useState(false);


  //- checks if this is the first time opening the app (for the onboarding)
  const chooseScreen = async () => {
    try {
      const hasFirstLaunched = await AsyncStorage.getItem("@onboarding");
      if (hasFirstLaunched === null) {
        setDisplayOnboarding(true);
      }
      else
        setDisplayOnboarding(false);
    } catch (error) {
      console.log("onboarding error" + error);
    }
    finally {
      setLoading(false);
    }
  }


  //! clears the asyncstorage to show the onboarding 
  const clearAsyncStorage = async () => {
    AsyncStorage.clear();
  }


  //! change the lines to show the onboarding
  useEffect(() => {
    chooseScreen();
    //clearAsyncStorage();
  }, [])


  return (
    <SafeAreaView style={[styles.app_container]}>
      {/* <SafeAreaView style={[{ flex: 1 }]}> */}

      {/* <StatusBar hidden={true} /> */}
      <PaperProvider>
        <AppContextProvider>
          <Overlay />
          <NavigationContainer>

            <Stack.Navigator >

              {loading && <Stack.Screen name='loading' component={Loading} options={{ headerShown: false }} />}
              {displayOnboarding && <Stack.Screen name='onboarding' component={OnBoarding} options={{ headerShown: false }} />}
              <Stack.Screen name='Start' component={Start} options={{ headerShown: false }}
              />
              <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
              <Stack.Screen name='reset password' component={PasswordRest} options={{ headerShown: false }} />
              <Stack.Screen name='Register' component={Register} options={{
                headerTitle: (props) => <Logo width={logo.headerLogo.width} height={logo.headerLogo.height} {...props} />,
                headerStyle: { ...headerTitleStyle },
                headerTitleAlign: 'center',
                headerLeft: null,
              }} />
              <Stack.Screen name='LoggedIn' component={LoggedUserTabs} options={{
                headerTitle: (props) => <Logo width={logo.headerLogo.width} height={logo.headerLogo.height} {...props} />,
                headerStyle: { ...headerTitleStyle },
                headerTitleAlign: 'center',
                headerLeft: null,
                headerRight: () => (<MenuTop />),
              }}
              />
            </Stack.Navigator>
            <ErrorsUI />

          </NavigationContainer>
        </AppContextProvider>
      </PaperProvider>
    </SafeAreaView>
  );
}