import Layout from "./Layout";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authslice";
import axios from "axios";
import Userlist from "../components/Userlist";

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user && user.role.name === "Point de vente") {
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);
  return (
    <Layout>
      <Userlist />
    </Layout>
  );
};

export default Users;
