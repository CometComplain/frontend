import React from 'react';
import styles from './styles.module.css';
import {useLocation} from "react-router-dom";

const LoginError = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const message = queryParams.get('message');
    return (
        <div className="content">
          LoginError {
            message
        }
        </div>
    );
};

export default LoginError;
