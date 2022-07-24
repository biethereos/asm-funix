import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { Departments } from "./departments";
import { Staffs } from "./staffs";


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers(
            {
                staffs: Staffs,
                departments: Departments
            }
            ),
            applyMiddleware(thunk, logger)
     );
    return store;
};