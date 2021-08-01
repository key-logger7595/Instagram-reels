import React,{useState,useRef,useCallback,useEffect} from 'react'
import useBookSearch from './useBookSearch';
import axios from 'axios'

export default function MainComponent() {
    
    //these 2 stataes are here because 
    //we want them to be used in this component only
    //meaning we dont want them to be part 
    //of any custom logic 

    const[query,setQuery] = useState('');
    const[pageNumber,setPageNumber] = useState(1);
    const observer = useRef();
     

    const[loading,setLoading] = useState('true');
    const[error,setError] = useState('false');
    const[books,setBooks] = useState([]);
    const[hasMore,setHasMore] = useState(false);
    
    useEffect(()=>{
        setBooks([]);
      },[query])
  
      useEffect(()=>{
          setLoading(true);
          setError(false);
          let cancel ;
         axios({
             method:'GET',
             url:'http://openlibrary.org/search.json',
             params:{q:query,page:pageNumber},
             cancelToken:new axios.CancelToken(c=>cancel=c)
         }).then(res=>{
             setBooks(prevBooks=>{
                 return [...new Set([...prevBooks,...res.data.docs.map(b=>b.title)])]
             })
             setHasMore(res.data.docs.length > 0);
             setLoading(false);
             console.log(res.data);
         }).catch(e=>{
  
              if(axios.isCancel(e)) return
              setError(true); 
           })
  
         return ()=> cancel();
      },[query,pageNumber])  
     
    const lastElementRef = useCallback(node=>{
        //yeh isliye kiya hai kyunki lastElementRef 1 se zaada baar fire hoga i dont know why 
        //all i get is that whenever the component mounts function Instance Passed to ref fires
        //but here this function is firing more than once

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
