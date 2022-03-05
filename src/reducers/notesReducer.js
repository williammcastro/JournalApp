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

const initialState = {
    notes: [],
    active: null,
}

export const notesReducer = ( state = initialState, action) => {

    switch ( action.type ) {
        // case types.

        default:
            return state;
    }

}