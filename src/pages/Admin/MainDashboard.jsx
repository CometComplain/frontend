import DetailsCard from "@components/ui/DetailsCard.jsx";
import VerifiersTable from "@pages/Admin/VerifiersTable.jsx";
import TechniciansTable from "@pages/Admin/TechniciansTable.jsx";
import {useState} from "react";

const filteredComponents = {
        verifiers: VerifiersTable,
        technicians: TechniciansTable,
}

const MainDashboard = () => {
    const [filter, setFilter] = useState('verifiers');
    const Component = filteredComponents[filter];
    return (
        <div className=' w-full p-20 flex flex-col ' style={{
            height: '95vh',
        }}>
            <div className='flex gap-2 p-10 h-fit justify-between flex-wrap shadow-lg rounded-md'>
                <DetailsCard title={'Accepted'} content={10}/>
                <DetailsCard title={'Solved'}  content={20}/>
                <DetailsCard title={'Pending'}  content={30}/>
                <DetailsCard title={'Verified'}  content={40}/>
                <DetailsCard title={'Rejected'}  content={50}/>
            </div>
            <div className='flex gap-2 justify-around flex-wrap my-6 rounded-md'
                 style={{
                     maxHeight: '75%',
                 }}
            >
                <div
                    style={{
                        maxHeight: '55vh',
                        width: "100%",
                    }}
                    className='flex'
                >
                    <div
                        className='flex w-full shadow-lg rounded-lg flex-col '
                    >
                        <select
                            className='w-fit p-1 mx-1 text-base'
                            onChange={(event) => {
                                setFilter(event.target.value)
                            }}>
                            <option value='verifiers'>Verifiers</option>
                            <option value='technicians'>Technicians</option>
                        </select>
                        {Component ? <Component/> : "Dont mess with anything"}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainDashboard;