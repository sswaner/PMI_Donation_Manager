

import { combineReducers } from "redux";
import UserData from "./slices/UserData";
import UserMobileMenu from "./slices/UserMobileMenu";

const rootReducer = combineReducers( {
    UserData,
    UserMobileMenu
} )



export default rootReducer