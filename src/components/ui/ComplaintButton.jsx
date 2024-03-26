import {useUser} from "@/contexts/UserContextProvider.jsx";
import {useNavigate} from "react-router-dom";
import styles from '../styles/complaintButton.module.css';
import pen from "@/assets/pen.svg";


const ComplaintButton = () => {
    const {user} = useUser();
    // let display = user ? "flex" : "none";
    let display = "flex";
    const url = window.location.href;
    if( url.includes('/complaint-register')) display = "none";
    const naviagte = useNavigate();
    return (
        <div style={{
            display
        }}
             className={styles.complaintButton}
        >
            <button style={{
                backgroundColor:'transparent',
                border:'none',
                outline:'none',
                color:'var(--quinary-color)',
                fontSize: '1.1rem',
            }}
            onClick={() => {
                naviagte();
            }}
            >Complain</button>
            &nbsp;
            <img src={pen} />
        </div>
    );
}
export default ComplaintButton;