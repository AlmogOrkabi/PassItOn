import React, { useContext, useState } from 'react';
import { Card, Title, Paragraph, IconButton } from 'react-native-paper';
import { styles } from '../Styles';
import { AppContext } from '../Contexts/AppContext';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function RequestCard({ request }) {

    const { loggedUser, userToken } = useContext(AppContext);
    const [isSender, setIsSender] = useState(loggedUser._id === request.sender_id);

    return (
        <Card style={[styles.card,]}>
            <Card.Content>
                <Title>{request.post.itemName}</Title>
                <Paragraph>נשלח מ: {request.sender.username}</Paragraph>
                <Paragraph>תאריך פתיחה: {new Date(request.creationDate).toLocaleDateString()}</Paragraph>
                {!isSender ? <View>
                    {request.status === 'אושר' ?
                        <View>
                            <View style={[styles.flexRow, styles.marginVertical]}>
                                <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={30} color="green" />
                                <Text style={[styles.mediumTextBold, styles.textGreen]}> הבקשה אושרה</Text>
                            </View>
                        </View>
                        : request.status === 'נדחה' ?
                            <View style={[styles.flexRow, styles.marginVertical]}>
                                <MaterialCommunityIcons name="close-circle-outline" size={30} color="red" />
                                <Text style={[styles.mediumTextBold, styles.textRed]}>הבקשה נדחתה</Text>
                            </View>
                            :
                            request.status === 'בוטל' ? <View style={[styles.flexRow, styles.marginVertical]}>
                                <MaterialCommunityIcons name="note-remove-outline" size={30} color="black" />
                                <Text style={[styles.mediumTextBold]}> הבקשה בוטלה על ידי השולח</Text>
                            </View>
                                :
                                <View>
                                    {
                                        request.post.status === 'זמין' ?
                                            <View style={[styles.flexRow, styles.marginVertical]}>
                                                <MaterialCommunityIcons name="clock-outline" size={30} color="black" />
                                                <Text style={[styles.mediumTextBold]}>  הבקשה ממתינה לתגובתך</Text>
                                            </View> :
                                            <View style={[styles.flexRow, styles.marginVertical]}>
                                                <MaterialCommunityIcons name="alert-circle-outline" size={30} color="black" />
                                                <Text>הפריט כבר לא זמין</Text>
                                            </View>}
                                </View>}


                    {/* 

                    <View style={[styles.containerCenter,]}>
                        <Ionicons name="checkmark-circle" size={24} color="green" />
                        <Text>אשר בקשה</Text>
                    </View> */}


                </View>

                    :

                    <View>
                        {request.status === 'אושר' ?
                            <View>
                                <View style={[styles.flexRow, styles.marginVertical]}>
                                    <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={30} color="green" />
                                    <Text style={[styles.mediumTextBold, styles.textGreen]}> הבקשה אושרה!</Text>
                                </View>
                                <Text style={[styles.smallText, styles.text_underline]}>*פרטי התקשרות עם המפרסם נמצאים בתוך הבקשה</Text>
                            </View>
                            : request.status === 'נדחה' ?
                                <View style={[styles.flexRow, styles.marginVertical]}>
                                    <MaterialCommunityIcons name="close-circle-outline" size={30} color="red" />
                                    <Text style={[styles.mediumTextBold, styles.textRed]}> בקשתך נדחתה/הפריט אינו זמין יותר</Text>
                                </View>
                                :
                                request.status === 'בוטל' ? <View style={[styles.flexRow, styles.marginVertical]}>
                                    <MaterialCommunityIcons name="note-remove-outline" size={30} color="black" />
                                    <Text style={[styles.mediumTextBold]}>הבקשה בוטלה</Text>
                                </View>
                                    :
                                    <View>
                                        {request.post.status === 'זמין' ? <View style={[styles.flexRow, styles.marginVertical]}>
                                            <MaterialCommunityIcons name="clock-outline" size={30} color="black" />
                                            <Text style={[styles.mediumTextBold]}>  הבקשה ממתינה לתגובה</Text>
                                        </View>
                                            :
                                            <View style={[styles.flexRow, styles.marginVertical]}>
                                                <MaterialCommunityIcons name="alert-circle-outline" size={30} color="black" />
                                                <Text>הפריט כבר לא זמין</Text>
                                            </View>}
                                    </View>}
                    </View>}
                <MaterialCommunityIcons name="reply" size={24} color="black" />
            </Card.Content>
        </Card>
    )
}