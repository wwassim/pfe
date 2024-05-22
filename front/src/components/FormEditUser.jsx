import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const FormEditUser = () => {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  // Define Yup schema for validation
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters"),
    confPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    role: yup.string().required("Role is required"),
  });

  // Configure react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Fetch user data and populate form fields
  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        const { name, email, role } = response.data;
        setValue("name", name);
        setValue("email", email);
        setValue("role", role);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id, setValue]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, data);
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
      <h2 className="subtitle">Update User</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input type="text" className="input" {...register("name")} />
                  <p className="help is-danger">{errors.name?.message}</p>
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input type="text" className="input" {...register("email")} />
                  <p className="help is-danger">{errors.email?.message}</p>
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    {...register("password")}
                  />
                  <p className="help is-danger">{errors.password?.message}</p>
                </div>
              </div>
              <div className="field">
                <label className="label">Confirm Password</label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    {...register("confPassword")}
                  />
                  <p className="help is-danger">
                    {errors.confPassword?.message}
                  </p>
                </div>
              </div>
              <div className="field">
                <label className="label">Role</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select {...register("role")}>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                  <p className="help is-danger">{errors.role?.message}</p>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Update
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

export default FormEditUser;
