import { createStore } from "redux";

// import rootReducer from "./reducers/index";
import rootReducer from "./reducers";


var serialisedState = localStorage.getItem( "userSession" );
serialisedState = serialisedState === null || serialisedState == '' ? {} : JSON.parse( serialisedState );
// var serialisedState = {};
// const store = createStore( rootReducer );
const store = createStore( rootReducer, serialisedState );

export default store;