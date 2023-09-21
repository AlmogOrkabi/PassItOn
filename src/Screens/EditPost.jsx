import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
import { TextInput, IconButton, FAB, Button } from 'react-native-paper';
import React, { useState, useEffect, useContext, useReducer } from 'react';


import { userAllowedPostStatuses, postCategories } from '../Data/constants';
import { openMediaLibrary } from '../utils/index';
import { validatePostData } from '../utils/validations'
import { searchPosts, updatePostData } from '../api/index';

import { styles, touchableOpacity } from '../Styles';
import { AppContext } from '../Contexts/AppContext';


import Logo from '../Components/Logo';
import SelectFromList from '../Components/SelectFromList';
import AddAddress from '../Components/AddAddress';

const initialState = {

    itemName: {
        edited: false,
        value: ''
    },
    description: {
        edited: false,
        value: ''
    },
    category: {
        edited: false,
        value: ''
    },
    status: {
        edited: false,
        value: ''
    },
    address: {
        edited: false,
    },
    photos: {
        edited: true,
        toAdd: [],
        toRemove: [],
    }

}

function formReducer(state, action) {
    switch (action.type) {
        case 'edit':
            return {
                ...state,
                [action.field]: {
                    ...state[action.field],
                    edited: true
                }
            }
        case 'cancel':
            return {
                ...state,
                [action.field]: {
                    ...state[action.field],
                    edited: false
                }
            }
        case 'update':
            return {
                ...state,
                [action.field]: {
                    ...state[action.field],
                    value: action.value
                }
            }
        case 'addPhoto':
            return {
                ...state,
                photos: {
                    ...state.photos,
                    edited: true,
                    toAdd: [...state.photos.toAdd, action.photo]
                }
            };
        case 'removePhoto':
            return {
                ...state,
                photos: {
                    ...state.photos,
                    edited: true,
                    toRemove: [...state.photos.toRemove, action.photo]
                }
            };
        default:
            return state;

    }

}

// function handleStatusChange(newStatus) {
//     dispatch({ type: 'update', field: 'status', value: newStatus })
// }


// dispatch({ type: 'addPhoto', photo: 'newPhotoURL' });
// dispatch({ type: 'removePhoto', photo: 'photoURLToRemove' });

