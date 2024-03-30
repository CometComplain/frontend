import {reverseComplaintTypes, UserTypes} from "@/constants.js";
import styles from '../styles/user.module.css'
const smallMap = {
    [UserTypes.Complainant] : 'rollNo',
    [UserTypes.Verifier] : 'role',
    [UserTypes.Technician] : 'domain',
}
const UserCard = ( { item, index } ) => {
    const { domain, role, isBlocked, displayName, email } = item;
    // console.log(item[smallMap[role]]);

    return (
        <div className={` ${styles.user} ${isBlocked ? 'bg-gray-500' : ''} rounded-md shadow-lg`}>
            <div>{index}</div>
            <div>{displayName}</div>
            <div>{email}</div>
            <div>{item[smallMap[role]]}</div>
            {/*<div>{}</div>*/}

        </div>
    );
}

export default UserCard;