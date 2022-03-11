
import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import validator from 'validator'
import Swal from 'sweetalert2'

import { useDispatch, useSelector } from 'react-redux'
import { removeError, setError } from '../../actions/ui'
import { startRegisterWithEmailPasswordName } from '../../actions/auth'

export const RegisterScreen = () => {


    //inicio manejo dispatch
        const dispatch = useDispatch();
    //fin manejo dispatch

    //inicio manejo selector
        const {msgError} = useSelector( state => state.ui )
        console.log('este es msgError register:',msgError)
    //fin manejo selector

    // inicio manejo del formulario
        const [formValues, handleInputChange] = useForm({
            name: 'william',
            email:'will@castro.com',
            password: '123456',
            password2: '123456'
        })

        const {name, email, password, password2} = formValues;

        const handleRegister = (e) => {
            e.preventDefault();

            if ( isFormValid() ){
                console.log('formulario correctamente diligenciado', email, password)
                dispatch(startRegisterWithEmailPasswordName( email, password, name ))
            }
        }
    // fin manejo del formulario


    // Inicio funcion de Manejo de errores
        const isFormValid = () => {
            if( name.trim().length === 0 ){
                console.log('Nombre es requerido')
                dispatch(setError('Nombre es requerido'));
                Swal.fire('Error', 'Nombre es requerido', 'error')
                return false;

            } else if (!validator.isEmail( email )) {
                console.log('email no es válido')
                dispatch(setError('email no es válido'));
                Swal.fire('Error', 'email no es válido', 'error')
                return false;

            } else if ( password !== password2 ){
                console.log('Los password no coinciden')
                dispatch(setError('Los password no coinciden'));
                Swal.fire('Error', 'Los password no coinciden', 'error')
                return false;

            } else if (  password.length < 6 ){
                console.log('El password debe tener 6 o más caracteres')
                dispatch(setError('El password debe tener 6 o más caracteres'));
                Swal.fire('Error', 'El password debe tener 6 o más caracteres', 'error')
                return false;
            }

            dispatch(removeError());
            return true
        }
    // Fin funcion de Manejo de errores


    return (
        <>
        <h3 className='auth__title' >Register</h3>
        <form 
            onSubmit={ handleRegister }
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
                placeholder='Name'
                name='name'
                className='auth__input'
                autoComplete='off'
                onChange={ handleInputChange }
                value={ name }            />
            <input 
                type='text'
                placeholder='Email'
                name='email'
                className='auth__input'
                autoComplete='off'
                onChange={ handleInputChange }
                value={ email }            />

            <input 
                type='password'
                placeholder='Password'
                name='password'
                className='auth__input'
                // autoComplete='off'
                onChange={ handleInputChange }
                value={ password }
            />
            <input 
                type='password'
                placeholder='Confirm password'
                name='password2'
                className='auth__input'
                // autoComplete='off'
                onChange={ handleInputChange }
                value={ password2 }
            />

            <button
                type='submit'
                className='btn btn-primary btn-block mb-5'
                onClick={ handleRegister }
            >
                Register
            </button>


            <Link
                to='/auth/login'
                className='link'
            >
                Already registered?
            </Link>
        </form>
        </>    )
}
