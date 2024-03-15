import styles from './styles.module.css';
import {useNavigate} from "react-router-dom";
import UserDetails from "./UserDetails";
import Complaints from "./Complaints";

const Dashboard = () => {
    // const navigate = useNavigate();
    return (
        <>
            <div className={styles.dashboard}>
                <UserDetails/>
                <Complaints/>
            </div>
        </>
    );
};

export default Dashboard;
