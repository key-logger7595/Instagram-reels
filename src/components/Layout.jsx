import React, { useState, useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import { database, storage } from '../firebase';
import { AuthContext } from '../contexts/AuthContext';
import MenuAppBar from './MenuAppBar'
import uuid from 'react-uuid';
import Video from './Video'


const useStyles = makeStyles((theme) => {
    return {
      page: {
        background: '#f9f9f9',
        width: '98.5vw',
        
        // padding: theme.spacing(3),
      },
      root: {
        display: 'flex',
        flexDirection:'column'
      },
      feedContainer:{
         display:'flex',
         flexDirection:'column',
         width:'100%',
         justifyContent:'center',
         alignItems:'center',
         border:'1px solid black',
         gap:'5rem' 
      },
      videoContainer:{
        height:'86vh',
        width:'30vw',
        marginTop:'2rem',
        // border:'1px solid red'
      },
      videoStyles:{
       height:'100%',
       width:'100%',
       objectFit:'contain'
    //    transform: 'scale(-1, 1)'
    //    marginTop:'2rem',
    //    marginBottom:'1rem',
    //    border:'1px solid red'
      },

      toolbar: theme.mixins.toolbar
    }
  })
const Layout = () => {
    const classes = useStyles()
    const [imageLoading,setImageLoading] = useState(true);
    const[user,setUser] = useState();
    const {signOut,currentUser} = useContext(AuthContext);
    const[loading,setLoading]=useState(false);
    const[videos,setVideos] = useState([]);
    const submitHandler = async()=>{

        try {
         setLoading(true);
         await signOut();
        //  setLoading(false); 
        }
        catch(err){
        setLoading(false);
        }
    }

     //useEffect for getting profile image from firebase
     useEffect(()=>{
        // console.log(currentUser.uid +"line no-44 @ feed.jsx");
        async function fetchImage(){
           // how get a document from a collection in firebase 
        // auth user doen't contains any other data besides email ,password , uid
        //  you need to get the complete document from  the firstore using either of email or uid

        //meaning->

            //here i am not just geeting the image but the whole users document so 
            //i will also have access to all the schema keys inside
            // dataObject.data();

        let dataObject = await database.users.doc(currentUser.uid).get();
        // console.log(dataPromise.data());
        setUser(dataObject.data());
        setImageLoading(false);
        }
        fetchImage();
    },[])

        //useEffect to fetch posts[videos or reels]
    useEffect(()=>{
       async function fetchPosts(){
        const unsub = await database.posts.orderBy("createdAt", "desc")
        .onSnapshot(async snapshot => {

            //due to this snapshot this aysn fun reruns as we upload new video and add new posts.
            console.log(snapshot);
            let videos = snapshot.docs.map(doc => doc.data());
            // // console.log(videos);
            // let videoUrls = videos.map(video =>);
            // let auidArr = videos.map(video => video.auid);
            // let usersArr = [];
            // for (let i = 0; i < auidArr.length; i++) {
            //     let userObject = await database.user.doc(auidArr[i]).get();
            //     usersArr.push(userObject)
            // }
            let videosArr = [];
            for (let i = 0; i < videos.length; i++) {
                let videoUrl = videos[i].url;
                let auid = videos[i].auid;
                let id = snapshot.docs[i].id;
                let userObject = await database.users.doc(auid).get();
                let userProfileUrl = userObject.data().profileUrl;
                let userName = userObject.data().username;
                videosArr.push({ videoUrl, userProfileUrl, userName,puid:id });
            }
            setVideos(videosArr);
            return unsub;

        })
       }
      let unsub =  fetchPosts().then(data=>data)
       return unsub;
    },[])

    const handleInputFile = (e)=>{
        e.preventDefault();
        let file = e?.target?.files[0];
        if (file != null) {
            console.log(e.target.files[0])

        }
        // 
        if (file.size / (1024 * 1024) > 20) {
            alert("The selected file is very big");
            return;
        }
        setLoading(true)
        // 1. upload 
        const uploadTask = storage.ref(`/posts/${uuid()}`).put(file);
       
        //   progress
        const f1 = snapshot => {
            const progress = snapshot.bytesTransferred / snapshot.totalBytes;
            console.log(progress)
            //this callback is for providing the progress
        }
        // err
        const f2 = () => {
            alert("There was an error in uploading the file");
            return;
        }
        // success
        const f3 = () => {
            uploadTask.snapshot.ref.getDownloadURL().then(async url => {
                // 2.  
                // post collection -> post document put 
                let obj = {
                    comments: [],
                    likes: [],
                    url,
                    auid: currentUser.uid,
                    createdAt: database.getUserTimeStamp(),
                }
                //   put the post object into post collection 
                let postObj = await database.posts.add(obj);
                // 3. user postsId -> new post id put 
                await database.users.doc(currentUser.uid).update({
                    postIds: [...user.postIds, postObj.id]
                })
                console.log(postObj);
                setLoading(false);
            })
        }
        uploadTask.on('state_changed', f1, f2, f3)
    }
     
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
              }).catch(err=>{
                  console.log(err);
              })
 
        })
    }
    //intersection observer UseEffect
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
              let elements= document.querySelectorAll('#video-container');
              console.log(elements)
       
              elements.forEach((el)=>{
                  observer.observe(el);
              })
          
   
       },[videos])
    return (
    <div className={classes.root}>
        {/* app bar */}
        {imageLoading && <div>Loading navbar</div>}

        {!imageLoading && <MenuAppBar handleInputFile={handleInputFile} loading={loading} user={user} submitHandler={submitHandler}/>}
       
        {/* main content */}
        <div className={classes.page}>
           <div className={classes.toolbar}></div>
            <div className ={classes.feedContainer}>
            {videos.map((videoObj)=>{
                      console.log(videoObj);
                    return <div id="video-container" className={classes.videoContainer}>
                        <Video
                                src={videoObj.videoUrl}
                                id={videoObj.puid}
                                userName={videoObj.userName}
                                classes1 = {classes.videoStyles}
                            >

                            </Video>
                    </div>
                })}

            </div>
          {/* <Feed /> */}
        </div>
      </div>
    
    )
}

export default Layout;







  

 


