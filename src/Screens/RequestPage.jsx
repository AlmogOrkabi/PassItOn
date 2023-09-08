import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { styles } from '../Styles';
import Logo from '../Components/Logo';
import { AppContext } from '../Contexts/AppContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';



export default function RequestPage({ route }) {

    const { request } = route.params;

    const { loggedUser, userToken } = useContext(AppContext);
    const [isSender, setIsSender] = useState(loggedUser._id === request.sender_id);



    // {/* {request.status == 'אושר' && request.responseMessage || request.status == 'נדחה' && request.responseMessage ? <View>
    //                                 <Text>תגובת מפרסם הפריט:</Text>
    //                                 <Text>{request.responseMessage}</Text>
    //                             </View> 
    //                             : null} */}

    useEffect(() => { console.log(request) }, [])
    return (

        <SafeAreaView style={[styles.main_container2]}>
            <Logo width={200} height={80} />
            <Text style={[styles.title]}>בקשה לאיסוף פריט</Text>
            <View style={[styles.sub_container]}>
                <Text style={[styles.mediumTitle]}>פרטים:</Text>
                <Text style={[styles.mediumTextBold]}>שם הפריט: {request.post.itemName}</Text>
                <Text style={[styles.mediumTextBold]}>פורסם על ידי: {request.recipient.username}</Text>
                <Text style={[styles.mediumTextBold]}>נשלח בתאריך: {request.creationDate}</Text>
                <Text style={[styles.mediumTextBold]}>עודכן לאחרונה בתאריך: {request.updateDate}</Text>
                <Text style={[styles.mediumTextBold]}>סטטוס פריט: {request.post.status}</Text>

                {isSender ?
                    <View>
                        {request.status === 'נשלח' ?
                            <View style={[styles.flexRow, styles.marginVertical]}>
                                <MaterialCommunityIcons name="clock-outline" size={24} color="black" />
                                <Text style={[styles.mediumTextBold]}>  הבקשה ממתינה לתגובה</Text>
                            </View> :
                            request.status === 'אושר' ? <View style={[styles.flexRow, styles.marginVertical]}>
                                <MaterialCommunityIcons name="clock-outline" size={24} color="black" />
                                <Text style={[styles.mediumTextBold]}> הבקשה אושרה!</Text>
                                <Text>פרטי מפרסם הפריט:</Text>
                                <Text style={[]}>שם מלא: {request.recipient.firstName} {request.sender.lastName}</Text>
                                <Text style={[]}>טלפון נייד: {request.recipient.phoneNumber}</Text>
                            </View>
                                : request.status === 'נדחה' ? <View style={[styles.flexRow, styles.marginVertical]}>
                                    <MaterialCommunityIcons name="clock-outline" size={24} color="black" />
                                    <Text style={[styles.mediumTextBold]}> בקשתך נדחתה/הפריט אינו זמין יותר</Text>
                                </View>
                                    : null}
                        <View style={[styles.flexRowCenter, { gap: 20 }]}>
                            <Button mode="contained" onPress={() => { console.log("pressed") }} style={[styles.nppostButton,]}>ביטול הבקשה
                            </Button>
                            <Button mode="contained" onPress={() => { console.log("pressed") }} style={[styles.nppostButton,]}>לצפיה בדף הפריט
                            </Button>
                        </View>
                    </View>
                    :
                    <View>
                        <Text style={[styles.mediumTitle]}>שולח הבקשה:</Text>
                        <Text style={[styles.mediumTextBold]}>שם המשתמש: {request.sender.username}</Text>
                        <Text style={[styles.mediumTextBold]}>שם מלא: {request.sender.firstName} {request.sender.lastName}</Text>
                        <Text style={[styles.mediumTextBold]}>מלל הבקשה (במידה ויש):</Text>
                        <Text style={[styles.mediumTextBold]}> {request.requestMessage}</Text>
                        <Text style={[styles.mediumTextBold]}>פרטי התקשרות:</Text>
                        <Text style={[styles.mediumTextBold]}>טלפון נייד: {request.sender.phoneNumber}</Text>

                        {request.status === 'נשלח' ?
                            <View>

                            </View> : null}

                    </View>}
            </View>
        </SafeAreaView>
    )
}