import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { styles, onboardingStyle } from '../../Styles';

export default function Onboarding3() {
  return (
    <View style={onboardingStyle.sub_container}>
      <Image
        source={require('../../Pictures/Onboarding3.jpeg')}
        style={onboardingStyle.image}
      />
      <View>
        <Text style={styles.title}>לא תאמינו מה תמצאו</Text>
        <Text style={styles.subtitle}>מגוון רחב של פריטים שמחכים לכם בחינם</Text>
      </View>
    </View>
  );
}
