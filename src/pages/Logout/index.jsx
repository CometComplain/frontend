import React, {useEffect} from 'react';
import styles from './styles.module.css';
import {googleLogout} from "@react-oauth/google";
import {NotInUseDecorator} from "@/utils";


const Logout = NotInUseDecorator(() => {
    useEffect(() => {
        googleLogout();
    }, []);
    window.location.href = '/';
    return (
        <div className='content'>
            <h1>Logging out...</h1>
        </div>
    );
});

export default Logout;
