import styles from '../styles/complaint.module.css';
import {useNavigate} from "react-router-dom";
import {useUser} from "@/contexts/UserContextProvider.jsx";
import {pages, reverseStatusMap, statusStylesMap} from "@/constants.js";

/*
    complaint type: {
        id: string,
        title: string,
        description: string,
        status: string
    }
*/


const Complaint = ({complaint, children, index}) => {
    const navigate = useNavigate();
    const {user} = useUser();
    const date = new Date(complaint.createdAt);
    return (
        <div className={`${styles.complaint}`}>
            <div>{index+1}</div>
            <div>{complaint.complaintId}</div>
            <div>{date.toDateString()}</div>
            <div >{complaint.title}</div>
            <div className={statusStylesMap[complaint.status]}
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >{reverseStatusMap[complaint.status]}</div>
            <div className={styles.actions_wrapper}>
                <button onClick={() => {
                    navigate(`${pages.complaint}/${complaint.complaintId}`)
                }}
                className={styles.button}
                >View</button>
                {children}
            </div>
        </div>
    );

}

export default Complaint;