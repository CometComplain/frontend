import styles from '../styles/complaint.module.css';
import {useNavigate} from "react-router-dom";

/*
    complaint type: {
        id: string,
        title: string,
        description: string,
        status: string
    }
*/

const statusMap = {
    'solved': styles.solved,
    'pending': styles.pending,
    '': '',
}

const Complaint = ({complaint}) => {
    const navigate = useNavigate();
    return (
        <div className={`${styles.complaint} ${statusMap[complaint.status]}`} onClick={() => {
            navigate(`/user/complaint/${complaint.id}`)
        }}>
            <p>{complaint.id}</p>
            <h3>{complaint.title}</h3>
            <p>{complaint.description}</p>
        </div>
    );
}

export default Complaint;