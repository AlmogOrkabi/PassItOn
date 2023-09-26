import { View, Text, ActivityIndicator, SafeAreaView } from 'react-native'
import React from 'react'
import { styles } from '../Styles'

export default function Loading() {
    return (
        <SafeAreaView style={[styles.main_container]}>
            <ActivityIndicator />
        </SafeAreaView>
    )
}