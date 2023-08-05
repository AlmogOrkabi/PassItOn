import { uriToBase64 } from "../utils/index";
import { addNewAddress } from "./addresses";
import { registerNewUser } from "./users";

export const createNewUser = async (data) => {
    try {
        let imgBase64 = null;
        if (data.basicDetails.image != '') {
            imgBase64 = await uriToBase64(data.basicDetails.image);
        }
        let address_id = null;
        if (data.addresses.addressInput != '') {
            let address = await createNewAddress(data.addresses);
            address_id = address.insertedId;
        }


        let newUser = {
            username: data.basicDetails.username,
            firstName: data.basicDetails.firstName,
            lastName: data.basicDetails.lastName,
            phoneNumber: data.securityDetails.phoneNumber,
            email: data.securityDetails.email,
            password: data.securityDetails.password,
            address: address_id,
            photo: imgBase64

        }

        const user = await registerNewUser(newUser)
        return newUser;
    } catch (error) {
        console.error("Failed to create new user: ", error);
    }
}

export const createNewAddress = async (data) => {
    try {
        // console.log("data", data.location.address)
        //console.log("DATA FUNCTION ==>>", data)
        console.log("FAILED DATA? ==>", data.location.position)


        let lon;
        let lat;
        if (Array.isArray(data.location.position)) {
            lat = parseFloat(data.location.position.split(',')[0]);
            lon = parseFloat(data.location.position.split(',')[1]);
        }
        else {
            lon = parseFloat(data.location.position.lon);
            lat = parseFloat(data.location.position.lat);
        }

        let newAddress = {
            region: data.location.address.countrySubdivision,
            city: data.location.address.municipality,
            street: data.location.address.streetName,
            house: data.location.address.streetNumber,
            //those 2 needs to be added to the form later on 
            apartment: "",
            notes: "",

            simplifiedAddress: data.addressInput,

            // lon: parseFloat(data.location.position.split(',')[0]),
            // lat: parseFloat(data.location.position.split(',')[1])

            lon: lon,
            lat: lat
        }
        console.log("newAddress obj ==>>", newAddress)

        const address = await addNewAddress(newAddress);
        //console.log("DB address:", address);
        return address;
    } catch (error) {
        console.error("Failed to create new address: ", error);
    }
}