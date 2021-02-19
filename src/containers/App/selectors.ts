import { createSelector } from "reselect";
import * as models from "./models";

const selectContainerState: (state: any) => models.AppState = state => state[models.CONTAINER_KEY];

export const selectMessages = createSelector(
    selectContainerState,
    appState => appState.message
);

export const selectAllUsers = createSelector(
    selectContainerState,
    appState => appState.users
);

export const selectUser = (_user : models.User) => createSelector(
    selectContainerState,
    appState => appState.users.find((user: models.User) => user.id === _user.id)
);

export const selectUsersInRoom = (_user : models.User) => createSelector(
    selectContainerState,
    appState => appState.users.filter((user: models.User) => user.room === _user.room)
);