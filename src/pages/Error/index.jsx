import React from 'react';
import styles from './styles.module.css';
import InputCard from '@components/InputCard/InputCard';
import { buildingsMap, complaintTypes } from '@/constants';

const Error = () => {
    const Card = "flex flex-col gap-3 mx-5 my-3  border border-gray-300 rounded-lg shadow-lg"
    const heading = "p-5 text-2xl font-semibold bg-gray-300  rounded-t-lg"
    const selectcss = "py-2 pl-2 pr-6 text-base border border-gray-400 rounded shadow focus:outline-none w-fit"
    return (
        <div className='' >
            <form action='' className='flex flex-col'>
                {/* Personal Details */}
                <div className={Card}>
                    <div className={heading}>Personal Details</div>
                    <div className="flex flex-col gap-5 p-5">
                        <div className="flex flex-row gap-10">
                            <InputCard name={"Name"} htmlFor={"Name"} LabelName={"Name:"} value={"Santhosh Cheemala"} typeInput={"text"} disabled styles={" bg-gray-200"} />
                            <InputCard name={"RollNumber"} htmlFor={"RollNumber"} LabelName={"Roll No:"} value={"2022BCY0009"} typeInput={"text"} disabled styles={" bg-gray-200"} />
                        </div>
                        <InputCard name={"email"} htmlFor={"email"} LabelName={"Email:"} value={"ceemalabcy9@iiitkottayam.ac.in"}  typeInput={"email"} disabled styles={" bg-gray-200 w-96"} />
                        <InputCard name={"number"} htmlFor={"number"} LabelName={"Mobile Number(Optional)"} typeInput={"number"} placeholder={"Enter Your Number"} />
                    </div>
                </div>
                {/* Compliant Details */}
                <div className={Card}>
                    <div className={heading}>Compliant Details</div>
                    <div className="flex flex-col gap-5 p-5">
                        <div className="flex flex-row gap-10 ">
                            <div className='flex flex-col gap-2'>
                                <label htmlFor='complianttype' className='text-base font-medium'>Selcet Compliant</label>
                                <select name="type" className={selectcss}>
                                    {Object.keys(complaintTypes).map((type, index) => {
                                        return <option key={index}
                                            value={type} className=''>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                                    })}
                                </select>   
                            </div>
                            <InputCard name={"Title"} htmlFor={"title"} LabelName={"Title"}  typeInput={"text"} placeholder={"Compliant Title"} styles={"w-fit"} />
                        </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor='description' className='text-base font-medium capitalize'>Complaint description*</label>
                        <textarea name={"description"} htmlFor={"description"}  typeInput={"number"} placeholder={"Enter Compliant Description"} rows={5} className='w-2/5 p-2 text-base border border-gray-900 rounded shadow' />
                    </div>
                    </div>
                </div>
                {/* Location  */}
                <div className={Card}>
                    <div className={heading}>Compliant Loaction</div>
                    <div className="flex flex-col gap-5 p-5">
                        <div className="flex flex-row gap-10">
                            <div className="flex flex-col gap-2">
                                <label htmlFor='BuildingName' className='text-base font-medium'>Selcet Compliant</label>
                                <select name="building" className={selectcss} required>
                                    {
                                        Object.keys(buildingsMap).map((building, index) => (
                                            <option key={index}
                                                    value={buildingsMap[building]}>{building}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <InputCard name={"room"} htmlFor={"room"} LabelName={"Room No"}  typeInput={"text"} placeholder={"Room Number"} />
                            <InputCard name={"floor"} htmlFor={"floor"} LabelName={"Floor No"}  typeInput={"text"} placeholder={"Floor Number"} />
                        </div>
                    </div>
                </div>
                {/* Upload File     */}
                <div className={Card}>
                    <div className={heading}>Upload File</div>
                    <div className="flex flex-col gap-2 m-5">
                        <label htmlFor="proof" className='text-base font-semibold' >Upload supporting documents</label>
                        <input name="proof"  className={"text-blue-500 border-dashed border-2 border-blue-500 shadow"} accept={".jpg, .jpeg, .png, .gif, .bmp, .webp, .mp4, .webm, .ogg, .ogv"} type={"file"} />
                    </div>
                </div>
                <div className="flex flex-row gap-5 mx-6 mt-4 mb-10">
                    <InputCard name={"submit"} typeInput={"submit"} styles="text-xl font-medium text-white bg-green-500 cursor-pointer hover:shadow-green-500" value={"submit"} />
                    <InputCard name={"reset"} typeInput={"reset"} styles={"text-xl font-medium text-white bg-orange-500 cursor-pointer hover:shadow-orange-500"} value={"reset"} />
                </div>
            </form>
        </div>
    );
};

export default Error;
