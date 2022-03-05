import { types } from "../types/types";
/*
se va a manejar un uid con firebase
uid:asdfñlkjqwero
Este es un reducer normalito
  
 */

const initialState = {
    uid: 123,
    name: ' william inicial',
    dir : {
        l:31
    }
}


export const authReducer = ( state = {initialState}, action ) => {
    // console.log(authReducer)

    switch ( action.type ) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            }

        case types.logout:
            return { }

        default:
            return state;

    }
}