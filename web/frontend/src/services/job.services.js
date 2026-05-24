import axios from "axios";

const API = "http://localhost:3000/api/jobs";

export const getJobs = async () => {

  const token = localStorage.getItem("token");

  const response = await axios.get(API, {
    headers: {
      Authorization: token
    }
  });

  return response.data;
};

export const createJob = async (formData) => {

  const token = localStorage.getItem('token');

  const response = await axios.post(
    API,
    formData,
    {
      headers: {
        Authorization: token
      }
    }
  );

  return response.data;
};