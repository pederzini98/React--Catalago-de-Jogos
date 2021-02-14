import {carrinho} from './carrinho'
import {compra} from './compra'
import {filter} from './filter'
import {modalState} from './modal'

import {combineReducers} from 'redux'

export const Reducers = combineReducers({
    carrinho,
    compra,
    filter,
    modalState
})