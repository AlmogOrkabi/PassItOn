import { uriToBase64, urisArrayToBase64 } from "../utils/index";
import { addNewAddress, getAddress } from "./addresses";
import { registerNewUser, getUserById, editUserData } from "./users";
import { addNewPost, postSearchById, updatePost } from "./posts";
import { sendNewRequest } from './requests';
import { addNewReport } from "./reports";


import { validatePostData, validateUserData } from '../utils/validations'


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

export const getAddresses = async (arr, token) => {
    try {
        const objectsWithAddresses = await Promise.all(
            // the async keyword only applies to the function it directly modifies (directly attached to)
            arr.map(async (obj) => {
                const address = await getAddress(obj.itemLocation_id, token);
                return { ...obj, address }; // spread operator (...) to include all properties of the original obj, and then add the address
            })
        );

        // console.log("Objects with addresses:", objectsWithAddresses);
        return objectsWithAddresses;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


export const createNewRequest = async (postOwner_id, post_id, sender_id, message, token) => {
    try {
        const newRequest = {
            sender_id: sender_id.trim(),
            recipient_id: postOwner_id.trim(),
            requestMessage: message.trim(),
            post_id: post_id.trim()
        }
        console.log("Formatted new request:", newRequest);
        const request = await sendNewRequest(newRequest, token)
        return request;
    } catch (error) {
        console.error("Failed to create new Request: ", error);
        throw error;
    }
};



export const getRequestSenderData = async (requestsArr, token) => {
    try {
        const requestsWithUsersData = await Promise.all(
            requestsArr.map(async (obj) => {
                const user = await getUserById(obj.sender_id, token);
                return { ...obj, user };
            })
        )
        return requestsWithUsersData;

    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getRequestRecipientData = async (requestsArr, token) => {
    try {
        const requestsWithUsersData = await Promise.all(
            requestsArr.map(async (obj) => {
                const user = await getUserById(obj.recipient_id, token);
                return { ...obj, user };
            })
        )
        return requestsWithUsersData;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getRequestsPostData = async (requestsArr, token) => {
    try {
        const requestsWithPostData = await Promise.all(
            requestsArr.map(async (obj) => {
                const post = await postSearchById(obj.post_id, token);
                return { ...obj, post };
            })
        )

        return requestsWithPostData

    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updatePostStatus = async (post_id, status, token, requestingUserId = null) => {
    try {

        const updatedData = {
            status: status,
        }

        if (requestingUserId) {
            updatedData.recipient_id = requestingUserId;
        }


        let validationRes = await validatePostData(updatedData)
        if (!validationRes.valid) {
            throw new Error(validationRes.msg);
        }



        const res = await updatePost(post_id, updatedData, token);
        return res;

    } catch (error) {
        console.log("ERR HERE1 ", error);
        throw error;
    }
};

export const updatePostData = async (post_id, updatedData, token, toAdd = [], toRemove = [], address = null) => {
    try {


        let validationRes = await validatePostData(updatedData)
        if (!validationRes.valid) {
            throw new Error(validationRes.msg);
        }


        let newAddress;
        if (address) {
            newAddress = await createNewAddress(address);
            updatedData.itemLocation_id = newAddress.insertedId;
        }


        let imgsToAdd;
        if (toAdd && toAdd.length > 0) {
            imgsToAdd = await urisArrayToBase64(toAdd);
        }

        console.log(toRemove)
        const res = await updatePost(post_id, updatedData, token, imgsToAdd, toRemove);
        console.log("we got here1");
        return res;


    } catch (error) {
        console.log("ERR HERE2 ", error);
        throw error;
    }
}


export const createNewReport = async (owner_id, reportType, userReported, postReported, photos, description, token) => {
    try {

        let base64Images = await urisArrayToBase64(photos);

        const newReport = {
            owner_id: owner_id,
            reportType: reportType,
            userReported: userReported,
            postReported: postReported,
            photos: base64Images,
            description: description
        }

        const report = await addNewReport(newReport, token);

        return report;

    } catch (error) {
        console.log("error here 1: " + error.msg);
        throw error;
    }

};


export const editUser = async (userId, data, token, address = null) => {
    try {

        if (data.newPhoto) {
            data.newPhoto = await uriToBase64(data.newPhoto);
        }
        if (address) {
            let newAddress = await createNewAddress(address)
            data.address_id = newAddress.insertedId;
        }


        const response = editUserData(userId, data, token);

        return response;

    } catch (error) {
        console.log(error);
        throw error;
    }
}