import {useGoogleLogin} from '@react-oauth/google';
import {authenticate} from '@api/authenticate.js';
import {useNavigate} from "react-router-dom";
import {useUser} from "@/contexts/UserContextProvider.js";
import axios from "axios";
import {googleStuff, pages} from "@/constants.js";
import googleImage from "@/assets/google.png";
import styles from './styles.module.css';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const Login = () => {
    const {setUser} = useUser();
    const navigate = useNavigate();

    const handleLogin = async (codeResponse) => {
        const user = codeResponse;
        if (user) {
            try {
                const responce = await axios.get(`${googleStuff.detailsUrl}${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`, Accept: 'application/json'
                    }
                })
                setUser(responce.data);

            } catch (error) {
                if (axios.isAxiosError(error)) {
                    navigate(pages.loginError, {state: {error}})
                }
                console.log('failed to contact with server');
            }
            await authenticate(codeResponse.access_token);
            navigate(pages.dashboard);
        }
    }

    const login = useGoogleLogin({
        onSuccess: handleLogin, onError: (error) => navigate(pages.loginError, {state: {error}}),
    });


    // log out function to log the user out of google and set the profile array to null
    return (
        <div className='content'>
            <h1>Login</h1>
            <button className={styles.google_signin} onClick={login}>
                <span className={styles.icon}>
                    <img className={styles.google__image} src={googleImage}/>
                </span>
                <span className={styles.text}>Sign in with Google</span>
            </button>
        </div>
    );
};

export default Login;
