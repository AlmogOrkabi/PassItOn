import { View, Text } from 'react-native'
import { Button } from 'react-native-paper';
import React from 'react'
import { styles } from '../Styles'

export default function Menu({navigation}) {
  return (
    <View>
      <Button style={styles.btn} mode="My Orders" onPress={() => { navigation.navigate('MyOrders') }}>הזמנות שלי</Button>
      <Button style={styles.btn} mode="Oreders To Except" onPress={() => { navigation.navigate('OredersToExcept') }}>הזמנות הממתינות לאישור</Button>
      <Button style={styles.btn} mode="My Posts" onPress={() => { navigation.navigate('MyPosts') }}>פריטים שפרסמתי</Button>
     <Button style={styles.btn} mode="My Favorite" onPress={() => { navigation.navigate('MyFav') }}>מועדפים</Button>
    <Button style={styles.btn} mode="Report User" onPress={() => { navigation.navigate('ReportUsers') }}>דיווח על משתמשים</Button>
    </View>
  )
}