import { createSelector } from "reselect";
import * as models from "./models";

const selectContainerState: (state: any) => models.AppState = state => state[models.CONTAINER_KEY];

export const selectMessages = createSelector(
    selectContainerState,
    appState => appState.message
);
