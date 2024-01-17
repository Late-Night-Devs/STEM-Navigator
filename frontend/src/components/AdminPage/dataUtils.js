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

export const handleRemoveSelectedTag = (selectedTag, onSuccess, onError) => {
  if (selectedTag != null) {
    if (window.confirm(`Are you sure you want to delete the tag?`)) {
      axios
        .delete(`${backend_url}/tags/${selectedTag}`)
        .then((response) => {
          console.log("Tag deleted successfully:", response.data);
          if (onSuccess) onSuccess(response.data);
        })
        .catch((error) => {
          console.error("Error deleting tag:", error);
          if (onError) onError(error);
        });
    }
  } else {
    console.log("No tag selected for deletion.");
    if (onError) onError(new Error("No tag selected"));
  }
};

export default useFetchData;
