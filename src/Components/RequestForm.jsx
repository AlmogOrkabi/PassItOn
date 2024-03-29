
import React, { useEffect, useState, useContext } from 'react'
import { View, Text, Alert, TextInput, ActivityIndicator } from 'react-native';
import { Button, IconButton, Modal, Portal, PaperProvider, Checkbox } from 'react-native-paper';
import { styles, theme } from '../Styles';
import { validateNewRequestData } from '../utils/validations';
import { createNewRequest } from '../api/index';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppContext } from '../Contexts/AppContext';
import Overlay from './Overlay'
import { addressWithoutNumbers } from '../utils';

export default function RequestForm({ post, modalVisible, setModalVisible, requestSent, setRequestsSent }) {

    const [loading, setLoading] = useState(false);

    const [checked, setChecked] = useState(false);

    const [requestText, setRequestText] = useState('');

    const [notAgreed, setNotAgreed] = useState(false);

    const [errMsg, setErrMsg] = useState(null);

    const [success, setSuccess] = useState(false);

    const { loggedUser, serverError, setServerError, overlayVisible, setOverlayVisible } = useContext(AppContext)



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
            const res = await createNewRequest(post.owner_id, post._id, loggedUser._id, requestText);

            if (res.insertedId) {
                //Alert.alert('בקשה נשלחה בהצלחה')
                setSuccess(true);
            }


        } catch (error) {
            console.log(error)
            setServerError({ ...error });
        }
        finally {
            setLoading(false);

        }
    }
    async function handlePress() {
        setErrMsg(() => null);
        await sendNewRequest()
    }

    return (
        <View>
            <Portal>
                <Modal visible={modalVisible} onDismiss={() => { setModalVisible(false); setOverlayVisible(false) }} contentContainerStyle={[]} theme={{ colors: { backdrop: '#00000000' } }}>
                    {loading ?
                        <View style={[styles.modalView,]}>
                            <ActivityIndicator />
                        </View>
                        :
                        success ?
                            <View style={[styles.modalView, styles.containerCenter,]}>
                                <Text style={[styles.titleBold, { color: 'green' }]}>בקשה נשלחה בהצלחה!</Text>
                                <MaterialCommunityIcons name="check-decagram" size={65} color="green" />
                                <Button mode='contained' style={[styles.nppostButton, { marginTop: '50%' }]} onPress={() => { setModalVisible(!modalVisible); setRequestsSent(true); setOverlayVisible(false); }}>
                                    סגירה
                                </Button>
                            </View>
                            :
                            <View>
                                <IconButton
                                    icon="close"
                                    style={[styles.modalCloseBtn]}
                                    size={20}
                                    onPress={() => setModalVisible(!modalVisible)}
                                />
                                <View style={[styles.modalView, styles.modalElements]}>
                                    <Text style={[styles.smallTitle, styles.text_underline, { marginLeft: '8%', }]}>שליחת בקשה למפרסם הפריט:</Text>
                                    <Text>שם הפריט: <Text style={[styles.smallTitle]}>{post.itemName}</Text></Text>
                                    <Text>מיקום הפריט: <Text>{addressWithoutNumbers(post.address.simplifiedAddress || post.address.city)}</Text></Text>
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

                                    <Button mode='contained' style={[styles.nppostButton, styles.btn_sendRequest]} onPress={() => handlePress()}>
                                        שליחת בקשה
                                    </Button>
                                </View>
                            </View>}
                </Modal>

            </Portal>
            <Button mode='contained' style={[styles.nppostButton, styles.btn_sendRequest,]} onPress={() => { setModalVisible(true); setOverlayVisible(true) }}>
                שליחת בקשה
            </Button>
        </View>


    )

}
