import { StyleSheet, Text, View } from 'react-native';

//style={[styles.xxxx,]}

const theme = {
    mainColor: "purple",
    mainColorFaded: "#DEACE7",
    background: "#B94ECB"
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
        width: '100%',
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
        backgroundColor: '#ADD8FF',
        padding: 10,
        borderRadius: 8,
    },
    address: {
        fontSize: 14,
    },
    card: {
        //margin: '5%',
        width: 280,
        //height: 450,
        flexDirection: 'column',


    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cardCover: {
        width: 150,
        height: 80,
    }

});


export const paperStyles = {
    inputIcon: { size: 20 },
}