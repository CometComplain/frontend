import styles from './styles.module.css';
import form from "@pages/Form/index.jsx";
import {useMutation} from "@tanstack/react-query";
import {getDate, onError} from "@/utils/index.js";
import {apiRoutes, buildingsMap, complaintTypes, customAxios, pages} from '@/constants'
import {toast} from "sonner";
import {useUser} from "@/contexts/UserContextProvider.jsx";
import InputCard from "@components/ui/InputCard.jsx";


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
            complaintType: complaintTypes[form.type.value],
            location: {
                buildingName: form.building.value,
                roomNo: form.roomNo.value || '',
                floorNo: form.floorNo.value || '',
            },
            mobile: form.mobile.value,
            description: form.description.value,
        };
        const file = form.proof.files[0];
        return [formData, file];
    }

const Card = "flex flex-col gap-3 mx-5 my-3  border border-gray-300 rounded-lg shadow-lg"
const heading = "p-5 text-2xl font-semibold bg-gray-300  rounded-t-lg"
const selectCSS = "py-2 pl-2 pr-6 text-base border border-gray-400 rounded shadow focus:outline-none w-fit"



const ComplaintForm = () => {
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
        <div className=''>
            <form action='' className='flex flex-col' onSubmit={handleSubmit}>
                {/* Personal Details */}
                <div className={Card}>
                    <div className={heading}>Personal Details</div>
                    <div className="flex flex-col gap-5 p-5">
                        <div className="flex flex-row gap-10 flex-wrap">
                            <InputCard name={"name"} LabelName={"Name:"} value={user.displayName}
                                       typeInput={"text"} disabled styles={" bg-gray-200"}/>
                            <InputCard name={"rollNumber"} LabelName={"Roll No:"}
                                       value={user.rollNo} typeInput={"text"} disabled styles={" bg-gray-200"}/>
                        </div>
                        <InputCard name={"email"} LabelName={"Email:"}
                                   value={user.email} typeInput={"email"} disabled
                                   styles={" bg-gray-200 w-96"}/>
                        <InputCard props={{
                            pattern: '[0-9]{10}'
                        }} name={"mobile"} LabelName={"Mobile Number (Optional)"}
                                   typeInput={"number"} placeholder={"Enter Your Number"}/>
                    </div>
                </div>
                {/* Compliant Details */}
                <div className={Card}>
                    <div className={heading}>Compliant Details</div>
                    <div className="flex flex-col gap-5 p-5">
                        <div className="flex flex-row gap-10 flex-wrap">
                            <div className='flex flex-col gap-2'>
                                <label htmlFor='complianttype' className='text-base font-medium'>Selcet
                                    Compliant <span className='text-red-600'>*</span></label>
                                <select name="type" className={selectCSS}>
                                    {Object.keys(complaintTypes).map((type, index) => {
                                        return <option key={index}
                                                       value={type}
                                                       className=''>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                                    })}
                                </select>
                            </div>
                            <InputCard name={"title"} LabelName={"Title"} typeInput={"text"} required
                                       placeholder={"Compliant Title"} styles={"w-fit"}/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor='description' className='text-base font-medium capitalize'>Complaint
                                description <span className='text-red-600'>*</span></label>
                            <textarea name={"description"}

                                      placeholder={"Enter Compliant Description"} rows={5}
                                      className='w-2/5 p-2 text-base border border-gray-900 rounded shadow'/>
                        </div>
                    </div>
                </div>
                {/* Location  */}
                <div className={Card}>
                    <div className={heading}>Compliant Loaction</div>
                    <div className="flex flex-col gap-5 p-5">
                        <div className="flex flex-row gap-10 flex-wrap">
                            <div className="flex flex-col gap-2">
                                <label htmlFor='BuildingName' className='text-base font-medium'>Selcet Compliant <span
                                    className='text-red-600'>*</span></label>
                                <select name="building" className={selectCSS} required>
                                    {
                                        Object.keys(buildingsMap).map((building, index) => (
                                            <option key={index}
                                                    value={buildingsMap[building]}>{building}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <InputCard name={"roomNo"}  LabelName={"Room No"} typeInput={"text"}
                                       placeholder={"Room Number"}/>
                            <InputCard name={"floorNo"} LabelName={"Floor No"} typeInput={"text"}
                                       placeholder={"Floor Number"}/>
                        </div>
                    </div>
                </div>
                {/* Upload File     */}
                <div className={Card}>
                    <div className={heading}>Upload File</div>
                    <div className="flex flex-col gap-2 m-5 w-fit">
                        <label htmlFor="proof" className='text-base font-semibold'>Upload supporting documents <span
                            className='text-red-600'>*</span></label>
                        <input name="proof" className={"text-blue-500 border-dashed border-2 border-blue-500 shadow"}
                               accept={".jpg, .jpeg, .png, .gif, .bmp, .webp, .mp4, .webm, .ogg, .ogv"} type={"file"}/>
                    </div>
                </div>
                <div className="flex flex-row gap-5 justify-center mx-6 mt-4 mb-10">
                    <InputCard name={"submit"} typeInput={"submit"}
                               styles="text-xl font-medium text-white bg-green-600 cursor-pointer hover:shadow-green-500"
                               value={"submit"}/>
                    <InputCard name={"reset"} typeInput={"reset"}
                               styles={"text-xl font-medium text-white bg-red-600 cursor-pointer hover:shadow-orange-500"}
                               value={"reset"}/>
                </div>
            </form>
        </div>
    );
};

export default ComplaintForm;


/*
(
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
                                        <div><input required type='tel' pattern='[0-9]{10}' name='mobile'/></div>
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
                                <input type='file' name='proof' accept='image/*, video/*'/>
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
    )
*/