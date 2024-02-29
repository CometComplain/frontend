import './App.css'
import {Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import Contact from "./pages/Contact/Contact.jsx";



function App() {

    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/contact" element={<Contact/>}/>
            </Routes>
        </>
    )
}

export default App