export default function EditPost({ route, navigation }) {
    const { post, index } = route.params;

    const { loggedUser, userToken, myPosts, setMyPosts, serverError, setServerError } = useContext(AppContext);
    const [formState, dispatch] = useReducer(formReducer, initialState);

    const [address, setAddress] = useState({
        location: null,
        addressInput: '',
        notes: null
    });

    const [pictures, setPictures] = useState(post.photos);
    const [newPictures, setNewPictures] = useState([])
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState({ valid: false, reason: '', msg: '' });
    const renderPictures = ({ item, index }) => {
        if (!item)
            return;
        return (
            <View >
                <Image source={{ uri: item.url }} style={[styles.postImagesListMedium]} />
                <FAB
                    icon="delete"
                    style={[styles.deletedFAB_edit]}
                    onPress={() => handlePhotoRemove(index, 'old')}
                    customSize={30}
                    theme={{ colors: { primaryContainer: 'white' } }}
                />
            </View>
        );
    };

    const renderNewPictures = ({ item, index }) => {
        if (!item)
            return;
        return (
            <View  >
                <Image source={{ uri: item }} style={[styles.postImagesListMedium]}></Image>
                <FAB
                    icon="delete"
                    style={[styles.deletedFAB_edit]}
                    onPress={() => handlePhotoRemove(index, 'new')}
                    customSize={30}
                    theme={{ colors: { primaryContainer: 'white' } }}
                />
            </View>
        );
    };


    function handlePhotoRemove(index, mode) {
        if (mode === 'old') {
            const photo = pictures[index];
            dispatch({ type: 'removePhoto', photo: photo.url });
            setPictures((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
        }
        else {
            setNewPictures((prev) => prev.filter((_, i) => i !== index));
        }

    }


    async function handleNewPicture() {
        const result = await openMediaLibrary();

        if (result) {
            dispatch({ type: 'addPhoto', photo: result })
            setNewPictures((prev) => [...prev, result])
        }
    }


    async function handleChanges() {
        try {
            setLoading(true);
            setErr(null);
            // console.log("address  => " + address.location, address.addressInput);
            // console.log(formState)

            const updatedData = {};

            if (formState.itemName.edited) {
                updatedData.itemName = formState.itemName.value;
            }
            if (formState.description.edited) {
                updatedData.description = formState.description.value;
            }
            if (formState.category.edited) {
                updatedData.category = formState.category.value;
                //updatedData.category = 'תקלה בכוונה'
            }
            if (formState.status.edited) {
                updatedData.status = formState.status.value;
            }
            console.log("updatedData: " + JSON.stringify(updatedData))
            const validationsRes = await validatePostData(updatedData);
            console.log(validationsRes)
            if (!validationsRes.valid) {
                setErr({ ...validationsRes });
                return;
            }
            console.log("pictures" + formState.photos.toAdd.length)
            if (pictures && pictures.length + formState.photos.toAdd.length < 1) {
                setErr((prev) => ({ ...prev, reason: 'pictures', msg: 'נא לצרף לפחות תמונה אחת' }));
                return;
            }

            if (formState.address.edited && !address.location) {
                setErr((prev) => ({ reason: 'address', msg: 'נא הכנס כתובת תקינה' }));
            }

            let result;
            console.log(formState.address.edited)
            if (formState.address.edited && address)
                result = await updatePostData(post._id, updatedData, userToken, formState.photos.toAdd, formState.photos.toRemove, address);
            else
                result = await updatePostData(post._id, updatedData, userToken, formState.photos.toAdd, formState.photos.toRemove);

            console.log("result =>" + result.acknowledged)
            // if (result.acknowledged) {

            //     //await updatePostsArray()               
            //     const updatedPost = await searchPosts({ _id: post._id, full: 'true' }, userToken)
            //     let postsArr = myPosts;
            //     postsArr[index] = updatedPost;
            //     setMyPosts([...postsArr])
            //     //navigation.navigate('PostPage', { post: updatedPost, index: index })
            // }

            //navigation.navigate('PostPage', { post: myPosts[index], index: index })
            //navigation.goBack();
            navigation.navigate('MyPosts')

        } catch (error) {
            console.log("error  => ", error.message);
            setServerError({ ...error });
        } finally {
            setLoading(false);
        }
    }


    // async function updatePostsArray() {
    //     const updatedPost = await searchPosts({ _id: post._id, full: 'true' }, userToken)
    //     let postsArr = myPosts;
    //     postsArr[index] = updatedPost;
    //     setMyPosts([...postsArr])
    // }


    return (
        <SafeAreaView style={[styles.main_container2]}>
            {/* <Logo width={200} height={70} /> */}

            <Text style={[styles.mediumTitle]}>דף עריכת פוסט:</Text>
            {loading ? <View style={[styles.main_container]}>
                <ActivityIndicator />
            </View> :
                <ScrollView nestedScrollEnabled style={[styles.sub_container,]} >

                    <View style={[styles.fieldsGap]}>
                        {
                            formState.itemName.edited ? <View style={[styles.flexRow]}>
                                <TextInput
                                    label="שם הפריט"
                                    value={formState.itemName.value}
                                    onChangeText={text => dispatch({ type: 'update', field: 'itemName', value: text })}
                                    mode='outlined'
                                    placeholder={post.itemName}
                                    style={[styles.textInput]}
                                    //theme={{ roundness: 50, activeOutlineColor: 'white' }}
                                    //activeOutlineColor='red'
                                    outlineStyle={styles.outlinedInputBorder}
                                />
                                <IconButton
                                    icon="close-thick"
                                    size={20}
                                    onPress={() => dispatch({ type: 'cancel', field: 'itemName' })}
                                    style={[styles.canceEditlBtn]}
                                />
                            </View> :
                                <View style={[styles.flexRow, styles.editformFieldContainer]}>
                                    <IconButton
                                        icon="pencil"
                                        size={20}
                                        onPress={() => dispatch({ type: 'edit', field: 'itemName' })}
                                    />
                                    <Text style={[styles.editFormText]}>שם הפריט: {post.itemName}</Text>

                                </View>
                        }
                        {err && err.reason == 'itemName' ? <Text style={[styles.errMsg]}>{err.msg}</Text> : null}
                        {
                            formState.description.edited ? <View style={[styles.flexRow]}>
                                <TextInput
                                    label="תיאור הפריט"
                                    value={formState.itemName.value}
                                    onChangeText={text => dispatch({ type: 'update', field: 'description', value: text })}
                                    mode='outlined'
                                    placeholder={post.description}
                                    style={[styles.textInput]}
                                    outlineStyle={styles.outlinedInputBorder}
                                    multiline={true}
                                />
                                <IconButton
                                    icon="close-thick"
                                    size={20}
                                    onPress={() => dispatch({ type: 'cancel', field: 'description' })}
                                    style={[styles.canceEditlBtn]}
                                />
                            </View> :
                                <View style={[styles.flexRow, styles.editformFieldContainer]}>
                                    <IconButton
                                        icon="pencil"
                                        size={20}
                                        onPress={() => dispatch({ type: 'edit', field: 'description' })}
                                    />
                                    <Text style={[styles.editFormText]}>תיאור הפריט: {post.description}</Text>

                                </View>
                        }
                        {err && err.reason == 'description' ? <Text style={[styles.errMsg]}>{err.msg}</Text> : null}
                        {
                            formState.category.edited ? <View style={[styles.flexRow]}>
                                <SelectFromList list={postCategories} title='' picked={formState.category.value === '' ? post.category : formState.category.value} setPicked={null} dispatch={dispatch} field='category' />
                                <IconButton
                                    icon="close-thick"
                                    size={20}
                                    onPress={() => dispatch({ type: 'cancel', field: 'category' })}
                                    style={[styles.canceEditlBtn]}
                                />
                            </View> :
                                <View style={[styles.flexRow, styles.editformFieldContainer]}>
                                    <IconButton
                                        icon="pencil"
                                        size={20}
                                        onPress={() => dispatch({ type: 'edit', field: 'category' })}
                                    />
                                    <Text style={[styles.editFormText]}>קטגוריה: {post.category}</Text>

                                </View>
                        }
                        {err && err.reason == 'category' ? <Text style={[styles.errMsg]}>{err.msg}</Text> : null}
                        {
                            formState.status.edited ? <View style={[styles.flexRow]}>
                                <SelectFromList list={userAllowedPostStatuses} title='' picked={formState.status.value === '' ? post.status : formState.status.value} setPicked={null} dispatch={dispatch} field='status' />
                                <IconButton
                                    icon="close-thick"
                                    size={20}
                                    onPress={() => dispatch({ type: 'cancel', field: 'status' })}
                                    style={[styles.canceEditlBtn]}
                                />
                            </View> :
                                <View style={[styles.flexRow, styles.editformFieldContainer]}>
                                    <IconButton
                                        icon="pencil"
                                        size={20}
                                        onPress={() => dispatch({ type: 'edit', field: 'status' })}
                                    />
                                    <Text style={[styles.editFormText]}>סטטוס הפריט: {post.status}</Text>

                                </View>
                        }
                        {err && err.reason == 'status' ? <Text style={[styles.errMsg]}>{err.msg}</Text> : null}
                        <View>
                            <Text style={[styles.editFormText]}>תמונות הפריט:</Text>
                            <View style={[styles.flexRow]}>
                                <FlatList data={pictures}
                                    renderItem={renderPictures}
                                    keyExtractor={(item) => item.url}
                                    style={[{ maxHeight: 250 }]}
                                    horizontal={true}
                                    ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
                                    nestedScrollEnabled />

                            </View>
                            <Text style={[styles.editFormText]}>תמונות חדשות:</Text>
                            <View style={[styles.flexRow]}>
                                <FAB
                                    icon="plus"
                                    style={styles.fab}
                                    onPress={() => handleNewPicture()}
                                    disabled={newPictures.length + pictures.length >= 6}
                                />
                            </View>
                            <FlatList data={newPictures}
                                renderItem={renderNewPictures}
                                keyExtractor={(item) => item.uri}
                                style={[{ maxHeight: 250 }]}
                                horizontal={true}
                                ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
                                nestedScrollEnabled />
                        </View>
                        {err && err.reason == 'pictures' ? <Text style={[styles.errMsg]}>{err.msg}</Text> : null}

                        {
                            formState.address.edited ? <View>
                                <AddAddress address={address} handleChange={setAddress} />
                                <View style={[styles.flexRow]}>
                                    <TextInput
                                        label="הערות לכתובת"
                                        value={address.notes}
                                        onChangeText={text => setAddress((prev) => ({ ...prev, notes: text }))}
                                        mode='outlined'
                                        placeholder={post.address.notes}
                                        style={[styles.textInput]}
                                        outlineStyle={styles.outlinedInputBorder}
                                        multiline={true}
                                    />
                                    <IconButton
                                        icon="close-thick"
                                        size={20}
                                        onPress={() => dispatch({ type: 'cancel', field: 'address' })}
                                        style={[styles.canceEditlBtn]}
                                    />
                                </View>
                            </View> :
                                <View style={[styles.flexRow, styles.editformFieldContainer]}>
                                    <IconButton
                                        icon="pencil"
                                        size={20}
                                        onPress={() => dispatch({ type: 'edit', field: 'address' })}
                                    />
                                    <Text style={[styles.editFormText]}>כתובת הפריט: {post.address.simplifiedAddress}</Text>

                                </View>
                        }
                    </View>

                    <Button mode='contained' style={[styles.nppostButton, styles.smallBtn, { alignSelf: 'center' }]} onPress={() => { handleChanges() }}>שמור שינויים</Button>
                </ScrollView>}

        </SafeAreaView>
    )
}