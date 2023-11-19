import { View, Text, SafeAreaView, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { SegmentedButtons, Button } from 'react-native-paper'
import { styles, touchableOpacity } from '../Styles';
import { AppContext } from '../Contexts/AppContext';
import { getRequests } from '../api/index';
import RequestCard from '../Components/RequestCard';

export default function ManageRequests({ navigation }) {


    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState('');

    const { loggedUser, serverError, setServerError } = useContext(AppContext)

    const [requestsSent, setRequestsSent] = useState([]);
    const [requestsReceived, setRequestsReceived] = useState([]);



    async function loadRequests() {
        try {
            setLoading(true);
            let sent = await getRequests({ sender_id: loggedUser._id, full: 'true' });
            // console.log("SENT HERE", sent)
            if (sent == 404) {
                // console.log("404")
                setRequestsSent(404);
            } else {
                setRequestsSent(sent);
            }

            let received = await getRequests({ recipient_id: loggedUser._id, full: 'true' });

            if (received == 404) {
                // console.log("404")
                setRequestsReceived(404);
            } else {
                setRequestsReceived(received);
            }

        } catch (error) {
            console.log("ERROR", error)
            setServerError({ ...error });
        }
        finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        loadRequests();
    }, []);


    const renderRequests = (request) => {
        if (!request) return;


        return (
            <TouchableOpacity activeOpacity={touchableOpacity} onPress={() => navigation.navigate('common', { screen: 'RequestPage', params: { request: request.item, index: request.index, options: options, handleRequestUpdate: handleRequestUpdate } })}><RequestCard request={request.item} /></TouchableOpacity>
        )
    }

    const handleRequestUpdate = (request, index, options) => {
        let updated;
        if (options == 'received') {
            updated = [...requestsReceived];
            updated[index] = request;
            setRequestsReceived([...updated]);
        }
        else if (options == 'sent') {
            updated = [...requestsSent];
            updated[index] = request;
            setRequestsSent([...updated]);
        }
    }



    return (
        <SafeAreaView style={[styles.main_container2]}>
            {loading ? <View style={[styles.main_container]}><ActivityIndicator /></View> :
                <View style={[{ flex: 1 }]}>
                    <View>
                        <Text>הבקשות שלי</Text>
                        <SegmentedButtons style={[{ margin: '5%' }]}
                            value={options}
                            onValueChange={setOptions}
                            buttons={[
                                {
                                    value: 'received',
                                    label: 'בקשות שהתקבלו',
                                    icon: 'email-receive-outline',
                                },
                                {
                                    value: 'sent',
                                    label: 'בקשות שנשלחו',
                                    icon: 'email-send-outline',

                                },

                            ]}
                            theme={{ roundness: 2, }}
                        />
                    </View>

                    <View style={[{ flex: 1, },]}>
                        {options == '' ? null : options == 'sent' ? requestsSent == 404 ?
                            <Text>לא נשלחו בקשות עדיין</Text>
                            :
                            <FlatList
                                data={requestsSent}
                                renderItem={renderRequests}
                                keyExtractor={item => item._id}
                                style={[{ marginVertical: '3%', },]}
                            /> :
                            options == 'received' ? requestsReceived == 404 ? <Text>לא התקבלו בקשות עדיין</Text> :

                                <FlatList
                                    data={requestsReceived}
                                    renderItem={renderRequests}
                                    keyExtractor={item => item._id}
                                    style={[{ marginVertical: '3%', },]}
                                /> : null}
                    </View>


                </View>}


            <Button mode='contained' style={[styles.btn_report, { alignSelf: 'flex-start', }, styles.marginVertical]} onPress={() => { navigation.navigate('MyReports') }}>דיווחים</Button>
        </SafeAreaView>

    )
}