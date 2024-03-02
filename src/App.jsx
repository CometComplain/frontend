import './App.css'
import {Routes, Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from "react-router-dom";
import {Home, About, Contact, Error, Login} from "./pages";
import React from "react";
import IndexLayout from "./Layouts/IndexLayout.jsx";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<IndexLayout />} >
            <Route index element={<Home />} />
            <Route path="about" element={<About/>} />
            <Route path="contact" element={<Contact/>} />
            <Route path="login" element={<Login/>} />
            <Route path="*" element={<Error/>} />
        </Route>
    )
)

const App = () => {

    return (
        <RouterProvider router={router}/>
    )
}

export default App
