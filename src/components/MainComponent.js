import React, { Component } from 'react';
import Header from './HeaderComponent';
import StaffList from './StaffListComponent';
import StaffListDetail from './StaffListDetailComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Department from './DepartmentComponent';
import Salary from './SalaryComponent';
import { connect } from 'react-redux';
import { addStaff, fetchStaffs } from '../redux/ActionCreators';

const mapStateToProps = (state) => {
	return {
		staffs: state.staffs,
		departments: state.departments,
	};
}

const mapDispatchToProps = (dispatch) => ({
	addStaff: (staff) => dispatch(addStaff(staff)),
	fetchStaffs: () => {dispatch(fetchStaffs())},
});

class Main extends Component {
	constructor(props) {
		super(props);
		
		// this.addStaff = this.addStaff.bind(this);
	}
	componentDidMount() {
		this.props.fetchStaffs();
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
					staff={this.props.staffs.staffs.filter((staff) => staff.id === parseInt(match.params.staffId, 10))[0]}
					isLoading={this.props.staffs.isLoading}
					errMess={this.props.staffs.errMess}
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
						component={() => <StaffList addStaff={this.props.addStaff} staffs={this.props.staffs} departments={this.props.departments}
						staffsLoading={this.props.staffs.isLoading}
						staffsFailed={this.props.staffs.errMess}
						/>}
					/>
					<Route path="/staff/:staffId" component={StaffWithId} />
					<Route path="/department" component={() => <Department departments={this.props.staffs} />} />
					<Route path="/salary" component={() => <Salary staffs={this.props.staffs} />} />
					<Redirect to="/staff" />
				</Switch>
				<Footer />
			</div>
		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
