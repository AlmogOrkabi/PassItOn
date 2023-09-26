import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';


export function Onboarding3({ navigation }) {
  const handlePrevious = () => {
    navigation.navigate('Onboarding2');
  };

  const handleGetStarted = () => {
   
    navigation.navigate('Start');
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://img.freepik.com/free-vector/flat-computer-user-illustration-with-program-windows-human-character_1284-63451.jpg?w=740&t=st=1695419907~exp=1695420507~hmac=d84235514f92797c3fdbe8e0b9603cd91463365d059bba32884fa16cd49ff955' }}
        style={styles.image}
      />
      <View style={styles.page}>
        <Text style={styles.title}>לא תאמינו מה תמצאו</Text>
        <Text style={styles.subtitle}>מגוון רחב של פריטים שמחכים לכם בחינם</Text>
      </View>
      <View style={styles.navButtons}>
        <TouchableOpacity onPress={handleGetStarted}>
          <Text style={styles.getStartedText}>התחל</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePrevious}>
          <Text style={styles.navText}>אחורה</Text>
        </TouchableOpacity>
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
  navText: {
    fontSize: 18,
    color: '#333',
  },
  getStartedText: {
    fontSize: 18,
    color: '#6A41A0',
  },
});

