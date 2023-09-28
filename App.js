import React, { useState, useContext, useEffect, } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, SafeAreaView, KeyboardAvoidingView, Linking } from 'react-native';
import { Menu, PaperProvider } from 'react-native-paper';

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
// import { Onboarding1 } from './src/Components/Onbording/Onboarding1';
// import { Onboarding2 } from './src/Components/Onbording/Onboarding2';
// import { Onboarding3 } from './src/Components/Onbording/Onboarding3';



import OnBoarding from './src/Screens/OnBoarding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from './src/Screens/Loading';





import AppContextProvider, { AppContext } from './src/Contexts/AppContext';
import { styles, logo, headerTitleStyle } from './src/Styles';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import ErrorsUI from './src/ErrorHandling/ErrorsUI';
import Logo from './src/Components/Logo';
import MenuTop from './src/Components/MenuTop';


//Right To Left (Hebrew)
import { I18nManager } from 'react-native';

I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


// import { Dimensions } from 'react-native';

// const { width, height } = Dimensions.get('screen');

function LoggedUserTabs() {

  // const { serverError, setServerError } = useContext(AppContext);


  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //   style={[{ flex: 1 },]}
    // >
    <Tab.Navigator screenOptions={{ tabBarStyle: { position: 'static' } }}>
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
      {/* <Stack.Screen name='EditPost' component={EditPost} options={{ headerShown: false }} /> */}
      <Stack.Screen name='EditProfile' component={EditProfile} options={{ headerShown: false }} />
      {/* <Stack.Screen name='ReportForm' component={ReportForm} options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name='ReportPage' component={ReportPage} options={{ headerShown: false }} /> */}
      <Stack.Screen name='MyPosts' component={MyPosts} options={{ headerShown: false }} />
      {/* <Stack.Screen name='RequestPage' component={RequestPage} options={{ headerShown: false }} /> */}
      <Stack.Screen name='MyReports' component={MyReports} options={{ headerShown: false }} />
      <Stack.Screen name='common' component={CommonScreens} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Search' component={SearchPage} options={{ headerShown: false }} />
      {/* <Stack.Screen name='PostPage' component={PostPage} options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name='ReportForm' component={ReportForm} options={{ headerShown: false }} /> */}
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


  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState();

  useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        // if (Platform.OS !== 'web' && initialUrl == null) {
        //   // Only restore state if there's no deep link and we're not on web
        //   const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
        //   const state = savedStateString ? JSON.parse(savedStateString) : undefined;

        //   if (state !== undefined) {
        //     setInitialState(state);
        //   }
        // }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  // if (!isReady) { // cases an error 
  //   return null;
  // }

  const [loading, setLoading] = useState(true);
  const [displayOnboarding, setDisplayOnboarding] = useState(false);

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

  const clearAsyncStorage = async () => {
    AsyncStorage.clear();
  }



  useEffect(() => {
    chooseScreen();
    // clearAsyncStorage();
  }, [])

  // const getInitialRoute = () => {
  //   if (loading) return 'loading';
  //   if (displayOnboarding) return 'onboarding';
  //   // ... any other conditions
  //   return 'Start'; // default initial route
  // };             <Stack.Navigator initialRouteName={getInitialRoute()}>

  return (
    <SafeAreaView style={[styles.app_container]}>
      {/* <SafeAreaView style={[{ flex: 1 }]}> */}

      {/* <StatusBar hidden={true} /> */}
      <PaperProvider>
        <AppContextProvider>
          <NavigationContainer initialState={initialState}>

            <Stack.Navigator >

              {loading && <Stack.Screen name='loading' component={Loading} options={{ headerShown: false }} />}
              {displayOnboarding && <Stack.Screen name='onboarding' component={OnBoarding} options={{ headerShown: false }} />}


              <Stack.Screen name='Start' component={Start} options={{ headerShown: false }}
              />
              <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
              <Stack.Screen name='reset password' component={PasswordRest} options={{ headerShown: false }} />
              <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
              <Stack.Screen name='LoggedIn' component={LoggedUserTabs} options={{
                headerTitle: (props) => <Logo width={logo.headerLogo.width} height={logo.headerLogo.height} {...props} />,
                headerStyle: { ...headerTitleStyle },
                headerTitleAlign: 'center',
                // headerLeft: null,
                headerLeft: () => (<MenuTop />),
              }}
              />
              {/* ********/}
              {/* <Stack.Screen name='SearchPage' component={SearchPage} options={{ headerShown: false }} />
            <Stack.Screen name='PostPage' component={PostPage} options={{ headerShown: false }} />
            <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
            <Stack.Screen name='ReportForm' component={ReportForm} options={{ headerShown: false }} /> */}
              {/* <Stack.Screen name='CommonScreens' component={CommonScreens} options={{ headerShown: false }} /> */}
              {/* <Stack.Screen name='PostPage' component={PostPage} options={{ headerShown: false }} />
            <Stack.Screen name='ReportForm' component={ReportForm} options={{ headerShown: false }} />
            <Stack.Screen name='ReportPage' component={ReportPage} options={{ headerShown: false }} />
            <Stack.Screen name='EditPost' component={EditPost} options={{ headerShown: false }} />
            <Stack.Screen name='RequestPage' component={RequestPage} options={{ headerShown: false }} /> */}
            </Stack.Navigator>
            <ErrorsUI />

          </NavigationContainer>
        </AppContextProvider>
      </PaperProvider>
    </SafeAreaView>
  );
}