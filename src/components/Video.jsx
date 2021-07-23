function Video(props) {
    console.log(props.userName);
    return (
        <>
            <video 
                className={props.classes1}
                controls
                muted ="true" id={props.id} >
                <source src={
                    props.src
                } type="video/mp4"

                >
                </source>
            </video >
            {props.userName}
        </>
    )
}

export default Video;