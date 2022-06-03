import React from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';
import dateFormat from 'dateformat';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderStaff({ staff }) {
	if (staff != null) {
		return (
			<div className="row">
				<div className="col-xs-12 col-md-3 col-lg-4">
					<Card>
						<CardImg width="100%" src={staff.image} alt={staff.name} />	
					</Card>
					{/* <img src={staff.image} alt={staff.name} width="100%" /> */}
				</div>
				<div className="col-xs-12 col-md-9 col-lg-8">
					<Card>
						<CardBody>
							<CardTitle>Họ và Tên: {staff.name}</CardTitle>
							<CardText>Ngày sinh: {dateFormat(staff.doB, 'dd/mm/yyyy')}</CardText>
							<CardText>Ngày vào công ty: {dateFormat(staff.startDate, 'dd/mm/yyyy')}</CardText>
							<CardText> Phòng ban: {staff.department.name}</CardText>
							<CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
							<CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
						</CardBody>
					</Card>
				</div>
			</div>
		);
	} else {
		return <div />;
	}
}

const StaffListDetail = (props) => {
	if (props.staff != null) {
		return (
			<div className="container">
				<div className="row">
					<Breadcrumb>
						<BreadcrumbItem>
							<Link to="/staff">Staff</Link>
						</BreadcrumbItem>
						<BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
					</Breadcrumb>
					<div className="col-12">
						<h3>{props.staff.name}</h3>
						<hr />
					</div>
				</div>
				<RenderStaff staff={props.staff} />
			</div>
		);
	} else {
		return <div />;
	}
};

export default StaffListDetail;
