import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Divider, List } from 'react-native-paper';
import { styles, touchableOpacity, listStyle } from '../Styles'

export default function SelectFromList({ list, title, picked, setPicked = null, dispatch = null, field = null }) {


    const [expanded, setExpanded] = useState(false);

    const handlePress = () => {
        setExpanded(() => !expanded)
    }

    const toggleAccordion = () => {
        setExpanded((prev) => !prev);
    };


    const handlePicked = (item) => {
        setExpanded(() => !expanded)
        if (dispatch) {
            dispatch({ type: 'update', field: field, value: item })
        }

        else {
            setPicked(item);
        }
        //setExpanded((prev) => !prev); // not working :(

    }

    // useEffect(() => { //not working :(
    //     // setExpanded((prev) => !prev)
    //     handlePress();
    // }, [picked]);

    useEffect(() => {
        //setExpanded(!expanded)
        console.log("expended " + expanded)
    }, [expanded])


    useEffect(() => {
        //setExpanded(!expanded)
        console.log("rendered ")
    }, [])

    // const renderItems = ({ item }) => {
    //     if (!item)
    //         return;

    //     return (
    //         <TouchableOpacity activeOpacity={touchableOpacity} onPress={() => handlePicked(item)} >
    //             <List.Item title={item} />
    //         </TouchableOpacity>
    //     );
    // };




    // return (

    //     <View style={[{ maxHeight: 400, width: '85%', }]} >
    //         <List.Section title={title}  >
    //             <List.Accordion title={picked}
    //                 left={props => <List.Icon {...props} icon="folder"
    //                     expanded={expanded}
    //                     onPress={handlePress}

    //                 />} >

    //                 {/* <FlatList data={list}
    //                     renderItem={renderItems}
    //                     keyExtractor={(item) => item}
    //                     style={[, { maxHeight: 250, backgroundColor: 'white' }]}
    //                     ItemSeparatorComponent={<Divider theme={{ colors: { outlineVariant: 'purple' } }} />}
    //                     nestedScrollEnabled /> */}

    //                 <ScrollView nestedScrollEnabled style={{ maxHeight: 250, backgroundColor: 'white' }}>
    //                     {list.map((item, index) => (
    //                         <React.Fragment key={item}>
    //                             <TouchableOpacity activeOpacity={touchableOpacity} onPress={() => handlePicked(item)}>
    //                                 <List.Item title={item} titleStyle={[{ fontSize: 13 }]} />
    //                             </TouchableOpacity>
    //                             {index < list.length - 1 && <Divider theme={{ colors: { outlineVariant: 'purple' } }} style={[{ marginRight: 15 }]} />}
    //                         </React.Fragment>
    //                     ))}
    //                 </ScrollView>
    //             </List.Accordion >
    //         </List.Section>
    //     </View>
    // )


    return (

        <View style={[styles.marginVertical, { flex: 1, maxHeight: 400, width: '85%', }]} >
            {title && <Text style={[styles.smallTitle, { marginBottom: 15, marginLeft: 5 }]}>{title}</Text>}


            <View style={[listStyle.listContainer,]}>
                <TouchableOpacity style={[listStyle.listSelected]} activeOpacity={touchableOpacity} onPress={() => setExpanded((prev) => !prev)}>
                    <Text>{picked}</Text>
                </TouchableOpacity>
                {
                    expanded && <ScrollView nestedScrollEnabled style={[listStyle.itemsContainer]}>
                        {list.map((item, index) => (
                            <React.Fragment key={item}>
                                <TouchableOpacity style={[{ marginHorizontal: '5%' }]} activeOpacity={touchableOpacity} onPress={() => handlePicked(item)}>
                                    <Text>{item}</Text>
                                </TouchableOpacity>
                                {index < list.length - 1 && <Divider theme={{ colors: { outlineVariant: 'purple' } }} style={[{ marginRight: 15, marginLeft: 5 }]} />}
                            </React.Fragment>
                        ))}
                    </ScrollView>
                }
            </View>
        </View >
    )
}