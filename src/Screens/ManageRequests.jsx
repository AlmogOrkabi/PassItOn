import { View, Text, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { SegmentedButtons } from 'react-native-paper'
import { styles, touchableOpacity } from '../Styles';
import Logo from '../Components/Logo';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function ManageRequests() {
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState('');

    return (
        <SafeAreaView style={[styles.main_container2]}>
            {loading ? <ActivityIndicator /> :
                <View>
                    <Logo width={200} height={80} />
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
                </View>}

        </SafeAreaView>

    )
}