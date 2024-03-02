import Navbar from "../components/Navbar";
import {Outlet} from "react-router-dom";
import Footer from "../components/Footer";

const IndexLayout = () => {
    return (
        <>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    );
};

export default IndexLayout;