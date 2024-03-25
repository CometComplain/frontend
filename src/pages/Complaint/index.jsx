import React from 'react';
import styles from './styles.module.css';
import {useNavigate, useParams} from "react-router-dom";
import {
    apiRoutes,
    buildingsMap,
    customAxios,
    pages,
    reverseBuildingsMap,
    reverseStatusMap,
    statusMap,
    UserTypes
} from "@/constants.js";
import {useMutation, useQuery} from "@tanstack/react-query";
import {acceptComplaint, deleteComplaint, rejectComplaint, solveComplaint, verifyComplaint} from "@/api/apiCalls.js";
import {getComplaintWithId} from "@/api/apiCalls.js";
import {useUser} from "@/contexts/UserContextProvider.jsx";
import {toast} from "sonner";
import {onError} from "@/utils/index.js";

const Verifier = ({complaint}) => {
    const navigate = useNavigate();

    const verifyMutation = useMutation({
       mutationFn: verifyComplaint,
         onSuccess: () => {
              toast.success('Complaint Verified Successfully');
              navigate(pages.dashboard);
         },
        onError,
    });
    const handleVerify = async () => {
        await verifyMutation.mutateAsync(complaint.complaintId);
    }

    const rejectMutation = useMutation({
       mutationFn: rejectComplaint,
         onSuccess: () => {
              toast.success('Complaint Rejected Successfully');
              navigate(pages.dashboard);
         },
        onError,
    });
    const handleReject = async () => {
        await verifyMutation.mutateAsync(complaint.complaintId);
    }
    return (
        <div>
            <button onClick={handleVerify}>Verify</button>
            <button onClick={handleReject}>Reject</button>
        </div>
    );
}

const Technician = ({complaint}) => {
    const navigate = useNavigate();
    const acceptMutation = useMutation({
        mutationFn: acceptComplaint,
        onSuccess: () => {
            toast.success('Complaint Accepted Successfully');
            navigate(pages.dashboard);
        },
        onError,
    });
    const solveMutation = useMutation({
        mutationFn: solveComplaint,
        onSuccess: () => {
            toast.success('Complaint Solved Successfully');
            navigate(pages.dashboard);
        },
        onError,
    });

    const handleAccept = async () => {
        await handleAccept.mutateAsync(complaint.complaintId);
    }
    const handleSolve = async () => {
        await handleSolve.mutateAsync(complaint.complaintId);
    }
    return (
        <div>
            {!(complaint.status === statusMap.Accepted) && <button onClick={handleAccept}>Accept</button>}
            <button onClick={handleSolve}>Solve</button>
        </div>
    );
}

const Complainant = ({complaint}) => {
    const navigate = useNavigate();
    const deleteMutation = useMutation({
        mutationFn: deleteComplaint,
        onSuccess: () => {
            toast.success('Complaint Deleted Successfully');
            navigate(pages.dashboard);
        },
        onError,
    });

    const handleDelete = async () => {
        await deleteMutation.mutateAsync(complaint.complaintId);
    }
    return (
        <div>

            { complaint.status !== statusMap.Solved &&  <button onClick={handleDelete}>Delete</button>}
        </div>
    );
}

const userMap = {
    [UserTypes.Complainant]: Complainant,
    [UserTypes.Technician]: Technician,
    [UserTypes.Verifier]: Verifier,
}

const Complaint = () => {
    const {complaintId} = useParams();
    const navigate = useNavigate();
    const {user} = useUser();

    const complaintQuery = useQuery({
        queryFn: () => getComplaintWithId(complaintId),
        queryKey: ['complaint', complaintId],
    });
    const Component = userMap[user.role];

    const {data, isError, isLoading} = complaintQuery;
    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Error Fetching Data</div>

    const {complaint, acceptedBy, createdBy} = data;
    console.log(data);
    return (
        <div>
            {data && (
                <>
                    <div>
                        Complaint Id: {complaint.complaintId}
                    </div>
                    <div>
                        Title: {complaint.title}
                    </div>
                    { complaint.description && (<div>
                        Description: {complaint.description}
                    </div>)}
                    { complaint.mobile && (<div>
                        Description: {complaint.mobile}
                    </div>)}
                    <div>
                        Location:
                        <br/>
                        { <span>Building Name: {reverseBuildingsMap[complaint.location.buildingName]}</span>}
                        <br/>
                        { complaint.location.roomNo && <span>Room No : {complaint.location.roomNo}</span>}
                        <br/>
                        { complaint.location.floorNo && <span>Floor No: {complaint.location.floorNo}</span>}
                        <br/>
                    </div>
                    <div>
                        Status: {reverseStatusMap[complaint.status]}
                    </div>
                    <div>
                        {createdBy && <span>Complained By: {createdBy.displayName}</span>}
                    </div>
                    <div>
                        {acceptedBy && <span>{ reverseStatusMap[complaint.status] === "Accepted" ? "Accepted By" : "Solved By"}: {acceptedBy.displayName}</span>}
                    </div>
                    <div>
                        {complaint.proof && <video src={complaint.proof} controls/>}
                    </div>
                    <div>
                        {complaint.completionProof && <video src={complaint.completionProof} controls/>}
                    </div>
                </>
            )}
            {
                <Component complaint={complaint}/>
            }
        </div>
    );
};

export default Complaint;


/*
    complaintId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  mobile: {
    type: String,
  },
  compliantType: {
    type: Number,
    enum: Object.values(typesMap),
    required: true,
  },
  location: {
    type: {
      buildingName: Number,
      roomNo: String,
      floorNo: String,
    },
    required: true,
  },
  complaintHash: {
    type: String,
    unique: true,
    required: true,
  },
  status: {
    type: Number,
    enum: Object.values(statusMap),
    default: statusMap.pending,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true,
  },

  accepytedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
  },
  proof: {
    type: String,
  },
  completionProof: {
    type: String,
  },
*/