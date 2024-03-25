import './App.css'
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Outlet} from "react-router-dom";
import {Home, Error, Login, Complaint, Dashboard, AccessForbidden} from "@pages/";
import {IndexLayout, UserLayout} from "./Layouts";
import {UserContextProvider, useUser} from "./contexts/UserContextProvider.jsx";
import ComplaintForm from "@pages/Form/index.jsx";
import Footer from "@components/Footer/index.jsx";
import ComplaintButton from "@components/ui/ComplaintButton.jsx";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'

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
    return (
      <>
      <UserContextProvider>
            <QueryClientProvider client={new QueryClient()}>
                <Toaster richColors duration={2000} position='top-right' style={{
                    top:'5rem',
                }} />
                <RouterProvider router={routes}/>
                {/*<ReactQueryDevtools/>*/}
            </QueryClientProvider>
        </UserContextProvider>
      </>
    )
}

export default App
