import { View, Text, SafeAreaView, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { SegmentedButtons } from 'react-native-paper'
import { styles, touchableOpacity } from '../Styles';
import Logo from '../Components/Logo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppContext } from '../Contexts/AppContext';
import { getRequestsBySenderId, getRequestsByRecipientId, getRequestSenderData, getRequestRecipientData, getRequestsPostData } from '../api/index';
import RequestCard from '../Components/RequestCard';
import { useNavigation } from '@react-navigation/native';

export default function ManageRequests() {

    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState('');

    const { loggedUser, userToken } = useContext(AppContext)

    const [requestsSent, setRequestsSent] = useState([]);
    const [requestsReceived, setRequestsReceived] = useState([]);


    async function handleChange(index, request) {

    }

    async function loadRequests() {
        try {
            setLoading(true);
            let sent = await getRequestsBySenderId(loggedUser._id, userToken, 'true');
            console.log("SENT HERE", sent)
            if (sent == 404) {
                console.log("404")
                setRequestsSent(404);
            } else {
                // sent = await getRequestRecipientData(sent, userToken);
                // sent = await getRequestsPostData(sent, userToken);
                setRequestsSent(sent);
            }

            let received = await getRequestsByRecipientId(loggedUser._id, userToken, 'true');

            if (received == 404) {
                console.log("404")
                setRequestsReceived(404);
            } else {
                // received = await getRequestSenderData(received, userToken)
                // received = await getRequestsPostData(received, userToken);
                setRequestsReceived(received);
            }

        } catch (error) {
            console.log("ERROR", error)
        }
        finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        loadRequests();
    }, []);

    useEffect(() => {
        console.log("OPTIONS:", options)
        console.log("received" + requestsReceived)
        //console.log("sent" + Array.isArray(requestsSent));
        let s = JSON.stringify(requestsSent[0]);
        console.log("sent" + s);
    }, [options]);


    const renderRequests = (request) => {
        if (!request) return;


        return (
            <TouchableOpacity activeOpacity={touchableOpacity} onPress={() => navigation.navigate('RequestPage', { request: request.item, index: request.index, options: options, handleRequestUpdate: handleRequestUpdate })}><RequestCard request={request.item} /></TouchableOpacity>
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
            <Logo width={200} height={80} />
            {loading ? <View style={[styles.main_container]}><ActivityIndicator /></View> :
                <View>
                    {/* <Logo width={200} height={80} /> */}
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

                    <View style={[styles.containerCenter]}>
                        {options == '' ? null : options == 'sent' ? requestsSent == 404 ?
                            <Text>לא נשלחו בקשות עדיין</Text>
                            :
                            <FlatList
                                data={requestsSent}
                                renderItem={renderRequests}
                                keyExtractor={item => item._id}
                                style={[{ marginVertical: '3%', }, touchableOpacity]}
                            /> :
                            options == 'received' ? requestsReceived == 404 ? <Text>לא התקבלו בקשות עדיין</Text> :

                                <FlatList
                                    data={requestsReceived}
                                    renderItem={renderRequests}
                                    keyExtractor={item => item._id}
                                    style={[{ marginVertical: '3%', }, touchableOpacity]}
                                /> : null}
                    </View>
                </View>}



        </SafeAreaView>

    )
}