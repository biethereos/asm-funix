import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import dateFormat from 'dateformat';

const columnChange = {
	col2: 'col-md-6 mt-1',
	col3: 'col-md-4 mt-1',
	col4: 'col-md-3 mt-1',
	col6: 'col-md-2 mt-1'
};

let { col2, col3, col4, col6 } = columnChange;

class StaffList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectEmployee: null,
			selectColumn: 'col-12 col-md-6 col-lg-4 mt-3'
		};
	}

	onSelectedEmployee(staff) {
		this.setState({ selectEmployee: staff });
	}

	onSelectedColumn(col) {
		this.setState({ selectColumn: col });
	}

	renderStaff(staff) {
		if (staff != null) {
			return (
				<Card>
					<CardImg width="100%" src={staff.image} alt={staff.name} />
					<CardBody>
						<CardTitle>Họ và Tên: {staff.name}</CardTitle>
						<CardText>Ngày sinh: {dateFormat(staff.doB, 'dd/mm/yyyy')}</CardText>
						<CardText>Ngày vào công ty: {dateFormat(staff.startDate, 'dd/mm/yyyy')}</CardText>
						<CardText> Phòng ban: {staff.department.name}</CardText>
						<CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
						<CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
					</CardBody>
				</Card>
			);
		} else {
			return <div />;
		}
	}

	render() {
		const employeeList = this.props.staffs.map((staff) => {
			return (
				<div className={this.state.selectColumn}>
					<Card key={staff.id} onClick={() => this.onSelectedEmployee(staff)}>
						<CardImg width="100%" src={staff.image} alt={staff.name} />
						<CardBody>
							<CardTitle> {staff.name}</CardTitle>
						</CardBody>
					</Card>
				</div>
			);
		});

		return (
			<div className="container">
				<div className="row m-3">
					<button onClick={() => this.onSelectedColumn(col2)} className="btn btn-success m-3">
						2 Cột
					</button>
					<button onClick={() => this.onSelectedColumn(col3)} className="btn btn-success m-3">
						3 Cột
					</button>
					<button onClick={() => this.onSelectedColumn(col4)} className="btn btn-success m-3">
						4 Cột
					</button>
					<button onClick={() => this.onSelectedColumn(col6)} className="btn btn-success m-3">
						6 Cột
					</button>
				</div>
				<div className="row">{employeeList}</div>
				<div className="row m-5">{this.renderStaff(this.state.selectEmployee)}</div>
			</div>
		);
	}
}

export default StaffList;
