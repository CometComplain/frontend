import {useUser} from "@/contexts/UserContextProvider.jsx";
import {UserTypes} from "@/constants.js";

const UserDetails = () => {
    const {user } = useUser();
    return (
        <div className="flex justify-center" style={{
            width: "100%",
            alignItems: "center",
        }}>
            <div className='flex w-fit flex-row gap-16 p-10 m-5 border border-gray-300 rounded-lg shadow-xl h-min'
             style={{
                 alignItems: 'center',
             }}>
                <img src={user.image} className='bg-black rounded-full'
                    style={{
                        // width: '200px',
                        height: '100%',
                    }}
                    alt="Img"
                />
                <div className="flex gap-16">
                    <div className="flex flex-col gap-6">
                    <div className="">Name: {user.displayName}</div>
                        {user.role === UserTypes.Complainant && (<div className="">Roll No: {user.rollNo}</div>)}
                        <div className="">Email: {user.email}</div>
                    </div>
                    {user.role === UserTypes.Complainant && (
                        <div className="flex gap-5 text-base">
                            <div className="flex flex-col items-center p-4 bg-orange-300 rounded justify-evenly">
                                <div className="font-semibold ">Registered Complaints</div>
                                <div className="text-3xl font-bold text-orange-900">{user.noOfComplaints}</div>
                            </div>
                                <div className="flex flex-col items-center p-4 bg-green-300 rounded justify-evenly">
                                    <div className="font-semibold ">
                                        Solved Complaints
                                    </div>
                                    <div className="text-3xl font-bold text-green-900">
                                        {user.solvedComplaints}
                                    </div>
                                </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserDetails;