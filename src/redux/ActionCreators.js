import { baseUrl } from "../shared/baseUrl";
import * as ActionTypes from "./ActionTypes";

export const addStaff = (staff) => ({
  type: ActionTypes.ADD_STAFF,
  payload: staff,
});

export const fetchStaffs = () => (dispatch) => {
  dispatch(staffsLoading(true));

  return fetch(baseUrl + "staffs")
    .then((response) => response.json())
    .then((staffs) => dispatch(addStaffs(staffs)));
};

export const staffsLoading = () => ({
  type: ActionTypes.STAFFS_LOADING,
});

export const staffsFailed = (errmess) => ({
  type: ActionTypes.STAFFS_FAILED,
  payload: errmess,
});

export const addStaffs = (staffs) => ({
  type: ActionTypes.ADD_STAFFS,
  payload: staffs,
});

export const departmentsLoading = () => ({
  type: ActionTypes.DEPARTMENTS_LOADING,
});

export const departmentsFailed = (errmess) => ({
  type: ActionTypes.DEPARTMENTS_FAILED,
  payload: errmess,
});

export const addDepartments = (departments) => ({
  type: ActionTypes.ADD_DEPARTMENTS,
  payload: departments,
});

export const fetchDepartments = () => (dispatch) => {
  dispatch(departmentsLoading(true));

  return fetch(baseUrl + "departments")
    .then((response) => response.json())
    .then((departments) => dispatch(addDepartments(departments)));
};

export const staffsSalaryLoading = () => ({
  type: ActionTypes.STAFFSSALARY_LOADING,
});

export const staffsSalaryFailed = (errmess) => ({
  type: ActionTypes.STAFFSSALARY_FAILED,
  payload: errmess,
});

export const addStaffsSalary = (staffsSalaries) => ({
  type: ActionTypes.ADD_STAFFSSALARY,
  payload: staffsSalaries,
});

export const fetchStaffsSalary = () => (dispatch) => {
  dispatch(staffsSalaryLoading(true));

  return fetch(baseUrl + "staffsSalary")
    .then((response) => response.json())
    .then((staffsSalary) => dispatch(addStaffsSalary(staffsSalary)));
};
