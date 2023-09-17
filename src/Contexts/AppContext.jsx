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


    const Login = (username, password) => {
        let user = users.find((u) => u.username == username && u.password == password)
        console.log(user)
        //setLoggedUser(user);
        return user;
    }

    const [loggedUser, setLoggedUser] = useState({});






    const value = { users, setUsers, Login, loggedUser, setLoggedUser, userToken, setUserToken, myPosts, setMyPosts };


    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}