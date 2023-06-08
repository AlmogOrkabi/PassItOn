import { StyleSheet, Text, View } from 'react-native';

//style={[styles.xxxx,]}

const theme = {
    mainColor: "green",
    mainColorFaded: "#00800038",
    background: "#ffffff"
}

export const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: theme.background,
        color: 'black',
    },
    container: {
        alignItems: 'center',

    },
    title: {
        fontSize: 30
    },
    btn: {
        backgroundColor: theme.mainColor,
        textAlign: "center",
        marginTop: 20
    },
    input: {
        minWidth: "50%",
        margin: 7,
        backgroundColor: theme.mainColorFaded,
        height: 45,
        fontSize: 15,
    },
});