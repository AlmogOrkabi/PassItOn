import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function Onboarding1({ navigation }) {
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    
    async function checkFirstTime() {
      try {
        const value = await AsyncStorage.getItem('hasSeenOnboarding');
        if (value !== null) {
          setIsFirstTime(false);
        }
      } catch (error) {
        console.error('Error checking AsyncStorage:', error);
      }
    }

    checkFirstTime();
  }, []);

  const handleNext = () => {
    navigation.navigate('Onboarding2');
  };

  const handleSkip = () => {
    navigation.navigate('Start');
  };

  const markAsSeen = async () => {
    
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      setIsFirstTime(false);
    } catch (error) {
      console.error('Error setting AsyncStorage:', error);
    }
  };

  if (!isFirstTime) {
    return navigation.navigate('Onboarding2');
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://img.freepik.com/free-vector/flat-man-taking-photos-with-smartphone_23-2149052417.jpg?w=740&t=st=1695418390~exp=1695418990~hmac=d882ebeebb0fb3bf02cbd7642cf6ddd499e157bf5a476bb8e0b8b197c4b4e4d3',
        }}
        style={styles.image}
      />
      <View style={styles.page}>
        <Text style={styles.title}>מעלים פרטים שאינם בשימוש</Text>
        <Text style={styles.subtitle}>צלמו פריטים שאינם בשימוש שאותם תרצו למסור</Text>
      </View>
      <View style={styles.navButtons}>
        <Button
          mode="contained"
          onPress={handleNext}
          style={{ ...styles.button, ...styles.nextButton }} 
        >
          הבא
        </Button>
        <Button mode="text" onPress={() => { handleSkip(); markAsSeen(); }} style={styles.button} labelStyle={styles.skipText}>
          לדלג
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  page: {
    alignItems: 'center',
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 60,
    color: '#555',
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    width: '45%',
  },
  nextButton: {
    backgroundColor: '#6A41A0',
  },
  skipText: {
    fontSize: 18,
    color: '#6A41A0',
  },
});




