import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { styles } from '../Styles'

export default function Profile() {
    return (
        <SafeAreaView style={[styles.main_container, styles.container]}>
            <View>
                <Text>דף פרופיל</Text>
                <Text></Text>
                <Text>העלאת מוצר</Text>
                <Text>פוסטים קיימים</Text>
                <Text>היסטוריה</Text>
                <Text>עריכת פרטים</Text>
                <Text>??הגדרות??</Text>
            </View>
        </SafeAreaView>
    )
}