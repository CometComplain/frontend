import styles from './styles.module.css';
import {useNavigate} from "react-router-dom";
import UserDetails from "./UserDetails";
import Complainant from "./Complainant";
import Technician from "./Technician.jsx";
import Verifier from "./Verifier";
import { useUser } from '@/contexts/UserContextProvider';
import { UserTypes } from '@/constants';
import {useEffect} from "react";

const dashBoardMaps = {
    [UserTypes.Complainant] : Complainant,
    [UserTypes.Technician]: Technician,
    [UserTypes.Verifier] : Verifier,
}


const Dashboard = () => {
    const navigate = useNavigate();
    const { user, requested } = useUser();

    if(!requested) return (
        <div>
            loading...
        </div>
    );
    useEffect(() => {
        if(!user) {
            navigate('/login/', {replace: true});
        }
    }, []);

    const Component = dashBoardMaps[user?.role || UserTypes.Complainant];
    return (
        <>
            <div className={styles.dashboard}>
                <UserDetails/>
                <Component/>
            </div>
        </>
    );
};

export default Dashboard;
