import { useState, useEffect } from "react";
import axios from "axios";

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
// the payload is the data you want to send in the post
/*
const usepostdata = (endpoint, payload) => {
  const [response, setresponse] = usestate(null);
  const [error, seterror] = usestate(null);

  useeffect(() => {
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
*/

// generic way to handle deleting a resource from the backend by dynamically building the backend endpoint
// this allows us to delete tags and programs with the same functionality
export const handleDelete = (
  resourceType,
  resourceId,
  confirmMessage, 
  onSuccess,
  onError
) => {
  if (resourceId != null) {
    if (window.confirm(confirmMessage)) {
      axios
        .delete(`${backend_url}/${resourceType}/${resourceId}`)
        .then((response) => {
          if (onSuccess) onSuccess(response.data);
        })
        .catch((error) => {
          console.error(`Error deleting ${resourceType}:`, error);
          if (onError) onError(error);
        });
    }
  }
};

export default useFetchData;
