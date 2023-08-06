import { View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useContext } from 'react';
import { styles } from '../Styles';
import { TextInput, Button, Searchbar, SegmentedButtons } from 'react-native-paper';
import { AppContext } from '../Contexts/AppContext';

import SearchDistance from '../Components/SearchDistance';
import SelectFromList from '../Components/SelectFromList';
import ChooseLocation from '../Components/ChooseLocation';
import { postCategories } from '../Data/constants';
import { postSearch, postSearchByCity, postSearchByCategory, postSearchByDistance } from '../api/index';


export default function SearchPage() {

  const { loggedUser, userToken } = useContext(AppContext);

  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const [searchOptions, setSearchOptions] = React.useState('none');

  const [category, setCategory] = useState('בחר קטגוריה');

  const [city, setCity] = useState('');

  const [searchDistance, setSearchDistance] = useState(1)

  const [address, setAddress] = useState({ addressInput: '', location: null });

  const [coordinates, setCoordinates] = useState([])


  const searchItems = async () => {
    try {
      console.log("search query:", searchQuery);
      console.log("search type:", searchOptions);
      console.log("city:", city);
      console.log("category:", category);
      console.log("distance:", searchDistance);

      let results;
      switch (searchOptions) {

        case 'none':
          results = await postSearch(searchQuery, userToken);
          break;
        case 'city':
          if (city.trim() == '')
            Alert.alert('נא הכנס עיר')

          else
            results = await postSearchByCity(searchQuery, city, userToken);
          break;
        case 'distance':
          //console.log("user coordinates: " + Array.isArray(loggedUser.address.location.coordinates))
          results = await postSearchByDistance(searchQuery, searchDistance, loggedUser.address.location.coordinates, userToken);
          break;
        case 'category':
          if (category.trim() == '')
            Alert.alert('נא בחר קטגוריה');
          else
            results = await postSearchByCategory(searchQuery, category, userToken)
          break;
        default:
          console.log("no search option");
          break;
      }
      if (results == 404) {
        Alert.alert('לא נמצאו פריטים')
      }
    } catch (error) {
      console.log("failed search: " + error)
    }
  }




  return (
    <SafeAreaView style={[styles.main_container2]}>
      <View style={[styles.sub_container]}>
        <Searchbar
          placeholder="חיפוש פריטים"
          onChangeText={onChangeSearch}
          value={searchQuery}
          onIconPress={searchItems}
        />

        <View style={[styles.searchOptionsContainer]}>
          <Text style={[styles.mediumText]}>סינון לפי:</Text>
          <SegmentedButtons style={[{ margin: '5%' }]}
            value={searchOptions}
            onValueChange={setSearchOptions}
            buttons={[
              {
                value: 'none',
                label: 'ללא',
              },
              {
                value: 'city',
                label: 'עיר',
              },
              {
                value: 'distance',
                label: 'מרחק',
              },
              { value: 'category', label: 'קטגוריה' },
            ]}
          />
        </View>

        <View>
          {searchOptions == 'city' ?
            <View>
              <TextInput label='עיר'
                value={city}
                onChangeText={value => setCity(value)} />
            </View> :
            searchOptions == 'distance' ?
              <View>
                <SearchDistance min={1} max={100} value={searchDistance} setValue={setSearchDistance} />
                <ChooseLocation coordinates={coordinates} setCoordinates={setCoordinates} />
              </View>
              : searchOptions == 'category' ?
                <SelectFromList list={postCategories} title='קטגוריות' picked={category} setPicked={setCategory} />
                : null}
        </View>
      </View>
    </SafeAreaView>
  )
}

