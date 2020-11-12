import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  // Destructuring
  const { firstName, lastName, age, email, password, error, success } = values;

  const handleChange = (firstName) => (event) => {
    setValues({ ...values, error: false, [firstName]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ firstName, lastName, age, email, password })
      .then((data) => {
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
      })
      .catch((err) => console.log(err));
  };

  const sucessMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created Successfully. Please
            <Link to="/signin">Login Hear</Link>
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

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-lignt">First name</label>
              <input
                onChange={handleChange("firstName")}
                className="form-control"
                type="text"
                value={firstName}
              />
            </div>
            <div className="form-group">
              <label className="text-lignt">Last name</label>
              <input
                onChange={handleChange("lastName")}
                className="form-control"
                type="text"
                value={lastName}
              />
            </div>
            <div className="form-group">
              <label className="text-lignt">Age</label>
              <input
                onChange={handleChange("age")}
                className="form-control"
                type="number"
                value={age}
              />
            </div>
            <div className="form-group">
              <label className="text-lignt">Email</label>
              <input
                onChange={handleChange("email")}
                className="form-control"
                type="email"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-lignt">Password</label>
              <input
                onChange={handleChange("password")}
                className="form-control"
                type="password"
                value={password}
              />
            </div>
            <button
              onClick={onSubmit}
              className="btn btn-outline-success btn-block"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Signup page" description="A page for user to signup !">
      {sucessMessage()}
      {errorMessage()}
      {signUpForm()}
    </Base>
  );
};

export default Signup;
