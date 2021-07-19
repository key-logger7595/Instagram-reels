import React,{useEffect} from 'react'
import  "./inter.css"
import v1 from "./fashion.mp4";
import v2 from "./tree.mp4"
import v3 from "./water.mp4"
import v4 from "./frog.mp4"



export default function IntersectionDemo() {
    const callBack=(entries)=>{
        console.log(entries)
        entries.forEach(entry=>{
            let child = entry.target.children[0];
            console.log(child.id)
            // play -> async work 
            // pause -> sync work
            if (entry.isIntersecting) {
                console.log(child.id)
            } else {
                console.log(child.id)

            }
            child.play().then(function(){
                if (entry.isIntersecting === false) {
                  child.pause();
              }  
              })
 
        })
    }
    
    useEffect(()=>{
     //root
     //ui
     //margin 
     
     let conditionalObj = {
         root:null,
         threshold:"0.9"
     }

     //setting the observer obj on every element we 
     //want to observe 
     //watch carefully that useEffect runs once but 
     //the observer is like an event attached which
     //will run the cb function everytime conditionalObj is 
     //hold true 

       let observer = new IntersectionObserver(callBack, conditionalObj);
       let elements= document.querySelectorAll(".video-container");

       elements.forEach((el)=>{
           observer.observe(el);
       })

    },[])
    return (
        <div>
            <div className="video-container">
                <Video src={v1} id={1}>

                </Video>
            </div>
            <div className="video-container">
                <Video src={v2} id={2}>

                </Video>
            </div>
            <div className="video-container">
                <Video src={v3} id={3}>

                </Video>
            </div>
            <div className="video-container">
                <Video src={v4} id={4}>

                </Video>
            </div>


        </div>
    )
}

function Video(props){

    return <video className="video-styles" controls muted="true" id={props.id}>
        <source src={props.src} type="video/mp4">
        </source>
    </video>
}