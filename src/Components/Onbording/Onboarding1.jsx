import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles, onboardingStyle } from '../../Styles';

export default function Onboarding1() {


  return (
    <View style={[onboardingStyle.sub_container]}>
      <Image
        source={{
          uri: 'https://img.freepik.com/free-vector/flat-man-taking-photos-with-smartphone_23-2149052417.jpg?w=740&t=st=1695418390~exp=1695418990~hmac=d882ebeebb0fb3bf02cbd7642cf6ddd499e157bf5a476bb8e0b8b197c4b4e4d3',
        }}
        style={onboardingStyle.image}
      />
      <View >
        <Text style={onboardingStyle.title}>מעלים פרטים שאינם בשימוש</Text>
        <Text style={onboardingStyle.text}>צלמו פריטים שאינם בשימוש שאותם תרצו למסור</Text>
      </View>

    </View>
  );
}



