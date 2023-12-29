import axios from "axios";

export const GET = async (endpoint, params) => {
  return axios
    .get(process.env.REACT_APP_BASE_URL + endpoint, { params })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const POST = async (endpoint, data, config) => {
  return axios
    .post(process.env.REACT_APP_BASE_URL + endpoint, data, config)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const PUT = async (endpoint, data) => {
  return axios
    .put(process.env.REACT_APP_BASE_URL + endpoint, data)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const DELETE = async (endpoint, id) => {
  return axios
    .delete(process.env.REACT_APP_BASE_URL + endpoint, { id })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
};
