import {createContext } from "react";
import {Maybe, Position, State} from "./types";
import {initState} from "./reducer";
import React from 'react';
import {Action} from "./actions";

interface Context {
    state: State;
    dispatch?: React.Dispatch<Action>;
}

export const DndMonitorContext = createContext<Context>({state: initState()});