import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import { styles } from '../Styles';
import { TextInput, Button } from 'react-native-paper';
import { AppContext } from '../Contexts/AppContext';

export default function MyPosts({ navigation }) {
  return (

    <View style={styles.container}>
      <Text style={styles.title}>הכנס תמונה</Text>
      <Text style={styles.title}></Text>
      <Text style={styles.title}></Text>
      <Text style={styles.title}></Text>
      <Text style={styles.title}></Text>
      <Text style={styles.title}></Text>
    </View>
  )
}

