import {useEffect} from 'react';
import styles from './styles.module.css';
import Contact from "@components/Contact";
import About from "@components/About";
import {useLocation, useNavigate} from "react-router-dom";
import {useUser} from "@/contexts/UserContextProvider.jsx";
import {pages} from "@/constants.js";

const ActualHome = () => {
    const {userG} = useUser();
    const navigate = useNavigate();
    return (
        <div className={styles.home}>
            <h1>
                { userG && `welcome ${userG.name}` || 'login to continue' }
            </h1>
            <h2>wanna register a complaint</h2>
            <button onClick={
                () => {
                    if (userG) {
                        navigate(pages.registerComplaint);
                    } else {
                        navigate(pages.login);
                    }
                }
            }>Raise a complaint</button>
        </div>
    );
}

const Home = () => {
    return (
        <div className='content'>
            <ActualHome />
            <Contact />
            <About />
        </div>
    );
};

export default Home;