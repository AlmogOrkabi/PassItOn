import { View, Text, SafeAreaView } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding1 from '../Components/Onbording/Onboarding1'
import Onboarding2 from '../Components/Onbording/Onboarding2'
import Onboarding3 from '../Components/Onbording/Onboarding3'
import { styles, onboardingStyle } from '../Styles'
import { Button } from 'react-native-paper'




export default function OnBoarding({ navigation }) {
    const [page, setPage] = useState(1);
    const markAsSeen = async () => {
        try {
            await AsyncStorage.setItem('@onboarding', 'true');

            navigation.reset({
                index: 0,
                routes: [{ name: 'Start' }]
            });


        } catch (error) {
            console.error('Error setting AsyncStorage:', error);
        }
    };

    return (
        <SafeAreaView style={[onboardingStyle.main_container]}>

            {page === 1 ? <Onboarding1 />
                :
                page === 2 ? <Onboarding2 /> :
                    page === 3 ? <Onboarding3 /> :
                        null}

            <View style={onboardingStyle.btn_container}>
                <Button
                    mode="contained"
                    style={[onboardingStyle.btn, onboardingStyle.backButton]}
                    onPress={() => setPage(page - 1)}
                    disabled={page <= 1}
                >
                    הקודם
                </Button>
                {page < 3 ? <Button
                    mode="contained"
                    style={[onboardingStyle.btn, onboardingStyle.nextButton]}
                    onPress={() => setPage(page + 1)}
                    disabled={page >= 3}
                >
                    הבא
                </Button>
                    :
                    <Button style={[onboardingStyle.btn, onboardingStyle.nextButton]}
                        mode="contained"
                        disabled={page < 3}
                        onPress={() => { markAsSeen() }}
                    >
                        בואו נתחיל!
                    </Button>
                }
            </View>

            <Button mode="text" disabled={page >= 3} onPress={() => { markAsSeen() }} style={[onboardingStyle.btn, { flex: 0.1 }]} labelStyle={onboardingStyle.btn_skip}>
                {page >= 3 ? '' : 'דלג'}
            </Button>

        </SafeAreaView>
    )
}