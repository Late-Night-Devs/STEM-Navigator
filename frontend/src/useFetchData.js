import { useState, useEffect } from 'react';
import axios from 'axios';

const backend_url = process.env.REACT_APP_BACKEND_URL;

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

export default useFetchData;
