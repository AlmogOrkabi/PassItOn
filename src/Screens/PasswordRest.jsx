import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '../Styles'
import { TextInput, Button } from 'react-native-paper';

export default function PasswordRest() {
    return (
        <SafeAreaView style={[styles.main_container, styles.container]}>
            <View>
                <Text style={[styles.form_small_heading]}>איפוס סיסמה</Text>
                <TextInput style={[styles.input]} label="כתובת דואר אלקטרוני" value={null} />
                <Button style={styles.btn} mode="contained" onPress={() => { }}  >איפוס סיסמה</Button>
                <TouchableOpacity><Text>לשליחה מחדש</Text></TouchableOpacity>
                {/* needs to be available to click on only after 1.5 minutes */}
            </View>
        </SafeAreaView>
    )
}