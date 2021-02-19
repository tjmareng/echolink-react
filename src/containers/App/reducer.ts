import { reducerWithInitialState } from "typescript-fsa-reducers";
import * as models from "./models";
import * as actions from "./actions";

export const initialState: models.AppState = {
    message: '',
    users: []
};

const appReducer = reducerWithInitialState(initialState)
    .case(actions.message, (state, payload) => ({
        ...state,
        message: ''
    }))
    .case(actions.addUser, (state, payload) => ({
        ...state,
        users: state.users.concat(payload)
    }))


export default appReducer;