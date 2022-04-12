import React from 'react';
import { Card, CardBody, CardText, CardTitle } from 'reactstrap';

const base = 3000000;
const hourOfOvertime = 200000;
function RenderSalary({ salary }) {
	return (
		<Card>
			<CardBody>
				<CardTitle>Họ và Tên: {salary.name}</CardTitle>
				<CardText>Mã Nhân viên: {salary.id}</CardText>
				<CardText>Hệ số lương:{salary.salaryScale}</CardText>
				<CardText>Số giờ làm thêm: {salary.overTime}</CardText>
				<CardText className="bg-light p-2 shadow">
					Lương: {(salary.salaryScale * base + salary.overTime * hourOfOvertime).toFixed(0)}
				</CardText>
			</CardBody>
		</Card>
	);
}

const Salary = (props) => {
	const salaryList = props.staffs.map((staff) => {
		return (
			<div key={staff.id} className="col-sm-12 col-md-6 col-lg-4 my-2">
				<RenderSalary salary={staff} />
			</div>
		);
	});
	return (
		<div className="container">
			<div className="row">{salaryList}</div>
		</div>
	);
};

export default Salary;
