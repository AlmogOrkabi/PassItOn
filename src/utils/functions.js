export const uriToBase64 = async (uri) => {
    try {
        console.log("uri =>", uri)
        const response = await fetch(uri);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error("Failed to convert URI to Base64: ", error.toString());
    }
}

// export const uriToBase64 = async (uri) => {
//     try {
//         console.log("uri =>", uri)
//         const response = await fetch(uri);
//         const blob = await response.blob();
//         return new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 let base64data = reader.result;
//                 const cleanedBase64String = base64data.replace(/^data:image\/[a-z]+;base64,/, "");
//                 resolve(cleanedBase64String);
//             };
//             reader.onerror = reject;
//             reader.readAsDataURL(blob);
//         });
//     } catch (error) {
//         console.error("Failed to convert URI to Base64: ", error.toString());
//     }
// }




