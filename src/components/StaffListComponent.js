import React, { Component } from "react";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Col,
  Button,
  Row,
} from "reactstrap";
import { Loading } from "./LoadingComponent";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
// const isNumber = (val) => !isNaN(Number(val));
// const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

function RenderStaffList({ staff, deptName }) {
  return (
    <Link to={`/staff/${staff.id}`}>
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
      name: "",
      doB: "",
      salaryScale: 1,
      startDate: "",
      department: "Sale",
      annualLeave: 0,
      overTime: 0,
      salary: 30000,
      image: "/assets/images/alberto.png",
      touched: {
        name: false,
        doB: false,
        salaryScale: false,
        startDate: false,
        department: false,
        annualLeave: false,
        overTime: false,
      },
      input: "",
      isOpenModal: false,
    };
    // this.handleSearch = this.handleSearch.bind(this);
    // this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleBlur = this.handleBlur.bind(this);
    // this.toggleModal = this.toggleModal.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
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

  // handleInputChange(event) {
  // 	const target = event.target;
  // 	const value = target.value;
  // 	const name = target.name;
  // 	this.setState({ [name]: value });
  // }

  // handleBlur = (field) => (evt) => {
  // 	this.setState({ touched: { ...this.state.touched, [field]: true } });
  // };

  toggleModal = () => {
    this.setState({ isOpenModal: !this.state.isOpenModal });
  };

  handleSubmit = (values) => {
    console.log("Current State is: " + JSON.stringify(values));
    const department = this.props.departments.find(
      (v) => v.name === values.department
    );
    const image = "/assets/images/alberto.png";
    const staff = { ...values, image };
    staff.departmentId = department.id;
    department.numberOfStaff++;
    staff.image = image;
    this.props.postStaff(staff);
  };

  // validate(name, doB, salaryScale, startDate, department, annualLeave, overTime) {
  // 	const errors = {
  // 		name: '',
  // 		doB: '',
  // 		salaryScale: '',
  // 		startDate: '',
  // 		department: '',
  // 		annualLeave: '',
  // 		overTime: ''
  // 	};

  // 	if (this.state.touched.name && name.length < 2) {
  // 		errors.name = 'Yêu cầu nhiều hơn 2 ký tự';
  // 	} else if (this.state.touched.name && name.length > 30) {
  // 		errors.name = 'Yêu cầu ít hơn 30 ký tự';
  // 	}

  // 	if (this.state.touched.doB && doB.length < 1) {
  // 		errors.doB = 'Yêu cầu nhập';
  // 	}

  // 	if (this.state.touched.salaryScale && salaryScale.length < 1) {
  // 		errors.salaryScale = 'Yêu cầu nhập';
  // 	}

  // 	if (this.state.touched.department && department.length < 1) {
  // 		errors.department = 'Yêu cầu nhập';
  // 	}

  // 	if (this.state.touched.startDate && startDate.length < 1) {
  // 		errors.startDate = 'Yêu cầu nhập';
  // 	}

  // 	if (this.state.touched.overTime && overTime.length < 1) {
  // 		errors.overTime = 'Yêu cầu nhập';
  // 	}

  // 	if (this.state.touched.annualLeave && annualLeave.length < 1) {
  // 		errors.annualLeave = 'Yêu cầu nhập';
  // 	}

  // 	return errors;
  // }

  render() {
    // const errors = this.validate(
    // 	this.state.name,
    // 	this.state.doB,
    // 	this.state.salaryScale,
    // 	this.state.startDate,
    // 	this.state.department,
    // 	this.state.annualLeave,
    // 	this.state.overTime
    // );
    const filteredData = this.props.staffs.filter((item) => {
      return item.name.toLowerCase().includes(this.state.input.toLowerCase());
    });
    // .sort((a, b) => (sortBy ? a.id - b.id : b.id - a.id));
    const employeeList =
      // filteredData &&
      filteredData.map((staff) => {
        return (
          <div key={staff.id} className="col-sm-6 col-md-4 col-lg-2 mt-3">
            <RenderStaffList
              staff={staff}
              deptName={this.props.departments.filter(
                (dept) => dept.id === staff.departmentId
              )}
            />
          </div>
        );
      });
    if (this.props.staffsLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (this.props.staffsFailed) {
      return (
        <div className="container">
          <div className="row">
            <h4>{this.props.staffsFailed}</h4>
          </div>
        </div>
      );
    } else {
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
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group">
                  <Label htmlFor="name" md={4}>
                    Tên:
                  </Label>
                  <Col md={8}>
                    <Control.text
                      model=".name"
                      id="name"
                      name="name"
                      placeholder="Thêm tên"
                      className="form-control"
                      validators={{
                        required,
                        minLength: minLength(3),
                        maxLength: maxLength(30),
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".name"
                      show="touched"
                      messages={{
                        required: "Yêu cầu nhập",
                        minLength: "Yêu cầu nhiều hơn 2 ký tự",
                        maxLength: "Yêu cầu ít hơn 30 ký tự",
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="doB" md={4}>
                    Ngày sinh:
                  </Label>
                  <Col md={8}>
                    <Control
                      md={8}
                      type="date"
                      model=".doB"
                      id="doB"
                      name="doB"
                      defaultValue={this.state.doB}
                      className="form-control"
                      placeholder="mm/dd/yyyy"
                      validators={{
                        required,
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".doB"
                      show="touched"
                      messages={{
                        required: "Yêu cầu nhập",
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="startDate" md={4}>
                    Ngày vào công ty:
                  </Label>
                  <Col md={8}>
                    <Control
                      type="date"
                      model=".startDate"
                      id="startDate"
                      name="startDate"
                      defaultValue={this.state.startDate}
                      className="form-control"
                      placeholder="mm/dd/yyyy"
                      validators={{
                        required,
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".startDate"
                      show="touched"
                      messages={{
                        required: "Yêu cầu nhập",
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="department" md={4}>
                    Phòng ban:
                  </Label>
                  <Col md={8}>
                    <Control.select
                      model=".department"
                      id="department"
                      name="department"
                      className="form-control"
                      defaultValue="Sale"
                    >
                      <option>Sale</option>
                      <option>HR</option>
                      <option>Marketing</option>
                      <option>IT</option>
                      <option>Finance</option>
                    </Control.select>
                    <Errors
                      className="text-danger"
                      model=".department"
                      show="touched"
                      messages={{
                        required: "Yêu cầu nhập",
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="salaryScale" md={4}>
                    Hệ số lương:
                  </Label>
                  <Col md={8}>
                    <Control.text
                      model=".salaryScale"
                      id="salaryScale"
                      name="salaryScale"
                      className="form-control"
                      placeholder="1.0 -> 3.0 "
                      validators={{
                        required,
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".salaryScale"
                      show="touched"
                      messages={{
                        required: "Yêu cầu nhập",
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="annualLeave" md={4}>
                    Số ngày nghỉ còn lại:
                  </Label>
                  <Col md={8}>
                    <Control.text
                      model=".annualLeave"
                      id="annualLeave"
                      name="annualLeave"
                      className="form-control"
                      placeholder="1.0"
                      validators={{
                        required,
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".annualLeave"
                      show="touched"
                      messages={{
                        required: "Yêu cầu nhập",
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="overTime" md={4}>
                    Số ngày đã làm thêm:
                  </Label>
                  <Col md={8}>
                    <Control.text
                      model=".overTime"
                      id="overTime"
                      name="overTime"
                      className="form-control"
                      placeholder="1.0"
                      validators={{
                        required,
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".overTime"
                      show="touched"
                      messages={{
                        required: "Yêu cầu nhập",
                      }}
                    />
                  </Col>
                </Row>
                <Row check className="form-group">
                  <Col sm={{ offset: 2, size: 10 }}>
                    <Button type="submit" value="submit" color="primary">
                      Thêm
                    </Button>
                  </Col>
                </Row>
              </LocalForm>
            </ModalBody>
          </Modal>
          <div className="row">{employeeList}</div>
        </div>
      );
    }
  }
}

export default StaffList;
