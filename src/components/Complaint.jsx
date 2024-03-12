

/*
    complaint type: {
        id: string,
        title: string,
        description: string,
        status: string
    }
*/

const Complaint = ({complaint}) => {
    return (
        <div>
            <h3>{complaint.title}</h3>
            <p>{complaint.description}</p>
        </div>
    );
}

export default Complaint;