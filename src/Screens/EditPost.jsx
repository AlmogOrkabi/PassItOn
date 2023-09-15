import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';
import React, { useState, useEffect, useContext, useReducer } from 'react';


import { userAllowedPostStatuses } from '../Data/constants';


import { styles, touchableOpacity } from '../Styles';
import { AppContext } from '../Contexts/AppContext';


import Logo from '../Components/Logo';
import SelectFromList from '../Components/SelectFromList';

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
        simplifiedAddress: ''
    },
    photos: {
        edited: false,
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


    return (
        <SafeAreaView style={[styles.main_container2]}>
            <Logo width={200} height={70} />

            <Text style={[styles.mediumTitle]}>דף עריכת פוסט:</Text>
            <View style={[styles.sub_container,]} >

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
                        formState.status.edited ? <View>
                            <SelectFromList list={userAllowedPostStatuses} title='' picked={formState.status.value === '' ? post.status : formState.status.value} setPicked={null} dispatch={dispatch} />
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

                    {
                        formState.status.edited ? <View>
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
                                    onPress={() => dispatch({ type: 'edit', field: 'status' })}
                                />
                                <Text style={[styles.editFormText]}>כתובת הפריט: {post.address.simplifiedAddress}</Text>

                            </View>
                    }

                </View>

            </View>

        </SafeAreaView>
    )
}