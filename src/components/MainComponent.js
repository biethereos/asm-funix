import React, { Component } from 'react';
import Header from './HeaderComponent';
import StaffList from './StaffListComponent';
import StaffListDetail from './StaffListDetailComponent';
import { STAFFS } from '../shared/staffs';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

export class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			staffs: STAFFS
		};
	}

	render() {
		const HomePage = () => {
			return <Home />;
		};

		return (
			<div>
				<Header />
				<Switch>
					<Route path="/home" component={HomePage} />
					<Route exact path="/staff" component={() => <StaffList staffs={this.state.staffs} />} />
					<Redirect to='/home' />
				</Switch>
				<Footer />
			</div>
		);
	}
}

export default Main;
