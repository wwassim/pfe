import Layout from "./Layout";
import SimList from "../components/SimList";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authslice";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const Recuperation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { pathname } = location;
  const { isError, user } = useSelector((state) => state.auth);
  const [recuperation, setRecuperation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      getRecuperation();
    }
  }, [user]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user && user.role.name === "Point de vente") {
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);

  const getRecuperation = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/recuperation/${user?._id}`
      );
      setRecuperation(response.data);
    } catch (error) {
      console.error("Error fetching affectations:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Layout>
      {isLoading ? (
        "is loading"
      ) : (
        <div className="p-4">
          <h1 className="title">Sim</h1>
          <h2 className="subtitle">List of Recuperation</h2>
          <div className="is-flex is-justify-content-space-between is-align-items-center mb-2">
            <Link to={`${pathname}/add`} className="button is-primary">
              Add New
            </Link>
            {user && (
              <p
                className={`is-size-5 ${
                  user.stock <= 0 ? "has-text-danger" : "has-text-success"
                }`}
              >
                Stock: {user.stock}
              </p>
            )}
          </div>
          <SimList affectations={recuperation} />
        </div>
      )}
    </Layout>
  );
};

export default Recuperation;
