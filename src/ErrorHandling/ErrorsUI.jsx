import { View, Text } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { Snackbar, Dialog, Portal, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'
import { AppContext } from '../Contexts/AppContext';

export default function ErrorsUI() {

    const { serverError, setServerError } = useContext(AppContext);
    const navigation = useNavigation();

    const onDismissSnackBar = () => setServerError(null);

    const handleDialogClose = () => {
        setServerError(null);
        if (serverError.error === 'ACCESS_DENIED') {
            navigation.navigate('Login'); // redirect to Login
        }
    };

    return (
        <View style={[{}]}>
            {serverError?.status === 500 && (
                <Snackbar
                    visible={true}
                    onDismiss={onDismissSnackBar}
                    action={{
                        label: 'הבנתי',
                        onPress: onDismissSnackBar,
                    }}>
                    אופס! התרחשה שגיאה בשרת
                </Snackbar>
            )}
            {
                (serverError?.status === 403 || serverError?.status === 401) &&
                (
                    <Portal>
                        <Dialog visible={true} onDismiss={handleDialogClose}>
                            <Dialog.Title>שגיאה</Dialog.Title>
                            <Dialog.Content>
                                <Text>{serverError.msg}</Text>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={handleDialogClose}>אישור</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                )}
        </View>
    )
}