import { View, Text, SafeAreaView, Image, Button } from 'react-native'
import React from 'react'

export default function Start() {
    return (
        <SafeAreaView>
            <View>
                <Text>ברוכים הבאים</Text>
                <Button title='התחברות' />
                <Button title='הרשמה' />
            </View>
        </SafeAreaView>
    )
}