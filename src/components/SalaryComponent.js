import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardText,
  CardTitle,
} from "reactstrap";
import { Loading } from "./LoadingComponent";
import { FadeTransform } from "react-animation-components";

// const base = 3000000;
// const hourOfOvertime = 200000;
function RenderSalary({ salary }) {
  if (salary != null) {
    return (
      <FadeTransform
        in
        transformProps={{
          exitTransform: "scale(0.5) translateY(-50%)",
        }}
      >
        <Card>
          <CardBody>
            <CardTitle>Họ và Tên: {salary.name}</CardTitle>
            <CardText>Mã Nhân viên: {salary.id}</CardText>
            <CardText>Hệ số lương:{salary.salaryScale}</CardText>
            <CardText>Số giờ làm thêm: {salary.overTime}</CardText>
            <CardText className="bg-light p-2 shadow">
              Lương:{" "}
              {
                /* {(
              salary.salaryScale * base +
              salary.overTime * hourOfOvertime
            ).toFixed(0)} */
                salary.salary
              }
            </CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    );
  } else {
    return <div></div>;
  }
}

const Salary = (props) => {
  let [sortBySalary, setSortBySalary] = useState(false);
  const salaryList = props.staffsSalary
    .sort((a, b) => (sortBySalary ? b.salary - a.salary : a.salary - b.salary))
    .map((staff) => {
      return (
        <div key={staff.id} className="col-sm-12 col-md-6 col-lg-4 my-2">
          <RenderSalary salary={staff} />
        </div>
      );
    });

  if (props.salaryLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.salaryFailed) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.salaryFailed}</h4>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/staff">Staff</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Bảng lương</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="row justify-content-end mx-2">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setSortBySalary(!sortBySalary)}
          >
            Sắp xếp theo lương
          </button>
        </div>
        <div className="row">{salaryList}</div>
      </div>
    );
  }
};

export default Salary;
