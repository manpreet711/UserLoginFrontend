import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My Description",
  className = "bg-dark text-white p-4",
  children,
}) => (
  <div>
    <Menu />
    <div className="container-fluid ">
      <div
        className=" bg-dark text-white text-center"
        style={{ paddingTop: "30px" }}
      >
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}> {children} </div>
    </div>
    <footer className="fotter bg-dark mt-auto py-3  ">
      <div className="container-fluid bg-success text-white text-center py-3">
        <h5>This is an footer section</h5>
        <button className="btn btn-warning ">Contact Us</button>
      </div>
      <div className="container text-center">
        <span className="text-muted">
          Project developed by <span className="text-white">Manpreet</span>
        </span>
      </div>
    </footer>
  </div>
);
export default Base;
