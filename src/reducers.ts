import appReducer from 'containers/App/reducer';
import chatReducer from 'containers/Chat/reducer';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
export interface State {
    app?: any;
    [container: string]: any;
}

const globalReducers = {
    app: appReducer,
    chat: chatReducer,
    form: formReducer,
};

function createRootReducer() {
    const reducers = {
        ...globalReducers,
    }
    return combineReducers(reducers);
}

export default createRootReducer;