import styles from '../styles/complaint.module.css';
import {useNavigate} from "react-router-dom";
import {useUser} from "@/contexts/UserContextProvider.jsx";
import {pages} from "@/constants.js";

/*
    complaint type: {
        id: string,
        title: string,
        description: string,
        status: string
    }
*/

const statusMap = {
    [0]: styles.pending,
    [3]: styles.solved,
}

const Complaint = ({complaint, children}) => {
    const navigate = useNavigate();
    const {user} = useUser();
    return (
        <div className={`${styles.complaint} ${statusMap[complaint.status]}`}>
            <div className={styles.details_wrapper}>
                <p>{complaint.id}</p>
                <h3>{complaint.title}</h3>
                <p className={styles.description}>{complaint.description}</p>
            </div>
            <div className={styles.buttons_wrapper}>
                {children && children}
                <button className={styles.button} onClick={() => navigate(`${pages.complaint}/${complaint.complaintId}`)}>View more</button>
            </div>

        </div>
    );

}

export default Complaint;