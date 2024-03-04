import './App.css'
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from "react-router-dom";
import {Home, About, Contact, Error, Login, LoginError, Logout} from "@pages/";
import {useState} from "react";
import IndexLayout from "./Layouts/IndexLayout.jsx";
import {UserContextProvider} from "./contexts/UserContextProvider.js";
import {Headers, UserTypes} from './constants.js';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<IndexLayout/>}>
            <Route index element={<Home/>}/>
            <Route path="about" element={<About/>}/>
            <Route path="contact" element={<Contact/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="login-error" element={<LoginError/>}/>
            <Route path="logout" element={<Logout/>}/>
            <Route path="*" element={<Error/>}/>
        </Route>
    )
)

const App = () => {
    const [user, setUser] = useState(
        // {
        //     [Headers.UserUName]: '',
        //     [Headers.UserType]: UserTypes.Complainant,
        // }
        null
    );

    return (
        <UserContextProvider value={{user, setUser}}>
            <RouterProvider router={router}/>
        </UserContextProvider>
    )
}

export default App
