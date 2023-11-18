import React, { useContext, useState } from 'react';
import { Card, Title, Paragraph, IconButton } from 'react-native-paper';
import { styles } from '../Styles';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ReportCard({ report }) {
    return (
        <View>
            <Card style={styles.card}>
                <Card.Content>
                    <Title style={[styles.mediumTitle, styles.text_underline]}>דיווח על {report.postReported_id ? `הפוסט: ${report.post.itemName}` : `המשתמש: ${report.userReported.userName}`}</Title>
                    <Paragraph>סיבת הדיווח: {report.reportType}</Paragraph>
                    <Paragraph>סטטוס: {report.status}</Paragraph>
                    <Paragraph>תאריך יצירה: {new Date(report.creationDate).toLocaleDateString()}</Paragraph>
                    <MaterialCommunityIcons name="reply" size={24} color="black" />
                </Card.Content>
            </Card>
        </View>
    )
}