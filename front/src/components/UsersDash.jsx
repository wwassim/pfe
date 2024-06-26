import { useEffect, useState } from "react";
import axios from "axios";
import SimList from "./SimList";
import ChartRec from "./ChartRec";
import ChartAffect from "./ChartAffect";

const UsersDash = ({ user }) => {
  const [users, setUsers] = useState();
  const [userId, setUserId] = useState();
  const [affectation, setAffectations] = useState();
  const [recuperation, setRecuperation] = useState();
  const [selectedUser, setSelectedUser] = useState(user);
  useEffect(() => {
    if (user) {
      setUserId(user._id); // Set the current user's ID
      getGrater();
      getAffectations(user._id); // Fetch affectation for current user
      getRecuperation(user._id); // Fetch recuperation for current user
    }
  }, [user]);

  useEffect(() => {
    getUser();
  }, [userId]);

  useEffect(() => {
    if (userId) {
      getAffectations(userId);
      getRecuperation(userId);
    }
  }, [userId]);

  // API get users
  const getGrater = async () => {
    if (user) {
      try {
        const response = await axios.get(
          "http://localhost:5000/users/greater",
          {
            params: {
              number: user.number,
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error :", error);
      }
    }
  };
  // api get user
  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${userId}`);
      setSelectedUser(response.data);
      console.log(selectedUser);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      //   setIsLoading(false);
    }
  };
  // API get affectation for a specific user
  const getAffectations = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/affectation/${id}`
      );
      setAffectations(response.data);
    } catch (error) {
      console.error("Error fetching affectations:", error);
    }
  };

  // API get recuperation for a specific user
  const getRecuperation = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/recuperation/${id}`
      );
      setRecuperation(response.data);
    } catch (error) {
      console.error("Error fetching recuperations:", error);
    }
  };

  const handleChange = (event) => {
    const selectedUserId = event.target.value;
    setUserId(selectedUserId);
  };

  return (
    <div>
      {/* Choice User section */}
      <div className="field has-addons box">
        <div className="control is-expanded">
          <div className="select is-fullwidth">
            {user && user.role.name !== "Point de vente" && (
              <select name="users" onChange={handleChange}>
                <option value="">Select a user</option>
                {users &&
                  users.map((u) => (
                    <option key={u._id} value={u._id}>
                      {u.name}
                    </option>
                  ))}
              </select>
            )}
          </div>
        </div>
        <div className="control">
          <button type="submit" className="button is-primary">
            Choose
          </button>
        </div>
      </div>
      <div class="field has-addons box is-flex is-justify-content-space-between is-align-items-center">
        <strong>Stock user: </strong>
        {selectedUser && (
          <p className="is-size-5 has-text-success has-text-weight-bold	">
            {" "}
            {selectedUser.stock}
          </p>
        )}
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

export default UsersDash;
