import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useContext, useReducer, useEffect } from 'react'
import { styles } from '../Styles';
import { TextInput, Button, IconButton, List } from 'react-native-paper';
import { AppContext } from '../Contexts/AppContext';
import { postCategories } from '../Data/constants';
import { useForm, Controller } from 'react-hook-form';


import { isValidPostCategory, isValidItemName, isValidDescription, validateNewPostData } from '../utils/index'
import { createNewPost } from '../api/index';

import ChooseLocation from '../Components/ChooseLocation';
import SelectFromList from '../Components/SelectFromList';
import AddPictures from '../Components/AddPictures';

export default function NewPost({ navigation }) {

  const [loading, setLoading] = useState(false);
  const { loggedUser, userToken, serverError, setServerError } = useContext(AppContext)
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
    location: null,
    notes: '',
  });

  const resetForm = () => {
    setItemName('');
    setDescription('');
    setCategory('בחר קטגוריה');
    setPhotos([]);
    setItemLocation({
      addressInput: '',
      location: null,
      notes: '',
    });
  }

  useEffect(() => {
    // console.log("itemLocation: ", itemLocation)
    // console.log("itemLocation location: ", itemLocation.location)
    // // console.log("itemLocation location address: ", itemLocation.location.address) -> undefined.
    // //console.log("itemLocation location [0]: ", itemLocation.location[0]) --> solved.
    // console.log("itemLocation location positon: ", itemLocation.location.position)
  }, [itemLocation]);

  const handlePost = async () => {
    try {
      setLoading(true);
      trigger(); //* triggers the validation on the input before continuing
      // console.log('Item Name:', itemName);
      // console.log('Description:', description);
      // console.log('Category:', category);
      // console.log('Item Location:', itemLocation);


      const validationRes = validateNewPostData(itemName, description, category, photos);
      if (!validationRes.valid) {
        setErr({ msg: validationRes.msg, field: validationRes.field }); // *displays the error for the user
        return;
      }

      const res = await createNewPost(itemName, description, category, photos, itemLocation, loggedUser, userToken)
      if (res.insertedId) {
        Alert.alert('פוסט פורסם בהצלחה!')
        resetForm();
        navigation.navigate('MyPosts');

      }
    } catch (error) {
      console.log("new post error: " + error)
      setServerError({ ...error });
    }
    finally {
      setLoading(false);
    }
  };






  return (
    <SafeAreaView style={[styles.main_container2,]}>
      {loading ? <View style={[styles.main_container,]}><ActivityIndicator /></View> :
        <ScrollView nestedScrollEnabled style={[styles.sub_container2]}>
          <Controller
            control={control}
            name="itemName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="שם פריט"
                value={itemName}
                onBlur={onBlur}
                onChangeText={(value) => { onChange(value); setItemName(value) }}
                style={styles.input}
                outlineStyle={styles.outlinedInputBorder}
                mode='outlined'
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
                multiline={true}
                style={[styles.multilineInput]}
                outlineStyle={styles.outlinedInputBorder}
                mode='outlined'
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

          <AddPictures photos={photos} setPhotos={setPhotos} title='תמונות של הפריט (עד 6):' />


          {err && err.field == 'photos' ? <Text style={[styles.inputError,]} >{err.msg}</Text> : null}

          <ChooseLocation address={itemLocation} setAddress={setItemLocation} addNotes={true} />


          <Button mode="contained" onPress={() => handlePost(handleSubmit)} style={styles.nppostButton}>
            פרסם
          </Button>
        </ScrollView>}

    </SafeAreaView >
  );
}