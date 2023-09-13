import { View, Text, SafeAreaView, Image, FlatList, TouchableOpacity, Animated, ScrollView } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { styles, touchableOpacity } from '../Styles';
import Logo from '../Components/Logo';
import { AnimatedFAB, Button } from 'react-native-paper';
import { AppContext } from '../Contexts/AppContext';
import RequestForm from '../Components/RequestForm';
import Overlay from '../Components/Overlay';
import { getRequests, getReports } from '../api/index';

export default function PostPage({ route, navigation }) {
    const { post } = route.params;
    const { loggedUser, userToken } = useContext(AppContext);
    const [mainPicure, setMainPicure] = useState(post.photos[0]);
    const [isPostOwner, setIsPostOwner] = useState(post.owner_id === loggedUser._id);
    const [requestSent, setRequestsSent] = useState(false);
    const [postReported, setPostReported] = useState(false);

    const renderItems = ({ item }) => {
        if (!item)
            return;
        const isActive = mainPicure.url === item.url;
        return (
            <TouchableOpacity onPress={() => setMainPicure(item)} >
                <Image source={{ uri: item.url }} style={[styles.postImagesList, isActive ? { opacity: 1 } : {}]} />
            </TouchableOpacity>
        );
    };

    const [isExtended, setIsExtended] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        isSent();
        isReported();
    }, []); //!updates in delay - needs to be fixed

    // useEffect(() => {
    //     console.log(requestSent)
    // }, [requestSent]);


    async function isSent() {
        try {
            let sent = await getRequests({ sender_id: loggedUser._id, post_id: post._id, full: 'false' }, userToken);
            if (sent != 404) {
                setRequestsSent(true);
            }
        } catch (error) {
            console.log("error post page1: ", error)
            // console.log("error post page1: ", error)
            // console.log("error post page1: ", JSON.stringify(error, null, 2))
            // console.log("error post page1: ", Object.getPrototypeOf(error))
        }
    }

    async function isReported() {
        try {
            let report = await getReports({ owner_id: loggedUser._id, postReported_id: post._id, full: 'false' }, userToken);

            if (report != 404)
                setPostReported(true);
            console.log(postReported)
        } catch (error) {
            console.log("error post page2: ", error.status);
            console.log(error.message)
            // console.log("error post page2: ", error.message);
            // console.log("error post page2: ", error.stack);
        }
    }

    return (
        <SafeAreaView style={[styles.main_container2,]}>
            <Logo width={300} height={70} />
            {/* <Text>דף פוסט</Text> */}
            {isPostOwner ?

                <AnimatedFAB
                    icon={'pencil'}
                    label={'עריכה'}
                    extended={isExtended}
                    onPress={() => console.log('Pressed')}
                    onLongPress={() => setIsExtended(!isExtended)} // Toggle the extended state on long press
                    visible={isPostOwner}
                    animateFrom={'left'}
                    iconMode={'absolute'}
                    style={[styles.style_FAB_Edit_Post]}
                    disabled={post.status === 'נמסר' || post.status === 'בבדיקת מנהל' || post.status === 'בוטל'}
                />
                : null}
            <ScrollView>




                <View style={[styles.sub_container3, styles.container, { marginTop: 20 }]}>

                    <Text style={[styles.title]}>{post.itemName}</Text>
                    <View style={[styles.boxShadow, styles.postImgContainer,]}>
                        <Image style={[styles.postImg, { flex: 1 }]} source={{ uri: mainPicure.url }} />
                    </View>

                    <FlatList data={post.photos}
                        renderItem={renderItems}
                        keyExtractor={(item) => item.url}
                        style={[{ maxHeight: 250 }]}
                        horizontal={true}
                        ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
                        nestedScrollEnabled />

                    <Text>{post.description}</Text>
                    <Text>סטטוס:{post.status === 'זמין' ? 'זמין' : post.status === 'סגור' ? 'סגור' : post.status === 'בתהליך מסירה' ? 'בתהליך מסירה' : post.status === 'נמסר' ? 'נמסר' : 'לא זמין'}</Text>
                    <Text>מיקום הפריט:</Text>
                    <Text>{post.address.simplifiedAddress || post.address.notes}</Text>

                    {isPostOwner ? null : post.status === 'זמין' ?

                        <View style={[styles.flexRow, { gap: 10 }]}>
                            {requestSent ?
                                <Button mode='contained' disabled>בקשה כבר נשלחה</Button> :
                                postReported ? <Button mode='contained' disabled>שליחת בקשה</Button>
                                    : <RequestForm post={post} modalVisible={modalVisible} setModalVisible={setModalVisible} requestSent={requestSent} setRequestsSent={setRequestsSent} />}
                            <Button mode="contained" onPress={() => navigation.navigate('ReportForm', { post: post })} style={styles.nppostButton} disabled={postReported}>
                                {postReported ? 'כבר קיים דיווח' : 'דיווח על הפריט'}
                            </Button>
                        </View> :
                        <View>
                            <Text style={[styles.errMsg, styles.sideComment]}>הפריט אינו זמין</Text>
                        </View>
                    }

                </View>
            </ScrollView>
            {modalVisible && <Overlay onClose={() => setModalVisible(false)} />}
        </SafeAreaView>
    )
}