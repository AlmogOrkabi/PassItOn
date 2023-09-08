import { View, Text, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { styles, touchableOpacity } from '../Styles';
import Logo from '../Components/Logo';
import { AppContext } from '../Contexts/AppContext';
import { postSearchByUser, getAddresses } from '../api/index';
import CardPost from '../Components/CardPost';
import { Button } from 'react-native-paper'

const MemoizedCardPost = React.memo(CardPost); //React.memo - used to wrap functional components (jsx) when wanting to prevent re-renders when the props stay the same

export default function MyPosts({ navigation }) {
    const [loading, setLoading] = useState(true);
    const [myPosts, setMyPosts] = useState([])
    const { loggedUser, userToken } = useContext(AppContext);


    useEffect(() => {
        getUserPosts()
    }, []);



    async function getUserPosts() {
        try {
            setLoading(true);
            let results = await postSearchByUser(loggedUser._id, userToken);
            if (!results)
                setMyPosts(404);
            else {
                // results = await getAddresses(results, userToken);
                setMyPosts(results);
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }

    }



    const renderResult = (post) => {
        if (!post) return;

        console.log("POST ==>>", post)

        return (
            <TouchableOpacity onPress={() => navigation.navigate('PostPage', { post: post.item })}><MemoizedCardPost post={post.item} activeOpacity={touchableOpacity} /></TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={[styles.main_container2]}>

            {loading ? <View style={[styles.main_container,]}><ActivityIndicator /></View> :
                <View>
                    <Logo width={200} height={60} />

                    <Text style={[styles.mediumTitle]}>הפוסטים שלי:</Text>
                    <View style={[styles.container, styles.sub_container2, { maxHeight: '75%' }]}>
                        {
                            myPosts == 404 ?
                                <Text>לא פירסמת פריטים (עדיין)!</Text>
                                :
                                myPosts ?
                                    <FlatList
                                        data={myPosts}
                                        renderItem={renderResult}
                                        keyExtractor={item => item._id}
                                        style={[{ marginVertical: '3%', }]}
                                    />
                                    : null
                        }
                    </View>
                </View>
            }

        </SafeAreaView>
    )
}