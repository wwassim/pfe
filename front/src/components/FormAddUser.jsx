import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const FormAddUser = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState("");
  const [msg, setMsg] = useState("");

  const schema = yup.object().shape({
    name: yup.string().required("UserName is required"),
    password: yup.string().min(4).max(20).required(),
    confPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords Don't Match")
      .required(),
    role: yup.string().required("Receiver is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async () => {
    const response = await axios.get("http://localhost:5000/role");
    setRoles(response.data);
  };

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:5000/users", data);
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">Add New User</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">UserName</label>
                <div className="control">
                  <input
                    type="text"
                    className={`input ${errors.name ? "is-danger" : ""}`} // Apply 'is-danger' class when there's an error
                    placeholder="UserName"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="help is-danger">{errors.name.message}</p>
                  )}
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    type="password"
                    className={`input ${errors.password ? "is-danger" : ""}`}
                    placeholder="******"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="help is-danger">{errors.password.message}</p>
                  )}
                </div>
              </div>
              <div className="field">
                <label className="label">Confirm Password</label>
                <div className="control">
                  <input
                    type="password"
                    className={`input ${errors.password ? "is-danger" : ""}`}
                    {...register("confPassword")}
                    placeholder="******"
                  />
                  {errors.confPassword && (
                    <p className="help is-danger">
                      {errors.confPassword.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="field">
                <label className="label">Role</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select {...register("role")}>
                      <option value="">Select a role</option>
                      {roles &&
                        roles.map((role) => (
                          <option key={role._id} value={role._id}>
                            {role.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddUser;
