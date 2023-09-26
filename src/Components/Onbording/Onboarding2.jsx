import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';


export function Onboarding2({ navigation }) {
  const handleNext = () => {
    navigation.navigate('Onboarding3');
  };

  const handlePrevious = () => {
    navigation.navigate('Onboarding1');
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://img.freepik.com/free-vector/people-checking-giant-check-list-background_23-2148091650.jpg?w=740&t=st=1695418750~exp=1695419350~hmac=98f65c285f34eed27258abf8a7881c663795299de36e2bfde49b67e0b44eb469' }}
        style={styles.image}
      />
      <View style={styles.page}>
        <Text style={styles.title}>ממלאים את הפרטים</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>
            אצלנו הפרטים האישיים שלכם מוגנים ויוצגו למשתמשים אחרים רק לאחר אישור מכם
          </Text>
        </View>
      </View>
      <View style={styles.navButtons}>
        <TouchableOpacity onPress={handleNext}>
          <Text style={styles.navText}>הבא</Text>
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
    height: 200,
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
  subtitleContainer: {
    maxWidth: '80%', 
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 60,
    color: '#555',
    textAlign: 'center', 
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
  skipText: {
    fontSize: 18,
    color: '#6A41A0',
    marginTop: 0,
  },
});

