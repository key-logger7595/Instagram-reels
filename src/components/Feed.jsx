// import React,{useContext,useState,useEffect} from 'react'
// import {AuthContext} from '../contexts/AuthContext';
// import { database,storage } from '../firebase';
// import uuid from'react-uuid';
// import Avatar from '@material-ui/core/Avatar';
// import { makeStyles } from '@material-ui/core';
// import Button from '@material-ui/core/Button';
// import PhotoCamera from '@material-ui/icons/PhotoCamera';
// //implement profile image data 
// //then implement upload video


// const useStyles = makeStyles((theme) => ({
//     root: {
//         '& > *': {
//             margin: theme.spacing(1),
//         },
//     },
//     input: {
//         display: 'none',
//     },
// }));
// export default function Feed() {

//     //these  first two state for profile image especially

  

//     //this state is for videos 
//     const[videos,setVideos] = useState([]);
//     const {signOut,currentUser} = useContext(AuthContext);
//     const classes = useStyles();

//     //useEffect to fetch posts[videos or reels]
//     useEffect(()=>{
//        async function fetchPosts(){
//         const unsub = await database.posts.orderBy("createdAt", "desc")
//         .onSnapshot(async snapshot => {

//             //due to this snapshot this aysn fun reruns as we upload new video and add new posts.
//             console.log(snapshot);
//             let videos = snapshot.docs.map(doc => doc.data());
//             // // console.log(videos);
//             // let videoUrls = videos.map(video =>);
//             // let auidArr = videos.map(video => video.auid);
//             // let usersArr = [];
//             // for (let i = 0; i < auidArr.length; i++) {
//             //     let userObject = await database.user.doc(auidArr[i]).get();
//             //     usersArr.push(userObject)
//             // }
//             let videosArr = [];
//             for (let i = 0; i < videos.length; i++) {
//                 let videoUrl = videos[i].url;
//                 let auid = videos[i].auid;
//                 let id = snapshot.docs[i].id;
//                 let userObject = await database.users.doc(auid).get();
//                 let userProfileUrl = userObject.data().profileUrl;
//                 let userName = userObject.data().username;
//                 videosArr.push({ videoUrl, userProfileUrl, userName,puid:id });
//             }
//             setVideos(videosArr);
//             return unsub;

//         })
//        }
//       let unsub =  fetchPosts().then(data=>data)
//        return unsub;
//     },[])

//     const handleInputFile = (e)=>{
//         e.preventDefault();
//         let file = e?.target?.files[0];
//         if (file != null) {
//             console.log(e.target.files[0])

//         }
//         // 
//         if (file.size / (1024 * 1024) > 20) {
//             alert("The selected file is very big");
//             return;
//         }
//         setLoading(true)
//         // 1. upload 
//         const uploadTask = storage.ref(`/posts/${uuid()}`).put(file);
       
//         //   progress
//         const f1 = snapshot => {
//             const progress = snapshot.bytesTransferred / snapshot.totalBytes;
//             console.log(progress)
//             //this callback is for providing the progress
//         }
//         // err
//         const f2 = () => {
//             alert("There was an error in uploading the file");
//             return;
//         }
//         // success
//         const f3 = () => {
//             uploadTask.snapshot.ref.getDownloadURL().then(async url => {
//                 // 2.  
//                 // post collection -> post document put 
//                 let obj = {
//                     comments: [],
//                     likes: [],
//                     url,
//                     auid: currentUser.uid,
//                     createdAt: database.getUserTimeStamp(),
//                 }
//                 //   put the post object into post collection 
//                 let postObj = await database.posts.add(obj);
//                 // 3. user postsId -> new post id put 
//                 await database.users.doc(currentUser.uid).update({
//                     postIds: [...user.postIds, postObj.id]
//                 })
//                 console.log(postObj);
//                 setLoading(false);
//             })
//         }
//         uploadTask.on('state_changed', f1, f2, f3)
//     }
//     return (
       
//         <div>
//              {pageLoading && <div>Loading.......</div>}
//              {!pageLoading &&  <div>
//             <div className="navbar">
//                 <Avatar alt="remy sharp" src={user.profileUrl}/>  
//                 <button disabled={loading} onClick={submitHandler}>LogOut</button>
//             </div>
//             <div className="upload-image">
//                 <div className={classes.root}>
//                 <input accept="file" className={classes.input} id="icon-button-file" type="file"
//                             onChange={handleInputFile}
//                         />
//                         <label htmlFor="icon-button-file">
//                             <Button variant="contained" color="primary" component="span" disabled={loading} endIcon={<PhotoCamera />}>
//                                 Upload
//                             </Button>
//                         </label>
//                 </div>
//             </div>
//             <div className="feed">
//                 {videos.map((videoObj)=>{
//                       console.log(videoObj);
//                     return <div className="video-container">
//                         <Video
//                                 src={videoObj.videoUrl}
//                                 id={videoObj.puid}
//                                 userName={videoObj.userName}
//                             >

//                             </Video>
//                     </div>
//                 })}
//             </div>

//          </div> }
       
//         </div>
//     )
// }
// function Video(props) {
//     console.log(props.userName);
//     return (
//         <>
//             <video 

//                 controls muted ="true" id={props.id} >
//                 <source src={
//                     props.src
//                 } type="video/mp4"

//                 >
//                 </source>
//             </video >
//             {props.userName}
//         </>
//     )
// }
