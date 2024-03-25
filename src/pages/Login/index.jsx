import {apiRoutes} from "@/constants.js";
import googleImage from "@/assets/google.png";
import styles from './styles.module.css';

const Login = () => {

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
