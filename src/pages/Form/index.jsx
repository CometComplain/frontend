import {useEffect, useState} from 'react';
import styles from './styles.module.css';
import form from "@pages/Form/index.jsx";
import axios from "axios";
import Navbar from "@components/Navbar/index.jsx";
import {links} from "@pages/Dashboard";
import {useMutation} from "@tanstack/react-query";
import {getDate} from "@/utils/index.js";
import {apiRoutes, complaintTypes} from '@/constants'


const sendData = async (complaintData) => {
    if (!complaintData) throw new Error('No data');

    const response = await axios.post(apiRoutes.registerComplaint, complaintData);
    if (response.data['status'] === 'error') {
        throw new Error('bad request');
    }
    return response.data
}
const sendFile = async (file) => {
    if (!file) throw new Error('No file');

    const fileForm = new FormData();
    fileForm.append('file', file);
    const response = await axios.post(apiRoutes.uploadProof, fileForm, {
        'Content-Type': 'multipart/form-data',
    });
    if (response.data['status'] === 'error') {
        throw new Error('bad request');
    }
    return response.data
}

const useFormSubmit = (data, dataMutation, setPopup) => {
    useEffect(() => {
        if (data[0]) {
            setPopup(true);
            dataMutation.mutate(data[0]);
        }
    }, [data]);

}

const ComplaintForm = () => {
    const [popup, setPopup] = useState(false);
    const [data, setData] = useState([]);

    const fileMutation = useMutation({
        mutationFn: sendFile,
        onSuccess: (responseData) => {
            console.log('Registered complaint successfully');
        },
        onError: () => {
            console.log('unable to send file')
        }
    })
    const dataMutation = useMutation({
        mutationFn: sendData,
        onSuccess: (responseData) => {
            fileMutation.mutate(data[1]);
        },
        onError: () => {
            console.log('unable to send data')
        }
    });

    const setFormData = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = {
            name: form.name.value,
            stu_id: form.stu_id.value,
            mail: form.mail.value,
            date: form.date.value,
            type: form.type.value,
            // location: form.location.value,
            description: form.description.value,
        };
        const file = form.proof.files[0];
        setData([formData, file]);
    }

    useFormSubmit(data, dataMutation, setPopup);

    const handleSubmit = (event) => {
        event.preventDefault();
        setFormData(event);
    };

    const today = getDate();

    const popUpContent = (
        <>
            <div className={styles.popup_items_container}>
                <button className={styles.popup_remove} onClick={() => setPopup(false)}>X</button>
                {fileMutation.isSuccess && <div>Complaint registered successfully</div>}
                {(dataMutation.isError || fileMutation.isError) && <div>Error in registering Complaint</div>}
                {(dataMutation.isPending || fileMutation.isPending) && <div>Registering Complaint ... </div>}
            </div>
        </>
    );

    const formContent = (
        <>
            <Navbar auLinks={links} unAuLinks={links}/>
            <div>
                {popup && (<div className={styles.popup}>
                    {popUpContent}
                </div>)}
                <div className={styles.wrapper}>
                    <div style={{
                        textAlign: 'center', fontSize: "xx-large", fontWeight: "bolder"
                    }}>
                        register your complaint here
                    </div>
                    <form action="" className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.form_sub_wrapper}>
                            <div className={styles.personal_info_wrapper}>
                                <p>Personal information</p>
                                <div className={styles.inputs_label_wrapper}>
                                    <label htmlFor="name">Name: </label>
                                    <input type="text" name="name"/>

                                    <label htmlFor="stu_id" style={{
                                        marginRight: "3.4rem"
                                    }}>Student Id:</label>
                                    <input type="text" name="stu_id"/>

                                    <label htmlFor="mail">Email: </label>
                                    <input type="email" name="mail"/>
                                </div>
                            </div>
                            <br/>
                            <div>
                                Complaint Details:
                            </div>
                            <div className={styles.inputs_label_wrapper}>
                                <label>Date:</label>
                                <div><input type="date" name="date" value={today} disabled id="date"/></div>

                                <div><label htmlFor="type">Complaint Type:</label></div>
                                <div>
                                    <select name="type">
                                        {complaintTypes.map((type, index) => {
                                            return <option key={index} value={type}>{type}</option>
                                        })}
                                    </select>
                                </div>

                                <div><label htmlFor="location">Location: </label></div>
                                <div>location to be made decision</div>

                                <div><label htmlFor="description">Description: </label></div>
                                <div><textarea name="description" cols={60} rows={10}></textarea></div>

                                <div><label htmlFor="proof">Proof: </label></div>
                                <div><input type="file" name='proof'/></div>
                            </div>
                        </div>
                        <div className={styles.buttons_wrapper}>
                            <button type="submit">Submit</button>
                            <button type="reset">Reset</button>
                        </div>
                    </form>

                </div>
            </div>

        </>
    );

    return formContent
};

export default ComplaintForm;