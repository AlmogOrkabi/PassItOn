import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import { styles } from '../Styles';
import { TextInput, Button } from 'react-native-paper';
import { AppContext } from '../Contexts/AppContext';

export default function Home({ navigation }) {
    const { users, loggedUser } = useContext(AppContext)
    
    return (
        
        <SafeAreaView style={[styles.main_container, styles.container]}>
            <View>
                <Text style={styles.title}>ברוך הבא</Text>
                <Text style={styles.username}>{loggedUser.username}</Text>
               
              
            </View>
        </SafeAreaView>
    )
}