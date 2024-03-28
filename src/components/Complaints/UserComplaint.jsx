import Complaint from "./Complaint.jsx";
import { useMutation } from '@tanstack/react-query';
import { deleteComplaint } from "@api/apiCalls";
import styles from '../styles/complaint.module.css';
import {statusMap} from "@/constants.js";
const UserComplaint = ({complaint, deleteMutation, index}) => {

    return (
        <>
            <Complaint complaint={complaint} index={index}>
                {
                    statusMap.Pending === complaint.status && <button className={styles.button} onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        deleteMutation.mutate(complaint.complaintId)
                    }}>Delete it</button>
                }
            </Complaint>
        </>
    );

}

export default UserComplaint;