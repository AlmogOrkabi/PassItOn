import { View, Text, SafeAreaView, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { Button, RadioButton } from 'react-native-paper';
import { styles, touchableOpacity } from '../Styles';
import { AppContext } from '../Contexts/AppContext';
import SelectFromList from '../Components/SelectFromList';
import { reportTypes } from '../Data/constants.js'
import AddPictures from '../Components/AddPictures';
import { validateNewReportData } from '../utils/validations.js'
import { createNewReport } from '../api/index';


export default function ReportForm({ route }) {

    const { post, userToReport } = route.params;
    const { loggedUser, userToken, serverError, setServerError } = useContext(AppContext)
    const [photos, setPhotos] = useState([]);
    const [reportReason, setReportReason] = useState('נא לבחור את סוג הדיווח');
    const [reportTarget, setReportTarget] = useState('post')
    const [userInput, setUserInput] = useState('');
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    async function handleSubmit() {
        try {
            setLoading(true);
            setErr(null);

            const postReported = reportTarget === 'post' ? post._id : null;
            const relatedUser = userToReport && reportTarget !== 'post' ? userToReport._id : post.owner_id;
            const validationRes = validateNewReportData(loggedUser._id, reportReason, relatedUser, postReported, userInput);

            if (!validationRes.valid) {
                setErr(validationRes.msg);
                return;

            }
            if (photos.length < 1) {
                setErr('נא הוסף לפחות תמונה אחת');
                return;
            }
            const res = await createNewReport(loggedUser._id, reportReason, relatedUser, postReported, photos, userInput, userToken);

            if (res.insertedId) {
                setSuccess(true);
            }


        } catch (error) {
            console.log("error here")
            setServerError({ ...error });
        } finally {
            setLoading(false);
        }
    }



    return (
        <SafeAreaView style={[styles.main_container2]}>
            {loading ? <View>
                <ActivityIndicator />
            </View>
                :
                success ? <View style={[styles.containerCenter, { marginTop: '20%' }]}>
                    <Text style={[styles.titleBold, styles.textGreen]}>דיווח נשלח בהצלחה</Text>
                    <Text>תודה על הדיווח, נטפל בו בהקדם האפשרי</Text>
                </View>
                    :
                    <ScrollView style={[styles.sub_container2]} nestedScrollEnabled >
                        <Text style={[styles.mediumTitle, { alignSelf: 'center', fontSize: 20 }, styles.marginVertical]}>טופס דיווח</Text>
                        <View>

                            <SelectFromList list={reportTypes} title='סיבת הדיווח' picked={reportReason} setPicked={setReportReason} />

                            <View style={[{ maxHeight: '15%' }]}>
                                <RadioButton.Group onValueChange={newValue => setReportTarget(newValue)} value={reportTarget} >
                                    <View style={[styles.marginVertical]}>
                                        <Text style={[styles.smallTitle, styles.marginVertical]}>הדיווח על:</Text>
                                        <View style={[styles.flexRowCenter,]}>
                                            <View style={[styles.flexRowCenter, styles.marginHorizontal]}>
                                                <RadioButton value="post" />
                                                <Text>פריט</Text>
                                            </View>
                                            <View style={[styles.flexRowCenter, styles.marginHorizontal]}>
                                                <RadioButton value="user" />
                                                <Text>משתמש</Text>
                                            </View>
                                        </View>
                                    </View>
                                </RadioButton.Group>
                            </View>

                            {reportTarget === 'post' ?
                                <View style={[]}>
                                    <Text style={[styles.smallTitle]}>שם הפריט: {post.itemName}</Text>
                                </View>
                                : null}

                            <View style={[styles.sub_container]}>
                                <Text style={[styles.text_underline, styles.mediumTextBold]}>נא הרחב בכמה מילים על סיבת הדיווח:</Text>
                                <TextInput style={[styles.native_input, userInput.length > 1000 ? styles.borderRed : null]}
                                    placeholder="פירוט הדיווח"
                                    onChangeText={setUserInput}
                                    value={userInput}
                                    multiline={true}
                                    maxLength={300} />
                            </View>


                            <AddPictures photos={photos} setPhotos={setPhotos} title='נא הוסף תמונות רלוונטיות' />
                            <Text style={[styles.errMsg, styles.marginVertical, { alignSelf: 'center' }]}>{err ? `${err}` : null}</Text>
                        </View>


                        <Button mode='contained' style={[{ maxWidth: '50%', alignSelf: 'center' }]} onPress={() => handleSubmit()}>שליחת דיווח</Button>

                    </ScrollView>
            }

        </SafeAreaView>
    )
}