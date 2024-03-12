import Complaint from "@components/Complaint.jsx";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {getComplaints} from "@/utils/index.js";
import {useUser} from "@/contexts/UserContextProvider.jsx";

const SolvedComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const {jwt} = useUser();
    const complaintsQuery = useQuery({
        queryKey: ['complaints', 'solved'],
        queryFn: ({queryKey}) => getComplaints(jwt, queryKey[1]),
    });


    return (
        <div>
            <h2>Solved Complaints</h2>
            <div>
                {complaints.map(complaint => {
                    return (
                        <Complaint complaint={complaint} key={complaint.id} />
                    );
                })}
            </div>
        </div>
    );
}

export default SolvedComplaints;