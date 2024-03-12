import Navbar from "../components/Navbar";
import {Outlet} from "react-router-dom";
import ComplaintButton from "@components/ComplaintButton";

const unAuLinks = [{
    name: 'Home', path: '/'
}];
const auLinks = [{
    name: 'Home', path: '/'
}, {
    name: 'Dashboard', path: '/user'
}];

const homeSubs = [
    {name: 'About', path: '/#about'},
    {name: 'Contact', path: '/#contact'}
];

const IndexLayout = ({children}) => {
    return (
        <>
            <Navbar auLinks={auLinks} unAuLinks={unAuLinks} subs={{
                'Home': homeSubs
            }}/>
            {children}
        </>
    );
};

export default IndexLayout;