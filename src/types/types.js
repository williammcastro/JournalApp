//Se sacan del authReducer para no ir a equivocarse o poder modificar en el authReducer
// lo q va entre llaves cuadradas me indica cual es el reducer al cual reacciona esta accion!!!
export const types = {

    login: '[Auth] Login',
    logout: '[Auth] Logout',

    uiSetError: '[UI] Set Error',
    uiRemoveError: '[UI] Remove Error',

    uiStartLoading: '[UI] Start Loading',
    uiFinishLoading: '[UI] Finish Loading',

    notesAddNew: '[Notes] New Note',//crear una nueva nota
    notesActive: '[Notes] Set active note',//me indica cual es la nota activa
    notesLoad: '[Notes] Load notes',//cargar todas las notas
    notesUpdated: '[Notes] Updated note',//Actualizar las notas cuando toque en guardar
    notesFileUrl: '[Notes] Updated image url',//para subir un archivo
    notesDelete: '[Notes] Delete note',//borrar una nota
    notesLogoutCleaning: '[Notes] Logout Cleaning',//purgar toda la info del usuario cuando cierre sesion
}