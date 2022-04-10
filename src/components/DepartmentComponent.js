import React from 'react';
import { Card, CardBody, CardText, CardTitle } from 'reactstrap';

const RenderDepartments = ({ department, onClick }) => {
	return (
		<Card>
			<CardBody>
				<CardTitle>Phòng ban: {department.name}</CardTitle>
				<CardText>Số người: {department.numberOfStaff}</CardText>
			</CardBody>
		</Card>
	);
};

const Department = (props) => {
	console.log(props.departments);
	const deparmentList = props.departments.map((department) => {
		return (
			<div key={department.id} className="col-sm-6 col-md-4 col-lg-2 mt-3">
				<RenderDepartments department={department} onClick={props.onClick} />
			</div>
		);
	});
	return (
		<div className="container">
			<div className="row">{deparmentList}</div>
		</div>
	);
};

export default Department;
