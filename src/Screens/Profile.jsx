import React, { useEffect, useState, useContext } from 'react'
import { styles, theme, icontSize, iconColor, touchableOpacity } from '../Styles'
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { AppContext } from '../Contexts/AppContext';
import { Button, FAB, AnimatedFAB, SegmentedButtons, Portal, PaperProvider, Divider } from 'react-native-paper';
import Logo from '../Components/Logo';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';



export default function Profile({ navigation }) {

  const { users, loggedUser } = useContext(AppContext)
  const [value, setValue] = useState('');



  const [stateFAB, setStateFAB] = useState(false);

  const onStateChange = () => setStateFAB(!stateFAB);

  // const { open } = state;
  if (!loggedUser) {
    return null;
  }


  return (
    <SafeAreaView style={[styles.main_container2,]}>

      {/* <Logo width={200} height={70} /> */}

      <View style={[{ flex: 1 }]}>
        <View style={[{ alignSelf: 'center' }, styles.profilePictureContainer]}>
          <Image source={
            loggedUser.photo && loggedUser.photo.url
              ? { uri: loggedUser.photo.url }
              : require('../Pictures/DefaultPfp.jpg')
          } style={[styles.profilePicture,]}
          />
        </View>
        <Text style={[styles.username, styles.textColor_DarkGray, {
          textShadowColor: 'rgba(0, 0, 0, 0.2)',
          textShadowOffset: { width: -1, height: 1 },
          textShadowRadius: 10
          , textAlign: 'center'
        }]}>{loggedUser.username}</Text>
        <View style={[{ marginBottom: '5%', marginTop: '1%', gap: 20, backgroundColor: 'rgba(255, 255, 255,0.5)', padding: 10, borderRadius: 10, alignSelf: 'center', width: '80%' }]}>
          {/* <Text style={[{ fontWeight: 600 }]}>פרטים אישיים:</Text> */}
          <View style={[styles.text_icon_container, { paddingTop: '5%' }]}>
            <FontAwesome5 name="user-alt" size={icontSize} color={iconColor} />
            <Text >{`${loggedUser.firstName} ${loggedUser.lastName}`}</Text>
          </View>
          <Divider />
          <View style={[styles.text_icon_container]}>
            <MaterialCommunityIcons name="email" size={icontSize} color={iconColor} />
            <Text style={styles.email}>{loggedUser.email}</Text>
          </View>
          <Divider />
          <View style={[styles.text_icon_container]}>
            <MaterialIcons name="phone-android" size={icontSize} color={iconColor} />
            <Text style={[]}>{loggedUser.phoneNumber} </Text>
          </View>
          <Divider />

          {loggedUser.address.simplifiedAddress ? <View style={[styles.text_icon_container]}>
            {/* <Ionicons name="md-home" size={24} color="black" /> */}
            <MaterialCommunityIcons name="home" size={icontSize} color={iconColor} />

            <Text style={styles.address}>{`${loggedUser.address.simplifiedAddress}`}</Text>
          </View> : null}
          <View >

          </View>
        </View>
        {/* //-Buttons Container */}

        <View style={[styles.flexRowCenter, styles.marginVertical, { justifyContent: 'space-around', }]}>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} activeOpacity={touchableOpacity} style={[, { alignItems: 'center', }]}>
            <FontAwesome5 style={styles.iconBubble} name="user-edit" size={icontSize} color="white" />
            <Text style={[styles.smallText, { marginTop: 5 }]}>עריכת פרטים</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('MyPosts')} activeOpacity={touchableOpacity} style={[{ alignItems: 'center', }]} >
            {/* <MaterialCommunityIcons name="file-document-multiple-outline" size={icontSize} color="black" /> */}
            <MaterialCommunityIcons style={styles.iconBubble} name="file-document-multiple" size={icontSize} color="white" />
            <Text style={[styles.smallText, { marginTop: 5 }]}>הפוסטים שלי</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ManageRequests')} activeOpacity={touchableOpacity} style={[{ alignItems: 'center', }]}>
            <MaterialIcons style={[styles.iconBubble,]} name="mail" size={icontSize} color="white" />
            <Text style={[styles.smallText, { marginTop: 5 }]}>ניהול בקשות</Text>
          </TouchableOpacity>


        </View>
      </View>


      {/* <PaperProvider  >
        <Portal >
          <FAB.Group
            // style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}
            style={[styles.styles_FAB_Group_profile,]}
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
      </PaperProvider> */}

      {/* </View> */}
    </SafeAreaView >
  );
};


