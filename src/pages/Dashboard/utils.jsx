import complaintStyle from "@components/styles/complaint.module.css";
import TechnicianComplaint from "@components/Complaints/TechnicianComplaint.jsx";

export const loadMore = (complaintsQuery) => {
    if (complaintsQuery.hasNextPage) {
        complaintsQuery.fetchNextPage()
    }
}
export const handleScroll = (event, querysArray) => {
    event.preventDefault();
    event.stopPropagation();
    const {scrollTop, clientHeight, scrollHeight} = event.target;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
        querysArray.forEach((queryInstance) => loadMore(queryInstance));
    }
}

export const RenderComplaints = ({renderableComplaints, Component, props}) => {

    return (
        <>
            <div className={complaintStyle.complaint}>
                <div>Sl No</div>
                <div>Complaint ID</div>
                <div>Created At</div>
                <div>Title</div>
                <div>Status</div>
                <div>Action</div>
            </div>
            {renderableComplaints.map((complaint, index) => {
                return (
                    <Component
                        index={index}
                        {...props}
                        complaint={complaint}
                        key={complaint.complaintId}
                    />
                );
            })}
        </>
    )
}