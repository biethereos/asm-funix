import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import { Loading } from "./LoadingComponent";

const RenderDepartments = ({ department, staffNum }) => {
  return (
    <Link to={`/department/${department.id}`}>
      <Card>
        <CardBody>
          <CardTitle>Phòng ban: {department.name}</CardTitle>
          <CardText>Số người: {staffNum.length}</CardText>
        </CardBody>
      </Card>
    </Link>
  );
};

const Department = (props) => {
  const deparmentList = props.departments.map((department) => {
    return (
      <div key={department.id} className="col-xs-12 col-md-6 col-lg-4 my-2">
        <RenderDepartments
          department={department}
          staffNum={props.staffs.filter(
            (staff) => staff.departmentId === department.id
          )}
        />
      </div>
    );
  });

  if (props.departmentsLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.departmentsFailed) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.departmentsFailed}</h4>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="row">{deparmentList}</div>
      </div>
    );
  }
};

export default Department;
