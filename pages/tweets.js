import React from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from '../firebase/firebase.config';
import { useState } from "react";
import { Firestore, getDocs } from "firebase/firestore";
import { collection, doc, addDoc} from "firebase/firestore";
import { async } from "@firebase/util";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Tweets(){
  
    const router = useRouter();
    const handleClick = (e) => {
      router.back('./')
    }
  

    useEffect(()=>{
        showTweet()
    },[])

    const [user, setUser] = useState({})
    const [tweet, setTweet] = useState('')
    const [newTweet, showNewTweet] = useState([])

    const handleSubmit = event =>{
        event.preventDefault()
        event.target.reset()
    }

    const createTweet = async()=>{
        const postDoc = await addDoc(collection(db, "posts"),{
            text: tweet,
            user: auth.currentUser.email,
            userId: auth.currentUser.uid
        });
        // console.log('u suckkkk')
        showTweet();
    }

    const showTweet = async()=>{
        const getDoc = await getDocs(collection(db, "posts"));
        var newTweets = [];
        getDoc.forEach((doc)=>{
            console.log(doc.id, "=>", doc.data());
            newTweets.push({...doc.data(),id:doc.id})
        });
        showNewTweet([...newTweets]);
        console.log(newTweet);
    }
    
    return (
        <div>
            <button onClick={()=>handleClick()}>home</button>
            <div>
                <form onSubmit={handleSubmit}>

                    {/* helppp can someone make the user name/email show like on the home page when logged in pls */}
                    <div>{user.email}</div>
                    <input 
                        placeholder="What's happening?"
                        type="text"
                        onChange={(event)=> {
                            setTweet(event.target.value)
                        }}
                    />
                    <button onClick={createTweet}>Tweet</button>
                </form>
            </div>

            {/* show tweets */}
            
            <div>
                {/* <button onClick={()=>showTweet()}>test button</button> */}
                {newTweet.map(tweet =>{
                    return(
                        <div key={tweet.id}>
                            <p>{tweet.text}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}