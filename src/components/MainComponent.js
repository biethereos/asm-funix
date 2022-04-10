import React, { Component } from 'react';
import Header from './HeaderComponent';
import StaffList from './StaffListComponent';
import StaffListDetail from './StaffListDetailComponent';
import { STAFFS } from '../shared/staffs';
import { DEPARTMENTS } from '../shared/staffs';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Department from './DepartmentComponent';

export class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			staffs: STAFFS,
			departments: DEPARTMENTS
		};
	}

	render() {
		const HomePage = () => {
			return (
				<Home
					staffs={this.state.staffs}
					// department={this.state.departments.filter((department) => department.id)[0]}
				/>
			);
		};

		return (
			<div>
				<Header />
				<Switch>
					<Route path="/home" component={HomePage} />
					<Route exact path="/staff" component={() => <StaffList staffs={this.state.staffs} />} />
					<Route
						exact
						path="/department"
						component={() => <Department departments={this.state.departments} />}
					/>
					<Redirect to="/home" />
				</Switch>
				<Footer />
			</div>
		);
	}
}

export default Main;
