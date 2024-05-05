import Layout from "./Layout";
import SimList from "../components/SimList";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authslice";
import axios from "axios";

const Recuperation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      const response = await axios.get("http://localhost:5000/recuperation", {
        params: {
          senderId: user?._id, // Pass sender's ID as a query parameter
        },
      });
      setRecuperation(response.data);
    } catch (error) {
      console.error("Error fetching affectations:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Layout>
      {isLoading
        ? "is loading"
        : user && <SimList affectations={recuperation} user={user} />}
    </Layout>
  );
};

export default Recuperation;
