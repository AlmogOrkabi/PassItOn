import React, { useContext } from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import { styles } from '../Styles';
import { AppContext } from '../Contexts/AppContext';
export default function RequestCard({ request }) {

    const { loggedUser, userToken } = useContext(AppContext);

    return (
        <Card style={styles.card}>
            {/* <Card.Cover source={{ uri: post.photos[0].url }} /> */}
            <Card.Content>
                <Title>שם הפוסט יהיה פה</Title>
                <Paragraph>נשלח אל: {request.user.username}</Paragraph>
                <Paragraph>סטטוס: {request.status}</Paragraph>
                <Paragraph>תאריך פתיחה: {request.creationDate}</Paragraph>
                {request.status === 'אושר' ? <Paragraph>פרטי התקשרות: {request.user.phoneNumber}</Paragraph> : <Paragraph>הבקשה עדיין לא אושרה</Paragraph>}
            </Card.Content>
        </Card>
    )
}