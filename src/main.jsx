import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {GoogleOAuthProvider} from "@react-oauth/google";

const clientId = '917898502057-8docqh7qo20sftib30o3bgndpvs4uaoa.apps.googleusercontent.com';

ReactDOM.createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId={clientId}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </GoogleOAuthProvider>
)
