import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { styles } from '../Styles'
import Logo from '../Components/Logo'

export default function MyReports() {
    return (
        <SafeAreaView style={[styles.main_container2]}>
            <Logo width={200} height={80} />
            <View>
                <Text style={[styles.mediumTitle]}>דיווחים שנשלחו:</Text>
            </View>

        </SafeAreaView>
    )
}