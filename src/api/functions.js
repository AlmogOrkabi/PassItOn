import { uriToBase64, urisArrayToBase64 } from "../utils/index";
import { addNewAddress, getAddress } from "./addresses";
import { registerNewUser } from "./users";
import { addNewPost } from "./posts";

export const createNewUser = async (data) => {
    try {
        // *a profile picture is not mandatory
        let imgBase64 = null;
        if (data.basicDetails.image != '') {
            imgBase64 = await uriToBase64(data.basicDetails.image);
        }

        //-creates a new address for the new user:
        let address = await createNewAddress(data.addresses);

        let newUser = {
            username: data.basicDetails.username,
            firstName: data.basicDetails.firstName,
            lastName: data.basicDetails.lastName,
            phoneNumber: data.securityDetails.phoneNumber,
            email: data.securityDetails.email,
            password: data.securityDetails.password,
            address: address.insertedId,
            photo: imgBase64
        }

        const user = await registerNewUser(newUser)
        return newUser;
    } catch (error) {
        console.error("Failed to create new user: ", error);
        throw error;
    }
}

//            house: data.location.address.streetNumber ? data.location.address.streetNumber : "6",

// lon: parseFloat(data.location.position.split(',')[0]),
// lat: parseFloat(data.location.position.split(',')[1])


function normalizeCityName(city) {
    //-gotta love tomtom API 😐
    const prefixes = ["מזרח", "מערב", "צפון", "דרום"];
    for (let prefix of prefixes) {
        city = city.replace(prefix, '').trim();
    }
    return city;
}


export const createNewAddress = async (data) => {
    try {
        console.log("data", data)

        let lon;
        let lat;

        // !tomtom API keeps changing the format of the responses 😕
        if (data.location.position.lon && data.location.position.lat) {
            lon = parseFloat(data.location.position.lon);
            lat = parseFloat(data.location.position.lat);
        }
        else {
            lat = parseFloat(data.location.position.split(',')[0]);
            lon = parseFloat(data.location.position.split(',')[1]);
        }

        let newAddress = {
            region: data.location.address.countrySubdivision,
            // city: data.location.address.municipality,
            city: normalizeCityName(data.location.address.municipality),
            street: data.location.address.streetName,
            house: data.location.address.streetNumber,
            apartment: data.apartment,
            notes: data.notes,

            simplifiedAddress: data.addressInput,

            lon: lon,
            lat: lat
        }
        console.log("newAddress obj ==>>", newAddress)




        const address = await addNewAddress(newAddress);
        return address;
    } catch (error) {
        console.error("Failed to create new address: ", error);
        throw error;
    }
}

export const createNewPost = async (itemName, description, category, photos, itemLocation, loggedUser, userToken) => {
    try {
        // -convert the images of the item to Base64:
        let base64Images = await urisArrayToBase64(photos);

        // -this is a check to see if the item is at the location the user provided while registering or a new location that needs to be created:
        let address_id;
        if (itemLocation.location.type == 'Point') {
            address_id = itemLocation._id;
        }
        else {
            let address = await createNewAddress(itemLocation);
            address_id = address.insertedId;
        }

        let newPost = {
            owner_id: loggedUser._id,
            itemName: itemName,
            description: description,
            category: category,
            photos: base64Images,
            itemLocation_id: address_id
        }
        const post = await addNewPost(newPost, userToken)
        return post;
    } catch (error) {
        console.log("new post creation FAILED! ==>>", error);
        throw error;
    }
}

// export const createNewPost = async (itemName, description, category, photos, itemLocation, loggedUser, userToken) => {
//     try {
//         console.log("loggedUser:", loggedUser._id);
//         console.log("data:", itemName, description, category, photos, itemLocation);
//         console.log("itemlocation : ", itemLocation);

//         // -convert the images of the item to Base64:
//         let base64Images = await urisArrayToBase64(photos);

//         // -this is a check to see if the item is at the location the user provided while registering or a new location that needs to be created:
//         let address_id;
//         if (itemLocation.location.type == 'Point') {
//             address_id = itemLocation._id;
//         }
//         else {
//             let address = await createNewAddress(itemLocation);
//             address_id = address.insertedId;
//         }

//         let newPost = {
//             owner_id: loggedUser._id,
//             itemName: itemName,
//             description: description,
//             category: category,
//             photos: base64Images,
//             itemLocation_id: address_id
//         }

//         console.log("newPost obj ==>>", newPost);
//         const post = await addNewPost(newPost, userToken)
//         console.log("NEW POST CREATED! ===>>>", post);
//         return post;

//     } catch (error) {
//         console.log("new post creation FAILED! ==>>", error);
//         throw error;
//     }
// }



// export const getAddresses = async (arr, token) => {
//     const objectsWithAddresses = await Promise.all(arr.map(obj => ))
// }

export const getAddresses = async (arr, token) => {
    const objectsWithAddresses = await Promise.all(
        // the async keyword only applies to the function it directly modifies (directly attached to)
        arr.map(async (obj) => {
            const address = await getAddress(obj.itemLocation_id, token);
            return { ...obj, address }; // spread operator (...) to include all properties of the original obj, and then add the address
        })
    );

    console.log("Objects with addresses:", objectsWithAddresses);
    return objectsWithAddresses;
};