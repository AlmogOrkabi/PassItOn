import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { styles, onboardingStyle } from '../../Styles';

export default function Onboarding2() {
  return (
    <View style={onboardingStyle.sub_container}>
      <Image
        source={require('../../Pictures/Onboarding2.jpeg')}
        style={onboardingStyle.image}
      />
      <View>
        <Text style={onboardingStyle.title}>ממלאים את הפרטים</Text>
        <View style={onboardingStyle.text_container}>
          <Text style={onboardingStyle.text}>
            אצלנו הפרטים האישיים שלכם מוגנים ויוצגו למשתמשים אחרים רק לאחר אישור מכם
          </Text>
        </View>
      </View>
    </View>
  );
}
