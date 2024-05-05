import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const FormAddRec = ({ lowers, sender }) => {
  const schema = yup.object().shape({
    firstIccid: yup
      .string()
      .matches(/^\d{8}$/, "First ICCID must be an 8-digit number")
      .required("First ICCID is required"),
    lastIccid: yup
      .string()
      .matches(/^\d{8}$/, "Last ICCID must be an 8-digit number")
      .required("Last ICCID is required")
      .test(
        "greater-than-first",
        "Last ICCID must be greater than First ICCID",
        function (value) {
          const { firstIccid } = this.parent;
          return parseInt(value) > parseInt(firstIccid);
        }
      ),
    receiver: yup.string().required("Receiver is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      data.sender = sender._id;
      data.quantite = parseInt(data.lastIccid) - parseInt(data.firstIccid) + 1;
      await axios.post("http://localhost:5000/recuperation", data);
      navigate("/affectation");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div>
      <h1 className="title">Sim</h1>
      <h2 className="subtitle">Recuperation a New Sim</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="has-text-centered">{msg}</p>
              <div className="field-body">
                <div className="field">
                  <label className="label">FirstIccid</label>
                  <div className="control">
                    <input
                      type="text"
                      className={`input ${
                        errors.firstIccid ? "is-danger" : ""
                      }`} // Apply 'is-danger' class when there's an error
                      placeholder="FirstIccid"
                      {...register("firstIccid")}
                    />
                    {errors.firstIccid && (
                      <p className="help is-danger">
                        {errors.firstIccid.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="field">
                  <label className="label">LastIccid</label>
                  <div className="control">
                    <input
                      type="text"
                      className={`input ${errors.lastIccid ? "is-danger" : ""}`} // Apply 'is-danger' class when there's an error
                      placeholder="LastIccid"
                      {...register("lastIccid")}
                    />
                    {errors.lastIccid && (
                      <p className="help is-danger">
                        {errors.lastIccid.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="field">
                <label className="label">Receiver</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select {...register("receiver")}>
                      <option value="">Select a user</option>
                      {lowers &&
                        lowers.map((lower) => (
                          <option key={lower._id} value={lower._id}>
                            {lower.name}
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

export default FormAddRec;
