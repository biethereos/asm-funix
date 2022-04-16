import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';

function RenderStaffList({ staff }) {
	return (
		<Link to={`staff/${staff.id}`}>
			<Card>
				<CardImg width="100%" src={staff.image} alt={staff.name} />
				<CardBody>
					<CardTitle> {staff.name}</CardTitle>
				</CardBody>
			</Card>
		</Link>
	);
}

const StaffList = (props) => {
	console.log(props.input);
	const EmployeeList = props.staffs
		.filter((el) => {
			if (props.input === '') {
				return el;
			} else {
				return el.text.toLowerCase().include(props.input);
			}
		})
		.map((el) => {
			return (
				<div key={el.id} className="col-sm-6 col-md-4 col-lg-2 mt-3">
					<RenderStaffList staff={el} />
				</div>
			);
		});
	return (
		<div className="container">
			<div className="row">
				<div className="col-3 mt-3">
					<input
						type="text"
						className="form-control"
						defaultValue={props.input}
						onChange={props.inputHandler}
						placeholder="Tìm kiếm nhân viên ..."
					/>
				</div>
			</div>
			<div className="row">{EmployeeList}</div>
		</div>
	);
};

export default StaffList;
