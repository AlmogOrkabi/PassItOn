import React, { useContext, useState } from 'react';
import { Card, Title, Paragraph, IconButton } from 'react-native-paper';
import { styles } from '../Styles';
import { AppContext } from '../Contexts/AppContext';
import { View, Text } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function RequestCard({ request }) {

    const { loggedUser, userToken } = useContext(AppContext);
    const [isSender, setIsSender] = useState(loggedUser._id === request.sender_id);

    return (
        <Card style={styles.card}>
            {/* <Card.Cover source={{ uri: post.photos[0].url }} /> */}
            <Card.Content>
                <Title>{request.post.itemName}</Title>
                <Paragraph>נשלח מ: {request.sender.username}</Paragraph>
                <Paragraph>סטטוס: {request.status}</Paragraph>
                <Paragraph>תאריך פתיחה: {request.creationDate}</Paragraph>
                {!isSender ? <View>

                    <View style={[styles.flexRow, styles.marginVertical]}>
                        <MaterialCommunityIcons name="clock-outline" size={24} color="black" />
                        <Paragraph>מחכה לתגובתך</Paragraph>
                    </View>


                    {/* 

                    <View style={[styles.containerCenter,]}>
                        <Ionicons name="checkmark-circle" size={24} color="green" />
                        <Text>אשר בקשה</Text>
                    </View> */}
                </View>
                    : <View>
                        {request.status === 'אושר' ? <Paragraph>פרטי התקשרות: {request.recipient.phoneNumber}</Paragraph> : <Paragraph>הבקשה עדיין לא אושרה</Paragraph>}</View>}
                <MaterialCommunityIcons name="reply" size={24} color="black" />
            </Card.Content>
        </Card>
    )
}