import { View, Text, useWindowDimensions, Pressable } from 'react-native'
import { Button, Menu, Divider, IconButton, } from 'react-native-paper';
import React, { useState, useContext } from 'react'
import { AppContext } from '../Contexts/AppContext';
import { removeToken } from '../utils';
import { useNavigation, CommonActions, StackActions } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';



export default function MenuTop() {
    const navigation = useNavigation();
    const { loggedUser, setLoggedUser, resetLoggedUser } = useContext(AppContext);

    const window = useWindowDimensions();
    const marginTop = window.height * 0.03;


    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    const userLogOut = async () => {
        try {

            // navigation.reset({
            //     index: 0,
            //     routes: [{ name: 'Start' }],
            // });

            await removeToken().then(() =>
                navigation.dispatch(StackActions.popToTop()));
            //navigation.navigate('Start')




        } catch (error) {
            console.log("error log out ==>>", error);
        } finally {
            // setLoggedUser(null);
            console.log(navigation.getState());
        }
    }




    // const userLogOut = async () => {
    //     try {
    //         console.log(navigation.getState());
    //         navigation.dispatch(CommonActions.reset({
    //             index: 0,
    //             routes: [{ name: 'Start' }, { name: 'Login' }],
    //             //stale: true
    //         }));

    //         //navigation.navigate('Start')
    //         await removeToken();

    //         setLoggedUser(() => { return {} });
    //         console.log("logged user after logout =>:" + loggedUser.username);
    //     } catch (error) {
    //         console.log("error log out ==>>", error);
    //     }

    // }



    // navigation.reset({
    //     index: 0,
    //     routes: [{ name: 'Start' }],
    // });

    return (

        <View style={[{ flex: 1, marginTop: marginTop, }]}>
            {/* <Menu
                visible={visible} W
                onDismiss={closeMenu}
                // anchor={<Button onPress={openMenu}>Show menu</Button>}
                anchor={<IconButton
                    icon="dots-vertical"
                    size={20}
                    onPress={() => setVisible(!visible)}
                />}

            >
                <Menu.Item onPress={() => userLogOut()} title="התנתקות" />
                <Divider />
                <Menu.Item onPress={() => { }} title="Item 2" />
                <Divider />
                <Menu.Item onPress={() => { }} title="Item 3" />
            </Menu> */}

            <Button style={[{ flex: 1, }]} onPress={() => userLogOut()}>
                <Feather name="log-out" size={20} color="black" style={[{ flex: 1, lineHeight: 18 }]} />
            </Button>

            {/* 
            <IconButton
                icon="logout"

                size={20}
                onPress={() => console.log('Pressed')}
            /> */}

        </View>

    )
}