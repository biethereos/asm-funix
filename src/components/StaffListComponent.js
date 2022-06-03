import React, { useState } from 'react';
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
	const [ inputText, setInputText ] = useState('');
	const [ sortBy, setSortBy ] = useState(false);

	let inputHandler = (e) => {
		//convert input text to lower case
		var lowerCase = e.target.value.toLowerCase();
		setInputText(lowerCase);
	};

	const filteredData = props.staffs
		.filter((item) => {
			return item.name.toLowerCase().includes(inputText.toLowerCase());
		})
		.sort((a, b) => (sortBy ? a.id - b.id : b.id - a.id));
	const employeeList = filteredData.map((staff) => {
		return (
			<div key={staff.id} className="col-sm-6 col-md-4 col-lg-2 mt-3">
				<RenderStaffList staff={staff} />
			</div>
		);
	});
	return (
		<div className="container">
			<div className="row">
				<div className="col-xs-12 col-md-3 col-lg-6 mt-3">
					<input
						type="text"
						className="form-control"
						value={inputText}
						onChange={inputHandler}
						placeholder="Tìm kiếm nhân viên ..."
					/>
				</div>
				<div className="col-xs-12 col-md-9 col-lg-6 mt-3">
					<button className="btn btn-primary" onClick={() => setSortBy(!sortBy)}>
						Sắp xếp MNV
					</button>
				</div>
			</div>
			<div className="row">{employeeList}</div>
		</div>
	);
};

export default StaffList;
