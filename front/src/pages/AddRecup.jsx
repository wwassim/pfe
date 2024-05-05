import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authslice";
// import FormAddAffec from "../components/FormAddAffec";
import axios from "axios";
import FormAddRec from "../components/FormAddRec";

const AddRecup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, user } = useSelector((state) => state.auth);
  const [lower, setLower] = useState([]);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    getLower();
  }, [user]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user && user.role.name === "Point de vente") {
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);

  const getLower = async () => {
    if (user) {
      const response = await axios.get("http://localhost:5000/users/lower", {
        params: {
          number: user.number,
        },
      });
      setLower(response.data);
    }
  };
  return (
    <Layout>
      {isLoading ? (
        <p>Loading ...</p>
      ) : user && Object.keys(user).length !== 0 ? (
        <FormAddRec lowers={lower} sender={user} />
      ) : null}
    </Layout>
  );
};

export default AddRecup;
