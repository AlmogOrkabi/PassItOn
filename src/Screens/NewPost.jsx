import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useContext, useReducer, useEffect } from 'react'
import { styles } from '../Styles';
import { TextInput, Button, IconButton, List } from 'react-native-paper';
import { AppContext } from '../Contexts/AppContext';
import Logo from '../Components/Logo';
import { postCategories } from '../Data/constants';
import { FlatList } from 'react-native';
import AddAddress from '../Components/AddAddress';

//import { KeyboardAvoidingView } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { useForm, Controller } from 'react-hook-form';


import { isValidPostCategory, isValidItemName, isValidDescription, validateNewPostData } from '../utils/index'
import { createNewPost } from '../api/index';

import ChooseLocation from '../Components/ChooseLocation';
import SelectFromList from '../Components/SelectFromList';
import AddPictures from '../Components/AddPictures';

export default function NewPost() {

  const [loading, setLoading] = useState(false);
  const { loggedUser, userToken } = useContext(AppContext)
  const [err, setErr] = useState(null);

  const {
    control,
    handleSubmit, trigger,
    formState: { errors, isValid }
  } = useForm({ mode: 'all' })


  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('בחר קטגוריה');
  const [photos, setPhotos] = useState([]);
  const [itemLocation, setItemLocation] = useState({
    addressInput: '',
    location: null
  });

  //const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    // console.log("itemLocation: ", itemLocation)
    // console.log("itemLocation location: ", itemLocation.location)
    // // console.log("itemLocation location address: ", itemLocation.location.address) -> undefined.
    // //console.log("itemLocation location [0]: ", itemLocation.location[0]) --> solved.
    // console.log("itemLocation location positon: ", itemLocation.location.position)
  }, [itemLocation]);

  // const handlePress = () => {
  //   setExpanded(!expanded)
  // }

  // const categoryPicked = (item) => {
  //   setCategory(item);
  //   setExpanded(false); // not working :(
  // }


  // const renderCategory = ({ item }) => {
  //   if (!item)
  //     return;

  //   return (
  //     <TouchableOpacity onPress={() => categoryPicked(item)}  >
  //       <View>
  //         <List.Item title={item} />
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log(status)
    if (status !== 'granted') {
      alert('הרשאה נדחתה');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      // quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      addPhoto(result.uri);
    }
  };


  const addPhoto = (photoUri) => {
    if (photos.length < 6) {
      setPhotos((prevPhotos) => [...prevPhotos, photoUri]);
    }
  };

  const removePhoto = (index) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  const handlePost = async () => {
    try {
      setLoading(true);
      trigger(); //triggers the validation on the input before continuing
      console.log('Item Name:', itemName);
      console.log('Description:', description);
      console.log('Category:', category);
      //console.log('Photos:', photos);
      console.log('Item Location:', itemLocation);


      const validationRes = validateNewPostData(itemName, description, category, photos);
      if (!validationRes.valid) {
        setErr({ msg: validationRes.msg, field: validationRes.field }); // *displays the error for the user
        return;
      }

      const res = await createNewPost(itemName, description, category, photos, itemLocation, loggedUser, userToken)
      if (res.insertedId) {
        Alert.alert('פוסט פורסם בהצלחה!')

        //find the post by ID
        //open post page
      }
    } catch (error) {
      handleServerErros(error);
    }
    finally {
      setLoading(false);
    }
  };






  return (
    <SafeAreaView style={[styles.npcontainer,]}>
      {/* <View style={styles.logocontainer} >
        <Image style={styles.logo} source={require('../Pictures/bpio.png')} />
      </View> */}
      <Logo width={200} height={70} />

      {loading ? <ActivityIndicator /> :
        <ScrollView nestedScrollEnabled >
          <Controller
            control={control}
            name="itemName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="שם פריט"
                value={itemName}
                onBlur={onBlur}
                onChangeText={(value) => { onChange(value); setItemName(value) }}
                style={styles.npinput}
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'שדה חובה'
              },

              validate:
                value => isValidItemName(value) || 'שם הפריט אינו תקין'
            }}
          />
          {errors.itemName && <Text style={[styles.inputError,]} >{errors.itemName.message}</Text>}

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="תיאור הפריט"
                value={description}
                onBlur={onBlur}
                onChangeText={(value) => { onChange(value); setDescription(value) }}
                multiline
                style={styles.npinput}
              />
            )}

            rules={{
              required: {
                value: true,
                message: 'שדה חובה'
              },

              validate:
                value => isValidDescription(value) || 'תיאור הפריט עד 300 תווים בלבד',

            }}
          />
          {errors.description && <Text style={[styles.inputError,]} >{errors.description.message}</Text>}








          <SelectFromList list={postCategories} title='קטגוריות' picked={category} setPicked={setCategory} />
          {err && err.field == 'category' ? <Text style={[styles.inputError,]} >{err.msg}</Text> : null}



          {/* Photo Selection */}
          {/* <Text style={styles.nplabel}>הוספת תמונה (ניתן עד 6)</Text>
          <View style={styles.npphotoContainer}>
            {photos.map((photoUri, index) => (
              <View key={index} style={styles.npphotoItem}>
                <Image source={{ uri: photoUri }} style={styles.npphoto} />
                <IconButton
                  icon="delete"
                  color="red"
                  size={20}
                  onPress={() => removePhoto(index)}
                  style={styles.npdeleteButton}
                />
              </View>
            ))}

            {photos.length < 6 && (
              <IconButton
                icon="plus"
                color="gray"
                size={30}
                // onPress={() => handleAddPhoto('photo_uri_placeholder')}
                onPress={pickImage}
                style={styles.npaddPhotoButton}
              />
            )}
          </View> */}


          <AddPictures photos={photos} setPhotos={setPhotos} title='תמונות של הפריט (עד 6):' />


          {err && err.field == 'photos' ? <Text style={[styles.inputError,]} >{err.msg}</Text> : null}

          <ChooseLocation address={itemLocation} setAddress={setItemLocation} />


          <Button mode="contained" onPress={() => handlePost(handleSubmit)} style={styles.nppostButton}>
            פרסם
          </Button>
        </ScrollView>}

    </SafeAreaView >
  );
}