import Complaint from "./Complaint.jsx";
import styles from '../styles/complaint.module.css'
import {statusMap} from "@/constants.js";

const TechnicianComplaint = ({complaint, acceptMutation, solvedMutation, index}) => {

    return (
        <>
            <Complaint complaint={complaint} index={index}>
                {
                    complaint.status === statusMap.Verified && (<button className={styles.button} onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        return acceptMutation.mutate(complaint.complaintId);
                    }}>Accept it</button>)
                }
                {
                    complaint.status === statusMap.Accepted && (<button className={styles.button} onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        return solvedMutation.mutate(complaint.complaintId);
                    }}>Solve it</button>)
                }
            </Complaint>
        </>
    );

}

export default TechnicianComplaint;