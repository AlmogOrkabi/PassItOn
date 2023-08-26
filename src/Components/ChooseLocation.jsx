// import { View, Text } from 'react-native'
// import React, { useState, useEffect, useContext } from 'react'

// import { RadioButton } from 'react-native-paper';
// import { styles } from '../Styles'
// import { AppContext } from '../Contexts/AppContext';
// import AddAddress from './AddAddress';

// export default function ChooseLocation({ coordinates, setCoordinates }) {
//     const { loggedUser } = useContext(AppContext)
//     const [fromLocation, setFromLocation] = useState('user')

//     const [address, setAddress] = useState({ addressInput: '', location: null });

//     useEffect(() => {

//     }, [fromLocation]);

//     useEffect(() => {
//         //console.log("LOCATION ===>>>", address) // the response format CHANGES ALL THE TIME
//         if (fromLocation == 'user') {
//             setCoordinates((prev) => loggedUser.address.location.coordinates);
//         }
//         else if (fromLocation == 'newLocation' && address.location) {
//             if (Array.isArray(address.location.position))
//                 setCoordinates((...coordinates) => (address.location.position))
//             else if (typeof address.location.position == 'object')
//                 setCoordinates((...coordinates) => [address.location.position.lon, address.location.position.lat])
//             else if (address.location.position) {
//                 let coords = address.location.position.split(',');
//                 setCoordinates((...coordinates) => [coords[1], coords[0]])
//             }
//         }
//         console.log("from location: " + fromLocation)
//         console.log("coordinates updated =>>", coordinates)
//     }, [address.location]);




//     function handleChange(from) {
//         setFromLocation((prev) => from);
//         if (from == 'user') {
//             setCoordinates((prev) => loggedUser.address.location.coordinates);
//         }
//         else if (from == 'newLocation' && address.location) {
//             if (Array.isArray(address.location.position))
//                 setCoordinates((...coordinates) => (address.location.position))
//             else
//                 setCoordinates((...coordinates) => [address.location.position.lon, address.location.position.lat])
//         }
//         console.log("from location: " + fromLocation)
//         console.log("coordinates: " + coordinates);
//         //console.log("coordinates: " + JSON.stringify(coordinates));

//         // console.log("logged user location: " + JSON.stringify(loggedUser.address.location.coordinates))
//     }

//     return (
//         <View>
//             <View >
//                 <RadioButton.Group onValueChange={(newValue) => handleChange(newValue)} value={fromLocation}>
//                     <View style={[styles.flexRow, { justifyContent: 'center' }]}>
//                         <View style={[styles.flexRow]}>
//                             <RadioButton value="user" />
//                             <Text>המיקום שלי</Text>
//                         </View>
//                         <View style={[styles.flexRow]}>
//                             <RadioButton value="newLocation" />
//                             <Text>מיקום חדש</Text>
//                         </View>
//                     </View>
//                 </RadioButton.Group>
//             </View>
//             <View>
//                 {fromLocation == 'user' ? <Text>{loggedUser.address.simplifiedAddress}</Text> : <AddAddress address={address} handleChange={setAddress} />}
//             </View>

//         </View>
//     )
// }



import { View, Text } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'

import { RadioButton } from 'react-native-paper';
import { styles } from '../Styles'
import { AppContext } from '../Contexts/AppContext';
import AddAddress from './AddAddress';

export default function ChooseLocation({ address, setAddress }) {
    const { loggedUser } = useContext(AppContext)
    const [fromLocation, setFromLocation] = useState('user')

    // const [address, setAddress] = useState({ addressInput: '', location: null });

    useEffect(() => {

        if (fromLocation == 'user') {
            setAddress((prev) => loggedUser.address)
            console.log(loggedUser.address)
        }
    }, [fromLocation]);

    // useEffect(() => {
    //     //console.log("LOCATION ===>>>", address) // the response format CHANGES ALL THE TIME
    //     if (fromLocation == 'user') {
    //         setCoordinates((prev) => loggedUser.address.location.coordinates);
    //     }
    //     else if (fromLocation == 'newLocation' && address.location) {
    //         if (Array.isArray(address.location.position))
    //             setCoordinates((...coordinates) => (address.location.position))
    //         else if (typeof address.location.position == 'object')
    //             setCoordinates((...coordinates) => [address.location.position.lon, address.location.position.lat])
    //         else if (address.location.position) {
    //             let coords = address.location.position.split(',');
    //             setCoordinates((...coordinates) => [coords[1], coords[0]])
    //         }
    //     }
    //     console.log("from location: " + fromLocation)
    //     console.log("coordinates updated =>>", coordinates)
    // }, [address.location]);




    // function handleChange(from) {
    //     setFromLocation((prev) => from);
    //     if (from == 'user') {
    //         setCoordinates((prev) => loggedUser.address.location.coordinates);
    //     }
    //     else if (from == 'newLocation' && address.location) {
    //         if (Array.isArray(address.location.position))
    //             setAddress((...address) => (address.location.position))
    //         else
    //             setCoordinates((...coordinates) => [address.location.position.lon, address.location.position.lat])
    //     }
    //     console.log("from location: " + fromLocation)
    //     console.log("coordinates: " + coordinates);
    //     //console.log("coordinates: " + JSON.stringify(coordinates));

    //     // console.log("logged user location: " + JSON.stringify(loggedUser.address.location.coordinates))
    // }

    return (
        <View style={[styles.container, styles.sub_container2]}>
            <View >
                <RadioButton.Group onValueChange={(newValue) => setFromLocation(newValue)} value={fromLocation}>
                    <View style={[styles.flexRow, { justifyContent: 'center' }]}>
                        <View style={[styles.flexRow]}>
                            <RadioButton value="user" />
                            <Text>המיקום שלי</Text>
                        </View>
                        <View style={[styles.flexRow]}>
                            <RadioButton value="newLocation" />
                            <Text>מיקום חדש</Text>
                        </View>
                    </View>
                </RadioButton.Group>
            </View>
            <View >
                {fromLocation == 'user' ? <Text>{loggedUser.address.simplifiedAddress}</Text> : <AddAddress address={address} handleChange={setAddress} />}
            </View>

        </View>
    )
}