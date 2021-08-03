import React,{useRef,useEffect,useState, useCallback} from 'react'
import axios from 'axios';

const PhotosFetch = () => {
    
    const [photos,setPhotos] = useState([]);
    const [pageNumber,setPageNumber] = useState(0);

    const[loading,setLoading] = useState(false);
    const[error,setError] = useState(false);
    const observer = useRef();

    useEffect(()=>{
       setLoading(true);
       setError(false);
       axios({
        method:'GET',
        url:`https://jsonplaceholder.typicode.com/photos?_page=${pageNumber}&_limit=10`
       }).then(res=>{

           setPhotos(prevPhotos=>{
               return [...prevPhotos,...res.data]
           });
           console.log(res);
           setLoading(false);
           setError(false);
       }).catch(err=>{
           setError(true);
       })

    },[pageNumber])
     
    const style = {textAlign:"center",display:"flex",flexDirection:"column",gap:"1.2rem"};
    const loadingCss = {
        height: "100px",
        margin: "30px",
        border:"1px solid black"
      };
     
    const loadingTextCss= {display:`loading`?'block':'none'};

    const lastElementRef = useCallback(node=>{
       if(loading) return ;
       if(observer.current) observer.current.disconnect();
       
       observer.current= new IntersectionObserver(entries=>{
             if(entries[0].isIntersecting){
                console.log("How many times") 
                
                setPageNumber(prevPagenumber=>prevPagenumber+1);
             }
       },{ 
        root: null,
        rootMargin: "0px",
        threshold: 1.0
       })
       if(node) observer.current.observe(node);
       console.log(node);
    },[loading])
    return (
        <div className="container" style = {style}>
           <div style={{ display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"1.2rem" ,minHeight: "800px" }}>
            {photos.map((user,index)=>{
                // if(photos.length === index+1){
                //  return  <img ref={lastElementRef}  src={user.url} height="100px" width="200px"  alt={`sexy${index+1}`}/>
                // }
                // else{

                    return  <img src={user.url} height="100px"  width="200px"  alt={`sexy${index+1}`}/>
                // }
            })}
           </div>
            <div style={loadingCss}  ref={lastElementRef}>
                <span style={loadingTextCss}>Loading...</span>
            </div>
           <div>{error && <div>{error}</div>}</div>        
        </div>
    )
}

export default PhotosFetch
