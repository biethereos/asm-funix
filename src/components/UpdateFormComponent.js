import React, { Component } from "react";
import { Control, Errors, LocalForm } from "react-redux-form";
import {
  Button,
  Col,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
// const isNumber = (val) => !isNaN(Number(val));
// const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

export default class UpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
  }

  toggleModal = () => {
    this.setState({ isOpenModal: !this.state.isOpenModal });
  };

  handleSave = (values) => {
    this.toggleModal();
    const department = this.props.department.find(
      (v) => v.name === values.department
    );
    // const preveDepartment = this.props.department.find(
    //   (v) => v.name === this.props.dept.name
    // );
    const id = this.props.staff.id;
    const staff = { id, ...values };
    staff.departmentId = department.id;
    // department.numberOfStaff++;
    // preveDepartment.numberOfStaff--;
    this.props.updateStaff(staff);
  };

  render() {
    const date = new Date(this.props.staff.doB);
    const doB = date.toLocaleDateString("en-CA");
    const date1 = new Date(this.props.staff.startDate);
    const startDate = date1.toLocaleDateString("en-CA");
    return (
      <div>
        <Button onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span>
          Update Staff
        </Button>
        <Modal isOpen={this.state.isOpenModal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>
            Cập nhật thông tin nhân viên
          </ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSave(values)}>
              <Row className="form-group">
                <Label htmlFor="name" md={4}>
                  Tên:
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".name"
                    id="name"
                    name="name"
                    defaultValue={this.props.staff.name}
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
                    defaultValue={doB}
                    className="form-control"
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
                    defaultValue={startDate}
                    className="form-control"
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
                    defaultValue={this.props.dept.name}
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
                <Label htmlFor="annualLeave" md={4}>
                  Số ngày nghỉ còn lại:
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".annualLeave"
                    id="annualLeave"
                    name="annualLeave"
                    className="form-control"
                    defaultValue={this.props.staff.annualLeave}
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
                    defaultValue={this.props.staff.overTime}
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
                    Save
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
