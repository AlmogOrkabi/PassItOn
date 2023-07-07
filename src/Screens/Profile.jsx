import { View, Text,Image, SafeAreaView } from 'react-native'
import React from 'react'
import { styles } from '../Styles'
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import users from './users.json';

const Profile = () => {

  const activeUser = users[0];

  return (
    <View style={styles.container}>
      <Image source={{ uri: activeUser.photo }} style={styles.profilePicture} />
      <Text style={styles.name}>{`${activeUser.firstName} ${activeUser.lastName}`}</Text>
      <Text style={styles.username}>{activeUser.username}</Text>
      <Text style={styles.email}>{activeUser.email}</Text>
      <View style={styles.addressContainer}>
        <Text style={styles.address}>{`${activeUser.address.street}, ${activeUser.address.city}, ${activeUser.address.country}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  username: {
    fontSize: 16,
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    marginBottom: 10,
  },
  addressContainer: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 8,
  },
  address: {
    fontSize: 14,
  },
});

export default Profile;



//export default function Profile() {
    return (
        <SafeAreaView style={[styles.main_container, styles.container]}>
            <View>
                <Text>דף פרופיל</Text>
                <Text></Text>
                <Text>העלאת מוצר</Text>
                <Text>פוסטים קיימים</Text>
                <Text>היסטוריה</Text>
                <Text>עריכת פרטים</Text>
                <Text>??הגדרות??</Text>
            </View>
        </SafeAreaView>
    )
//}
