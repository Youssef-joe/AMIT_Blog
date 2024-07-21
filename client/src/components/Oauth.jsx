import { Button } from 'flowbite-react'
import React from 'react'
import { FaGoogle } from "react-icons/fa";
import {GoogleAuthProvider, signInWithPopup, getAuth} from "firebase/auth"
import { app } from '../firebase';
import { useDispatch } from "react-redux"
import { signInSuccess } from "./../redux/user/userSlice.js"
import { useNavigate } from "react-router-dom"

export default function Oauth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const auth = getAuth(app)
    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({prompt: 'select_account'})
        try{
            const resultFromGoogle = await signInWithPopup(auth, provider)
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: resultFromGoogle.user.displayName,
                    email: resultFromGoogle.user.email,
                    googlePhotoUrl: resultFromGoogle.photoURL
                })
            })

            const data = await res.json()
            if (res.ok) {
                dispatch(signInSuccess(data))
                navigate('/')
            }
        } catch(er) {
            console.log(er)
        }
    }
  return (
    <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
        <FaGoogle className='w-5 h-5 mr-2'/>
        Continue With Google
    </Button>
  )
}
