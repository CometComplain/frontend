import './App.css'
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Outlet} from "react-router-dom";
import {Home, Error, Login, LoginError, Logout, Dashboard, AccessForbidden} from "@pages/";
import {IndexLayout, UserLayout} from "./Layouts";
import {UserContextProvider, useUser} from "./contexts/UserContextProvider.jsx";
import ComplaintForm from "@pages/Form/index.jsx";
import Footer from "@components/Footer/index.jsx";
import Navbar from "@components/Navbar/index.jsx";
import ComplaintButton from "@components/ComplaintButton.jsx";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'


const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<>
            <Outlet/>
            <ComplaintButton/>
        </>}>
            <Route index element={
                <>
                    <IndexLayout>
                        <Home/>
                        <Footer/>
                    </IndexLayout>
                </>
            }/>
            <Route path="login" element={<Login/>}/>
            <Route path="login-error" element={<LoginError/>}/>
            {/*<Route path="logout" element={<Logout/>}/>*/}
            <Route path='access-forbidden' element={<AccessForbidden/>}/>
            <Route path="*" element={<Error/>}/>
            <Route path='user/' element={<Outlet/>}>
                <Route path='' element={<Dashboard/>}/>
                <Route path='complaint-register' element={<ComplaintForm/>}/>
                <Route path='*' element={<AccessForbidden/>}/>
            </Route>
        </Route>
    )
)

const App = () => {
    // const {userG} = useUser();
    return (
        <UserContextProvider>
            <QueryClientProvider client={new QueryClient()}>
                <RouterProvider router={routes}/>
                {/*<ReactQueryDevtools/>*/}
            </QueryClientProvider>
        </UserContextProvider>
    )
}

export default App
