import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { getAllUsers, removeUser } from "../auth/helper";

const RemoveUser = () => {
  const [users, setUsers] = useState([]);

  const preload = () => {
    getAllUsers().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });
  };

  const deleteUser = (id) => {
    removeUser(id).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base title="Welcome Admin" description="Manage users here">
      <div className="row">
        <div className="col-12 bg-dark">
          <h1
            className="text-center text-white my-4 text-block bg-secondary p-2"
            style={{ color: (230, 230, 250) }}
          >
            All Users
          </h1>
          {users.map((user, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
                  <h2 className="text-white text-left">
                    {user.firstName} {user.lastName}
                  </h2>
                </div>
                <div className="col-4">
                  <h2 className="text-white text-left">{user.email}</h2>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      deleteUser(user.id);
                    }}
                    className="btn btn-lg btn-outline-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default RemoveUser;
