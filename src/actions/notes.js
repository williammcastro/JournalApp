import { db } from "../firebase/firebase-config";
import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";
import Swal from "sweetalert2";
import { fileUpload } from "../helpers/fileUpload";


export const startNewNote = () => {
   
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth;

        // Ojo que tambien se puede desestructurar de esta otra forma chevere
        // const {auth} = getState();
        // console.log( auth.uid );

        // Ojo que tambien se puede desestructurar de esta otra forma chevere
        // const uid = getState().auth.uid
 	    // console.log(uid)

         const newNote ={
             title: '',
             body: '',
             date: new Date().getTime(),
         }

         const doc = await db.collection(`${ uid }/journal/notes`).add( newNote );
        //  console.log( 'esta es la respuesta de firebase:',doc )

         dispatch( activeNote( doc.id, newNote ) );
         dispatch( addNewNote( doc.id, newNote ) )
    }
}


//Accion SINCRONA para setear la nota activa y presentarla en pantalla
export const activeNote = ( id, note ) => ( {//voy a regresar un objeto por eso coloco los parentesis
    type: types.notesActive,
    payload:{
        id,
        ...note
    }
} );

export const addNewNote  = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id, ...note
    }
})


//Accion ASINCRONA para la carga de las notas desde la bd
export const startLoadingNotes  = ( uid ) => {
    return async ( dispatch ) => {
        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) )
    }
}


//Accion SINCRONA para meter las notas recuperadas de la bd en el store
export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes,

});

export const startSaveNote = ( note ) => {
    return async ( dispatch, getState ) => {
        const { uid } = getState().auth;

        if(!note.url){
            delete note.url
        }
        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        await db.doc( `${ uid }/journal/notes/${ note.id }`).update( noteToFirestore )

        // dispatch( startLoadingNotes( uid ) )//forma perezosa
        dispatch( refreshNote( note.id, noteToFirestore) );

        Swal.fire( 'Saved', note.title, 'success' )
    }
};

export const refreshNote = ( id, note ) => ({
    type: types.notesUpdated,
    payload:{
        id, 
        note: {
            id,
            ...note
        }
    }
});



export const startUploading = ( file ) => {
    return async ( dispatch, getState ) => {

        const { active:activeNote } = getState().notes;
        // const activeNote = getState().notes.active //tambien se puede hacer asi!
        // console.log(file);
        // console.log(activeNote)

        Swal.fire({
            title: 'Uploading...',
            text:'Please wait...',
            allowOutsideClick:false,
            didOpen: () => {
                Swal.showLoading();
            },
        })

        const fileUrl = await fileUpload( file );
        activeNote.url = fileUrl;

        dispatch( startSaveNote( activeNote ) )
        
        Swal.close();

    }
}

export const startDeleting = ( id ) => {
    return async ( dispatch, getState ) => {

        const uid = getState().auth.uid;
        await db.doc(`${ uid }/journal/notes/${ id }`).delete();

        dispatch( deleteNote( id ) );


    }
}

export const deleteNote = ( id ) => ({
    type: types.notesDelete,
    payload: id,
});


export const noteLogout = ( ) => ({
    type: types.notesLogoutCleaning,
});



