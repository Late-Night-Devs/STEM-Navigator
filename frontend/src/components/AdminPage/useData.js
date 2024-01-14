import { useState, useEffect } from 'react';
import axios from 'axios';

const backend_url = process.env.REACT_APP_BACKEND_URL;

// use this to fetch programs or tags data
const useFetchData = (endpoint) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${backend_url}/${endpoint}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
        console.error(`Error fetching ${endpoint}:`, err);
      });
  }, [endpoint]);

  return { data, error };
};

// use this for creating new programs or tags
// the payload is the data you want to send in the POST 
const usePostData = (endpoint, payload) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .post(`${backend_url}/${endpoint}`, payload)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
        console.error(`Error posting to ${endpoint}:`, err);
      });
  }, [endpoint, payload]);

  return { response, error };
};

export default useFetchData;
