import React from 'react';
import { Card, CardBody, CardText, CardTitle } from 'reactstrap';

const RenderDepartments = ({ department }) => {
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
	const departments = props.departments.staffs.map(item => item.department).filter((item, pos, self) => self.indexOf(item) === pos);
	console.log(departments);
	const deparmentList = departments.map((department) => {
		return (
			<div key={department.id} className="col-xs-12 col-md-6 col-lg-4 my-2">
				<RenderDepartments department={department} />
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
