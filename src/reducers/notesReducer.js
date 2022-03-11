/*
esta es la estructura que va a tener mi estado
El estado va a ser de la siguiente estructura en un objeto:

    {
        notes: [] //este es el arreglo de las notas del usuario todas con todas sus propiedades
        active: null, //si no hay ninguna nota seleccionada el active es null, esto significa q voy a mostrar la pantalla morada para agregar una nueva nota
        active: { //si esta activa la nota, el obj tendrá las siguientes propiedades:
            id: 'ASLFIOQENVKERTOIJ',//todas estas propiedades seran string, menos date q es number(date)
            title:'',
            body:'',
            imageUrl: '',
            date: 34982345243,
        }
    }

*/

import { types } from "../types/types";


const initialState = {
    notes: [],
    active: null,
}


export const notesReducer = ( state = initialState, action) => {

    switch ( action.type ) {
        case types.notesActive:
            return{
                ...state,//Clonacion del estado anterior!!!
                active: {
                    ...action.payload,
                }
            }

        case types.notesAddNew:
            return {
                ...state,
                notes:[ action.payload, ...state.notes ]
            }
        
        case types.notesLoad:
            return{
                ...state,
                notes: [ ...action.payload ]
            }

        case types.notesUpdated:
            return{
                ...state,
                notes: state.notes.map(
                    note => note.id === action.payload.id
                    ? action.payload.note
                    : note
                )
            }

        case types.notesDelete:
            return{
                ...state,
                active: null,
                notes: state.notes.filter( note => note.id !== action.payload )

            }

        case types.notesLogoutCleaning:
            return{
                ...state,
                active: null,
                notes: [],
            }


        default:
            return state;
    }
}

