import styles from "./styles.module.css";
import googleImage from '@/assets/google.png';
const Contact = () => {
    return (
        <div id="contact" className={`${styles.contact} footer`}>
            <p className="font-bold text-center text-4xl">Contact</p>
            <div
                className={`flex flex-wrap justify-center gap-20`}
            >
                <div className="flex flex-col gap-2 w-72">
                    <span>ADDRESS:</span>
                    <span>
                        Indian Institute Of Information Technology Valavoor -
                        Chakkampuzha Rd, Valavoor, Nechipuzhoor, Kerala 686635
                    </span>
                </div>
                <div>
                    <div className="">Email: admin@iiitkottayam.ac.in</div>
                    <div className="">Contact Number: +91-04822 202 100</div>
                </div>
                <div>
                    <img src={googleImage} className='w-40'/>
                </div>
            </div>
        </div>
    );
};

export default Contact;
