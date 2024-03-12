import React, {useRef, useState} from 'react';
import styles from './styles.module.css';
import {NavLink, useNavigate} from "react-router-dom";
import {googleLogout} from "@react-oauth/google";
import {useUser} from "@/contexts/UserContextProvider";
import {useLogout} from "@/utils/index.js";

const Navbar = ({auLinks = [], unAuLinks = [], subs = {}}) => {
    const {userG, setUserG} = useUser();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility
    const ulRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => {
            const newState = !prev;
            if (newState) {
                ulRef.current.style.display = "flex";
            } else {
                ulRef.current.style.display = "";
            }
            return newState;
        });
    };

    // const unAuLinks = [{
    //     name: 'Home', path: '/'
    // }];
    // const auLinks = [{
    //     name: 'Home', path: '/'
    // }, {
    //     name: 'Dashboard', path: '/user'
    // }];


    const checkedLinks = userG ? auLinks : unAuLinks;
    const activeCheck = (isActive = null, customStyle) => {
        return `${isActive ? styles.active : styles.inactive} ${customStyle}`;
    };

    const logout = () => {
        setUserG(null);
        useLogout();
        navigate('/');
    }

    // const homeSubs = [
    //     {name: 'About', path: '/#about'},
    //     {name: 'Contact', path: '/#contact'}
    // ];
    return (
        <>
            <nav className={`${styles.navbar} header`}>
                <div className={styles.logo_menu_wrapper}>
                    <div className={styles.navbar__logo}>
                        logo
                    </div>
                    <span className={styles.menu_icon} onClick={toggleDropdown}>
                    {isDropdownOpen ? '✖' : '☰'}
                </span>
                </div>
                <div className={styles.menu_wrapper}>
                    <ul className={`${styles.navbar__ul}`} ref={ulRef}>
                        {checkedLinks.map((link, index) => (
                            <>
                            <li className={styles.li} key={index}>
                                <NavLink to={link.path}
                                         className={({isActive}) => activeCheck(isActive, styles.link)}>{link.name}</NavLink>
                            </li>
                            {
                                subs[link.name] && (
                                    subs[link.name].map((sub, indexThis) => (
                                        <li className={styles.li} key={`${index}-${indexThis}`}>
                                            <a href={sub.path}
                                                     className={styles.link}>{sub.name}</a>
                                        </li>
                                    ))
                                )
                            }
                            </>
                        ))}
                        <li className={styles.li}>
                            {!userG && <NavLink to="/login"
                                               className={({isActive}) => activeCheck(isActive, styles.link)}>Login</NavLink>}
                            {userG &&
                                <button className={`${styles.logout} ${styles.link}`} onClick={logout}>Logout</button>}
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;



