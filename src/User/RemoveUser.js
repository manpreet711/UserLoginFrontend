import React, { useState, useEffect } from "react";
import Base from "../core/base";
import { getAllUsers, removeUser } from "../auth/helper";
import Pagination from "../pagination";
import PaginateUsers from "./paginatedusers";

const RemoveUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentpage, setCurrentPage] = useState(1);
  const [userperpage] = useState(4);

  const preload = () => {
    getAllUsers().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
        setLoading(false);
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

  //Get Current Post
  const indexOfLastUser = currentpage * userperpage;
  const indexOfFirstUser = indexOfLastUser - userperpage;
  const currentuser = users.slice(indexOfFirstUser, indexOfLastUser);

  //Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        </div>
      </div>
      <PaginateUsers
        users={currentuser}
        loading={loading}
        deleteUser={deleteUser}
      />
      <Pagination
        userPerPage={userperpage}
        totalUser={users.length}
        paginate={paginate}
      />
    </Base>
  );
};

export default RemoveUser;
