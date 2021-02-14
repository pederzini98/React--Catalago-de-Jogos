import {  SET_MODAL } from '../redux-actions/action-types'

const modalInitialState = false

export const modalState = (state = modalInitialState, action)=>{
    switch (action.type){
        case SET_MODAL:
            return action.value
    
    default:
        return state
    }
}