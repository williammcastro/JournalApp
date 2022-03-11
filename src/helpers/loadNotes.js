import { db } from "../firebase/firebase-config"


export const loadNotes = async ( uid ) => {
    const notesSnap = await db.collection(`${ uid }/journal/notes`).get();
    const notes = [];

    notesSnap.forEach( snapHijo => {
        // console.log('este esnapHijo ', snapHijo.data());
        notes.push( {
            id: snapHijo.id,
            ...snapHijo.data(),
        } )
    } )

    // console.log(notes)

    // console.log('este ees notesSnap:',notesSnap);

    return notes

}