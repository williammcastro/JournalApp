import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {
        BrowserRouter as Router,
        Switch,
        Redirect
    } from "react-router-dom";
import { login } from '../actions/auth';
    
import { JournalScreen } from '../components/journal/JournalScreen';
import { firebase } from '../firebase/firebase-config';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import {  startLoadingNotes } from '../actions/notes';


export const AppRouter = () => {

    const [cheking, setCheking] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const dispatch = useDispatch()
    
    useEffect(() => {
        
        firebase.auth().onAuthStateChanged( async (user) => {
            if(user?.uid) {
                dispatch( login( user.uid, user.displayName ) );
                setIsLoggedIn(true);
                dispatch( startLoadingNotes( user.uid ) )
            }else{
                setIsLoggedIn(false);
            }

            setCheking(false);
        })
    }, [dispatch, setCheking, setIsLoggedIn])
    
    if(cheking) {
        return(
            // <LoadingScreen />//cuadrar un circulito girando
            <h1>Loading...Please wait...</h1>
        )
    }


    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        path="/auth"
                        component={ AuthRouter }
                        isAutenthicated={ isLoggedIn }
                    />

                    <PrivateRoute 
                        exact
                        path="/"
                        component={ JournalScreen }
                        isAutenthicated={ isLoggedIn }
                    />
                        <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}
