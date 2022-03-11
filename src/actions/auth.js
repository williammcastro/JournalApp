import { types } from '../types/types'
import { firebase, googleAuthProvider } from '../firebase/firebase-config'
import { finishLoading, startLoading } from './ui'
import Swal from 'sweetalert2'
import { noteLogout } from './notes'



//Primera Accion asincrona login del usuario con email y password!!!
export const startLoginEmailPassword = ( email, password ) => {
    //este dispatch que recibimos en el return() nos lo ofrece thunk por nosotros!!
    return ( dispatch ) => {  
        
        dispatch(startLoading());

        firebase.auth().signInWithEmailAndPassword( email, password)
            .then( ( {user} ) => {
                dispatch( login( user.uid, user.displayName ) )
                dispatch(finishLoading());
                console.log('usuario logueado:',user.displayName);
            })
            .catch(err => {
                console.log('Error en el login del usuario:',err.message)
                dispatch(finishLoading());
                Swal.fire({
                    title: 'Error!',
                    text: err.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                  })
            })
    }
}


//Segunda Accion asincrona de registro de usuario con google
export const startRegisterWithEmailPasswordName = ( email, password, name ) =>{
    return ( dispatch ) => {
        firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( async( {user} ) => {
                await user.updateProfile({ displayName: name })
                dispatch(
                    login( user.uid, user.displayName )
                )
                console.log('auth : userRegister user:', user)
            } )
            .catch(err => {
                console.log('Error en el registro del usuario:',err.message)
                Swal.fire('Error', err.message, 'error')
            });
    }
}


//Tercera Accion asincrona de login de google
export const startGoogleLogin = () => {
    return ( dispatch ) => {

        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ( {user} ) => {
                console.log( user.uid, user.displayName );
                dispatch( 
                    login( user.uid, user.displayName )
                )
            })
            .catch(err => {
                console.log('Error en el login con google:',err.message)
                Swal.fire('Error', err.message, 'error')
            });

    }
}

export const startLogout = ( ) => {
    return  ( dispatch ) => {
        firebase.auth().signOut()
         .then( ( ) => {
             console.log('then de startLogin dice: ejecutado resp:')
            dispatch( logout() );
            dispatch( noteLogout() );
         })
         .catch( (err) => { 
             console.log( 'error de logout de firebase', err.message)
             Swal.fire('Error', err.message, 'error')
            });
    }
}



// forma corta : quitar return y envolver en parentesis
export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});


export const logout = () => ({
    type: types.logout,
    //no necesito payload
});

// forma larga 
// export const login = (uid, displayName) = () => {
//     return {
//         type: types.login,
//         payload: {
//             uid,
//             displayName
//         }
//     }
// }