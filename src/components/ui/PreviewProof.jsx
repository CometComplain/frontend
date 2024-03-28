const YourComponent = ({ attachmentUrl }) => {
    return (
        <div className="row">
            <div className="firstRow">
                Attachments
            </div>
            <div className={`${secondRow} text-blue-700`}>
                {attachmentUrl && (
                    <>
                        {attachmentUrl.endsWith('.mp4') ? (
                            <video controls>
                                <source src={attachmentUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : attachmentUrl.endsWith('.png') || attachmentUrl.endsWith('.jpg') || attachmentUrl.endsWith('.jpeg') ? (
                            <img src={attachmentUrl} alt="Attachment" />
                        ) : (
                            <a href={attachmentUrl} download>Download Attachment</a>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default YourComponent;
