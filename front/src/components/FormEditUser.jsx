import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const FormEditUser = () => {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const { id } = useParams();

  // Define Yup schema for validation
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),

    password: yup
      .string()
      .test(
        "password",
        "Password must be at least 6 characters",
        (value) => !value || value.length >= 6
      ),
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

  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/role");
      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  // Fetch user data and populate form fields
  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        console.log(response.data);
        const { name, role } = response.data;
        setValue("name", name);
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
                <label className="label">New Password</label>
                <div className="control">
                  <input
                    type="password"
                    placeholder="The current password remains active until you update it."
                    className="input"
                    {...register("password")}
                  />
                  <p className="help is-danger">{errors.password?.message}</p>
                </div>
              </div>
              <div className="field">
                <label className="label">Role</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select {...register("role")}>
                      {roles.map((role) => (
                        <option key={role._id} value={role._id}>
                          {role.name}
                        </option>
                      ))}
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
