import { all, fork, takeEvery, put, select } from "redux-saga/effects";
import { Action } from "typescript-fsa";
import * as actions from "./actions";
import * as models from "./models";
import * as selecters from "./selectors";

export function* message(action: Action<string>) {
    return null;
}

export function* watchForMessages() {
    yield takeEvery(actions.message, handleMessage);
}

export function* handleMessage(action: Action<string>) {
    yield put(actions.message('blank'));
}


export default function* rootSaga() {

    let welcomeMessage = 'Welcome!'

    yield all([
        put(actions.message(welcomeMessage)),
        fork(watchForMessages),
    ]);
}