import {} from 'react';
import {useUser} from "@/contexts/UserContextProvider.jsx";
import {useNavigate} from "react-router-dom";

const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    bottom: '2rem',
    padding: '1rem',
    borderRadius: '.5rem',
    right: '2rem',
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
    cursor:'pointer'
}

const ComplaintButton = () => {
    const {user} = useUser();
    let display = user ? "flex" : "none";
    const url = window.location.href;
    if( url.includes('/complaint-register')) display = "none";
    const naviagte = useNavigate();
    const newStyles = {...styles, display};
    return (
        <div style={newStyles}>
            <button style={{
                backgroundColor:'transparent',
                border:'none',
                outline:'none',
            }}
            onClick={() => {
                naviagte('/user/complaint-register');
            }}
            >Complain</button>
        </div>
    );
}
export default ComplaintButton;