import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import StaffList from './StaffListComponent';
import { STAFFS } from '../shared/staffs';
import StaffListDetail from './StaffListDetailComponent';

export class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			staffs: STAFFS,
			selectEmployee: null
		};
	}

	onSelectedEmployee(staffId) {
		this.setState({ selectEmployee: staffId });
	}

	render() {
		return (
			<div>
				<Navbar dark color="primary">
					<div className="container">
						<NavbarBrand href="/">Ứng Dụng Quản Lý Nhân Sự v1.0</NavbarBrand>
					</div>
				</Navbar>
				<StaffList staffs={this.state.staffs} onClick={(staffId) => this.onSelectedEmployee(staffId)} />
                <StaffListDetail staff={this.state.staffs.filter((staff) => staff.id === this.state.selectEmployee)[0]} />
			</div>
		);
	}
}

export default Main;
