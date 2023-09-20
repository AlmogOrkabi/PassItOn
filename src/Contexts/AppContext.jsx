import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export default function AppContextProvider({ children }) {


    const [users, setUsers] = useState([]);
    const [userToken, setUserToken] = useState('');
    const [myPosts, setMyPosts] = useState([])
    // async function LoadUsers() {
    //     let data = require('../Data/users.json');
    //     setUsers(data);
    //     console.log(users)
    // }

    useEffect(() => {
        //LoadUsers();
    }, []);
    useEffect(() => {
        console.log("server error: ", serverError)
    }, [serverError]);




    const Login = (username, password) => {
        let user = users.find((u) => u.username == username && u.password == password)
        console.log(user)
        //setLoggedUser(user);
        return user;
    }

    const [loggedUser, setLoggedUser] = useState({});


    const [serverError, setServerError] = useState(null);

    // const handleServerErrors = () => {
    //     if (!error) return;
    //     if (error.status == 404) {
    //         return 404;

    //     } else if (error.status == 401) {

    //     }
    // }



    const value = { users, setUsers, Login, loggedUser, setLoggedUser, userToken, setUserToken, myPosts, setMyPosts, serverError, setServerError };


    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}