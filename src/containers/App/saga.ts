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

export function* watchForAddingUsers() {
    yield takeEvery(actions.addUser, addUser);
}

export function* watchForRemovingUsers() {
    yield takeEvery(actions.removeUser, removeUser);
}

export function* watchForRedirects() {
    yield takeEvery(actions.redirect, redirect);
}

export function* redirect(action: Action<string>) {
    yield put(actions.redirect)
}

export function* handleMessage(action: Action<string>) {
    yield put(actions.message('blank'));
}

export function* addUser(action: Action<models.User>) {

    let id = action.payload.id;
    let username = action.payload.username;
    let room = action.payload.room;
    const state = yield select();
    let users = yield selecters.selectAllUsers(state);

    // Clean the data
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    // Validate the data
    if (!username || !room) {
        return {
            error: 'Username and room are required!'
        };
    }

    // Check for existing user
    const existingUser = users.find((user: models.User) => {
        return user.room === room && user.username === username
    });

    // Validate username
    if (existingUser) {
        return {
            error: 'Username is in use!'
        };
    }

    // Store user
    const user: models.User = { id, username, room };
    users.push(user);
    //return { user };

    yield put(actions.redirect);
}

export function* removeUser(action: Action<models.User>) {
    const state = yield select();
    let users = yield selecters.selectAllUsers(state);
    let id = action.payload.id;

    const index = users.findIndex((user: models.User) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
    yield put(actions.message('blank'));
}

export default function* rootSaga() {

    let welcomeMessage = 'Welcome!'

    yield all([
        put(actions.message(welcomeMessage)),
        fork(watchForMessages),
    ]);
}