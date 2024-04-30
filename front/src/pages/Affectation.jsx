import Layout from "./Layout";
import SimList from "../components/SimList";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authslice";
import axios from "axios";

const Affectation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError, user } = useSelector((state) => state.auth);
  const [affectations, setAffectations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getMe());
    getAffectations();
  }, [dispatch, affectations]);

  useEffect(() => {}, []);

  const getAffectations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/affectation", {
        params: {
          senderId: user?._id, // Pass sender's ID as a query parameter
        },
      });
      setAffectations(response.data);
    } catch (error) {
      console.error("Error fetching affectations:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Layout>
      {isLoading ? "is loading" : <SimList affectations={affectations} />}
    </Layout>
  );
};

export default Affectation;
