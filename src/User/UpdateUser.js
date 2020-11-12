import React, { useState, useEffect } from "react";
import { isAutheticated, updateUser, getOneUser } from "../auth/helper";
import Base from "../core/Base";

const UpdateUser = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    age: "",
    error: "",
    success: false,
  });

  const { firstName, lastName, age, error, success } = values;

  const { user, token } = isAutheticated();

  const preload = () => {
    getOneUser(user.id).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({
          firstName: data.firstName,
          lastName: data.lastName,
          age: data.age,
        });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const handleChange = (firstName) => (event) => {
    setValues({ ...values, error: false, [firstName]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    updateUser(user.id, token, { firstName, lastName, age }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          firstName: "",
          lastName: "",
          age: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
  };

  const performRedirect = () => {
    if (success) {
      setTimeout(() => {
        window.history.back();
      }, 1000);
    }
  };

  const updateForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">First name</label>
              <input
                onChange={handleChange("firstName")}
                className="form-control"
                type="text"
                value={firstName}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Last name</label>
              <input
                onChange={handleChange("lastName")}
                className="form-control"
                type="text"
                value={lastName}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Age</label>
              <input
                onChange={handleChange("age")}
                className="form-control"
                type="number"
                value={age}
              />
            </div>
            <button
              onClick={onSubmit}
              className="btn btn-outline-success btn-block"
            >
              Done
            </button>
          </form>
        </div>
      </div>
    );
  };

  const sucessMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            User updated Successfully
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const title =
    user.role === 1
      ? "Welcome to  admin dashboard"
      : "Welcome to user dashboard";

  return (
    <Base
      title={title}
      description="Edit Your profile heare"
      className="container bg-dark p-2"
    >
      {sucessMessage()}
      {errorMessage()}
      {updateForm()}
      {performRedirect()}
    </Base>
  );
};

export default UpdateUser;
