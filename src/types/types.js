//Se sacan del authReducer para no ir a equivocarse o poder modificar en el authReducer

export const types = {

    login: '[Auth] Login',
    logout: '[Auth] Logout',

    uiSetError: '[UI] Set Error',
    uiRemoveError: '[UI] Remove Error',

    uiStartLoading: '[UI] Start Loading',
    uiFinishLoading: '[UI] Finish Loading',
}