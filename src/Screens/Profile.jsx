import React, { useEffect, useState, useContext } from 'react'
import { styles, theme } from '../Styles'
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';
import { AppContext } from '../Contexts/AppContext';
import { Button, FAB, AnimatedFAB, SegmentedButtons } from 'react-native-paper';
import Logo from '../Components/Logo';

export default function Profile() {

  const { users, loggedUser } = useContext(AppContext)
  const [value, setValue] = React.useState('');
  return (
    <SafeAreaView style={[styles.main_container,]}>
      <View style={[{ flex: 0.2 }]}>
        <Logo width={200} height={80} />
      </View>

      <View style={[styles.container, { flex: 0.6 }]}>
        <View>
          <Image source={
            loggedUser.photo && loggedUser.photo.url
              ? { uri: loggedUser.photo.url }
              : require('../Pictures/DefaultPfp.jpg')
          } style={[styles.profilePicture,]}
          />
          <FAB icon="pencil" style={[styles.style_FAB_picture]} theme={{ colors: { primaryContainer: theme.lightBlue, onPrimaryContainer: 'white' } }} />
        </View>
        <Text style={styles.username}>{loggedUser.username}</Text>
        <View style={[styles.sub_container2, { gap: 10 }, { backgroundColor: 'white' }, { padding: 10 }, { borderRadius: 10 }, { alignSelf: 'flex-start' }]}>
          <Text style={[{ fontWeight: 600 }]}>פרטים אישיים:</Text>
          <Text style={styles.name}>שם:<Text style={styles.name}>{`${loggedUser.firstName} ${loggedUser.lastName}`}</Text></Text>

          <Text>כתובת מייל: <Text style={styles.email}>{loggedUser.email}</Text></Text>
          <Text>מספר טלפון נייד: <Text style={styles.phone}>{loggedUser.phoneNumber}</Text></Text>
          <View style={styles.addressContainer}>
            {/* <Text style={styles.address}>{`${loggedUser.address.street}, ${loggedUser.address.city}, ${loggedUser.address.country}`}</Text> */}
            {loggedUser.address.simplifiedAddress ? <Text>כתובת: <Text style={styles.address}>{`${loggedUser.address.simplifiedAddress}`}</Text></Text> : <Button><Text>הוספת כתובת </Text></Button>}
          </View>
          <FAB icon="pencil" style={[styles.style_FAB]} theme={{ colors: { primaryContainer: theme.lightBlue, onPrimaryContainer: 'black' } }} />
        </View>

      </View>

      <View style={[styles.sub_container, { flex: 0.2 },]}>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={[

            {
              value: 'train',
              label: 'בקשות שנשלחו',
            },
            { value: 'drive', label: 'בקשות שהתקבלו' },
          ]}
          density='medium'
          theme={{ roundness: 2, }}
          style={[{ width: '100%' }, { alignSelf: 'center' },]}
        />
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
