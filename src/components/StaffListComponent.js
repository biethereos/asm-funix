import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
	Card,
	CardImg,
	CardBody,
	CardTitle,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	Label,
	Input,
	Col,
	FormFeedback,
	Button
} from 'reactstrap';

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

class StaffList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			doB: '',
			salaryScale: 1,
			startDate: '',
			department: '',
			annualLeave: 0,
			overTime: 0,
			salary: 3000,
			image: '/assets/images/alberto.png',
			touched: {
				name: false,
				doB: false,
				salaryScale: false,
				startDate: false,
				department: false,
				annualLeave: false,
				overTime: false
			},
			input: '',
			isOpenModal: false
		};
		this.handleSearch = this.handleSearch.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.inputSearch = React.createRef();
	}
	// const [ filteredData, setFilteredData ] = useState(props.staffs);
	// const [ sortBy, setSortBy ] = useState(false);

	handleSearch = (e) => {
		//convert input text to lower case
		e.preventDefault();
		const inputValue = this.inputSearch.current.value;
		// if (inputValue) {
		// const dataFilter = props.staffs.filter((item) => {
		// 	return item.name.toLowerCase().includes(inputValue.toLowerCase());
		// });
		// setFilteredData(dataFilter);
		this.setState({ input: inputValue });
		// }
	};

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({ [name]: value });
	}

	handleBlur = (field) => (evt) => {
		this.setState({ touched: { ...this.state.touched, [field]: true } });
	};

	toggleModal = () => {
		this.setState({ isOpenModal: !this.state.isOpenModal });
	};

	handleSubmit = () => {
		const newStaff = {
			name: this.state.name,
			doB: this.state.doB,
			salaryScale: this.state.salaryScale,
			startDate: this.state.startDate,
			department: this.state.department,
			annualLeave: this.state.annualLeave,
			overTime: this.state.overTime,
			salary: this.state.salary,
			image: this.state.image
		};
		this.props.addNewStaff(newStaff);
	};

	validate(name, doB, salaryScale, startDate, department, annualLeave, overTime) {
		const errors = {
			name: '',
			doB: '',
			salaryScale: '',
			startDate: '',
			department: '',
			annualLeave: '',
			overTime: ''
		};

		if (this.state.touched.name && name.length < 2) {
			errors.name = 'Yêu cầu nhiều hơn 2 ký tự';
		} else if (this.state.touched.name && name.length > 30) {
			errors.name = 'Yêu cầu ít hơn 30 ký tự';
		}

		if (this.state.touched.doB && doB.length < 1) {
			errors.doB = 'Yêu cầu nhập';
		}

		if (this.state.touched.salaryScale && salaryScale.length < 1) {
			errors.salaryScale = 'Yêu cầu nhập';
		}

		if (this.state.touched.department && department.length < 1) {
			errors.department = 'Yêu cầu nhập';
		}

		if (this.state.touched.startDate && startDate.length < 1) {
			errors.startDate = 'Yêu cầu nhập';
		}

		if (this.state.touched.overTime && overTime.length < 1) {
			errors.overTime = 'Yêu cầu nhập';
		}

		if (this.state.touched.annualLeave && annualLeave.length < 1) {
			errors.annualLeave = 'Yêu cầu nhập';
		}

		return errors;
	}

	render() {
		const errors = this.validate(
			this.state.name,
			this.state.doB,
			this.state.salaryScale,
			this.state.startDate,
			this.state.department,
			this.state.annualLeave,
			this.state.overTime
		);

		const filteredData = this.props.staffs.filter((item) => {
			return item.name.toLowerCase().includes(this.state.input.toLowerCase());
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
								<button onClick={this.toggleModal}>
									<span className="fa fa-plus fa-lg" />
								</button>
							</div>
						</div>
					</div>
					<div className="col-12 col-md-6 mt-3">
						<form onSubmit={this.handleSearch} className="form-group row">
							<div className="col-8 col-md-8">
								<input
									type="text"
									id="inputSearch"
									name="inputSearch"
									className="form-control"
									ref={this.inputSearch}
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
				<Modal isOpen={this.state.isOpenModal} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
					<ModalBody>
						<Form onSubmit={this.handleSubmit}>
							<FormGroup row>
								<Label htmlFor="name" md={4}>
									Tên:
								</Label>
								<Col md={8}>
									<Input
										type="text"
										name="name"
										placeholder="Thêm tên"
										value={this.state.name}
										valid={errors.name === ''}
										invalid={errors.name !== ''}
										onBlur={this.handleBlur('name')}
										onChange={this.handleInputChange}
									/>
									<FormFeedback>{errors.name}</FormFeedback>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label htmlFor="doB" md={4}>
									Ngày sinh:
								</Label>
								<Col md={8}>
									<Input
										type="date"
										name="doB"
										placeholder="mm/dd/yyyy"
										value={this.state.doB}
										valid={errors.doB === ''}
										invalid={errors.doB !== ''}
										onBlur={this.handleBlur('doB')}
										onChange={this.handleInputChange}
									/>
									<FormFeedback>{errors.doB}</FormFeedback>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label htmlFor="startDate" md={4}>
									Ngày vào công ty:
								</Label>
								<Col md={8}>
									<Input
										type="date"
										id="startDate"
										name="startDate"
										placeholder="mm/dd/yyyy"
										value={this.state.startDate}
										valid={errors.name === ''}
										invalid={errors.startDate !== ''}
										onBlur={this.handleBlur('startDate')}
										onChange={this.handleInputChange}
									/>
									<FormFeedback>{errors.startDate}</FormFeedback>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label htmlFor="department" md={4}>
									Phòng ban:
								</Label>
								<Col md={8}>
									<Input
										type="select"
										id="department"
										name="department"
										placeholder=""
										value={this.state.department}
										valid={errors.department === ''}
										invalid={errors.department !== ''}
										onBlur={this.handleBlur('department')}
										onChange={this.handleInputChange}
									>
										<option>Sale</option>
										<option>HR</option>
										<option>Marketing</option>
										<option>IT</option>
										<option>Finance</option>
									</Input>
									<FormFeedback>{errors.department}</FormFeedback>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label htmlFor="salaryScale" md={4}>
									Hệ số lương:
								</Label>
								<Col md={8}>
									<Input
										type="text"
										id="salaryScale"
										name="salaryScale"
										placeholder="1.0 -> 3.0 "
										value={this.state.salaryScale}
										valid={errors.salaryScale === ''}
										invalid={errors.salaryScale !== ''}
										onBlur={this.handleBlur('salaryScale')}
										onChange={this.handleInputChange}
									/>
									<FormFeedback>{errors.salaryScale}</FormFeedback>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label htmlFor="annualLeave" md={4}>
									Số ngày nghỉ còn lại:
								</Label>
								<Col md={8}>
									<Input
										type="text"
										id="annualLeave"
										name="annualLeave"
										placeholder=""
										value={this.state.annualLeave}
										valid={errors.annualLeave === ''}
										invalid={errors.annualLeave !== ''}
										onBlur={this.handleBlur('annualLeave')}
										onChange={this.handleInputChange}
									/>
									<FormFeedback>{errors.annualLeave}</FormFeedback>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label htmlFor="overTime" md={4}>
									Số ngày đã làm thêm:
								</Label>
								<Col md={8}>
									<Input
										type="text"
										id="overTime"
										name="overTime"
										placeholder=""
										value={this.state.overTime}
										valid={errors.overTime === ''}
										invalid={errors.overTime !== ''}
										onBlur={this.handleBlur('overTime')}
										onChange={this.handleInputChange}
									/>
									<FormFeedback>{errors.overTime}</FormFeedback>
								</Col>
							</FormGroup>
							<FormGroup check row>
								<Col sm={{ offset: 2, size: 10 }}>
									<Button type="submit" value="submit" color="primary">
										Thêm
									</Button>
								</Col>
							</FormGroup>
						</Form>
					</ModalBody>
				</Modal>
				<div className="row">{employeeList}</div>
			</div>
		);
	}
}

export default StaffList;
