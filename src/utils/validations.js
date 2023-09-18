//TO ADD:
//PHOTO VALIDATION
//
//
//
//
//
//
import { postCategories, postStatuses, requestStatuses, reportTypes } from "../Data/constants";


export function isValidEmail(email) {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    //return email.match(validRegex);
    return isString(email) && validRegex.test(email);
}

export function isString(str) {
    return str != null && typeof str == 'string' && str.trim().length > 0; // checks the string is not empty and is not composed only of white spaces
}

export function isValidPassword(password) {

    //Password rules:
    //1. lenght between 8 to 16 characters.
    //2. any letters must be of the english language.
    //3. must have at least one uppercase letter.
    //4. must have at least one lowercase letter.
    //5. must have at least one digit.
    //6. can include special characters, but it is not a requirement.

    if (!isString(password) || password.length < 8 || password.length > 16) {
        return false;
    }
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /[0-9]/;
    //.test() is js function that checks for a pattern, works with regular expressions objects.
    if (!uppercaseRegex.test(password) || !lowercaseRegex.test(password) || !digitRegex.test(password)) {
        //throw new Error('סיסמה לא תקינה');
        return false;
    }

    return true;
}


export function isValidName(name) {
    const hebOReng = /^[A-Za-z\u0590-\u05FF '-]+$/; //checks for letters in hebrew and english only.also checks for the chars ' and -


    return (isValidUserName(name) && hebOReng.test(name))
}

function isValidUserName(name) {
    return (isString(name) && name.length < 31);
}


export function isValidPhoneNumber(phoneNumber) {
    //return /^05\d*$/.test(phoneNumber) && phoneNumber.length == 10;
    return (/^05\d{8}$/.test(phoneNumber)); // starts with 05, and has exactly 10 characters (8 after 05). ^ - start of a line. & - end of a line.
}

function validateNewUserData(username, firstName, lastName, phoneNumber, email, password, confirmPassword) {
    if (!isValidUserName(username)) {
        return { valid: false, msg: 'שם המשתמש אינו תקין', page: 1, fieldName: 'username' };
    }
    if (!isValidName(firstName)) {
        return { valid: false, msg: 'שם פרטי אינו תקין', page: 1, fieldName: 'firstName' };
    }
    if (!isValidName(lastName)) {
        return { valid: false, msg: 'שם משפחה אינו תקין', page: 1, fieldName: 'lastName' };
    }
    if (!isValidEmail(email)) {
        return { valid: false, msg: 'כתובת דואר אלקטורני אינה תקינה', page: 2, fieldName: 'email' };
    }
    if (!isValidPassword(password)) {
        return { valid: false, msg: 'הסיסמה אינה תקינה', page: 2, fieldName: 'password' };
    }
    if (password !== confirmPassword) {
        return { valid: false, msg: 'סיסמאות לא זהות', page: 2, fieldName: 'confirmPassword' };
    }
    if (!isValidPhoneNumber(phoneNumber)) {
        return { valid: false, msg: 'מספר הטלפון שהוכנס אינו תקין', page: 2, fieldName: 'phoneNumber' };
    }
    return { valid: true };
}

module.exports = { isString, isValidPassword, isValidEmail, isValidName, isValidUserName, isValidPhoneNumber, validateNewUserData }

function validateUserData(updatedData) {
    let fieldsToUpdate = Object.keys(updatedData);

    for (let field of fieldsToUpdate) {
        switch (field) {
            case 'username':
                if (!isValidUserName(updatedData.username)) {
                    return { valid: false, msg: 'שם המשתמש אינו תקין', field: 'username' };
                }
                break;
            case 'firstName':
                if (!isValidName(updatedData.firstName)) {
                    return { valid: false, msg: 'שם פרטי אינו תקין', field: 'firstName' };
                }
                break;
            case 'lastName':
                if (!isValidName(updatedData.lastName)) {
                    return { valid: false, msg: 'שם משפחה אינו תקין', field: 'lastName' };
                }
                break;
            case 'phoneNumber':
                if (!isValidPhoneNumber(updatedData.phoneNumber)) {
                    return { valid: false, msg: 'מספר הטלפון שהוכנס אינו תקין', field: 'phoneNumber' };
                }
                break;
            case 'email':
                if (!isValidEmail(updatedData.email)) {
                    return { valid: false, msg: 'כתובת דואר אלקטורני אינה תקינה', field: 'email' };
                }
                break;
            case 'password':
                if (!isValidPassword(updatedData.password)) {
                    return { valid: false, msg: 'הסיסמה אינה תקינה', field: 'password' };
                }
                break;
            // case 'address_id':
            //     if (!isValidObjectId(updatedData.address_id)) {
            //         return { valid: false, msg: 'הכתובת אינה תקינה' };
            //     }
            //     break;
            default:
                return { valid: false, msg: `Unexpected field: ${field}` };
        }
    }
    return { valid: true };
}

// function isValidUserStatus(userStatus) {
//     console.log(userStatus)
//     let validStatuses = ['פעיל', 'לא פעיל', 'חסום']
//     if (!isString(userStatus) || !validStatuses.includes(userStatus))
//         return { valid: false, msg: 'סטטוס לא תקין' }
//     else
//         return { valid: true }
// }

// //!_____________________POSTS________________________________//



function isValidPostCategory(category) {

    if (!isString(category) || !postCategories.includes(category)) {
        return false;
    }
    else
        return true;
}

function isValidItemName(itemName) {
    if (!isString(itemName) || itemName.length > 50)
        return false;
    else
        return true;
}

function isValidDescription(description) {
    if (!isString(description) || description.length > 300)
        return false;
    return true;
}

function validateNewPostData(itemName, description, category, photos,) {
    if (!isValidItemName(itemName)) {
        return { valid: false, msg: 'שם פריט אינו תקין', field: 'itemName' };
    }
    if (!isValidDescription(description)) {
        return { valid: false, msg: 'תיאור הפריט עד 300 תווים בלבד', field: 'description' };
    }
    if (!isValidPostCategory(category)) {
        return { valid: false, msg: 'קטגורית הפריט אינה תקינה', field: 'category' };
    }
    if (photos.length < 1) {
        return { valid: false, msg: 'נא להעלות לפחות תמונה אחת', field: 'photos' };
    }

    return { valid: true };
}


function validatePostData(updatedData) {
    let fieldsToUpdate = Object.keys(updatedData);

    for (let field of fieldsToUpdate) {
        switch (field) {
            case 'itemName':
                if (!isValidItemName(updatedData.itemName)) {
                    return { valid: false, msg: 'שם פריט אינו תקין', reason: 'itemName' };
                }
                break;
            case 'description':
                if (!isString(updatedData.description) || updatedData.description.length > 300) {
                    return { valid: false, msg: 'תיאור פריט אינו תקין', reason: 'description' };
                }
                break;
            case 'category':
                if (!isValidPostCategory(updatedData.category)) {
                    return { valid: false, msg: 'קטגורית הפריט אינה תקינה', reason: 'category' };
                }
                break;
            case 'photoUrls':
                if (!isValidPhotosArray(updatedData.photoUrls)) {
                    return { valid: false, msg: 'תמונת הפריט אינה תקינה' };
                }
                break;
            // case 'itemLocation_id':
            //     break;
            case 'status':
                if (!isValidPostStatus(updatedData.status)) {
                    return { valid: false, msg: 'סטטוס לא תקין', reason: 'status' };
                }
                break;
            case 'recipient_id':
                if (!isString(updatedData.recipient_id)) {
                    return { valid: false, msg: 'מזהה המשתמש המקבל לא תקין' };
                }
                break;
            default:
                return { valid: false, msg: `Unexpected field: ${field}` };
        }
    }
    return { valid: true };
}

function isValidPostStatus(postStatus) {

    if (!isString(postStatus) || !postStatuses.includes(postStatus))
        return false;
    else
        return true;
}
// function isValidPostStatus(postStatus) {

//     if (!isString(postStatus) || !postStatuses.includes(postStatus)) {
//         return { valid: false, msg: 'סטטוס לא תקין' }
//     }
//     else
//         return { valid: true }
// }

// function validatePostSearchData(maxDistance, userCoordinates, itemName = null) {
//     if (itemName) {
//         if (!isValidItemName(itemName))
//             return { valid: false, msg: 'שם פריט לא תקין' };
//     }
//     if (!isNumber(maxDistance)) {
//         return { valid: false, msg: 'מרחק מקסימלי לא תקין' };
//     }
//     if (!isValidCoordinates(userCoordinates[0], userCoordinates[1])) {
//         return { valid: false, msg: 'מיקום נוכחי לא תקין' };
//     }
//     return { valid: true };
// }

// //!_____________________REPORTS________________________________//


// function isValidReportType(reportType) {
//     //make an array of valid reports and make sure the parameter matches one of the strings inside the array

//     //ideas:
//     // Inappropriate Language:
//     // False Information:
//     // Harassment / Bullying:

//     // Spam: This would be for cases where a user is posting irrelevant or promotional content excessively.

//     // Impersonation: This is when a user is pretending to be someone else in a deceptive manner.

//     //Off - topic Posts: If a user posts something completely unrelated to the discussion or the scope of the platform, this category can be used.

//     // Privacy Violation: This would cover situations where a user posts personal information about another person without their consent.

//     // Intellectual Property Violation: If a user posts content that infringes on someone else 's copyright, trademark, or other intellectual property rights.

//     // Illegal Content: This would be for any posts that involve illegal activities or promote such activities.

//     // Hate Speech / Discrimination: This category is for posts that promote violence or hatred against individuals or groups based on attributes such as race, religion, disability, age, nationality, sexual orientation, gender, etc.

//     let validReportTypes = ["מידע שגוי/מוטעה", "שימוש לרעה במערכת", "הטרדה/התנהגות לא הולמת", "ספאם", "הונאה", "מעבר על חוקי הפורמט", "פגיעה בפרטיות", "פרסום חוזר של פריטים שנמסרו בעבר", "אחר"];

//     if (!isString(reportType) || !validReportTypes.includes(reportType))
//         return { valid: false, msg: "סיבת הדיווח אינה תקינה" };
//     else
//         return { valid: true };


// }

// function isValidReportStatus(reportStatus) {
//     const validStatuses = ['פתוח', 'בטיפול מנהל', 'בבירור', 'סגור'];

//     if (!isString(reportStatus) || !validStatuses.includes(reportStatus)) {
//         return { valid: false, msg: 'סטטוס לא תקין' }
//     }
//     else
//         return { valid: true }
// }

// // function validateNewReportData(owner_id, reportType, userReported, postReported, photoUrls) {
// //     if (!isValidObjectId(owner_id) || owner_id == null || !isString(reportType) || !isValidReportType(reportType) || !isValidObjectId(userReported) || userReported == null || !isValidObjectId(postReported) || !isValidPhotosArray(photoUrls)) // the postReported can be null because it could be only a user was reported and not a post (if a post was reported the creator will be reported as well)
// //         throw new Error("פרטים לא תקינים");
// //     else
// //         return true;
// // }

function isValidReportType(type) {
    if (!isString(type) || !reportTypes.includes(type)) {
        return false;
    }
    else
        return true;
}


function validateNewReportData(owner_id, reportType, userReported, postReported, description) {
    if (!isString(owner_id) || owner_id == null) {
        return { valid: false, msg: 'שגיאה בהעלעת הפוסט' };
    }
    if (!isValidReportType(reportType)) {
        return { valid: false, msg: 'סוג דיווח לא תקין' };
    }
    if (!isString(userReported) || owner_id == null) { // the owner of the post in case a post was reported
        return { valid: false, msg: 'שגיאה בהעלעת הפוסט' };
    }
    if (postReported != null && !isString(postReported)) { // can be null, the report can be only regarding a user and not a specific post
        return { valid: false, msg: 'שגיאה בהעלעת הפוסט' };
    }
    if (description !== '' && (!isString(description) || description.length > 1000)) {
        return { valid: false, msg: 'תיאור לא תקין או ארוך מידי' };
    }

    return { valid: true };
}



// function validateReportData(data) {
//     let fieldsToUpdate = Object.keys(data);

//     for (let field of fieldsToUpdate) {
//         switch (field) {
//             case 'owner_id':
//                 if (!isValidObjectId(data.owner_id) || data.owner_id == null) {
//                     return { valid: false, msg: 'שגיאה בהעלעת הפוסט' };
//                 }
//                 break;
//             case 'reportType':
//                 if (!isValidReportType(data.itemName)) {
//                     return { valid: false, msg: 'סיבת דיווח לא תקינה' };
//                 }
//                 break;
//             case 'description':
//                 if (!isString(data.description) || data.description.length > 300) {
//                     return { valid: false, msg: 'פירוט דיווח אינו תקין' };
//                 }
//                 break;
//             case 'photots':
//                 if (!isValidPhotosArray(data.photots)) {
//                     return { valid: false, msg: 'תמונה אינה תקינה' };
//                 }
//                 break;
//             case 'userReported':
//                 if (!isValidObjectId(data.userReported) || data.userReported == null) {
//                     return { valid: false, msg: 'שגיאה' };  //chage this
//                 }
//                 break;
//             case 'postReported':
//                 if (!isValidObjectId(data.postReported)) { //can be null
//                     return { valid: false, msg: 'שגיאה' }; //change this
//                 }
//                 break;
//             case 'photos':
//                 if (!isValidPhotosArray(data.photos)) {
//                     return { valid: false, msg: 'תמונה לא תקינה' };
//                 }
//                 break;
//             default:
//                 return { valid: false, msg: `Unexpected field: ${field}` };
//         }
//     }
//     return { valid: true };
// }

// //_____________________ADDRESSES________________________________//


// // function isValidLocation(location) {
// //     return typeof location === 'object' && location.type === 'Point' && Array.isArray(location.coordinates) && location.coordinates.length == 2 && isNumber(location.coordinates[0]) && isNumber(location.coordinates[1]) && location.coordinates[0] >= -180 && location.coordinates[0] <= 180 && location.coordinates[1] >= -90 && location.coordinates[1] <= 90;
// // }


// // function isValidLocation(location) {
// //     return typeof location === 'object' && location.type === 'Point' && isValidCoordinates(location.coordinates);
// // }

// // function isValidCoordinates(coordinates) {
// //     return Array.isArray(coordinates) && coordinates.length == 2 && isNumber(coordinates[0]) && isNumber(coordinates[1]) && coordinates[0] >= -180 && coordinates[0] <= 180 && coordinates[1] >= -90 && coordinates[1] <= 90;
// // }

function isNumber(value) {
    return value !== 0 && isFinite(value);
    // isFinite - a function in javascript that checks if a value is an actual valid number (accepts strings as well) - will treat empty strings and white spaces as 0!!!
}

function isValidCoordinates(lon, lat) {
    return isNumber(lon) && isNumber(lat) && lon >= -180 && lon <= 180 && lat >= -90 && lat <= 90;
}

export function isValidAddressNotes(notes) {
    return (typeof notes === 'string' && notes.length < 100)
}


export function validateNewAddressDetails(region, city, street, house, apartment, notes, simplifiedAddress, lon, lat) {
    if (!isString(region)) {
        return { valid: false, msg: 'קלט לא תקין' };
    }
    if (!isString(city)) {
        return { valid: false, msg: 'קלט לא תקין' };
    }
    if (!isString(street)) {
        return { valid: false, msg: 'קלט לא תקין' };
    }
    if (!isNumber(house)) {
        return { valid: false, msg: 'קלט לא תקין' };
    }
    if (!isNumber(apartment) && apartment != null) { // can be null (a private house)
        return { valid: false, msg: 'מספר הדירה אינו תקין' };
    }
    if (!isValidCoordinates(lon, lat)) {
        return { valid: false, msg: 'קלט לא תקין' };
    }
    if (notes !== '' && (!isString(notes) || notes.length > 100)) {
        return { valid: false, msg: 'תיאור לא תקין או ארוך מידי' };
    }
    if (!isString(simplifiedAddress) || simplifiedAddress.length > 51) {
        return { valid: false, msg: 'קלט לא תקין' };
    }

    return { valid: true };
}




// function validateAddressData(updatedData) {
//     let fieldsToUpdate = Object.keys(updatedData);

//     for (let field of fieldsToUpdate) {
//         switch (field) {
//             case 'apartment':
//                 if (!isNumber(updatedData.apartment) && apartment != nul) { // can be null (private house/ not an apartment building)
//                     return { valid: false, msg: 'קלט לא תקין' };
//                 }
//                 break;
//             case 'house':
//                 if (!isNumber(updatedData.house)) {
//                     return { valid: false, msg: 'קלט לא תקין' };
//                 }
//                 break;
//             case 'notes':
//                 if (!isString(updatedData.notes) || updatedData.notes.length > 100) {
//                     return { valid: false, msg: 'תיאור לא תקין או ארוך מידי' };
//                 }
//                 break;
//             default:
//                 return { valid: false, msg: `Unexpected field: ${field}` };
//         }
//     }
//     return { valid: true };
// }

// //NO EDITS YET - NOT SURE IF NECESSARY


// //----------------------------------------------------------

// function validateSort(sortBy, order) {
//     if (!isString(sortBy) || order != -1 && order != 1)
//         return { valid: false, msg: 'קלט לא תקין' };
//     else
//         return { valid: true };
// }

// // function validateObjectId(req, res, next) {
// //     let { _id } = req.params;
// //     if (!isValidObjectId(_id) || _id == null) {
// //         return res.status(400).json({ msg: 'פרטים לא נכונים' });
// //     }
// //     next();
// // }


// function validateObjectId(paramNames) {
//     return function (req, res, next) {
//         if (!Array.isArray(paramNames)) {
//             paramNames = [paramNames];  // handle single paramName for backward compatibility
//         }
//         for (let paramName of paramNames) {
//             let objectId = req.params[paramName];
//             if (!isValidObjectId(objectId) || objectId == null) {
//                 return res.status(400).json({ msg: 'פרטים לא נכונים' });
//             }
//         }
//         next();
//     };
// }

//*****!REQUEESTS******// 

function isValidRequestStatus(requestStatus) {
    if (!isString(requestStatus) || !requestStatuses.includes(requestStatus)) {
        return false;
    }
    return true;
}

function isValidRequestString(requestString) {
    return typeof requestString === 'string' && requestString.length < 301;
}

function validateNewRequestData(requestMessage, postStatus) {

    // if (!isValidObjectId(sender_id)) {
    //     return { valid: false, msg: 'קלט לא תקין' };
    // }
    // if (!isValidObjectId(recipient_id)) {
    //     return { valid: false, msg: 'קלט לא תקין' };
    // }
    // if (!isValidObjectId(post_id)) {
    //     return { valid: false, msg: 'קלט לא תקין' };
    // }
    if (!isValidRequestString(requestMessage)) {
        return { valid: false, msg: 'מלל הבקשה אינו תקין או ארוך מידי' };
    }
    if (postStatus != 'זמין') {
        return { valid: false, msg: 'הפריט כבר אינו זמין למסירה' };
    }

    //ignore, just for debugging purposes:
    //return { valid: false, msg: 'הפריט כבר אינו זמין למסירה' };

    return { valid: true };
}


function validateRequestData(updatedData) { //assuming the sender, the recipient and the post should NOT be changed.
    let fieldsToUpdate = Object.keys(updatedData);

    for (let field of fieldsToUpdate) {
        switch (field) {
            case 'responseMessage':
                if (updatedData.responseMessage && !isValidRequestString(updatedData.responseMessage)) {
                    return { valid: false, msg: 'מלל התשובה אינו תקין או ארוך מידי' };
                }
                break;
            case 'status':
                if (!isValidRequestStatus(updatedData.status)) {
                    return { valid: false, msg: 'סטטוס הבקשה אינו תקין' };
                }
                break;
            default:
                return { valid: false, msg: `Unexpected field:  ${field}` };
        }
    }
    return { valid: true };
}



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~FOR LATER IF THERE'S TIME: ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// async function checkOwnerOrAdmin(req, res, next) {
//     let postId = req.params._id;
//     let userId = req.user._id; // assuming that authenticateToken middleware adds user object to request

//     try {
//         let post = await PostsModel.findById(postId);
//         if (!post) {
//             return res.status(404).json({ msg: "Post not found." });
//         }

//         if (post.owner_id.toString() !== userId && req.user.role !== 'admin') {
//             return res.status(403).json({ msg: "You do not have permission to perform this action." });
//         }

//         // Pass the execution to the next middleware function/route handler
//         next();
//     } catch (error) {
//         return res.status(500).json({ msg: "An error occurred.", error });
//     }
// }



// module.exports = { isValidObjectId, isString, validateSort, validateNewUserData, validateUserData, isValidUserStatus, validateNewPostData, validatePostData, validatePostSearchData, isValidPostStatus, validateNewReportData, validateReportData, isValidReportStatus, validateNewAddressDetails, validateAddressData, isValidPhoto, validateObjectId }

module.exports = { isString, isValidPassword, isValidEmail, isValidName, isValidUserName, isValidPhoneNumber, validateNewUserData, validateUserData, isValidAddressNotes, isValidPostCategory, isValidItemName, isValidDescription, validateNewPostData, validatePostData, isValidPostStatus, validateNewRequestData, validateRequestData, isValidRequestStatus, validateNewReportData };