import styles from './styles.module.css';
import {NavLink} from "react-router-dom";
import Login from "../Login.jsx";
import {googleLogout} from "@react-oauth/google";
import {useUser} from "@/contexts/UserContextProvider.js";
const activeCheck = ({isActive = null}) => {
        return `${isActive ? styles.active : styles.inactive} ${styles.link}`;
};
const Index = () => {
    const links = [
        {
            name: 'Home',
            path: '/'
        },
        {
            name: 'About',
            path: '/about'
        },
        {
            name: 'Contact',
            path: '/contact'
        }
    ];
    const {user} = useUser();
    return (
        <nav className={`${styles.navbar} header`} >
            <div className={styles.navbar__logo} >
                logo
            </div>
            <div>
                {user ? <h1>Welcome {user.name}</h1> : <h1>login to proceed</h1>}
            </div>
            <div className={styles.login__options__container}>
                <ul className={styles.navbar__ul}>
                    {links.map((link, index) => {
                        return (
                            <li key={index}>
                                <NavLink to={link.path} className={activeCheck} >{link.name}</NavLink>
                            </li>
                        );
                    })}
                </ul>
                <div>
                    <NavLink to="/login" className={activeCheck}>Login</NavLink>
                    <NavLink to={'/logout'} onClick={googleLogout} className={activeCheck}>Logout</NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Index;