// import React, { useContext } from 'react';
// import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
// import { AppContext } from '../Contexts/AppContext';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Logo from '../Components/Logo';

// export default function Profile({ navigation }) {
//   const { loggedUser } = useContext(AppContext);

//   if (!loggedUser) {
//     return null;
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Image
//           source={
//             loggedUser.photo && loggedUser.photo.url
//               ? { uri: loggedUser.photo.url }
//               : require('../Pictures/DefaultPfp.jpg')
//           }
//           style={styles.profilePicture}
//         />
//       </View>
//       <Text style={styles.username}>{loggedUser.username}</Text>
//       <View style={styles.infoContainer}>
//         <Text style={styles.infoText}>
//           שם: <Text style={styles.infoValue}>{`${loggedUser.firstName} ${loggedUser.lastName}`}</Text>
//         </Text>
//         <Text style={styles.infoText}>
//           כתובת מייל: <Text style={styles.infoValue}>{loggedUser.email}</Text>
//         </Text>
//         <Text style={styles.infoText}>
//           מספר טלפון נייד: <Text style={styles.infoValue}>{loggedUser.phoneNumber}</Text>
//         </Text>
//         {loggedUser.address.simplifiedAddress && (
//           <Text style={styles.infoText}>
//             כתובת: <Text style={styles.infoValue}>{loggedUser.address.simplifiedAddress}</Text>
//           </Text>
//         )}
//       </View>
//       <View style={styles.actionButtonsContainer}>
//         <TouchableOpacity
//           style={styles.actionButton}
//           onPress={() => navigation.navigate('MyPosts')}
//         >
//           <View style={styles.iconContainer}>
//             <View style={styles.iconBackground}>
//               <Icon name="list" size={30} color="#1b71be" />
//             </View>
//           </View>
//           <Text style={styles.buttonText}>הפוסטים שלי</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.actionButton}
//           onPress={() => navigation.navigate('ManageRequests')}
//         >
//           <View style={styles.iconContainer}>
//             <View style={styles.iconBackground}>
//               <Icon name="envelope" size={30} color="#1b71be" />
//             </View>
//           </View>
//           <Text style={styles.buttonText}>ניהול בקשות</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.actionButton}
//           onPress={() => navigation.navigate('EditProfile')}
//         >
//           <View style={styles.iconContainer}>
//             <View style={styles.iconBackground}>
//               <Icon name="edit" size={30} color="#1b71be" />
//             </View>
//           </View>
//           <Text style={styles.buttonText}>עריכת פרופיל</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#d9e3eb",
//     padding: 20,
//     paddingTop: 10,
//   },
//   header: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   profilePicture: {
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     marginTop: 75,
//   },
//   username: {
//     fontSize: 23,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginVertical: 10,
//   },
//   infoContainer: {
//     backgroundColor: '#F5F4F4',
//     borderRadius: 10,
//     padding: 15,
//   },
//   infoText: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   infoValue: {
//     fontWeight: 'ligth',
//   },
//   actionButtonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   actionButton: {
//     alignItems: 'center',
//     marginHorizontal: 10,
//   },
//   buttonText: {
//     color: '#000',
//     fontWeight: 'ligth',
//   },
//   iconContainer: {
//     backgroundColor: 'none',
//     borderRadius: 40,
//     padding: 40,
//     marginBottom: 0,
//     paddingTop: 40,
//   },
//   iconBackground: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });