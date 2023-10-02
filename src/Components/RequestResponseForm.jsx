import React, { useEffect, useState, useContext } from 'react'
import { View, Text, Alert, TextInput, ActivityIndicator } from 'react-native';
import { Button, IconButton, Modal, Portal, PaperProvider, Checkbox } from 'react-native-paper';
import { styles } from '../Styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppContext } from '../Contexts/AppContext';



export default function RequestResponseForm({ request, modalVisible, setModalVisible, response, handleEditRequest }) {

    const [loading, setLoading] = useState(false);

    const [responseText, setResponseText] = useState('');

    const [checked, setChecked] = useState(false);

    const [notAgreed, setNotAgreed] = useState(false);

    const [errMsg, setErrMsg] = useState(null);

    const [success, setSuccess] = useState(false);

    const { loggedUser, userToken, serverError, setServerError, setOverlayVisible } = useContext(AppContext)


    useEffect(() => {
        notAgreed && checked ? setNotAgreed(false) : null;
    }, [checked]);

    async function handlePress() {
        try {
            setLoading(true);

            if (response == 'accept') {
                if (!checked) {
                    setNotAgreed(true);
                    setLoading(false);
                    return;
                }
            }
            const data = {
                status: response == 'accept' ? 'אושר' : response == 'decline' ? 'נדחה' : 'not valid',
                responseMessage: responseText !== '' ? responseText : null
            }




            let res = await handleEditRequest(data, response);
            if (res.acknowledged) {
                setSuccess(() => true);
            }
            setLoading(false);
        } catch (error) {
            console.log("error here =>", error);
            setServerError({ ...error });
        }
        // finally {
        //     setLoading(false);
        //     setSuccess(() => success)
        // }
    }

    return (

        <Portal>
            <Modal visible={modalVisible} onDismiss={() => { setModalVisible(false); setOverlayVisible(false) }} contentContainerStyle={[]} theme={{ colors: { backdrop: '#00000000' } }}>

                {loading ?
                    <View style={[styles.modalView,]}>
                        <ActivityIndicator />
                    </View>
                    :
                    success ?
                        <View style={[styles.modalView, styles.containerCenter,]}>
                            <Text style={[styles.titleBold, { color: 'green' }]}>תגובתך נשלחה בהצלחה!</Text>
                            <MaterialCommunityIcons name="check-decagram" size={65} color="green" />
                            <Button mode='contained' style={[styles.nppostButton, { marginTop: '50%' }]} onPress={() => { setModalVisible(!modalVisible); setOverlayVisible(false) }}>
                                סגירה
                            </Button>
                        </View>
                        :
                        <View>
                            <IconButton
                                icon="close"
                                style={[{ position: 'relative', bottom: 600, left: 35, zIndex: 1, }]}
                                size={20}
                                onPress={() => setModalVisible(!modalVisible)}
                            />
                            <View style={[styles.modalView, styles.modalElements]}>
                                <Text style={[styles.smallTitle, styles.text_underline, { marginLeft: '8%', }]}>שליחת תגובה לבקשה:</Text>
                                <Text>שם הפריט: <Text style={[styles.smallTitle]}>{request.post.itemName}</Text></Text>
                                <Text>שם המבקש: <Text style={[styles.smallTitle]}>{request.sender.firstName} {request.sender.lastName}</Text></Text>
                                <View >
                                    <Text style={[styles.text_underline, { marginLeft: '8%', fontSize: 12 }]}>מלל התגובה (אינו חובה):<Text style={[responseText.length > 300 ? styles.errMsg : null]}>עד 300 תווים</Text></Text>
                                    <TextInput style={[styles.native_input, responseText.length > 300 ? styles.borderRed : null]}
                                        placeholder="מלל התגובה (אינו חובה) "
                                        onChangeText={setResponseText}
                                        value={responseText}
                                        multiline={true}
                                        maxLength={300} />
                                    {response === 'accept' ? <View>
                                        <Text style={[styles.text_underline, styles.smallText, { marginLeft: '8%', }]}>*בעת אישור הבקשה פרטי ההתקשרות שלך יהיו זמינים לשולח הבקשה</Text>
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
                                    </View> : null}
                                </View>
                                {errMsg ? <Text style={[styles.errMsg]}>{errMsg}</Text> : null}

                                <Button mode='contained' style={[styles.nppostButton]} onPress={() => { setErrMsg(() => null); handlePress() }}>
                                    שליחת תגובה
                                </Button>
                            </View>
                        </View>}





            </Modal>
        </Portal>

    )
}