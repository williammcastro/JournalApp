
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import { startSaveNote, startUploading } from '../../actions/notes'


export const NotesAppBar = () => {
    const date = new Date().getTime();

    const noteDate = moment(date);

    const dispatch = useDispatch();
    const { active } = useSelector( state => state.notes )

    const handleSave = () => {
        console.log(active)
        dispatch( startSaveNote( active ) );
    }

    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        // console.log(e.target.files[0])
        const file = e.target.files[0];
        if ( file ){
            dispatch( startUploading( file ) );
        }
    }

    return (
        <div className='notes__appbar'>
            <span>{ noteDate.format('dddd, Do MMMM YYYY')}</span>
            <input
                id='fileSelector'
                type='file'
                name='file'
                style={{ display: 'none' }}
                onChange={ handleFileChange }
            />

            <div>
                <button 
                    className='btn'
                    onClick={ handlePictureClick }
                >
                    Picture
                </button>

                <button 
                    className='btn'
                    onClick={ handleSave }
                >
                    Save
                </button>
            </div>
        </div>
    )
}
