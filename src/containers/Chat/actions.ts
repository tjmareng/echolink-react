import actionCreatorFactory from "typescript-fsa";
import * as models from "./models";

const actionCreator = actionCreatorFactory("echolink/");

export const message = actionCreator<String>("MESSAGE");
