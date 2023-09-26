import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { styles, onboardingStyle } from '../../Styles';


export default function Onboarding3() {


  return (
    <View style={onboardingStyle.sub_container}>
      <Image
        source={{ uri: 'https://img.freepik.com/free-vector/flat-computer-user-illustration-with-program-windows-human-character_1284-63451.jpg?w=740&t=st=1695419907~exp=1695420507~hmac=d84235514f92797c3fdbe8e0b9603cd91463365d059bba32884fa16cd49ff955' }}
        style={onboardingStyle.image}
      />
      <View >
        <Text style={styles.title}>לא תאמינו מה תמצאו</Text>
        <Text style={styles.subtitle}>מגוון רחב של פריטים שמחכים לכם בחינם</Text>
      </View>

    </View>
  );
}
