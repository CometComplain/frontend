import React from 'react'

const CompliantDetail = () => {
    const firstrow = "text-base font-medium text-gray-600";
    const secondrow = "font-bold text-xl";
    const row = "flex flex-col gap-1";
    const col = "flex flex-col gap-5"
    const attachmentUrl = "https://unsplash.com/photos/RKYPRNMCBsY/download?force=true"
    const pending = "bg-orange-100 text-amber-700"
    const verfied = ""
    const accepted = ""
    const solved = "bg-green-200 text-black"
  return (
    <div>
        <div className="flex flex-col gap-3 m-5 border border-gray-300 rounded-lg shadow-lg ">
            <div className="p-5 text-2xl font-semibold bg-gray-300 ">Veiw Application Details</div>
                <div className="flex flex-row justify-between p-5">
                {/* First Row */}
                <div className={col}>
                    <div className={row}>
                        <div className={firstrow}>
                            Compliant ID
                        </div>
                        <div className={secondrow}>
                            1232324223
                        </div>
                    </div>
                    <div className={row}>
                        <div className={firstrow}>
                            Mobile Number
                        </div>
                        <div className={secondrow}>
                            6303191390
                        </div>
                    </div>
                    <div className={row}>
                        <div className={firstrow}>
                            Resolved Date
                        </div>
                        <div className={secondrow}>
                            12/12/2024
                        </div>
                    </div>
                </div>
                {/* Second Row */}
                <div className={col}>
                    <div className={row}>
                        <div className={firstrow}>
                            Name
                        </div>
                        <div className={secondrow}>
                            Santhosh Cheemala
                        </div>
                    </div>
                    <div className={row}>
                        <div className={firstrow}>
                            Status
                        </div>
                        <div className={`${pending} w-fit rounded-full px-4 py-1 capitalize font-semibold text-base`}>
                            Pending
                        </div>
                    </div>
                    <div className={row}>
                        <div className={firstrow}>
                            Location
                        </div>
                        <div className={secondrow}>
                            Meenachil Hostel,1st Floor
                        </div>
                    </div>
                </div>
                {/* third Row */}
                <div className={col}>
                    <div className={row}>
                        <div className={firstrow}>
                            Roll No
                        </div>
                        <div className={secondrow}>
                            2022BCY009
                        </div>
                    </div>
                    <div className={row}>
                        <div className={firstrow}>
                            Registration Date
                        </div>
                        <div className={secondrow}>
                            05/12/2024
                        </div>
                    </div>
                </div>
                 {/* fourth Row */}
                <div className={col}>
                    <div className={row}>
                        <div className={firstrow}>
                            Email
                        </div>
                        <div className={secondrow}>
                        ceemala22bcy9@iiitkottayam.ac.in
                        </div>
                    </div>
                    <div className={row}>
                        <div className={firstrow}>
                            Compliant Type
                        </div>
                        <div className={secondrow}>
                            Plumber
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-5">
                <div className={row}>
                    <div className={firstrow}>
                        Description
                    </div>
                    <div className="text-lg font-semibold">
                        Our floor third bathroom from the left side, the flush is not working.Can you check it once Please
                    </div>
                </div>
            </div>
            <div className="px-5 pb-5">
                <div className={row}>
                    <div className={firstrow}>
                        Attachments
                    </div>
                    <div className={`${secondrow} text-blue-700`}>
                        {attachmentUrl && (
                            <a href={attachmentUrl} download>Download Attachment</a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CompliantDetail