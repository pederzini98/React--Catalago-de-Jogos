import { SET_SELECTED_FILTER } from '../redux-actions/action-types'

const filterInitialState = "name"



export const filter = (state = filterInitialState, action) => {
    switch (action.type) {
        case SET_SELECTED_FILTER:
            return action.filter
        default:
            return state
    }
}