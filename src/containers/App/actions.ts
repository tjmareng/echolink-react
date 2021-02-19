import actionCreatorFactory from "typescript-fsa";
import * as models from "./models";

const actionCreator = actionCreatorFactory("echolink");

export const message = actionCreator<String>("MESSAGE");
export const addUser = actionCreator<models.User>("ADD_USER");
export const removeUser = actionCreator<models.User>("REMOVE_USER");
export const redirect = actionCreator<models.User>("REDIRECT");