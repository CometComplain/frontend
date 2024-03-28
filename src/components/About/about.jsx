import {} from "react";
import styles from "./styles.module.css";

const features = [
    {
        heading: "Easy Complaint Submission",
        content:
            "Submitting a complaint should be straightforward and hassle-free. We've designed our process to be easy, ensuring your concerns are heard promptly and accurately.",
    },
    {
        heading: "Transparent Process",
        content:
            "We believe in transparency. Our resolution process is designed to be transparent, keeping you informed and involved throughout.",
    },
    {
        heading: "Status Tracking",
        content:
            "Stay informed with our status tracking feature. We believe in keeping you updated on the progress of your complaint.",
    },
    {
        heading: "Document Verification and Spam Detection",
        content:
            "We prioritize information integrity and take measures to verify documents and prevent spam. Our processes ensure genuine and relevant complaints.",
    },
];


const About = () => {
    return (
        <div id="about" className={styles.about}>
            <p className="text-4xl font-bold text-center">Features</p>
            <div className={`flex flex-wrap justify-center gap-4`}>
                {features.map((feature, index) => (
                    <div key={index}
                         className={`shadow-lg p-4 w-72 h-auto rounded-xl flex flex-col gap-2 justify-around`}>
                        <span className='font-bold p-1 border-b-2'>{feature.heading}</span>
                        <span>{feature.content}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default About;
