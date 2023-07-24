import { StyleSheet, Text, View } from 'react-native';

//style={[styles.xxxx,]}

const theme = {
    mainColor: "green",
    mainColorFaded: "#00800038",
    background: "#ffffff"
}


//TO DO LATER:
//dynamic sizes by the user's choice:
// const size = 

// const sizes = {
//     small: {},
//     medium: {},
//     large: {},
//     larger: {}
// }

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
    form_small_heading: {
        fontSize: 10,
    },
    inputError: {
        color: "red",
        fontSize: 10,
        alignSelf: "flex-start",
        marginLeft: 10,
    },
    flexRow: {
        //flex: 0.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '10%'
    },
    smallTextButton: {
        textColor: "darkgrey",
    },
    addressFlatList: {
        maxHeight: 60,
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    username: {
        fontSize: 16,
        marginBottom: 5,
    },
    email: {
        fontSize: 14,
        marginBottom: 10,
    },
    addressContainer: {
        backgroundColor: '#f2f2f2',
        padding: 10,
        borderRadius: 8,
    },
    address: {
        fontSize: 14,
    },

});