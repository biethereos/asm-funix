import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardText, CardTitle } from 'reactstrap';

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
	let [ sortBySalary, setSortBySalary ] = useState(false);
	const salaryList = props.staffs
		.sort((a, b) => (sortBySalary ? a.id - b.id : b.id - a.id))
		.map((staff) => {
			return (
				<div key={staff.id} className="col-sm-12 col-md-6 col-lg-4 my-2">
					<RenderSalary salary={staff} />
				</div>
			);
		});
	return (
		<div className="container">
			<div className='row'>
				<Breadcrumb>
						<BreadcrumbItem>
							<Link to="/staff">Nhân Viên</Link>
						</BreadcrumbItem>
						<BreadcrumbItem active>{props.staff}Bảng lương</BreadcrumbItem>
				</Breadcrumb>
			</div>
			<div className="row justify-content-end mx-2">
				<button className="btn btn-primary btn-sm" onClick={() => setSortBySalary(!sortBySalary)}>
					Sắp xếp theo id
				</button>
			</div>
			<div className="row">{salaryList}</div>
		</div>
	);
};

export default Salary;
