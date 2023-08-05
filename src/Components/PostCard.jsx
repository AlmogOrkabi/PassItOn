import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import { Styles } from '../Styles'

export default function PostCard() {
    const { owner_id, itemName, description, category, photos, status, creationDate, itemLocation_id } = post;

    return (
        <Card style={styles.card}>
            {/* Item Name */}
            <Text style={styles.title}>{itemName}</Text>

            {/* Item Description */}
            <Text style={styles.description}>{description}</Text>

            {/* Item Category */}
            <Text style={styles.category}>Category: {category}</Text>

            {/* Photos */}
            <View style={styles.photosContainer}>
                {photos.map((photoUri, index) => (
                    <Image key={index} source={{ uri: photoUri }} style={styles.photo} />
                ))}
            </View>

            {/* Status */}
            <Text style={styles.status}>Status: {status}</Text>

            {/* Creation Date */}
            <Text style={styles.creationDate}>Created on: {creationDate}</Text>

            {/* Item Location */}
            <Text style={styles.location}>Location: {itemLocation_id}</Text>

            {/* Add any additional UI components you want in the card */}
            {/* For example, buttons, actions, or icons */}
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 16,
        borderRadius: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        marginBottom: 8,
    },
    category: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 8,
    },
    photosContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 8,
    },
    photo: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 8,
        marginBottom: 8,
    },
    status: {
        fontSize: 14,
        color: 'green',
        marginBottom: 8,
    },
    creationDate: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 8,
    },
    location: {
        fontSize: 14,
        color: 'blue',
    },
});


// import React from 'react';
// import { View, StyleSheet, Text, Image } from 'react-native';
// import { Card, IconButton } from 'react-native-paper';

// const PostCard = ({ post }) => {
//     const { owner_id, itemName, description, category, photos, status, creationDate, itemLocation_id } = post;

//     return (
//         <Card style={styles.card}>
//             {/* Item Name */}
//             <Text style={styles.title}>{itemName}</Text>

//             {/* Item Description */}
//             <Text style={styles.description}>{description}</Text>

//             {/* Item Category */}
//             <Text style={styles.category}>Category: {category}</Text>

//             {/* Photos */}
//             <View style={styles.photosContainer}>
//                 {photos.map((photoUri, index) => (
//                     <Image key={index} source={{ uri: photoUri }} style={styles.photo} />
//                 ))}
//             </View>

//             {/* Status */}
//             <Text style={styles.status}>Status: {status}</Text>

//             {/* Creation Date */}
//             <Text style={styles.creationDate}>Created on: {creationDate}</Text>

//             {/* Item Location */}
//             <Text style={styles.location}>Location: {itemLocation_id}</Text>

//             {/* Add any additional UI components you want in the card */}
//             {/* For example, buttons, actions, or icons */}
//         </Card>
//     );
// };

// const styles = StyleSheet.create({
//     card: {
//         marginVertical: 8,
//         marginHorizontal: 16,
//         padding: 16,
//         borderRadius: 8,
//     },
//     title: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 8,
//     },
//     description: {
//         fontSize: 16,
//         marginBottom: 8,
//     },
//     category: {
//         fontSize: 14,
//         color: 'gray',
//         marginBottom: 8,
//     },
//     photosContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         marginBottom: 8,
//     },
//     photo: {
//         width: 80,
//         height: 80,
//         borderRadius: 8,
//         marginRight: 8,
//         marginBottom: 8,
//     },
//     status: {
//         fontSize: 14,
//         color: 'green',
//         marginBottom: 8,
//     },
//     creationDate: {
//         fontSize: 14,
//         color: 'gray',
//         marginBottom: 8,
//     },
//     location: {
//         fontSize: 14,
//         color: 'blue',
//     },
// });

// export default PostCard;
