import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Userlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, [users]);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (userId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/users/${userId}`);
        getUsers(); // Refresh the user list after deletion
        window.alert("User deleted successfully.");
      } catch (error) {
        console.error("Error deleting user:", error);
        window.alert("Failed to delete user. Please try again.");
      }
    } else {
      window.alert("User deletion canceled.");
    }
  };
  return (
    <div className="p-4">
      <h1 className="title">Users</h1>
      <h2 className="subtitle">List of Users</h2>
      <Link to="/users/add" className="button is-primary mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.role.name}</td>
              <td>
                <Link
                  to={`/users/edit/${user._id}`}
                  className="button is-normal is-info mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteUser(user._id)}
                  className="button is-normal is-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Userlist;
