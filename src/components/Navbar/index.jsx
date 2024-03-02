import styles from './styles.module.css';
import {NavLink} from "react-router-dom";
import Login from "../Login.jsx";
const activeCheck = ({isActive}) => {
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
    return (
        <nav className={`${styles.navbar} header`} >
            <div className={styles.navbar__logo} >
                logo
            </div>
            <div className={styles.login__options__container}>
                <ul className={styles.navbar__ul}>
                    {links.map((link, index) => {
                        return (
                            <li key={index}>
                                <NavLink to={link.path} className={activeCheck} exact>{link.name}</NavLink>
                            </li>
                        );
                    })}
                </ul>
                <div>
                    <NavLink to="/login" className={activeCheck}>Login</NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Index;
