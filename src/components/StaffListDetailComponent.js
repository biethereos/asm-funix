import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import dateFormat from 'dateformat';

function RenderStaff({ staff }) {
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

const StaffListDetail = (props) => {
	if (props.dish != null) {
		return (
			<div className="container">
				<div className="row">
					<RenderStaff staff={props.staff} />
				</div>
			</div>
		);
	} else {
		return <div />;
	}
};

export default StaffListDetail;
