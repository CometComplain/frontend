import './App.css'
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Outlet} from "react-router-dom";
import {Home, Error, Login, LoginError, Complaint, Dashboard, AccessForbidden} from "@pages/";
import {IndexLayout, UserLayout} from "./Layouts";
import {UserContextProvider, useUser} from "./contexts/UserContextProvider.jsx";
import ComplaintForm from "@pages/Form/index.jsx";
import Footer from "@components/Footer/index.jsx";
import Navbar from "@components/Navbar/index.jsx";
import ComplaintButton from "@components/ui/ComplaintButton.jsx";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import { useRef } from 'react';
import { customAxios } from './constants';

const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<>
            <IndexLayout />
            <ComplaintButton/>
        </>}>
            <Route index element={
                <>
                    <Home />
                    <Footer/>
                </>
            }/>
            <Route path="login/" element={<Login/>}/>
            <Route path="login-error/" element={<LoginError/>}/>
            <Route path='access-forbidden/' element={<AccessForbidden/>}/>
            <Route path="*/" element={<Error/>}/>
            <Route path='user/' element={<UserLayout/>} >
                <Route path='dashboard/' element={<Dashboard/>}/>
                <Route path='complaint/:complaintId' element={<Complaint/>}/>
                <Route path='complaint-register/' element={<ComplaintForm/>}/>
                <Route path='*/' element={<AccessForbidden/>}/>
            </Route>
        </Route>
    )
)

const App = () => {
    // const inpRef = useRef(null);
    return (
      <>
        {/* <input type="text" name="url" ref={inpRef} /> */}
        {/* <button onClick={() => {
            // console.log(inpRef.current.value)
            customAxios.get('/api/api/v1/auth/google').then(res => console.log(res));
        }}>Click</button> */}
      <UserContextProvider>
            <QueryClientProvider client={new QueryClient()}>
                <RouterProvider router={routes}/>
                <ReactQueryDevtools/>
            </QueryClientProvider>
        </UserContextProvider>
      </>
    )
}

export default App
