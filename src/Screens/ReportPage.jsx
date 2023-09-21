import { View, Text, SafeAreaView } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { styles, touchableOpacity } from '../Styles'
import Logo from '../Components/Logo'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ReportPage({ route }) {
    const { report } = route.params;
    return (
        <SafeAreaView style={[styles.main_container2]}>
            {/* <Logo width={200} height={80} /> */}

            <View style={[styles.sub_container]}>
                <Text style={[styles.mediumTitle, styles.text_underline]}>דיווח על {report.postReported_id ? `הפוסט: ${report.post.itemName}` : `המשתמש: ${report.userReported.userName}`}</Text>
                <View style={[styles.sub_container3]}>
                    <Text>סיבת הדיווח: {report.reportType}</Text>
                    <Text>תאריך יצירה: {report.creationDate}</Text>
                    <Text>סטטוס: {report.status}</Text>
                    {report.status !== 'נסגר' ?
                        <View style={[styles.sideComment, styles.flexRow,]}>
                            <MaterialCommunityIcons name="progress-question" size={20} color="black" />
                            <Text >מנהל יבדוק את הדיווח בהקדם האפשרי וינקוט בצעדים הנחוצים לפי חומרת המקרה. ברגע שתתקבל החלטה בנושא, היא תעודכן כאן</Text>
                        </View>
                        :
                        <View>
                            <Text>תאריך עדכון: {report.updateDate}</Text>
                            <Text>החלטת המנהל: {report.verdict}</Text>
                        </View>}

                </View>
            </View>
        </SafeAreaView>
    )
}