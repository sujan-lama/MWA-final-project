import {createStore} from 'redux';
import {reducer} from "./reducer";
import {Injectable} from "@angular/core";

export const userStore = createStore(reducer);
