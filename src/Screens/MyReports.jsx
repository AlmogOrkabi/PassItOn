import { View, Text, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { styles, touchableOpacity } from '../Styles'
import { AppContext } from '../Contexts/AppContext';
import Logo from '../Components/Logo'
import { getReports } from '../api/index'
import ReportCard from '../Components/ReportCard'

export default function MyReports({ navigation }) {

    const { loggedUser, userToken } = useContext(AppContext)

    const [reportsSubmitted, setReportsSubmitted] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadReports();
    }, []);


    async function loadReports() {
        try {
            setLoading(true);
            let reports = await getReports({ owner_id: loggedUser._id, full: 'true' }, userToken);
            if (reports == 404) {
                console.log(404);
                setReportsSubmitted(404);
            } else {
                setReportsSubmitted(reports);
            }
            console.log("reports ===>>>" + reportsSubmitted)
        } catch (error) {
            console.log("ERROR REPORTS", error)
        } finally {
            setLoading(false);
        }
    }

    const renderReports = (report) => {
        if (!report) return;


        return (
            <TouchableOpacity activeOpacity={touchableOpacity} onPress={() => navigation.navigate('common', { screen: 'ReportPage', params: { report: report.item } })}><ReportCard report={report.item} /></TouchableOpacity>
        )
    }



    return (
        <SafeAreaView style={[styles.main_container2]}>
            <Logo width={200} height={80} />
            {
                loading ? <View style={[styles.containerCenter]}>
                    <ActivityIndicator />
                </View>
                    :
                    <View>
                        <Text style={[styles.mediumTitle]}>דיווחים שנשלחו:</Text>


                        {
                            reportsSubmitted === 404 ? <Text>לא קיימים דיווחים במערכת</Text> :
                                <View>
                                    <FlatList
                                        data={reportsSubmitted}
                                        renderItem={renderReports}
                                        keyExtractor={item => item._id}
                                        style={[{ marginVertical: '3%', }, touchableOpacity]}
                                    />
                                </View>
                        }
                    </View>
            }

        </SafeAreaView>
    )
}