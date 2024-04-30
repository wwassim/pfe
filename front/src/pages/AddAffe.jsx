import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authslice";
import FormAddAffec from "../components/FormAddAffec";
import axios from "axios";

const AddAff = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, user } = useSelector((state) => state.auth);
  const [grater, setGrater] = useState([]);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    getGrater();
  }, [user]);

  // useEffect(() => {
  //   if (isError) {
  //     navigate("/");
  //   }
  //   if (user && user.role !== "admin") {
  //     navigate("/dashboard");
  //   }
  // }, [isError, user, navigate]);

  const getGrater = async () => {
    if (user) {
      const response = await axios.get("http://localhost:5000/users/greater", {
        params: {
          number: user.number,
        },
      });
      setGrater(response.data);
    }
  };
  return (
    <Layout>
      {isLoading ? (
        <p>Loading ...</p>
      ) : user && Object.keys(user).length !== 0 ? (
        <FormAddAffec graters={grater} sender={user} />
      ) : null}
    </Layout>
  );
};

export default AddAff;
