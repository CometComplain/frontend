import {useEffect} from 'react';
import styles from './styles.module.css';
import Contact from "@components/Contact/contact.jsx";
import About from "@components/About/about.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useUser} from "@/contexts/UserContextProvider.jsx";
import {pages, UserTypes} from "@/constants.js";

const ActualHome = () => {
    const { user} = useUser();
    const navigate = useNavigate();
    return (
        <div className={styles.home} id='home'>
            <h1 className='text-4xl font-bold'>
                { user && `Welcome ${user.displayName}` || 'Login to register a complaint' }
            </h1>
            { ((user && user.role === UserTypes.Complainant) || !user) && (
                <button onClick={
                    () => {
                        if (user) {
                            navigate(pages.registerComplaint);
                        } else {
                            navigate(pages.login);
                        }
                    }
                }
                        className={styles.complaintButton}
                >Raise a complaint</button>
            )}
        </div>
    );
}

const Home = () => {
    const url = window.location.href;

    useEffect(() => {
        const section = url.split('#')[1];
        const element = document.getElementById(section ? section : 'home');
        element.scrollIntoView({behavior: "smooth"});
    }, [url]);
    return (
        <div className='content'>
            <ActualHome />
            <About />
        </div>
    );
};

export default Home;