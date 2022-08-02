import React, { Component } from "react";
import Header from "./HeaderComponent";
import StaffList from "./StaffListComponent";
import StaffListDetail from "./StaffListDetailComponent";
import Footer from "./FooterComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Department from "./DepartmentComponent";
import DepartmentDetail from "./DepartmentDetailComponent";
import Salary from "./SalaryComponent";
import { connect } from "react-redux";
import {
  fetchDepartments,
  fetchStaffs,
  fetchStaffsSalary,
  postStaff,
  deleteStaff,
} from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    departments: state.departments,
    staffsSalary: state.staffsSalary,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postStaff: (staff) => dispatch(postStaff(staff)),
  fetchStaffs: () => {
    dispatch(fetchStaffs());
  },
  fetchDepartments: () => dispatch(fetchDepartments()),
  fetchStaffsSalary: () => dispatch(fetchStaffsSalary()),
  deleteStaff: (id) => dispatch(deleteStaff(id)),
});

class Main extends Component {
  constructor(props) {
    super(props);

    // this.addStaff = this.addStaff.bind(this);
  }

  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepartments();
    this.props.fetchStaffsSalary();
  }

  // addStaff = (staff) => {
  // 	const id = parseInt(this.state.staffs.length, 10);
  // 	const newStaff = { id, ...staff };
  // 	const department = this.state.departments.find((x) => x.name === newStaff.department);
  // 	newStaff.department = department;
  // 	const data = [ ...this.state.staffs, newStaff ];
  // 	localStorage.setItem('addStaff', JSON.stringify(data));
  // 	this.setState({
  // 		staffs: data
  // 	});
  // };

  // componentDidMount() {
  // 	let data = JSON.parse(localStorage.getItem('addStaff'));
  // 	if (data) {
  // 		this.setState({
  // 			staffs: data
  // 		});
  // 	} else {
  // 		this.setState({
  // 			staffs: this.props.staffs
  // 		});
  // 	}
  // }

  render() {
    const StaffWithId = ({ match }) => {
      return (
        <StaffListDetail
          staff={
            this.props.staffs.staffs.filter(
              (staff) => staff.id === parseInt(match.params.staffId, 10)
            )[0]
          }
          isLoading={this.props.staffs.isLoading}
          errMess={this.props.staffs.errMess}
          department={this.props.departments.departments}
        />
      );
    };

    const StaffWithDeptId = ({ match }) => {
      console.log(match);
      return (
        <DepartmentDetail
          department={
            this.props.departments.departments.filter(
              (department) => department.id === match.params.departmentId,
              10
            )[0]
          }
          staff={this.props.staffs.staffs.filter(
            (staff) => staff.departmentId === match.params.departmentId,
            10
          )}
          deptLoading={this.props.departments.isLoading}
          deptErrMess={this.props.departments.errMess}
        />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path="/staff"
            component={() => (
              <StaffList
                postStaff={this.props.postStaff}
                staffs={this.props.staffs.staffs}
                departments={this.props.departments.departments}
                staffsLoading={this.props.staffs.isLoading}
                staffsFailed={this.props.staffs.errMess}
                deleteStaff={this.props.deleteStaff}
              />
            )}
          />
          <Route path="/staff/:staffId" component={StaffWithId} />
          <Route
            exact
            path="/department"
            component={() => (
              <Department
                departments={this.props.departments.departments}
                departmentsLoading={this.props.departments.isLoading}
                departmentsFailed={this.props.departments.errMess}
                staffs={this.props.staffs.staffs}
              />
            )}
          />
          <Route path="/department/:departmentId" component={StaffWithDeptId} />
          <Route
            path="/salary"
            component={() => (
              <Salary
                staffsSalary={this.props.staffsSalary.staffsSalary}
                salaryLoading={this.props.staffsSalary.isLoading}
                salaryFailed={this.props.staffsSalary.errMess}
              />
            )}
          />
          <Redirect to="/staff" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
