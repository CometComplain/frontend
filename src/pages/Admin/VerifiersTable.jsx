import Table from "@components/ui/Table.jsx";
import {complaintTypes, UserTypes} from "@/constants.js";
import userCard from "@components/ui/UserCard.jsx";
import {getUsers} from "@api/apiCalls.js";
import {useInfiniteQuery} from "@tanstack/react-query";
import TempTable from "@components/ui/TempTable.jsx";
import Loading from "@components/ui/Loading.jsx";

const VerifiersTable = () => {

    const verifiersQuery = useInfiniteQuery({
        queryKey: ['verifiers'],
        queryFn: (page = 0) => getUsers(page, UserTypes.Verifier) ,
        getNextPageParam: lastPage => lastPage.nextPage,
    });

    const {data, error, isLoading, isError} = verifiersQuery;
    if (isLoading) return <Loading/>;
    if (isError) return <div>Error: {error.message}</div>;
    if (!data) return <div>No data</div>;

    return (
        // <Table title='Verifiers' Component={userCard}/>
        <TempTable Component={userCard} />
    )
}

export default VerifiersTable;