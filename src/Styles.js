import { StyleSheet, Text, View } from 'react-native';

//style={[styles.xxxx,]}

// const theme = {
//     mainColor: "purple",
//     mainColorFaded: "#DEACE7",
//     background: "#B94ECB"
// }

//colors:
//light green-gray : #c7d6c7 #d3d6c7
//#cfd6cf  #bac9ba #cccfbd #c7cfbd
//#b1ded1
//#b6cdc4
//light orange-gray : #efd8bd
//light purple-gray : #c1afc4 #bdb0bf

export const theme = {
    mainColor: "#B94ECB",
    mainColorFaded: "#DEACE7",
    //background: "#DEACE7",
    background: '#c7cfbd',
    strongOrange: "#f58a0a",
    mediumOrange: '#ffa63e',
    lightOrange: '#ffd6a8',
    strongBlue: '#1b71be',
    mediumBlue: '#2596fe',
    lightBlue: '#add9ff',
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
        height: '100%',
        padding: '2%'
        //maxWidth: "100%",

    },
    main_container2: {
        //**
        flexDirection: "column",
        textAlign: "center",
        //** 
        //flex: 1,
        //justifyContent: 'center',
        paddingTop: '5%',
        backgroundColor: theme.background,
        color: 'black',
        width: '100%',
        height: '100%',
        //maxWidth: "100%",
        padding: '2%'
    },
    sub_container: {
        margin: '5%',
        marginTop: '15%'
    },
    sub_container2: {
        margin: '5%',
        // marginTop: '15%'


    }, sub_container3: {
        margin: '5%',
        rowGap: 20,
    },
    container: {
        alignItems: 'center',
        //flex: 1,
        //margin: '5%',
    },
    containerCenter: {
        alignItems: 'center',
        justifyContent: 'center',

    },
    diffBG: {  //for debugging purposes only
        backgroundColor: 'white',
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    marginVertical: {
        marginVertical: '3%',
    },
    marginHorizontal: {
        marginHorizontal: '3%',
    },
    paddingVertical: {
        paddingVertical: '5%',
    },
    title: {
        fontSize: 30,
    },
    titleBold: {
        fontSize: 30,
        fontWeight: '800'
    },
    mediumTitle: {
        fontSize: 18,
        fontWeight: '700'
    },
    smallTitle: {
        fontSize: 15,
        fontWeight: '700',
    },
    text_underline: {
        textDecorationLine: 'underline',
    },
    smallText: {
        fontSize: 11,
    },
    mediumText: {
        fontSize: 14,
        //fontWeight: '600'
    },
    mediumTextBold: {
        fontSize: 14,
        fontWeight: '600'
    },
    textRed: {
        color: 'red',
    },
    textGreen: {
        color: 'green',
    },
    btn: {
        backgroundColor: theme.mainColor,
        textAlign: "center",
        marginTop: 20,
    },
    smallBtn: {
        width: 250
    },
    actionView: {
        //backgroundColor: 'green',
        backgroundColor: theme.strongOrange,
        borderRadius: 10,
        padding: '3%',
    },
    native_input: {
        borderWidth: 1,
        padding: '2%',
        minHeight: 100,

    },
    borderRed: {
        borderColor: 'red'
    },
    input: {
        minWidth: "50%",
        margin: 7,
        backgroundColor: theme.mainColorFaded,
        height: 45,
        fontSize: 15,

    },
    input_small: {
        minWidth: "30%",
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
    flexRowCenter: {
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
        width: 200,
        height: 200,
        borderRadius: 100,
        //marginBottom: 10,
        margin: '5%',
    },
    username: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: '5%',
    },
    name: {
        fontSize: 14,
        //marginBottom: 5,
    },
    email: {
        fontSize: 14,
        //marginBottom: 10,
    },
    addressContainer: {
        backgroundColor: '#ADD8FF',
        padding: 10,
        borderRadius: 8,
    },
    sideComment: {
        alignItems: 'flex-start',
        backgroundColor: '#d3d3d396',
        padding: '5%',
        borderRadius: 10,
        columnGap: 5
    },


    //FIX THIS:!!!!!!!!

    address: {
        fontSize: 14,
    },
    // logo: {
    //     Width: "100%",
    //     maxWidth: "100%"
    // },
    logocontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        //marginBottom: '5%',
        marginTop: '5%',
    },
    logo: {
        width: 300,
        height: 100,
        resizeMode: 'contain',
    },
    npcontainer: {
        padding: 16,
        justifyContent: 'center',
        flex: 1,
        marginTop: '10%'

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
    searchOptionsContainer: {
        // marginTop: '3%'
    },
    card: {
        marginVertical: 10,
        marginHorizontal: 15,
    },
    errMsg: {
        color: "red",
        //margin: 20,
        fontWeight: "bold",
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
    style_FAB_picture: {
        position: 'absolute',
        width: 40,
        height: 40,
        // fontSize: 5,
        // textAlign: 'center',
        borderRadius: 50,
        left: 140,
        bottom: 35,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
    },
    style_FAB: {
        position: 'absolute',
        width: 40,
        height: 40,
        // fontSize: 5,
        // textAlign: 'center',
        borderRadius: 50,
        right: 10,
        top: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    style_FAB_Edit_Post: {
        position: 'absolute',
        right: 10,
        bottom: 40,
        //flexDirection: 'row-reverse'
        // zIndex: Platform.OS === 'ios' ? 1 : undefined,
        // elevation: 1,
        zIndex: 1,
    },
    styles_FAB_Group_profile: {
        position: 'absolute',
        maxHeight: 300,
        maxWidth: 200,
        left: 200,
        top: 100,
        zIndex: 1,
        borderRadius: 15,
        overflow: 'hidden',

    },
    postImgContainer: {
        width: 250,
        height: 250,
        resizeMode: 'contain'


    },
    boxShadow: {
        // iOS shadow properties
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 4,

        backgroundColor: '#FFF', //for the boxshadow
        borderRadius: 15,

        // Android shadow properties
        elevation: 12,
    },
    // boxShadowFAB: {
    //     // iOS shadow properties
    //     shadowColor: '#000',
    //     shadowOffset: { width: 0, height: 4 },
    //     shadowOpacity: 0.8,
    //     shadowRadius: 4,

    //     backgroundColor: theme.background, //for the boxshadow
    //     borderRadius: 10,

    //     // Android shadow properties
    //     elevation: 12,
    // },
    postImg: {
        borderRadius: 10,
    },
    postImagesList: {
        width: 50,
        height: 50,
        opacity: 0.5,
    },
    //**~Modal HERE: **/
    modalElements: {
        //flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        //marginTop: 22,
        // maxWidth: '60%',
        // maxHeight: '60%',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10,
        position: 'absolute',
        // width: '100%',
        // height: '100%',
        width: 300,
        height: 500,
        bottom: 90,
        left: 10,

        //android is affected by elevation while IOS is affected by zIndex:
        zIndex: 5,
    },
    // button: {
    //     borderRadius: 20,
    //     padding: 10,
    //     elevation: 2,
    // },
    // buttonOpen: {
    //     backgroundColor: '#F194FF',
    // },
    // buttonClose: {
    //     backgroundColor: '#2196F3',
    // },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },

});


export const paperStyles = {
    inputIcon: { size: 20 },
}


//opacity level for TouchableOpacity elements
export const touchableOpacity = 0.6;

//for the overlay alone:
export const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', // This gives the dim effect

    //android is affected by elevation while IOS is affected by zIndex:
    zIndex: 1,
    //(Android uses 'elevation' for shadow depth, while iOS relies on 'zIndex' for stacking order.)
    elevation: -1,
};