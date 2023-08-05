import React, { useEffect, useState, useContext } from 'react'
import { styles } from '../Styles'
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';
import { AppContext } from '../Contexts/AppContext';
import { Button } from 'react-native-paper';


export default function Profile() {

  const { users, loggedUser } = useContext(AppContext)

  return (
    <SafeAreaView style={styles.main_container}>
      <View style={styles.container}>
        <Image source={
          loggedUser.photo && loggedUser.photo.url
            ? { uri: loggedUser.photo.url }
            : require('../Pictures/DefaultPfp.jpg')
        } style={[styles.profilePicture,]} />
        <Text style={styles.name}>{`${loggedUser.firstName} ${loggedUser.lastName}`}</Text>
        <Text style={styles.username}>{loggedUser.username}</Text>
        <Text style={styles.email}>{loggedUser.email}</Text>
        <Text style={styles.phone}>{loggedUser.phoneNumber}</Text>
        <View style={styles.addressContainer}>
          {/* <Text style={styles.address}>{`${loggedUser.address.street}, ${loggedUser.address.city}, ${loggedUser.address.country}`}</Text> */}
          {loggedUser.address.simplifiedAddress ? <Text style={styles.address}>{`${loggedUser.address.simplifiedAddress}`}</Text> : <Button><Text>הוספת כתובת </Text></Button>}
        </View>
      </View>
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 16,
//   },
//   profilePicture: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 10,
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   username: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   email: {
//     fontSize: 14,
//     marginBottom: 10,
//   },
//   addressContainer: {
//     backgroundColor: '#f2f2f2',
//     padding: 10,
//     borderRadius: 8,
//   },
//   address: {
//     fontSize: 14,
//   },
// });





// export default function Profile() {
//   return (
//     <SafeAreaView style={[styles.main_container, styles.container]}>
//       <View>
//         <Text>דף פרופיל</Text>
//         <Text></Text>
//         <Text>העלאת מוצר</Text>
//         <Text>פוסטים קיימים</Text>
//         <Text>היסטוריה</Text>
//         <Text>עריכת פרטים</Text>
//         <Text>??הגדרות??</Text>
//       </View>
//     </SafeAreaView>
//   )}
