import React from 'react'

const CompliantCard = () => {
  const bluerow = "bg-blue-700 px-5 py-3 text-white font-bold"
  const smallbox = "flex flex-col"
  const whitrow = " bg-white px-5 py-5 text-lg font-semibold"
  const pending = "bg-orange-100 text-amber-700"
  const verfied = ""
  const accepted = ""
  const solved = "bg-green-200 text-black"
  return (
    <div className='m-10 font-sans capitalize'>
      <div className="flex flex-row shadow-lg w-fit" >
        <div className={smallbox}>
          <div className={bluerow}>Sr.No</div>
          <div className={whitrow}>1</div>
        </div>
        <div className={smallbox}>
          <div className={bluerow}>Compliant ID</div>
          <div className={whitrow}>324673938</div>
        </div>
        <div className={smallbox}>
          <div className={bluerow}>Name</div>
          <div className={whitrow}>anakin</div>
        </div>
        <div className={smallbox}>
          <div className={bluerow}>Date of submission</div>
          <div className={whitrow}>25/03/2024</div>
        </div>
        <div className={smallbox}>
          <div className={bluerow}>Title</div>
          <div className={whitrow}>Fan is Not Working</div>
        </div>
        <div className={smallbox}>
          <div className={bluerow}>Status</div>
          <div className={whitrow}>
            <div className={`${solved} rounded-full px-4 py-1 capitalize font-semibold text-base`}>
              SOLVED
            </div>
          </div>
        </div>
        <div className={smallbox}>
          <div className={bluerow}>Action</div>
          <div className={whitrow}><a href={`http://localhost:5173/user/compliant/${325384837}`} className="text-orange-300 underline">Veiw</a></div>
        </div>
        </div>
    </div>
  )
}

export default CompliantCard