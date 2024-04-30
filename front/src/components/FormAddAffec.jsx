import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddAffec = ({ graters, sender }) => {
  const [quantity, setQuantity] = useState(0);
  const [receiver, setReceiver] = useState(null);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const addAffect = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/affectation", {
        sender: sender._id,
        receiver: receiver,
        quantite: quantity,
      });
      navigate("/affectation");
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
            <form onSubmit={addAffect}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Quantity</label>
                <div className="control">
                  <input
                    type="number"
                    className="input"
                    value={quantity}
                    placeholder="Quantity"
                    onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Receiver</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={receiver || ""}
                      onChange={(e) => setReceiver(e.target.value)}
                    >
                      <option value="">Select a user</option>
                      {graters &&
                        graters.map((grater) => (
                          <option key={grater._id} value={grater._id}>
                            {grater.name}
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

export default FormAddAffec;
