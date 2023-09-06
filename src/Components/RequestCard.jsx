import React, { useContext, useState } from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import { styles } from '../Styles';
import { AppContext } from '../Contexts/AppContext';
import { View } from 'react-native';
export default function RequestCard({ request }) {

    const { loggedUser, userToken } = useContext(AppContext);
    const [isOwner, setIsOwner] = useState(loggedUser._id === request.sender_id);

    return (
        <Card style={styles.card}>
            {/* <Card.Cover source={{ uri: post.photos[0].url }} /> */}
            <Card.Content>
                <Title>שם הפוסט יהיה פה</Title>
                <Paragraph>נשלח מ: {request.user.username}</Paragraph>
                <Paragraph>סטטוס: {request.status}</Paragraph>
                <Paragraph>תאריך פתיחה: {request.creationDate}</Paragraph>
                {!isOwner ? <View><Paragraph>מחכה לתגובתך</Paragraph></View> : <View>
                    {request.status === 'אושר' ? <Paragraph>פרטי התקשרות: {request.user.phoneNumber}</Paragraph> : <Paragraph>הבקשה עדיין לא אושרה</Paragraph>}</View>}
            </Card.Content>
        </Card>
    )
}