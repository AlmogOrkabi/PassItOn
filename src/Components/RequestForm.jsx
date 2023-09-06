
import React, { useEffect, useState, useContext } from 'react'
import { View, Text, Alert, StyleSheet, Pressable, TextInput, ActivityIndicator } from 'react-native';
import { Button, IconButton, Modal, Portal, PaperProvider, Checkbox } from 'react-native-paper';
import { styles } from '../Styles';
import { validateNewRequestData } from '../utils/validations';
import { createNewRequest } from '../api/index';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppContext } from '../Contexts/AppContext';



export default function RequestForm({ post, modalVisible, setModalVisible }) {

    const [loading, setLoading] = useState(false);

    const [checked, setChecked] = useState(false);

    const [requestText, setRequestText] = useState('');

    const [notAgreed, setNotAgreed] = useState(false);

    const [errMsg, setErrMsg] = useState(null);

    const [success, setSuccess] = useState(false);

    const { loggedUser, userToken } = useContext(AppContext)


    useEffect(() => {
        notAgreed && checked ? setNotAgreed(false) : null;
    }, [checked]);

    async function sendNewRequest() {
        try {
            setLoading(true);
            if (!checked) {
                setNotAgreed(true);
                return;
            }
            let validationRes = await validateNewRequestData(requestText, post.status);
            if (!validationRes.valid) {
                setErrMsg(validationRes.msg);
                return
            }
            setErrMsg(() => null);

            //console.log(loggedUser._id)
            const res = await createNewRequest(post.owner_id, post._id, loggedUser._id, requestText, userToken);

            if (res.insertedId) {
                Alert.alert('בקשה נשלחה בהצלחה')
                setSuccess(true);
            }


        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false);

        }
    }


    return (

        <PaperProvider >
            <Portal>
                <Modal visible={modalVisible} onDismiss={() => { setModalVisible(false) }} contentContainerStyle={[]} theme={{ colors: { backdrop: '#00000000' } }}>
                    {loading ?
                        <View style={[styles.modalView,]}> <ActivityIndicator /></View>
                        :
                        success ?
                            <View style={[styles.modalView, styles.containerCenter,]}>
                                <Text style={[styles.titleBold, { color: 'green' }]}>בקשה נשלחה בהצלחה!</Text>
                                <MaterialCommunityIcons name="check-decagram" size={65} color="green" />
                                <Button mode='contained' style={[styles.nppostButton, { marginTop: '50%' }]} onPress={() => setModalVisible(!modalVisible)}>
                                    סגירה
                                </Button>
                            </View>
                            :
                            <View>
                                <IconButton
                                    icon="close"
                                    style={[{ position: 'relative', bottom: 570, left: 35, zIndex: 1, }]}
                                    size={20}
                                    onPress={() => setModalVisible(!modalVisible)}
                                />
                                <View style={[styles.modalView, styles.modalElements]}>
                                    <Text style={[styles.smallTitle, styles.text_underline, { marginLeft: '8%', }]}>שליחת בקשה למפרסם הפריט:</Text>
                                    <Text>שם הפריט: <Text style={[styles.smallTitle]}>{post.itemName}</Text></Text>
                                    <Text>מיקום הפריט: <Text>{post.address.simplifiedAddress || post.address.city}</Text></Text>
                                    <View >
                                        <Text style={[styles.text_underline, { marginLeft: '8%', }]}>מלל הבקשה (אינו חובה):<Text style={[requestText.length > 300 ? styles.errMsg : null]}>עד 300 תווים</Text></Text>
                                        <TextInput style={[styles.native_input, requestText.length > 300 ? styles.borderRed : null]}
                                            placeholder="מלל הבקשה (אינו חובה) "
                                            onChangeText={setRequestText}
                                            value={requestText}
                                            multiline={true}
                                            maxLength={300} />
                                        <Text style={[styles.text_underline, styles.smallText, { marginLeft: '8%', }]}>*בעת שליחת הבקשה פרטי ההתקשרות שלך יהיו זמינים למפרסם הפוסט</Text>
                                        <View style={[styles.flexRow, { alignItems: 'center', marginTop: '2%' }]}>
                                            <Checkbox
                                                status={checked ? 'checked' : 'unchecked'}
                                                onPress={() => {
                                                    setChecked(!checked);
                                                }}
                                                uncheckedColor={notAgreed ? 'red' : 'black'}

                                            />
                                            <Text style={[styles.smallText, notAgreed ? styles.errMsg : null]}>אני מסכים/ה</Text>
                                        </View>
                                    </View>
                                    {errMsg ? <Text style={[styles.errMsg]}>{errMsg}</Text> : null}

                                    <Button mode='contained' style={[styles.nppostButton]} onPress={() => { setErrMsg(() => null); sendNewRequest() }}>
                                        שליחת בקשה
                                    </Button>
                                </View>
                            </View>}
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