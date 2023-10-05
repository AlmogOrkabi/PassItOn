import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { styles, onboardingStyle } from '../../Styles';

export default function Onboarding1() {
  return (
    <View style={[onboardingStyle.sub_container]}>
      <Image
        source={require('../../Pictures/Onboarding1.jpeg')}
        style={onboardingStyle.image}
      />
      <View>
        <Text style={onboardingStyle.title}>בואו נעשה ביחד שינוי אמיתי!</Text>
        <Text style={onboardingStyle.text}> מעלים פרטים שאינם בשימוש כדי שאחרים יוכלו להנות מהם</Text>
        {/* <Text style={onboardingStyle.text}>צלמו פריטים שאינם בשימוש שאותם תרצו למסור</Text> */}
      </View>
    </View>
  );
}
