import { createStore } from 'redux'

const defaultState = {
    heroes : {
        comp : []
    }
}

const AppReducer = (state = defaultState, action) => {
    switch(action.type) {
        case 'STORE_HEROES_COMP':
            const newState = state;
            state.heroes.comp = action.data;
            return newState;
        default:
            return state;
    }
}

const store = createStore(AppReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;