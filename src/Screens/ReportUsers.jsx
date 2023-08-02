import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import { styles } from '../Styles';
import { TextInput, Button } from 'react-native-paper';
import { AppContext } from '../Contexts/AppContext';

export default function ReportUsers({ navigation }) {
  return (
    <SafeAreaView style={[styles.main_container, styles.container]}>
    <View>
        <Text>ברוך הבא</Text>
        <Text></Text>
        <Text>נחוץ בכלל??</Text>
        <Text></Text>
        <Text></Text>
    </View>
</SafeAreaView>
  )
}