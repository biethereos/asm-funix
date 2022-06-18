import React, { Component } from 'react';
import Header from './HeaderComponent';
import StaffList from './StaffListComponent';
import StaffListDetail from './StaffListDetailComponent';
import { STAFFS } from '../shared/staffs';
import { DEPARTMENTS } from '../shared/staffs';
import Footer from './FooterComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import Department from './DepartmentComponent';
import Salary from './SalaryComponent';

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			staffs: STAFFS,
			departments: DEPARTMENTS
		};
		this.addStaff = this.addStaff.bind(this);
	}

	addStaff = (staff) => {
		const id = Math.floor(Math.random() * 10000 + 1);
		const newStaff = {id, ...staff};
		this.setState({
			staffs: [...this.state.staffs, newStaff]
		});
	}
	

	render() {
		const StaffWithId = ({ match }) => {
			return (
				<StaffListDetail
					staff={this.state.staffs.filter((staff) => staff.id === parseInt(match.params.staffId, 10))[0]}
				/>
			);
		};
		return (
			<div>
				<Header />
				<Switch>
					<Route exact path="/staff" component={() => (<StaffList addNewStaff={this.addStaff} staffs={this.state.staffs} />)} />
					<Route path="/staff/:staffId" component={StaffWithId} />
					<Route path="/department" component={() => <Department departments={this.state.departments} />} />
					<Route path="/salary" component={() => <Salary staffs={this.state.staffs} />} />
					<Redirect to="/staff" />
				</Switch>
				<Footer />
			</div>
		);
	}
}

export default Main;
