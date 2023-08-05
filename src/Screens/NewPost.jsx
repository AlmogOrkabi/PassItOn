


// export default function NewPost({ navigation }) {
//   return (
//     <View>
//       <Text>NewPost</Text>
//     </View>
//   )
// }

import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useState, useContext } from 'react'
import { styles } from '../Styles';
import { TextInput, Button, IconButton } from 'react-native-paper';
import { AppContext } from '../Contexts/AppContext';

export default function NewPost() {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [photos, setPhotos] = useState([]);
  const [itemLocation, setItemLocation] = useState('');

  const handleAddPhoto = (photoUri) => {
    if (photos.length < 4) {
      setPhotos((prevPhotos) => [...prevPhotos, photoUri]);
    }
  };

  const handleRemovePhoto = (index) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  const handlePost = () => {
    // Handle posting the new post (you can add your logic here)
    console.log('Item Name:', itemName);
    console.log('Description:', description);
    console.log('Category:', category);
    console.log('Photos:', photos);
    console.log('Item Location:', itemLocation);
  };

  return (
    <SafeAreaView style={[styles.main_container, styles.npcontainer]}>
      <View style={styles.logocontainer} >
        <Image style={styles.logo} source={require('../Pictures/bpio.png')} />
      </View>
      <TextInput
        label="שם פריט"
        value={itemName}
        onChangeText={(text) => setItemName(text)}
        style={styles.npinput}
      />

      <TextInput
        label="תיאור הפריט"
        value={description}
        onChangeText={(text) => setDescription(text)}
        multiline
        style={styles.npinput}
      />

      <TextInput
        label="קטגוריה"
        value={category}
        onChangeText={(text) => setCategory(text)}
        style={styles.npinput}
      />

      {/* Photo Selection */}
      <Text style={styles.nplabel}>הוספת תמונה (ניתן עד 4)</Text>
      <View style={styles.npphotoContainer}>
        {photos.map((photoUri, index) => (
          <View key={index} style={styles.npphotoItem}>
            <Image source={{ uri: photoUri }} style={styles.npphoto} />
            <IconButton
              icon="delete"
              color="red"
              size={20}
              onPress={() => handleRemovePhoto(index)}
              style={styles.npdeleteButton}
            />
          </View>
        ))}
        {photos.length < 4 && (
          <IconButton
            icon="plus"
            color="gray"
            size={30}
            onPress={() => handleAddPhoto('photo_uri_placeholder')}
            style={styles.npaddPhotoButton}
          />
        )}
      </View>

      <TextInput
        label="מיקום פריט"
        value={itemLocation}
        onChangeText={(text) => setItemLocation(text)}
        style={styles.npinput}
      />

      <Button mode="contained" onPress={handlePost} style={styles.nppostButton}>
        פרסם
      </Button>
    </SafeAreaView >
  );
}