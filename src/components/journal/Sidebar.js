import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth'
import { JournalEntries } from './JournalEntries'
import { startNewNote } from '../../actions/notes'




export const Sidebar = () => {

    //Revision que viene en el redux state?
    // const estado = useSelector( state => state );
    // console.log(estado)

    
    const {name} = useSelector( state => state.auth );

    const dispatch = useDispatch();

    const handleLogout = () => {
        // console.log('click');
        dispatch( startLogout() );        
    }


    const handleAddNew = () => {
        // console.log('click desde handle')
        dispatch( startNewNote() );
    }


    
    return (
    <aside className='journal__sidebar'>
        <div className='journal__sidebar-navbar'>
            <h3 className='mt-5'>
                <i  className='far fa-moon'></i>
                <span> Hola { name }</span>
            </h3>

            <button 
                className='btn'
                onClick={ handleLogout }
            >
                Logout
            </button>
        </div>

        <div 
            className='journal__new-entry'
            onClick={ handleAddNew }
        >
            <i className='far fa-calendar-plus fa-5x'></i>
            <p className='mt-5'>
                New Entry
            </p>
        </div>

        <JournalEntries />
    </aside>
    )
}


