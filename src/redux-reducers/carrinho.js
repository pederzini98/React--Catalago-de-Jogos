import {  UPDATE_CARRINHO_VALUE } from '../redux-actions/action-types'


const carrinhoInitialState = []


export const carrinho = (state = carrinhoInitialState, action) => {
    switch (action.type) {

        case UPDATE_CARRINHO_VALUE:
            return action.carrinho

        default:
            return state
    }
}