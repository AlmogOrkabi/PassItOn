import { StyleSheet, Text, View } from 'react-native';

//style={[styles.xxxx,]}

// const theme = {
//     mainColor: "purple",
//     mainColorFaded: "#DEACE7",
//     background: "#B94ECB"
// }

const theme = {
    mainColor: "#B94ECB",
    mainColorFaded: "#DEACE7",
    background: "#DEACE7",
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
        //**
        flexDirection: "column",
        textAlign: "center",
        //** 
        flex: 1,
        justifyContent: 'center',
        backgroundColor: theme.background,
        color: 'black',
        width: '100%',
        //maxWidth: "100%",
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
    logo: {
        Width: "100%",
        maxWidth: "100%"
    },
    logocontainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 300,
        height: 100,
        resizeMode: 'contain'
    },
    npcontainer: {
        padding: 16,
        justifyContent: 'center',
        flex: 1,

    },
    npinput: {
        marginBottom: 16,
    },
    nplabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    npphotoContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    npphotoItem: {
        position: 'relative',
        marginRight: 8,
        marginBottom: 8,
    },
    npphoto: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    npdeleteButton: {
        position: 'absolute',
        top: 4,
        right: 4,
    },
    npaddPhotoButton: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
    },
    nppostButton: {
        marginTop: 16,
    },
    // card: {
    //     //margin: '5%',
    //     width: 280,
    //     //height: 450,
    //     flexDirection: 'column',


    // },
    // cardContent: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center'
    // },
    // cardCover: {
    //     width: 150,
    //     height: 80,
    // },

});


export const paperStyles = {
    inputIcon: { size: 20 },
}