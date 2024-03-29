import { View, Text, SafeAreaView, TouchableOpacity, Alert, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { btnIconColor, styles, theme, touchableOpacity } from '../Styles';
import { TextInput, Button, Searchbar, SegmentedButtons, Portal, IconButton } from 'react-native-paper';
import { AppContext } from '../Contexts/AppContext';
import CardPost from '../Components/CardPost';

import SearchDistance from '../Components/SearchDistance';
import SelectFromList from '../Components/SelectFromList';
import ChooseLocation from '../Components/ChooseLocation';
import { postCategories } from '../Data/constants';
import { searchPosts } from '../api/index';



import { MaterialCommunityIcons } from '@expo/vector-icons';


const MemoizedCardPost = React.memo(CardPost); //React.memo - used to wrap functional components (jsx) when wanting to prevent re-renders when the props stay the same





export default function SearchPage({ navigation }) {

  const { loggedUser, serverError, setServerError } = useContext(AppContext);

  const [searchQuery, setSearchQuery] = useState('');

  const [searchOptionsExpended, setSearchOptionsExpended] = useState(false);

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
    }
    // console.log("coordinates updated =>>", coordinates)
  }, [address.location]);



  const searchItems = async () => {
    try {
      setLoading(true);
      // console.log("search query:", searchQuery);
      // console.log("search type:", searchOptions);
      // console.log("city:", city);
      // console.log("category:", category);
      // console.log("distance:", searchDistance);


      const query = {
        keywords: searchQuery.trim(),
        full: true,

      }

      switch (searchOptions) {
        case 'city':
          if (city.trim() == '')
            Alert.alert('נא הכנס עיר')
          else
            query.city = city.trim();
          break;
        case 'maxDistance':
          const currentCoordinates = coordinates; // -the user get to choose between the address in his profile and his current location according to his mobile device
          query.maxDistance = searchDistance;
          query.userCoordinates = currentCoordinates;
          break;
        default:
          // console.log("no search option"); //* find all of the posts
          break;
      }
      if (category != 'בחר קטגוריה') {
        query.category = category.trim();
      }


      // console.log("query: " + JSON.stringify(query));
      const results = await searchPosts(query);

      if (results == 404) {
        Alert.alert('לא נמצאו פריטים')
        setSearchResults(searchResults => 404)
      }
      else {
        setSearchResults(searchResults => results)
      }
    } catch (error) {
      console.log("failed search: " + error)
      if (error.status == 404)
        setSearchResults(404)
      else
        setServerError(error)
    }
    finally {
      setLoading(false);
    }
  }





  const renderResult = (post) => {
    if (!post) return;

    // console.log("POST ==>>", post)

    return (
      <TouchableOpacity onPress={() => navigation.navigate('common', { screen: 'PostPage', params: { post: post.item } })}><MemoizedCardPost post={post.item} activeOpacity={touchableOpacity} /></TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={[styles.main_container2]}>

      <View style={[styles.sub_container2]}>
        <Searchbar
          placeholder="חיפוש פריטים"
          onChangeText={onChangeSearch}
          value={searchQuery}
          onIconPress={searchItems}
          style={[{ backgroundColor: 'white' }]}
        />
        <View style={[styles.flexRow, { alignItems: 'flex-start' }]}>
          <SelectFromList list={postCategories} picked={category} setPicked={setCategory} />
          <IconButton
            icon="close-thick"
            size={20}
            iconColor={btnIconColor}
            onPress={() => setCategory(prev => 'בחר קטגוריה')}
            style={[styles.canceEditlBtn, { marginTop: 13, }]}
          />
        </View>

        <TouchableOpacity activeOpacity={touchableOpacity} style={[{ marginTop: 20 }, styles.flexRow]} onPress={() => setSearchOptionsExpended(!searchOptionsExpended)}>
          <Text style={[styles.mediumTextBold]}> סינון לפי </Text>
          {searchOptionsExpended ? <MaterialCommunityIcons name="arrow-up-drop-circle-outline" size={20} color="black" /> : <MaterialCommunityIcons name="arrow-down-drop-circle-outline" size={20} color="black" />}


        </TouchableOpacity>

        {searchOptionsExpended &&
          <View >
            <View style={[styles.searchOptionsContainer,]}>


              <SegmentedButtons style={[{ margin: '3%' }]}
                value={searchOptions}
                onValueChange={setSearchOptions}
                theme={{ colors: { secondaryContainer: 'white', onSecondaryContainer: 'purple' } }}
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
                    value: 'maxDistance',
                    label: 'מרחק',
                  },
                ]}
              />
            </View>

            <View>
              {searchOptions == 'city' ?
                <View>
                  <TextInput label='עיר'
                    value={city}
                    onChangeText={value => setCity(value)}
                    style={styles.input}
                    outlineStyle={styles.outlinedInputBorder}
                    mode='outlined'
                  />
                </View> :
                searchOptions == 'maxDistance' ?
                  <View>
                    <SearchDistance min={1} max={100} value={searchDistance} setValue={setSearchDistance} />
                    <ChooseLocation address={address} setAddress={setAddress} />
                  </View>
                  : null}
            </View>
          </View>}

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