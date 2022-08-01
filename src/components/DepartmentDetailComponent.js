import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardImg,
  CardTitle,
} from "reactstrap";
import { Loading } from "./LoadingComponent";
import { Link } from "react-router-dom";

function RenderStaffDept({ staff, department }) {
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

const DepartmentDetail = (props) => {
  const staffsInDept = props.staff.map((staff) => {
    return (
      <div key={staff.id} className="col-sm-6 col-md-4 col-lg-2 mt-3">
        <RenderStaffDept staff={staff} />
      </div>
    );
  });
  if (props.deptLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.deptErrMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.deptErrMess}</h4>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/department">Department</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.department.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.staff.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">{staffsInDept}</div>
      </div>
    );
  }
};

export default DepartmentDetail;
