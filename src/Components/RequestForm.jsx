// import { View, Text, Modal } from 'react-native'
// import React, { useState, useEffect } from 'react'

// export default function RequestForm() {
//     const [modalVisible, setModalVisible] = useState(false);
//     return (
//         <View>
//             <Text>RequestForm</Text>
//         </View>
//     )
// }

import React, { useState } from 'react'
//import { View, Text, Alert, Modal, StyleSheet, Pressable } from 'react-native';
import { View, Text, Alert, StyleSheet, Pressable, TextInput } from 'react-native';
import { Button, IconButton, Modal, Portal, PaperProvider } from 'react-native-paper';
import { styles } from '../Styles';

export default function RequestForm({ post, modalVisible, setModalVisible }) {
    //const containerStyle = { backgroundColor: 'white', padding: 20 };

    const [requestText, setRequestText] = useState('');

    return (

        // <View style={[styles.centeredView]}>
        //     <Modal
        //         animationType="slide"
        //         transparent={true}
        //         visible={modalVisible}
        //         onRequestClose={() => {
        //             setModalVisible(!modalVisible);
        //         }}>

        //         <IconButton
        //             icon="close"
        //             //iconColor={MD3Colors.error50}
        //             style={[{ backgroundColor: 'lightgray' }]}
        //             mode='contained'
        //             size={20}
        //             onPress={() => setModalVisible(!modalVisible)}
        //         />
        //         <View style={[styles.centeredView]}>
        //             <View style={[styles.modalView]}>

        //                 <View style={[styles.flexRow,]}>
        //                     <Button mode="contained" style={[styles.nppostButton, styles.smallBtn]} onPress={() => setModalVisible(!modalVisible)} >X</Button>
        //                     <Button mode="contained" style={[styles.nppostButton, styles.smallBtn]} onPress={() => setModalVisible(!modalVisible)} >שליחת בקשה</Button>
        //                 </View>

        //             </View>
        //         </View>
        //     </Modal>
        //     <Button mode="contained" style={[styles.nppostButton,]} onPress={() => setModalVisible(!modalVisible)} >שליחת בקשה</Button>
        // </View>
        <PaperProvider >
            <Portal>
                <Modal visible={modalVisible} onDismiss={() => { setModalVisible(false) }} contentContainerStyle={[]} theme={{ colors: { backdrop: '#00000000' } }}>
                    <IconButton
                        icon="close"
                        //iconColor={MD3Colors.error50}
                        style={[{ position: 'relative', bottom: 570, left: 35, zIndex: 1, }]}
                        size={20}
                        onPress={() => setModalVisible(!modalVisible)}
                    />
                    <View style={[styles.modalView, styles.modalElements]}>
                        <Text style={[styles.smallTitle, styles.text_underline, { marginLeft: '8%', }]}>שליחת בקשה למפרסם הפריט:</Text>
                        <Text>שם הפריט: <Text style={[styles.smallTitle]}>{post.itemName}</Text></Text>
                        <Text>מיקום הפריט: <Text>{post.address.simplifiedAddress || post.address.city}</Text></Text>
                        <View >
                            <Text style={[styles.text_underline, { marginLeft: '8%', }]}>מלל הבקשה (אינו חובה):</Text>
                            <TextInput style={[styles.native_input]}
                                placeholder="מלל הבקשה (אינו חובה) "
                                onChangeText={setRequestText}
                                value={requestText}
                                multiline={true} />
                            <Text style={[styles.text_underline, styles.form_small_heading, { marginLeft: '8%', }]}>*בעת שליחת הבקשה פרטי ההתקשרות שלך יהיו זמינים למפרסם הפוסט</Text>
                        </View>
                        <Button mode='contained' style={[styles.nppostButton]} onPress={() => { setModalVisible(false) }}>
                            שליחת בקשה
                        </Button>
                    </View>
                </Modal>

            </Portal>
            <Button mode='contained' style={[styles.nppostButton]} onPress={() => { setModalVisible(true) }}>
                שליחת בקשה
            </Button>
        </PaperProvider>

    )

}
// const styles = StyleSheet.create({
//     centeredView: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 22,
//     },
//     modalView: {
//         margin: 20,
//         backgroundColor: 'white',
//         borderRadius: 20,
//         padding: 35,
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5,
//     },
//     button: {
//         borderRadius: 20,
//         padding: 10,
//         elevation: 2,
//     },
//     buttonOpen: {
//         backgroundColor: '#F194FF',
//     },
//     buttonClose: {
//         backgroundColor: '#2196F3',
//     },
//     textStyle: {
//         color: 'white',
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
//     modalText: {
//         marginBottom: 15,
//         textAlign: 'center',
//     },
// });