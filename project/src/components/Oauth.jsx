import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from './../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import {useNavigate} from 'react-router-dom';

export default function Oauth() {
    const handleClick = async(app) => {
        const auth = getAuth();
        const dospacth = useDispatch();
        const navigate = useNavigate();
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters ({ prompt: 'select_account' });
        try {
            
            const resultsGoogle = await signInWithPopup(auth, provider);
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: resultsGoogle.user.displayName,
                    email: resultsGoogle.user.email,
                    photo: resultsGoogle.user.photoURL,
                 }),});
            const data = await res.json();
            if(res.ok){
                dispatch(signInSuccess(data.user));
                

            }

        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
    <Button type='button'  gradientDuoTone="pinkToOrange" outline onClick={handleClick}>
        <AiFillGoogleCircle  className='w-6 h-6 mr-2'/>Sign Up with Google</Button>
    </>
  )
}
