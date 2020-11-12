import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
import { signin, authenticate } from "../auth/helper";
require("dotenv").config();

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;

  const handleChange = (email) => (event) => {
    setValues({ ...values, error: false, [email]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({ ...values, didRedirect: true });
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const performRedirect = () => {
    if (didRedirect) {
      return <Redirect to="/user/dashboard" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className=" alert alert-info">
          <h2>Loading....</h2>
        </div>
      )
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

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
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
              className="btn btn-outline-success  btn-block"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Signin Page" description="A page for user to signin !">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
    </Base>
  );
};

export default Signin;
