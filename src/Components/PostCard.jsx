import { View, Text, SafeAreaView } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { styles } from '../Styles';
import { AppContext } from '../Contexts/AppContext';
import { Card } from 'react-native-paper';

export default function PostCard() {
    return (
        <View style={[styles.card]} >
            <Card >
                <Card.Title title="שם פוסט" subtitle='קטגוריה?' />

                <Card.Content style={[styles.cardContent]} >

                    <Text>תיאור הפוסט?</Text>
                    <Card.Cover source={{ uri: 'https://res.cloudinary.com/dflztb42v/image/upload/v1690799933/t5tvuz2gsv1oobkbiflb.jpg' }} style={[styles.cardCover]} />
                </Card.Content>

            </Card>
        </View>
    )
}