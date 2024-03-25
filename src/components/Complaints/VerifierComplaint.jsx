import Complaint from "./Complaint.jsx";
import { useMutation } from '@tanstack/react-query';
import {rejectComplaint, verifyComplaint} from "@api/apiCalls";
import styles from '../styles/complaint.module.css';
import {toast} from "sonner";

const VerifierComplaint = ({complaint, verifyMutation, rejectMutation}) => {

    return (
        <>
            <Complaint complaint={complaint}>
                <button className={styles.button} onClick={() => verifyMutation.mutate(complaint.id)}>Verify it</button>
                <button className={styles.button} onClick={() => rejectMutation.mutate(complaint.id)}>Reject it</button>
            </Complaint>

        </>
    );

}

export default VerifierComplaint;