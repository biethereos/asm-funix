import React from 'react';
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';

function RenderStaffList({ staff, onClick }) {
	return (
		<Card>
			<CardImg width="100%" src={staff.image} alt={staff.name} />
			<CardBody>
				<CardTitle> {staff.name}</CardTitle>
			</CardBody>
		</Card>
	);
}

const StaffList = (props) => {
	const employeeList = props.staffs.map((staff) => {
		return (
			<div key={staff.id} className="col-sm-6 col-md-4 col-lg-2 mt-3">
				<RenderStaffList staff={staff} onClick={props.onClick} />
			</div>
		);
	});

	return (
		<div className="container">
			<div className="row">{employeeList}</div>
		</div>
	);
};

export default StaffList;
