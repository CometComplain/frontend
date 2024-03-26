import React from 'react'
import Selfie from "../../assets/free-images.jpg"
const UserDetails = () => {
  return (
    <div className="">
    <div className='flex flex-row gap-16 p-10 m-5 font-serif border border-gray-300 rounded-lg shadow-xl'>
        <img src={Selfie} className='rounded-full' width={200} height={200} alt="Img" />
        <div className="flex gap-16">
            <div className="flex flex-col gap-6">
                <div className="">Name: Santhosh Cheemala</div>
                <div className="">Roll No: 2022BCY009</div>
                <div className="">Email: ceemala22bcy9@iiitkottayam.ac.in</div>
            </div>
            <div className="flex gap-5 text-base">
                <div className="flex flex-col items-center p-4 bg-orange-300 rounded justify-evenly">
                    <div className="font-semibold ">Registered Compliants</div>
                    <div className="text-3xl font-bold text-orange-900">20</div>
                </div>
                <div className="flex flex-col items-center p-4 bg-green-300 rounded justify-evenly">
                    <div className="font-semibold ">
                        Solved Compliants
                    </div>
                    <div className="text-3xl font-bold text-green-900">
                        10
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>  
  )
}

export default UserDetails