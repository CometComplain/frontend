import VerifierComplaint from "@components/Complaints/VerifierComplaint.jsx";
import styles from "./styles.module.css";
import {useInfiniteQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {getComplaints, rejectComplaint, verifyComplaint} from "@/api/apiCalls.js";
import {handleScroll, RenderComplaints} from "@pages/Dashboard/utils.jsx";
import {toast} from "sonner";
import complaintStyle from "@components/styles/complaint.module.css";

const subUrl = "verifier";

const key = ["complaints", subUrl];
const Verifier = () => {
    const queryClient = useQueryClient();
    const complaintsDiv = (renderableComplaints) => (
        <>
            <div
                className={styles.solved_complaints}
                onScroll={(event) => handleScroll(event, [technitianComplaintQuery])}
            >
                <div className={complaintStyle.complaint} >
                    <div>Sl No</div>
                    <div>Complaint ID</div>
                    <div>Created At</div>
                    <div>Title</div>
                    <div>Status</div>
                    <div>Action</div>
                </div>
                <RenderComplaints renderableComplaints={renderableComplaints} Component={VerifierComplaint} props={{
                    verifyMutation,
                    rejectMutation,
                }}/>
            </div>
        </>
    );

    const technitianComplaintQuery = useInfiniteQuery({
        queryKey: key,
        queryFn: ({queryKey, pageParam = 1}) =>
            getComplaints(
                [
                    {
                        value: pageParam,
                        name: "page",
                    },
                ],
                subUrl
            ),
        getNextPageParam: (prevPage) => prevPage.nextPage,
    });

    const verifyMutation = useMutation({
        mutationFn: verifyComplaint,
        onSuccess: () => {
            toast.success('Verified complaint successfully')
            queryClient.invalidateQueries(key);
        },
        onError,
    });
    const rejectMutation = useMutation({
        mutationFn: rejectComplaint,
        onSuccess: () => {
            toast.success('Rejected complaint successfully')
            queryClient.invalidateQueries(key);
        },
        onError,
    });

    const {data, isLoading, isError, isFetching, hasNextPage, error, isSuccess} = technitianComplaintQuery;

    const complaints = data?.pages.flatMap(page => page.complaints) || [];

    return (
        <div className={styles.solved_complaints_wrapper}>
            <h1>Technitian Complaints</h1>
            {isLoading && "fetching complaints..."}
            {isError &&
                error.message}
            {isSuccess && complaintsDiv(complaints)}
        </div>
    );
};

export default Verifier;