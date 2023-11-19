import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Divider, List } from 'react-native-paper';
import { styles, touchableOpacity, listStyle } from '../Styles'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SelectFromList({ list, title, picked, setPicked = null, dispatch = null, field = null }) {


    const [expanded, setExpanded] = useState(false);


    const handlePicked = (item) => {
        setExpanded(() => !expanded)
        if (dispatch) {
            dispatch({ type: 'update', field: field, value: item })
        }
        else {
            setPicked(item);
        }
    }


    return (
        <View style={[styles.marginVertical, { flex: 1, maxHeight: 400, width: '100%', }]} >
            {title && <Text style={[styles.smallTitle, { marginBottom: 15, marginLeft: 5 }]}>{title}</Text>}


            <View style={[listStyle.listContainer,]}>
                <TouchableOpacity style={[listStyle.listSelected, styles.flexRow, { justifyContent: 'space-between' }]} activeOpacity={touchableOpacity} onPress={() => setExpanded((prev) => !prev)}>
                    <Text>{picked}</Text>
                    {/* arrow-down  -- another option for an icon */}
                    <MaterialCommunityIcons name="arrow-down-drop-circle-outline" size={20} color="black" />
                </TouchableOpacity>
                {
                    expanded && <ScrollView nestedScrollEnabled style={[listStyle.itemsContainer]}>
                        {list.map((item, index) => (
                            <React.Fragment key={item}>
                                <TouchableOpacity style={[{ marginHorizontal: '5%' }]} activeOpacity={touchableOpacity} onPress={() => handlePicked(item)}>
                                    <Text style={[{ paddingVertical: '1%' }]}>{item}</Text>
                                </TouchableOpacity>
                                {index < list.length - 1 && <Divider theme={{ colors: { outlineVariant: 'gray' } }} style={[{ marginRight: 15, marginLeft: 5, }]} />}
                            </React.Fragment>
                        ))}
                    </ScrollView>
                }
            </View>
        </View >
    )
}