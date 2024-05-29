import { useEffect, useState } from "react";
import Affectation from "../pages/Affectation";
import AdminDash from "./AdminDash";
import axios from "axios";
import SimList from "./SimList";
import ChartRec from "./ChartRec";
import ChartAffect from "./ChartAffect";

const Dash = () => {
  const [users, setUsers] = useState();
  const [userId, setUserId] = useState();
  const [affectation, setAffectations] = useState();
  const [recuperation, setRecuperation] = useState();
  useEffect(() => {
    getUsers();
  }, [users]);

  useEffect(() => {
    if (userId) {
      getAffectations();
      getRecuperation();
    }
  }, [userId]);

  // api get users
  const getUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching affectations:", error);
    } finally {
      //   setIsLoading(false);
    }
  };

  // api get affectation for a specific user
  const getAffectations = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/affectation/${userId}`
      );
      setAffectations(response.data);
    } catch (error) {
      console.error("Error fetching affectations:", error);
    } finally {
      //   setIsLoading(false);
    }
  };

  // api get recepuration for a specific user
  const getRecuperation = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/recuperation/${userId}`
      );
      setRecuperation(response.data);
    } catch (error) {
      console.error("Error fetching affectations:", error);
    } finally {
      //   setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    const selectedUserId = event.target.value;
    setUserId(selectedUserId);
  };
  return (
    <div>
      {/* Choice User section */}
      <div class="field has-addons box">
        <div class="control is-expanded">
          <div class="select is-fullwidth">
            <select name="users" onChange={handleChange}>
              <option value="">Select a user</option>
              {users &&
                users.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div class="control">
          <button type="submit" class="button is-primary">
            Choose
          </button>
        </div>
      </div>
      {/* Details Section */}
      <div>
        <div className="columns">
          <div className="column is-half">
            {/* Affectation Section */}
            <div className="box" style={{ height: "300px", overflowY: "auto" }}>
              {/* Affectation Table */}
              {affectation && <SimList affectations={affectation} />}
            </div>
          </div>
          <div className="column is-half">
            <div className="box" style={{ height: "300px", overflowY: "auto" }}>
              {/* Affectation Statistic */}
              {affectation && <ChartAffect affectation={affectation} />}
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column is-half">
            {/* Recuperation Section */}
            <div className="box" style={{ height: "300px", overflowY: "auto" }}>
              {/* Recuperation Table */}
              {recuperation && <SimList affectations={recuperation} />}
            </div>
          </div>
          <div className="column is-half ">
            <div className="box" style={{ height: "300px", overflowY: "auto" }}>
              {/* Recuperation Statistic */}
              {recuperation && <ChartRec recuperation={recuperation} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dash;
