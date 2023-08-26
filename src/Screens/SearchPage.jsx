import { View, Text, SafeAreaView, TouchableOpacity, Alert, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { styles } from '../Styles';
import { TextInput, Button, Searchbar, SegmentedButtons } from 'react-native-paper';
import { AppContext } from '../Contexts/AppContext';
import CardPost from '../Components/CardPost';

import SearchDistance from '../Components/SearchDistance';
import SelectFromList from '../Components/SelectFromList';
import ChooseLocation from '../Components/ChooseLocation';
import { postCategories } from '../Data/constants';
import { postSearch, postSearchByCity, postSearchByCategory, postSearchByDistance, getAddresses } from '../api/index';











export default function SearchPage() {

  const { loggedUser, userToken } = useContext(AppContext);

  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const [searchOptions, setSearchOptions] = useState('none');

  const [category, setCategory] = useState('בחר קטגוריה');

  const [city, setCity] = useState('');

  const [searchDistance, setSearchDistance] = useState(1)

  const [coordinates, setCoordinates] = useState(loggedUser.address.location.coordinates)

  const [searchResults, setSearchResults] = useState(null);

  const [address, setAddress] = useState({ addressInput: '', location: loggedUser.address })

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (address.location.coordinates) {
      setCoordinates((prev) => address.location.coordinates)
    }
    else if (address.location.position) {
      if (Array.isArray(address.location.position))
        setCoordinates((...coordinates) => (address.location.position))
      else if (typeof address.location.position == 'object')
        setCoordinates((...coordinates) => [address.location.position.lon, address.location.position.lat])
      else if (address.location.position) {
        let coords = address.location.position.split(',');
        setCoordinates((...coordinates) => [coords[1], coords[0]])
      }
      //}
    }
    console.log("coordinates updated =>>", coordinates)
  }, [address.location]);

  const searchItems = async () => {
    try {
      setLoading(true);
      console.log("search query:", searchQuery);
      console.log("search type:", searchOptions);
      console.log("city:", city);
      console.log("category:", category);
      console.log("distance:", searchDistance);

      let results;
      // -depending on the searching option the user chose:
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
          const currentCoordinates = coordinates; // -the user get to choose between the address in his profile and his current location according to his mobile device
          results = await postSearchByDistance(searchQuery, searchDistance, currentCoordinates, userToken);
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
        setSearchResults(searchResults => 404)
      }
      else {
        results = await getAddresses(results, userToken)
        setSearchResults(searchResults => results)
      }
    } catch (error) {
      console.log("failed search: " + error)
    }
    finally {
      setLoading(false);
    }
  }


  const renderResult = (post) => {
    if (!post) return;
    return (
      <CardPost post={post.item} />
    )
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
                <ChooseLocation address={address} setAddress={setAddress} />
              </View>
              : searchOptions == 'category' ?
                <SelectFromList list={postCategories} title='קטגוריות' picked={category} setPicked={setCategory} />
                : null}
        </View>
      </View>

      {loading ? <ActivityIndicator /> :
        <View style={[styles.container, { flex: 1 }, { padding: 10 }]}>
          {
            searchResults == 404 ? <Text>לא נמצאו פריטים מתאימים</Text> :
              searchResults ?
                <FlatList
                  data={searchResults}
                  renderItem={renderResult}
                  keyExtractor={item => item._id}
                />
                : null
          }
        </View>}

    </SafeAreaView>


  )
}