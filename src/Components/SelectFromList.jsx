import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { List } from 'react-native-paper';


export default function SelectFromList({ list, title, picked, setPicked }) {


    const [expanded, setExpanded] = useState(true);

    const handlePress = () => {
        setExpanded(!expanded)
    }


    const handlePicked = (item) => {
        setPicked(item);
        setExpanded(false); // not working :(
    }


    const renderItems = ({ item }) => {
        if (!item)
            return;

        return (
            <TouchableOpacity onPress={() => handlePicked(item)}  >
                <View>
                    <List.Item title={item} />
                </View>
            </TouchableOpacity>
        );
    };


    return (

        <View>
            <List.Section title={title}>
                <List.Accordion title={picked}
                    left={props => <List.Icon {...props} icon="folder"
                        expanded={expanded}
                        onPress={handlePress}
                    />} >

                    <FlatList data={list}
                        renderItem={renderItems}
                        keyExtractor={(item) => item}
                        style={[, { maxHeight: 250 }]} />
                </List.Accordion >
            </List.Section>
        </View>
    )
}