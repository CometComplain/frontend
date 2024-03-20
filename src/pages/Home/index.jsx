import {useEffect} from 'react';
import styles from './styles.module.css';
import Contact from "@components/Contact";
import About from "@components/About";
import {useLocation, useNavigate} from "react-router-dom";
import {useUser} from "@/contexts/UserContextProvider.jsx";
import {pages} from "@/constants.js";
import Complaint from "@components/Complaints/Complaint.jsx";
import complaintStyles from "@components/styles/complaint.module.css";
const ActualHome = () => {
    const { user} = useUser();
    const navigate = useNavigate();
    return (
        <div className={styles.home}>
            <h1>
                { user && `welcome ${user.displayName}` || 'login to continue' }
            </h1>
            <h2>wanna register a complaint</h2>
            <button onClick={
                () => {
                    if (user) {
                        navigate(pages.registerComplaint);
                    } else {
                        navigate(pages.login);
                    }
                }
            }>Raise a complaint</button>
            {/*<Complaint complaint={{*/}
            {/*    id: '123',*/}
            {/*    title: 'Water Problem',*/}
            {/*    description: 'Water is not comingWater is not comingWater is not comingWater is not comingWater is not comingWater is not coming',*/}
            {/*    status: 'pending',*/}
            {/*}} >*/}
            {/*    <button className={complaintStyles.button} onClick={(event)=>{*/}
            {/*        event.preventDefault();*/}
            {/*        event.stopPropagation();*/}
            {/*        alert('clicked');*/}
            {/*    }}>Click It</button>*/}
            {/*</Complaint>*/}
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