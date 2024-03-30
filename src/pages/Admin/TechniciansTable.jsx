import Table from "@components/ui/Table.jsx";
import {complaintTypes, UserTypes} from "@/constants.js";
import UserCard from "@components/ui/UserCard.jsx";
import {getUsers} from "@api/apiCalls.js";
import {useInfiniteQuery} from "@tanstack/react-query";
import Loading from "@components/ui/Loading.jsx";


const TechniciansTable = () => {
    const techniciansQuery = useInfiniteQuery({
        queryKey: ['technicians'],
        queryFn: (page = 0) => getUsers(page, UserTypes.Technician),
        getNextPageParam: lastPage => lastPage.nextPage,
    });
    const {data, error, isLoading, isError} = techniciansQuery;
    if (isLoading) return <Loading />;
    if (isError) return <div>Error: {error.message}</div>;
    if (!data) return <div>No data</div>;

    return (<Table title='Technicians'  Component={UserCard}/>);
}

export default TechniciansTable;