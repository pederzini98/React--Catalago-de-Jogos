import {SET_SELECTED_FILTER, UPDATE_COMPRA_VALUE,UPDATE_CARRINHO_VALUE, SET_MODAL}from './action-types'


const setSelectedFilter = value =>({
    type: SET_SELECTED_FILTER,
    filter: value
})

const updateCompraValue = value =>({
    type: UPDATE_COMPRA_VALUE,
    value: value
})

const setMODAL = value =>({
    type: SET_MODAL,
    value: value
})

const updateCarrinhoValue = value =>({
    type: UPDATE_CARRINHO_VALUE,
    carrinho:value
})

export{
    setSelectedFilter,updateCarrinhoValue, updateCompraValue,setMODAL
}