import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import { styles } from '../Styles';
import { TextInput, Button,Searchbar} from 'react-native-paper';
import { AppContext } from '../Contexts/AppContext';

export default function SearchPage() {
    
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);
    return (
        <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
    )
}

