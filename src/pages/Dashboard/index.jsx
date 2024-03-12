import React, {useState} from 'react';
import styles from './styles.module.css';
import {useNavigate} from "react-router-dom";
import Navbar from "@components/Navbar/index.jsx";
import UserDetails from "./UserDetails";
import SolvedComplaints from "./SolvedComplaints";
import PendingComplaints from "./PendingComplaints.jsx";

export const links = [{
    name: 'Home', path: '/'
}];

const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <>
            <Navbar auLinks={links} unAuLinks={links}/>
            <div className={styles.dashboard}>
                <UserDetails/>
                <PendingComplaints/>
                <SolvedComplaints/>
            </div>
        </>
    );
};

export default Dashboard;
