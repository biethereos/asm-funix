import { DEPARTMENTS } from "../shared/staffs";
import * as ActionTypes from "./ActionTypes";


export const Departments = (state = DEPARTMENTS, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DEPARTMENT:
            var department = action.payload;
            var numberOfStaffs = state.numberOfStaffs++;
            department.numberOfStaffs = numberOfStaffs;
            return [...state];
        default:
            return state;
    }
}