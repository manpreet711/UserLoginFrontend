import React from "react";

const PaginateUsers = ({ users, loading, deleteUser }) => {
  if (loading) {
    return <h2> Loading......</h2>;
  }

  return (
    <ul className="list-group mb-4">
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
    </ul>
  );
};

export default PaginateUsers;
