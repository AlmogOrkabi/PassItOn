import React, { useEffect, useState, useContext } from 'react'
import { styles, theme } from '../Styles'
import { View, Text, Image, StyleSheet, SafeAreaView, I18nManager } from 'react-native';
import { AppContext } from '../Contexts/AppContext';
import { Button, FAB, AnimatedFAB, SegmentedButtons, Portal, PaperProvider } from 'react-native-paper';
import Logo from '../Components/Logo';
export default function Profile({ navigation }) {

  const { users, loggedUser } = useContext(AppContext)
  const [value, setValue] = useState('');



  const [stateFAB, setStateFAB] = useState(false);

  const onStateChange = () => setStateFAB(!stateFAB);

  // const { open } = state;

  return (
    <SafeAreaView style={[styles.main_container2,]}>

      <Logo width={200} height={70} />

      <View style={[styles.container,]}>
        <View style={[{ alignSelf: 'center' }, styles.profilePictureContainer]}>
          <Image source={
            loggedUser.photo && loggedUser.photo.url
              ? { uri: loggedUser.photo.url }
              : require('../Pictures/DefaultPfp.jpg')
          } style={[styles.profilePicture,]}
          />
          <FAB icon="pencil" style={[styles.style_FAB_picture]} theme={{ colors: { primaryContainer: theme.lightBlue, onPrimaryContainer: 'white' } }} customSize={25} />
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

      {/* <View style={[{ flex: 1, }]} > */}
      {/* <SegmentedButtons
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
        /> */}


      {/* <Button mode="contained" onPress={() => { }} style={[styles.btn, styles.smallBtn]}>
          סטטוס בקשות
        </Button> */}


      <PaperProvider  >
        <Portal >
          <FAB.Group
            // style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}
            style={[styles.styles_FAB_Group_profile, stateFAB ? styles.boxShadowFAB : null]}
            open={stateFAB}
            visible
            icon={stateFAB ? 'minus' : 'plus'}
            customSize={30}
            actions={[
              // { icon: 'plus', onPress: () => console.log('Pressed add') },
              {
                icon: 'star',
                label: 'הפוסטים שלי',
                //onPress: () => console.log('Pressed star'),
                onPress: () => navigation.navigate('MyPosts'),
              },
              {
                icon: 'email',
                label: 'ניהול בקשות',
                //onPress: () => console.log('Pressed email'),
                onPress: () => navigation.navigate('ManageRequests'),

              },
              {
                icon: 'pencil',
                label: 'עריכה',
                //onPress: () => console.log('Pressed notifications'),
                onPress: () => navigation.navigate('EditProfile'),
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (stateFAB) {
                // do something if the speed dial is open
              }
            }}
            //backdropColor={'#00000000'}
            backdropColor={'#add9ff96'} //lightblue from theme but with opacity applied (96 at the end)

          />
        </Portal>
      </PaperProvider>

      {/* </View> */}
    </SafeAreaView >
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
