import {useEffect} from 'react';
import styles from './styles.module.css';
import Contact from "@components/Contact";
import About from "@components/About";
import {useLocation, useNavigate} from "react-router-dom";
import {useUser} from "@/contexts/UserContextProvider.jsx";
import {pages} from "@/constants.js";

const ActualHome = () => {
    const { user} = useUser();
    const navigate = useNavigate();
    return (
        <div className={styles.home}>
            <h1>
                { user && `welcome ${user.displayName}` || 'login to continue' }
            </h1>
            <br/>
            <br/>
            <h2>wanna register a complaint</h2>
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

            {/*{user && JSON.stringify(user)}*/}
        </div>
    );
}

const Home = () => {
    const url = window.location.href;
    const section = url.split('#')[1];

    useEffect(() => {
        if (section) {
            const element = document.getElementById(section);
            if (element) {
                element.scrollIntoView({behavior: "smooth"});
            }
        }
    }, [url]);
    return (
        <div className='content'>
            <ActualHome />
            <Contact />
            <About />
        </div>
    );
};

export default Home;