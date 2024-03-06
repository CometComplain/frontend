import './App.css'
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from "react-router-dom";
import {Home, About, Contact, Error, Login, LoginError, Logout, Dashboard, AccessForbidden} from "@pages/";
import {IndexLayout, UserLayout} from "./Layouts";
import {UserContextProvider, useUser} from "./contexts/UserContextProvider.jsx";
import {Headers, UserTypes} from './constants.js';


const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<IndexLayout/>}>
            <Route index element={<Home/>}/>
            <Route path="about" element={<About/>}/>
            <Route path="contact" element={<Contact/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="login-error" element={<LoginError/>}/>
            {/*<Route path="logout" element={<Logout/>}/>*/}
            <Route path='access-forbidden' element={<AccessForbidden/>} />
            <Route path="*" element={<Error/>}/>
            <Route path='user/' element={<UserLayout/>}>
                <Route index element={<Dashboard />}/>
                {/*<Route path='complaint' element={<Error/>} />*/}
                <Route path='' element={<AccessForbidden/>} />
            </Route>
        </Route>
    )
)

const App = () => {
    // const {user} = useUser();
    return (
        <UserContextProvider>
            <RouterProvider router={routes}/>
        </UserContextProvider>
    )
}

export default App
