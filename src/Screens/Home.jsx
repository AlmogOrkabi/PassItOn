import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { styles } from '../Styles';
export default function Home() {
    return (
        <SafeAreaView style={[styles.main_container, styles.container]}>
            <View>
                <Text>ברוך הבא</Text>
                <Text></Text>
                <Text>נחוץ בכלל??</Text>
                <Text></Text>
                <Text></Text>
            </View>
        </SafeAreaView>
    )
}