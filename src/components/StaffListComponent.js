import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap';

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
	const inputRef = useRef('');
	const [ input, setInput ] = useState('');
	const [ isNavOpen, setIsNavOpen ] = useState(false);
	const [ data, setData ] = useState({});
	// const [ filteredData, setFilteredData ] = useState(props.staffs);
	// const [ sortBy, setSortBy ] = useState(false);

	const handleSearch = (e) => {
		//convert input text to lower case
		e.preventDefault();
		const inputValue = inputRef.current.value;
		// console.log(inputValue);
		// if (inputValue) {
			// const dataFilter = props.staffs.filter((item) => {
			// 	return item.name.toLowerCase().includes(inputValue.toLowerCase());
			// });
			// setFilteredData(dataFilter);
			setInput(inputValue);
		// }
	};

	const handleInputChange = () => {

	}

	const handleBlur = () => {
		
	}

	const toggleModal = () => {
		setIsNavOpen(!isNavOpen);
	};

	const handleSubmit = () => {

	}

	const errors = {}

	const filteredData = props.staffs.filter((item) => {
		return item.name.toLowerCase().includes(input.toLowerCase());
	});

	// .sort((a, b) => (sortBy ? a.id - b.id : b.id - a.id));
	const employeeList =
		// filteredData &&
		filteredData.map((staff) => {
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
					<div className="row">
						<div className="col-10 col-md-10">Nhân Viên</div>
						<div className="col-2 col-auto">
							<button onClick={toggleModal}>
								<span class="fa fa-plus fa-lg" />
							</button>
						</div>
					</div>
				</div>
				<div className="col-12 col-md-6 mt-3">
					<form onSubmit={handleSearch} className="form-group row">
						<div className="col-8 col-md-8">
							<input
								type="text"
								className="form-control"
								ref={inputRef}
								placeholder="Tìm kiếm nhân viên ..."
							/>
						</div>
						<div className="col-4 col-md-4">
							<button className="btn btn-primary" type="submit">
								Tìm kiếm
							</button>
						</div>
					</form>
				</div>
			</div>
			<Modal isOpen={isNavOpen} toggle={toggleModal}>
				<ModalHeader toggle={toggleModal}>
					Thêm nhân viên
				</ModalHeader>
				<ModalBody>
					<Form onSubmit={handleSubmit}>
						<FormGroup>
							<Label htmlFor="name" md={2}>Tên</Label>
							<Col md={8}>
									<Input
										type="text"
										id="name"
										name="name"
										placeholder="Them ten"
										value={data.name}
										valid={errors.name === ''}
										invalid={errors.name !==''}
										onBlur={handleBlur('ten')}
										onChange={handleInputChange}
									/>
									<FormFeedback>{errors.name}</FormFeedback>
								</Col>
						</FormGroup>
						<FormGroup>
							<Label htmlFor="name" md={2}>Ngay Sinh</Label>
							<Col md={8}>
									<Input
										type="date"
										id="doB"
										name="doB"
										placeholder="Them ten"
										value={data.name}
										valid={errors.name === ''}
										invalid={errors.firstname !==''}
										onBlur={handleBlur('ten')}
										onChange={handleInputChange}
									/>
									<FormFeedback>{errors.name}</FormFeedback>
							</Col>
						</FormGroup>
						<FormGroup>
							<Label htmlFor="name" md={2}>Ngay Sinh</Label>
							<Col md={8}>
									<Input
										type="date"
										id="diC"
										name="diC"
										placeholder="Them ten"
										value={data.name}
										valid={errors.name === ''}
										invalid={errors.firstname !==''}
										onBlur={handleBlur('ten')}
										onChange={handleInputChange}
									/>
									<FormFeedback>{errors.name}</FormFeedback>
							</Col>
						</FormGroup>
					</Form>
				</ModalBody>
			</Modal>
			<div className="row">{employeeList}</div>
		</div>
	);
};

export default StaffList;
