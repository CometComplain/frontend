// import {useGoogleLogin} from '@react-oauth/google';
// import {useNavigate} from "react-router-dom";
// import {useUser} from "@/contexts/UserContextProvider.jsx";
// import axios from "axios";
import {apiRoutes, googleStuff, pages} from "@/constants.js";
import googleImage from "@/assets/google.png";
import styles from './styles.module.css';
// import {useEffect} from "react";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// const useNavigateFromLogin = (navigate, jwt) => {
//
//     useEffect(() => {
//         if (jwt)
//             navigate(pages.dashboard);
//     }, [jwt]);
// }

const Login = () => {
    // const {jwt, setJwt} = useUser();
    // const navigate = useNavigate();
    //
    // useNavigateFromLogin(navigate, jwt);
    //
    // //  response structure
    // // {
    // //     "access_token": "string",
    // //     "expires_in": number,
    // //     "id_token": "string",
    // //     "scope": "string",
    // //     "token_type": "string",
    // // }
    // const handleLogin = (codeResponse) => {
    //     if (codeResponse)
    //         setJwt(codeResponse.access_token);
    // }
    //
    // const login = useGoogleLogin({
    //     onSuccess: handleLogin,
    //     onError: (error) => console.log(error),
    // });


    const googleRedirict = () => {
        window.open(`${apiRoutes.login}`, '_self');
    };

    return (
        <div style={{
            width: '100%',
            height: '95vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2rem',
        }}>
            <div style={{
                height: '100%',
                display: 'flex',
                flexDirection: "column",
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <h1>Login</h1>
                <a className={styles.google_signin} onClick={googleRedirict}>
                <span className={styles.icon}>
                    <img className={styles.google__image} src={googleImage} alt='G'/>
                </span>

                    <span className={styles.text}>Sign in with Google</span>
                </a>
            </div>
            <div>
                some card for design
            </div>
        </div>
    );
};

export default Login;
