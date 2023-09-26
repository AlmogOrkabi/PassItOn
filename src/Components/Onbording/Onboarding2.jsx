import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { styles, onboardingStyle } from '../../Styles';


export default function Onboarding2() {

  return (
    <View style={onboardingStyle.sub_container}>
      <Image
        source={{ uri: 'https://img.freepik.com/free-vector/people-checking-giant-check-list-background_23-2148091650.jpg?w=740&t=st=1695418750~exp=1695419350~hmac=98f65c285f34eed27258abf8a7881c663795299de36e2bfde49b67e0b44eb469' }}
        style={onboardingStyle.image}
      />
      <View >
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



