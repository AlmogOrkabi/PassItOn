import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import { styles } from '../Styles';
import { TextInput, Button } from 'react-native-paper';
import { AppContext } from '../Contexts/AppContext';

export default function MyFav({ navigation }) {
  const FavoritesList = () => {
    const [favorites, setFavorites] = React.useState([
      { id: '1', title: 'Favorite Item 1' },
      { id: '2', title: 'Favorite Item 2' },
      { id: '3', title: 'Favorite Item 3' }])
  return (
    <SafeAreaView style={[styles.main_container, styles.container]}>
    <View>
        <Text style={styles.title}>מועדפים</Text>
        
       
      
    </View>
</SafeAreaView>
  )
}
}

