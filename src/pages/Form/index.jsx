import styles from './styles.module.css';
import form from "@pages/Form/index.jsx";
import {useMutation} from "@tanstack/react-query";
import {getDate, onError} from "@/utils/index.js";
import {apiRoutes, buildingsMap, complaintTypes, customAxios, pages} from '@/constants'
import {toast} from "sonner";
import {Toast} from 'primereact/toast';
import {useUser} from "@/contexts/UserContextProvider.jsx";
import {useNavigate} from "react-router-dom";
import { FileUpload } from 'primereact/fileupload';


const sendData = async (complaintData) => {
    if (!complaintData) throw new Error('No data');

    const response = await customAxios.post(apiRoutes.registerComplaint, complaintData);
    if (response.data['status'] === 'error') {
        throw new Error('bad request');
    }
    return response.data
}

const sendFile = async (file) => {
    if (!file) throw new Error('No file');

    const fileForm = new FormData();
    fileForm.append('file', file);
    const response = await customAxios.post(apiRoutes.uploadProof, fileForm, {
        'Content-Type': 'multipart/form-data',
    });
    if (response.data['status'] === 'error') {
        throw new Error('bad request');
    }
    return response.data
}

// const useFormSubmit = (data, dataMutation) => {
//     useEffect(() => {
//         if (data[0]) {
//             dataMutation.mutate(data[0]);
//         }
//     }, [data]);
//
// }

const formatAsaRequest = (complaint) => {
    return {
        complaint,
    }
}

const getFormData = (e) => {
        e.preventDefault();
        const form = e.target;
        /*
            complaint from frontend format = {
                title: String,
                description: String,
                mobile: String,
                compliantType: String,
                location: {
                    buildingName: String,
                    roomNo: String,
                    floorNo: String,
                },
            }
        */
        const formData = {
            title: form.title.value,
            compliantType: complaintTypes[form.type.value],
            location: {
                buildingName: form.building.value,
                roomNo: form.roomNo.value || '',
                floorNo: form.floorNo.value || '',
            },
            description: form.description.value,
        };
        const file = form.proof.files[0];
        return [formData, file];
    }


const ComplaintForm = () => {
    const navigate = useNavigate();
    const {user} = useUser();
    if(user === null) {
        return <></>
    }
    const fileMutation = useMutation({
        mutationFn: sendFile,
        onSuccess: (responseData) => {
            toast.success('Registered complaint successfully');
        },
        onError
    })

    const dataMutation = useMutation({
        mutationFn: sendData,
        onError
    });



    const handleSubmit = async (event) => {
        event.preventDefault();
        const [formData, file] = getFormData(event);
        const complaint = formatAsaRequest(formData);
        await dataMutation.mutateAsync(complaint);
        await fileMutation.mutateAsync(file);
    };

    const today = getDate();

    return (
        <>
            <div>
                <div className={styles.wrapper}>
                    <div style={{
                         fontSize: "x-large", fontWeight: "bolder"
                    }}>
                        Register your complaint here
                    </div>
                    <form action="" className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.form_sub_wrapper}>
                            <div className={styles.personal_info_wrapper}>
                                <p>Personal information</p>
                                <div className={styles.inputs_label_wrapper}>
                                    <div className={styles.items}>
                                        <label htmlFor="name">Name: </label>
                                        <input type="text" name="name" disabled value={user.displayName}/>
                                    </div>
                                    <div className={styles.items}>
                                        <label htmlFor="roll" style={{
                                            marginRight: "3.4rem"
                                        }}>Roll No: </label>
                                        <input type="text" name="roll" disabled value={user.rollNo}/>
                                    </div>
                                    <div className={styles.items}>
                                        <label htmlFor="mail">Email: </label>
                                        <input type="email" name="mail" disabled value={user.email}/>
                                    </div>
                                    <div className={styles.items}>
                                        <label htmlFor='mobile'>Mobile No: <span
                                            className={styles.required}>*</span></label>
                                        <div><input required type='tel' pattern='(+91)? [0-9]{10}'/></div>
                                    </div>

                                </div>
                            </div>
                            <br/>

                            <div>
                                Complaint Details:
                            </div>
                            <div className={styles.inputs_label_wrapper}>

                                <div>
                                    <div><label htmlFor="type">Complaint Type:</label></div>
                                    <div>
                                        <select name="type">
                                            {Object.keys(complaintTypes).map((type, index) => {
                                                return <option key={index}
                                                               value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <div><label htmlFor='title'>Title : <span
                                        className={styles.required}>*</span></label></div>
                                    <div><input type='text' name='title'/></div>
                                </div>
                                <div className={styles.location_wrapper}>
                                    <div><label htmlFor="location">Location: <span className={styles.required}>*</span></label></div>
                                    <div className={styles.location}>
                                        <select name="building" required>
                                            {
                                                Object.keys(buildingsMap).map((building, index) => (
                                                    <option key={index}
                                                            value={buildingsMap[building]}>{building}</option>
                                                ))
                                            }
                                        </select>
                                        <div>
                                            <label htmlFor="roomNo">Room No: </label>
                                            <input type="text" name="roomNo" placeholder="Room No"/>
                                        </div>

                                        <div>
                                            <label htmlFor="floorNo">Floor No: </label>
                                            <input type="text" name="floorNo" placeholder="Floor No"/>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div><label htmlFor="description">Description: <span
                                        className={styles.required}>*</span></label></div>
                                    <div><textarea required name="description" cols={60} rows={10}></textarea></div>
                                </div>

                            </div>
                            <div>
                                <label htmlFor='file'>Proof</label>
                                <Toast ref={toast}></Toast>
                                <FileUpload mode="basic" name="file" accept="image/*, video/*" auto chooseLabel="Browse" />                            </div>
                        </div>
                        <div className={styles.buttons_wrapper}>
                            <button type="submit">Submit</button>
                            <button type="reset">Reset</button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
};

export default ComplaintForm;