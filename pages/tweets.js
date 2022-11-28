import React from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from '../firebase/firebase.config';
import { useState } from "react";
import { Firestore } from "firebase/firestore";
import { collection, doc, addDoc } from "firebase/firestore";
import { async } from "@firebase/util";

export default function Tweets(){

    const [user, setUser] = useState({})
    const [tweet, setTweet] = useState('')

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
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>{user.email}</label>
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
    )
}