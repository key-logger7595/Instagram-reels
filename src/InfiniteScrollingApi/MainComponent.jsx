import React,{useState,useRef,useCallback} from 'react'
import useBookSearch from './useBookSearch';

export default function MainComponent() {
    
    //these 2 stataes are here because 
    //we want them to be used in this component only
    //meaning we dont want them to be part 
    //of any custom logic 

    const[query,setQuery] = useState('');
    const[pageNumber,setPageNumber] = useState(1);
    const observer = useRef();
     

    const  {books,loading,hasMore,error} = useBookSearch(query,pageNumber);
    
     
    const lastElementRef = useCallback(node=>{

        console.log("How many times did i run ?");

        if(loading) return ;

        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries=>{
          if(entries[0].isIntersecting && hasMore){
              setPageNumber(prevPage => prevPage + 1);
          }

        })
        if(node) observer.current.observe(node);
        console.log(node);
    },[loading,hasMore])


    const handleSearch=(e)=>{

      setQuery(e.target.value);
      setPageNumber(1);

    }

  

    return (
        <div>

            <input  value={query} type="text" onChange={handleSearch} ></input>
            {books.map((book,index) =>{
                if(books.length === index + 1)
                {
                return <div ref={lastElementRef}key={book}>{book}</div>

                }
                else{
                  return <div key={book}>{book}</div>  
                }
            })}
            {loading && 'Loading.....................'}
            {error && 'Error........'}
            

        </div>
    )
}
