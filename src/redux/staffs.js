import * as ActionTypes from "./ActionTypes";

export const Staffs = (
  state = {
    isLoading: true,
    errMess: null,
    staffs: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_STAFFS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        staffs: action.payload,
      };
    case ActionTypes.STAFFS_LOADING:
      return { ...state, isLoading: true, errMess: null, staffs: [] };
    case ActionTypes.STAFFS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        staffs: [],
      };
    case ActionTypes.ADD_STAFF:
      var staff = action.payload;
      // var id = parseInt(state.length, 10);
      // staff = { id, ...staff };
      staff.id = state.staffs.length;
      return { ...state, staffs: state.staffs.concat(staff) };
    default:
      return state;
  }
};
