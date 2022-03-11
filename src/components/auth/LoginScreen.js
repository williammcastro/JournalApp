import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import validator from 'validator'
import Swal from 'sweetalert2'


import { removeError, setError } from '../../actions/ui'
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'

import { useForm } from '../../hooks/useForm'

export const LoginScreen = () => {

    //inicio manejo dispatch
        const dispatch = useDispatch();
    //fin manejo dispatch


    //inicio manejo selector para mensaje de error
        const {msgError} = useSelector( state => state.ui )
        // console.log('este es msgError login:',msgError)
    //fin manejo selector para mensaje de error

    //inicio manejo selector para loading
        const {loading} = useSelector( state => state.ui )
        // console.log('este es state de login:',loading)
    //fin manejo selector para loading



    // inicio manejo del formulario
        const [formValues, handleInputChange] = useForm({
            email:'will@castro.com',
            password: '123456',
        })

        const {email, password} = formValues;

        // inicio manejo login con user y password
            const handleLogin = (e) => {
                e.preventDefault();
                if ( isFormValid() ){
                    dispatch( startLoginEmailPassword(email, password) );
                }
            }
        // fin manejo login con user y password
    // fin manejo del formulario


    // Inicio funcion de Manejo de errores
        const isFormValid = () => {
            
            if (!validator.isEmail( email )) {
                console.log('email no es válido')
                dispatch(setError('email no es válido'));
                Swal.fire('Error', 'email no es válido', 'error')
                return false;

            } else if (  password.length < 6 ){
                // console.log('El password debe tener 6 o más caracteres')
                dispatch(setError('El password debe tener 6 o más caracteres'));
                Swal.fire('Error', 'El password debe tener 6 o más caracteres', 'error')

                return false;
            }

            dispatch(removeError());
            return true
        }
    // Fin funcion de Manejo de errores


    //inicio manejo handler boton login Google
    const handleGoogleLogin = () => {   
        dispatch(startGoogleLogin());
    }
    //fin manejo handler boton login Google


    return (
        <>
        <h3 className='auth__title' >Login</h3>
        <form 
            onSubmit={ handleLogin }
            className="animate__animated animate__fadeIn animate__faster"
        
        >

            {
                msgError &&
                (
                    <div className='auth__alert-error'>
                        {msgError}
                    </div>
                )
            }

            <input 
                type='text'
                placeholder='Email'
                name='email'
                className='auth__input'
                autoComplete='off'
                onChange={ handleInputChange }
                value={ email }
            />

            <input 
                type='password'
                placeholder='Password'
                name='password'
                className='auth__input'
                autoComplete='off'
                onChange={ handleInputChange }
                value={ password }
            />

            <button
                type='submit'
                className='btn btn-primary btn-block'
                disabled={ loading }
            >
                Login
            </button>

            <div className='auth__social-networks'>
                <p>Login with social media</p>
                <div 
                    className="google-btn"
                    onClick={ handleGoogleLogin }
                >
                    <div className="google-icon-wrapper">
                        <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                    </div>
                    <p className="btn-text">
                        <b>Sign in with google</b>
                    </p>
                </div>
            </div>
            <Link
                to='/auth/register'
                className='link'
            >
                Create new account
            </Link>
        </form>
        </>
    )
}


