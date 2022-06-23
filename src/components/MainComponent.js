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
		const id = parseInt(this.state.staffs.length, 10);
		const newStaff = { id, ...staff };
		const department = this.state.departments.find((x) => x.name === newStaff.department);
		newStaff.department = department;
		const data = [ ...this.state.staffs, newStaff ];
		//lưu localStorage
		localStorage.setItem('staffs', JSON.stringify(data));
		this.setState({
			staffs: data
		});
	};

	componentDidMount() {
		let data = JSON.parse(localStorage.getItem('staffs'))
		this.setState({
			staffs: data
		})
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
					<Route
						exact
						path="/staff"
						component={() => <StaffList addNewStaff={this.addStaff} staffs={this.state.staffs} />}
					/>
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
