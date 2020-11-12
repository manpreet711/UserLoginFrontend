import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAutheticated, getOneUser } from "../auth/helper";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    error: "",
    success: false,
  });

  const { firstName, lastName, age, email } = values;

  const {
    user: { id, role },
  } = isAutheticated();

  const getUserInfo = () => {
    getOneUser(id).then((data) => {
      if (data.error) {
        console.log(("Cannot get User by id", data.error));
      } else {
        setValues({
          ...values,
          firstName: data.firstName,
          lastName: data.lastName,
          age: data.age,
          email: data.email,
        });
      }
    });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const userDashboard = () => {
    return (
      <div className="card mb-4">
        <h2 className="card-header bg-dark text-white mr-1 ml-1 mt-1 p-3">
          Hello {firstName}
        </h2>
        <ul className="list-group">
          <li className="list-group-item">
            <div className="row">
              <h3 className=" col-12  mr-2">
                <span className="text-success"> Name:- </span> {firstName}{" "}
                {lastName}
              </h3>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row">
              <h3 className=" col-12  mr-2">
                <span className="text-success"> Age:- </span> {age}
              </h3>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row">
              <h3 className=" col-12  mr-2">
                <span className="text-success"> Email:-</span> {email}
              </h3>
            </div>
          </li>
          <li className="list-group-item">
            <button className="btn btn-sm btn-danger float-right">
              <Link className="text-light" to="/user/update">
                Edit your profile
              </Link>
            </button>
            {role === 1 && (
              <button className="btn btn-sm btn-danger float-left">
                <Link className="text-light" to="/user/delete">
                  Delete Users
                </Link>
              </button>
            )}
          </li>
        </ul>
      </div>
    );
  };

  const title =
    role === 1 ? "Welcome to  admin dashboard" : "Welcome to user dashboard";

  return (
    <Base
      title={title}
      description="Manage Your profile heare"
      className="container bg-dark p-2"
    >
      <div className="row">
        <div className="col-6 offset-3">{userDashboard()}</div>
      </div>
    </Base>
  );
};

export default UserDashboard;
