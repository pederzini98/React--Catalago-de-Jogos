import {UPDATE_COMPRA_VALUE } from '../redux-actions/action-types'



const compraInitialState = {
    value: {value: 0}
}


export const compra = (state = compraInitialState, action) => {
    switch(action.type){
        case UPDATE_COMPRA_VALUE:
            return{
                value:  action.value
            }
        default:
            return state
    }
}