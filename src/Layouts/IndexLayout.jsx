import Navbar from "../components/Navbar";
import {Outlet} from "react-router-dom";
import ComplaintButton from "@components/ui/ComplaintButton.jsx";
import {auLinks, subs, unAuLinks} from "@/constants.js";

const IndexLayout = () => {
    return (
        <>
            <Navbar auLinks={auLinks} unAuLinks={unAuLinks} subs={subs}/>
            <Outlet/>
        </>
    );
};

export default IndexLayout;