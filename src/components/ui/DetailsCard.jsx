const DetailsCard = ({title, content}) => {
    return (
        <div className='rounded-lg flex flex-col justify-center items-center bg-white  p-10 shadow-lg'
            style={{
                width: 'minmax(fit-content, 16.666667%;)'
            }}
        >
            <div className='text-2xl font-bold'>{title}</div>
            <p className='text-gray-700 text-4xl'>{content}</p>
        </div>
    );
}

export default DetailsCard;