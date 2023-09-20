import { View, Text, SafeAreaView, ActivityIndicator, TouchableOpacity, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { styles, touchableOpacity } from '../Styles';
import Logo from '../Components/Logo';
import { AppContext } from '../Contexts/AppContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button, AnimatedFAB } from 'react-native-paper';
import { editRequest, updatePostStatus, getReports } from '../api/index';
import Overlay from '../Components/Overlay';
import RequestResponseForm from '../Components/RequestResponseForm';
import { validateRequestData } from '../utils/validations';





export default function RequestPage({ route, navigation }) {

    const { request, index, options, handleRequestUpdate } = route.params;

    const { loggedUser, userToken, serverError, setServerError } = useContext(AppContext);
    const [isSender, setIsSender] = useState(loggedUser._id === request.sender_id);

    const [modalVisible, setModalVisible] = useState(false);

    const [loading, setLoading] = useState(false);

    const [response, setResponse] = useState('');

    const [editResponse, setEditResponse] = useState(false);

    const [postStaus, setPostStaus] = useState(request.post.status);

    const [isReported, setIsReported] = useState(false);

    async function handleEditRequest(data, action) {
        try {

            //-checks if the data is valid
            let validationRes = validateRequestData(data);
            if (!validationRes.valid) {
                Alert.alert(validationRes.msg);
                return;
            }
            let res;
            switch (action) {
                case 'cancel':
                    res = await editRequest(request._id, userToken, data);
                    request.status = 'בוטל'
                    console.log(res);
                    break;
                case 'accept':
                    res = await editRequest(request._id, userToken, data);
                    request.status = 'אושר'
                    console.log(res);
                    break;
                case 'decline':
                    res = await editRequest(request._id, userToken, data);
                    request.status = 'נדחה'
                    console.log(res);
                    break;
                case 'closed':
                    res = await editRequest(request._id, userToken, data);
                    request.status = 'נסגר'
                    console.log(res);
                    break;
                default:
                    console.log("action:" + action)
                    break;
            }
            //setEditResponse(false);
            return res;
        } catch (error) {
            console.log("error here: ", error);
            setServerError({ ...error })
        }

    }


    function handleResponsePress(response) {
        setResponse(() => response);
        setModalVisible(() => true);
    }


    async function handleUpdatePostStatus(status) {
        try {
            let res = await updatePostStatus(request.post._id, status, userToken, loggedUser._id);
            if (res.acknowledged) {
                //request.post.status = status;
                setPostStaus(status);
                if (status === 'נמסר') {
                    request.post.recipient_id = loggedUser._id;
                }
            }
            else {
                Alert.alert('שגיאה בעת שינוי הסטטוס');
            }
            console.log(res);
        } catch (error) {
            console.log("ERR HERE", error);
            setServerError({ ...error });

        }
    }

    // const [isExtended, setIsExtended] = useState(false);

    useEffect(() => {
        if (editResponse == true) {
            handleRequestUpdate(request, index, options);
        }

        setEditResponse(false);
    }, [request.status])

    useEffect(() => {
        request.post.status = postStaus;
    }, [postStaus])


    useEffect(() => {
        checkReported()
    }, []);



    async function checkReported() {
        try {
            let report = await getReports({ owner_id: loggedUser._id, postReported_id: request.post._id, full: 'false' }, userToken)
            if (report != 404)
                setIsReported(true);
            console.log(isReported)
        } catch (error) {
            console.log("error request page: ", error.status);
            setServerError({ ...error })
        }
    }

    return (

        <SafeAreaView style={[styles.main_container2, styles.paddingVertical]}>
            <Logo width={200} height={80} />
            {modalVisible && <Overlay onClose={() => setModalVisible(false)} />}
            {/* <AnimatedFAB
                icon={'alert-circle-outline'}
                label={'דיווח על הפריט/משתמש'}
                extended={isExtended}
                onPress={() => navigation.navigate('ReportForm')}
                onLongPress={() => setIsExtended(!isExtended)} // Toggle the extended state on long press
                animateFrom={'left'}
                iconMode={'absolute'}
                style={[styles.style_FAB_Edit_Post]}
                disabled={request.post.status === 'בבדיקת מנהל' || request.post.status === 'סגור' || request.post.status === 'מבוטל' || isReported}
            /> */}
            <ScrollView style={[]} >
                <View>

                    <Text style={[styles.mediumTitle, { alignSelf: 'center' }]}>בקשה לאיסוף פריט</Text>
                    <View style={[styles.sub_container2]}>
                        <Text style={[styles.mediumTitle]}>פרטים:</Text>
                        <Text style={[styles.mediumTextBold]}>שם הפריט: {request.post.itemName}</Text>
                        <Text style={[styles.mediumTextBold]}>פורסם על ידי: {request.recipient.username}</Text>
                        <Text style={[styles.mediumTextBold]}>נשלח בתאריך: {request.creationDate}</Text>
                        <Text style={[styles.mediumTextBold]}>עודכן לאחרונה בתאריך: {request.updateDate}</Text>
                        <Text style={[styles.mediumTextBold]}>סטטוס פריט: {postStaus}</Text>
                        <Text style={[styles.mediumTextBold]}>מלל הבקשה (במידה ויש):</Text>
                        <Text style={[styles.mediumText]}> {request.requestMessage}</Text>

                        {isSender ?
                            <View>
                                {request.status === 'נשלח' ?
                                    <View style={[styles.flexRow, styles.marginVertical]}>
                                        <MaterialCommunityIcons name="clock-outline" size={30} color="black" />
                                        <Text style={[styles.mediumTextBold]}>  הבקשה ממתינה לתגובה</Text>
                                    </View> :
                                    request.status === 'אושר' ? <View style={[styles.sub_container2]}>
                                        <View style={[styles.flexRow, styles.marginVertical]}>
                                            <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={30} color="green" />
                                            <Text style={[styles.mediumTextBold, styles.textGreen]}> הבקשה אושרה!</Text>
                                        </View>
                                        <View>
                                            <View style={[styles.flexRow, styles.marginVertical, styles.sideComment]}>
                                                <MaterialCommunityIcons name="progress-question" size={20} color="black" />
                                                <Text>מפרסם הפריט הסכים לחשוף בפניך את פרטי ההתקשרות איתו, להמשך התהליך נא צרו קשר עם מפרסם הפריט</Text>
                                            </View>
                                        </View>
                                        <View style={[styles.sub_container2]}>
                                            <Text style={[styles.text_underline, styles.mediumTextBold]}>פרטי מפרסם הפריט:</Text>
                                            <Text style={[]}>שם מלא: {request.recipient.firstName} {request.recipient.lastName}</Text>
                                            <Text style={[]}>טלפון נייד: {request.recipient.phoneNumber}</Text>
                                        </View>

                                        {postStaus === 'בתהליך מסירה' ?
                                            <View>
                                                <TouchableOpacity activeOpacity={touchableOpacity} style={[styles.marginHorizontal, styles.actionView]} onPress={() => {
                                                    Alert.alert("אישור קבלת פריט", "אישור קבלת הפריט הינו סופי, האם הפריט נמצא ברשותך?", [
                                                        { text: 'לא', onPress: () => { console.log("ביטול") } },
                                                        { text: 'כן', onPress: () => { handleUpdatePostStatus('נמסר') } }
                                                    ])
                                                }}>
                                                    <Text style={[styles.textGreen, { color: 'white' }]}>לאישור קבלת הפריט לחצו כאן</Text>
                                                </TouchableOpacity>
                                            </View>
                                            : <View>
                                                <Text style={[styles.textGreen, styles.mediumTextBold, styles.text_underline]}>הפריט נמסר בהצלחה</Text>
                                            </View>}
                                    </View>
                                        : request.status === 'נדחה' ? <View style={[styles.flexRow, styles.marginVertical]}>
                                            <MaterialCommunityIcons name="close-circle-outline" size={30} color="red" />
                                            <Text style={[styles.mediumTextBold, styles.textRed]}> בקשתך נדחתה</Text>
                                        </View>
                                            :
                                            request.status === 'בוטל' ? <View style={[styles.flexRow, styles.marginVertical]}>
                                                <MaterialCommunityIcons name="note-remove-outline" size={30} color="black" />
                                                <Text style={[styles.mediumTextBold]}>הבקשה בוטלה</Text>
                                            </View> : null

                                }
                                {

                                    request.status == 'אושר' && request.responseMessage || request.status == 'נדחה' && request.responseMessage ? <View>
                                        <Text style={[styles.text_underline, styles.mediumTextBold]}>תגובת מפרסם הפריט:</Text>
                                        <Text>{request.responseMessage}</Text>
                                    </View>
                                        : null}

                                <View style={[styles.flexRowCenter, { gap: 20 }]}>
                                    <Button mode="contained" disabled={request.status !== 'נשלח' && request.status !== 'נסגר'} onPress={() => { handleEditRequest({ status: 'בוטל' }, 'cancel') }} style={[styles.nppostButton,]}>ביטול הבקשה
                                    </Button>
                                    <Button mode="contained" onPress={() => navigation.navigate('PostPage', { post: request.post })} style={[styles.nppostButton,]}>לצפיה בדף הפריט
                                    </Button>
                                </View>
                            </View>
                            :
                            <View style={[styles.marginVertical]}>
                                <Text style={[styles.mediumTitle]}>שולח הבקשה:</Text>
                                <Text style={[styles.mediumTextBold]}>שם המשתמש: {request.sender.username}</Text>
                                <Text style={[styles.mediumTextBold]}>שם מלא: {request.sender.firstName} {request.sender.lastName}</Text>
                                <Text style={[styles.mediumTextBold]}>מלל הבקשה (במידה ויש):</Text>
                                <Text style={[styles.mediumTextBold]}> {request.requestMessage}</Text>
                                <Text style={[styles.mediumTextBold]}>פרטי התקשרות:</Text>
                                <Text style={[styles.mediumTextBold]}>טלפון נייד: {request.sender.phoneNumber}</Text>

                                {request.status === 'נשלח' || editResponse ?

                                    <View>
                                        {postStaus === 'זמין' ?
                                            <View>
                                                <View style={[styles.flexRow, styles.sub_container]}>
                                                    <MaterialCommunityIcons name="clock-outline" size={30} color="black" />
                                                    <Text style={[styles.mediumTextBold]}>  הבקשה ממתינה לתגובתך</Text>
                                                </View>
                                                <View style={[styles.flexRowCenter,]}>

                                                    <TouchableOpacity activeOpacity={touchableOpacity} style={[styles.containerCenter, styles.marginHorizontal]} onPress={() => handleResponsePress('accept')}>
                                                        <MaterialCommunityIcons name="check-circle" size={30} color="green" />
                                                        <Text style={[styles.textGreen]}>אשר את הבקשה</Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity activeOpacity={touchableOpacity} style={[styles.containerCenter, styles.marginHorizontal]} onPress={() => handleResponsePress('decline')}>
                                                        <MaterialCommunityIcons name="close-circle" size={30} color="red" />
                                                        <Text style={[styles.textRed]}>דחה את הבקשה</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <Text style={[styles.text_underline, styles.smallText]}>*אישור הבקשה יחשוף בפני השולח את פרטי ההתקשרות איתך</Text>
                                                <RequestResponseForm request={request} modalVisible={modalVisible} setModalVisible={setModalVisible} response={response} handleEditRequest={handleEditRequest} loading={loading} setLoading={setLoading} />
                                            </View> :
                                            <View style={[styles.flexRow, styles.sub_container]}>
                                                <MaterialCommunityIcons name="alert-circle-outline" size={30} color="black" />
                                                <Text>הפריט כבר לא זמין</Text>
                                            </View>
                                        }
                                    </View> : request.status === 'בוטל' ?
                                        <View style={[styles.flexRow, styles.marginVertical]}>
                                            <MaterialCommunityIcons name="note-remove-outline" size={30} color="black" />
                                            <Text style={[styles.mediumTextBold]}>הבקשה בוטלה</Text>
                                        </View> :

                                        request.status === 'אושר' ?
                                            <View style={[styles.flexRow, styles.marginVertical]}>
                                                <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={30} color="green" />
                                                <Text style={[styles.mediumTextBold, styles.textGreen]}> הבקשה אושרה</Text>
                                                <View>
                                                    {postStaus === 'זמין' ? <TouchableOpacity activeOpacity={touchableOpacity} style={[styles.marginHorizontal, styles.actionView]} onPress={() => {
                                                        Alert.alert("רק מוודאים", "לשנות את סטטוס הפוסט ל -  'נמצא בתהליך מסירה'?", [
                                                            { text: 'ביטול', onPress: () => { console.log("ביטול") } },
                                                            { text: 'אישור', onPress: () => { handleUpdatePostStatus('בתהליך מסירה') } }
                                                        ])
                                                    }}>
                                                        <Text style={[styles.textGreen, { color: 'white' }]}>לשינוי סטטוס הפוסט לחץ כאן</Text>
                                                    </TouchableOpacity> : postStaus === 'נמסר' ? <View style={[styles.marginHorizontal, styles.sideComment]}>
                                                        <Text style={[styles.marginHorizontal, styles.textGreen, styles.mediumTextBold]}>הפריט נמסר בהצלחה</Text>
                                                    </View> : postStaus === 'בתהליך מסירה' ? <View style={[styles.marginHorizontal]}><Text>סטטוס הפוסט שונה ל 'בתהליך מסירה'</Text></View> : null}
                                                </View>
                                            </View>
                                            : request.status === 'נדחה' ?
                                                <View style={[styles.flexRow, styles.marginVertical]}>
                                                    <MaterialCommunityIcons name="close-circle-outline" size={30} color="red" />
                                                    <Text style={[styles.mediumTextBold, styles.textRed]}> הבקשה נדחתה</Text>
                                                </View>
                                                : <View style={[styles.flexRow, styles.sub_container]}>
                                                    <MaterialCommunityIcons name="alert-circle-outline" size={30} color="black" />
                                                    <Text>הפריט כבר לא זמין</Text>
                                                </View>}
                                {request.status !== 'נשלח' && request.status !== 'בוטל' && postStaus === 'זמין' ?
                                    <View style={[]}>
                                        <Button mode='contained' style={[styles.nppostButton, { width: 150 }]} onPress={() => setEditResponse(!editResponse)}>{editResponse ? 'ביטול' : 'עריכת תגובה'}</Button>
                                    </View> : null}

                            </View>}
                        <Button mode='contained' style={[styles.smallBtn, { alignSelf: 'center' }]} onPress={() => navigation.navigate('ReportForm', { post: request.post })} disabled={isReported}>דיווח</Button>
                    </View>
                </View>
            </ScrollView >
        </SafeAreaView>
    )
}