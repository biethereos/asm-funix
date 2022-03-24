import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class StaffList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectEmployee: null
		};
	}

	onSelectedEmployee(staff) {
		this.setState({ selectEmployee: staff });
	}

	renderStaff(staff) {
		if (staff != null) {
			return (
				<Card>
					<CardImg width="100%" src={staff.image} alt={staff.name} />
					<CardBody>
						<CardTitle> {staff.name}</CardTitle>
						<CardText> {staff.salaryScale}</CardText>
					</CardBody>
				</Card>
			);
		} else {
			return <div />;
		}
	}

	render() {
		const employee = this.props.staffs.map((staff) => {
			return (
				<div key={staff.id} className="col-12 col-md-5 m-1">
					<Card onClick={() => this.onSelectedEmployee(staff)}>
						<CardImg width="100%" src={staff.image} alt={staff.name} />
						<CardImgOverlay>
							<CardTitle> {staff.name}</CardTitle>
						</CardImgOverlay>
					</Card>
				</div>
			);
		});

		return (
			<div className="container">
				<div className="row">{ employee }</div>
				<div className="row">{this.renderStaff(this.state.selectEmployee)}</div>
			</div>
		);
	}
}

export default StaffList;
