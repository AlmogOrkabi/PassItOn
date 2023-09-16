import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
import { TextInput, IconButton, FAB, Button } from 'react-native-paper';
import React, { useState, useEffect, useContext, useReducer } from 'react';


import { userAllowedPostStatuses, postCategories } from '../Data/constants';
import { openMediaLibrary } from '../utils/index';
import { validatePostData } from '../utils/validations'
import { updatePostData } from '../api/index';

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
        location: null,
        simplifiedAddress: '',
        notes: '',
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

export default function EditPost({ route }) {
    const { post } = route.params;

    const { loggedUser, userToken } = useContext(AppContext);
    const [formState, dispatch] = useReducer(formReducer, initialState);

    const [address, setAddress] = useState({
        location: null,
        addressInput: '',
        notes: null
    });

    const [pictures, setPictures] = useState(post.photos);
    const [newPictures, setNewPictures] = useState([])
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);
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
            console.log("photo: " + photo)
            dispatch({ type: 'removephoto', photo: photo.url });
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
            console.log("address  => " + address.location, address.addressInput);
            console.log(formState)

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
            const validationsRes = validatePostData(updatedData);
            if (!validationsRes.valid) {
                setErr(validationsRes.msg);
                return;
            }

            let result = await updatePostData(post._id, updatedData, userToken, formState.photos.toAdd, formState.photos.toRemove, address);



        } catch (error) {
            console.log("error  => ", error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <SafeAreaView style={[styles.main_container2]}>
            <Logo width={200} height={70} />

            <Text style={[styles.mediumTitle]}>דף עריכת פוסט:</Text>
            {loading ? <View style={[styles.main_container]}>
                <ActivityIndicator />
            </View> :
                <ScrollView nestedScrollEnabled style={[styles.sub_container,]} >

                    <View style={[styles.fieldsGap]}>
                        {
                            formState.itemName.edited ? <View>
                                <TextInput
                                    label="שם הפריט"
                                    value={formState.itemName.value}
                                    onChangeText={text => dispatch({ type: 'update', field: 'itemName', value: text })}
                                    mode='outlined'
                                    placeholder={post.itemName}
                                    style={[]}
                                    //theme={{ roundness: 50, activeOutlineColor: 'white' }}
                                    //activeOutlineColor='red'
                                    outlineStyle={styles.outlinedInputBorder}
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
                        {
                            formState.description.edited ? <View>
                                <TextInput
                                    label="תיאור הפריט"
                                    value={formState.itemName.value}
                                    onChangeText={text => dispatch({ type: 'update', field: 'description', value: text })}
                                    mode='outlined'
                                    placeholder={post.description}
                                    style={[]}
                                    outlineStyle={styles.outlinedInputBorder}
                                    multiline={true}
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
                        {
                            formState.category.edited ? <View>
                                <SelectFromList list={postCategories} title='' picked={formState.category.value === '' ? post.category : formState.category.value} setPicked={null} dispatch={dispatch} field='category' />
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

                        {
                            formState.status.edited ? <View>
                                <SelectFromList list={userAllowedPostStatuses} title='' picked={formState.status.value === '' ? post.status : formState.status.value} setPicked={null} dispatch={dispatch} field='status' />
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


                        {
                            formState.address.edited ? <View>
                                <AddAddress address={address} handleChange={setAddress} />
                                <TextInput
                                    label="הערות לכתובת"
                                    value={address.notes}
                                    onChangeText={text => setAddress((prev) => ({ ...prev, notes: text }))}
                                    mode='outlined'
                                    placeholder={post.address.notes}
                                    style={[]}
                                    outlineStyle={styles.outlinedInputBorder}
                                    multiline={true}
                                />
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
                    {err ? <Text style={[styles.errMsg]}>{err}</Text> : null}
                    <Button mode='contained' style={[styles.nppostButton, styles.smallBtn, { alignSelf: 'center' }]} onPress={() => { handleChanges() }}>שמור שינויים</Button>
                </ScrollView>}

        </SafeAreaView>
    )
}