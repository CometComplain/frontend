import React, {useRef, useState} from 'react';
import styles from './styles.module.css';
import {NavLink, useNavigate} from "react-router-dom";
import {googleLogout} from "@react-oauth/google";
import {useUser} from "@/contexts/UserContextProvider";

const Index = () => {
    const {user, setUser} = useUser();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility
    const ulRef = useRef(null);
    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => {
            ulRef.current.style.display = prev ? 'none' : "flex";
            return !prev;
        });
    };

    const unAuLinks = [{
        name: 'Home', path: '/'
    }, {
        name: 'About', path: '/about'
    }, {
        name: 'Contact', path: '/contact'
    }];
    const auLinks = [{
        name: 'Home', path: '/'
    }, {
        name: 'About', path: '/about'
    }, {
        name: 'Contact', path: '/contact'
    }, {
        name: 'Dashboard', path: '/dashboard'
    }];


    const checkedLinks = user ? auLinks : unAuLinks;
    const activeCheck = (isActive = null, customStyle) => {
        return `${isActive ? styles.active : styles.inactive} ${customStyle}`;
    };
    const logout = () => {
        console.log('Logging out');
        setUser(null);
        googleLogout();
        navigate('/');
    }
    return (
        <>
            <div> {user?.name} </div>
            <nav className={`${styles.navbar} header`}>
                <div className={styles.navbar__logo}>
                    logo
                </div>
                <div className={styles.menu_wrapper}>
                <span className={styles.menu_icon} onClick={toggleDropdown}>
                    {isDropdownOpen ? '✖' : '☰'}
                </span>
                    <ul className={`${styles.navbar__ul}`} ref={ulRef}>
                        {checkedLinks.map((link, index) => (
                            <li className={styles.li} key={index}>
                                <NavLink to={link.path}
                                         className={({isActive}) => activeCheck(isActive, styles.link)}>{link.name}</NavLink>
                            </li>
                        ))}
                        <li className={styles.li}>
                            {!user && <NavLink to="/login"
                                               className={({isActive}) => activeCheck(isActive, styles.link)}>Login</NavLink>}
                            {user && <button className={`${styles.logout} ${styles.link}`} onClick={logout}>Logout</button>}
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Index;



