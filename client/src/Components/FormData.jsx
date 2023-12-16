import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/FormData.css";

function FormData() {
  const [result, setResult] = useState([]);
  const [dataToInsert, setDataToInsert] = useState({
    DeviceName: "",
    Description: "",
    Rating: "",
  });

  const [redirected, setRedirected] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [navigate, redirected]);

  const fetchData = () => {
    fetch("http://localhost:3000/devices")
      .then((res) => res.json())
      .then((data) => {
        setResult(data);

        const foundItem = data.find(
          (item) => window.location.pathname === `/modify/${item.DeviceID}`
        );

        if (foundItem) {
          setDataToInsert((prevState) => ({
            ...prevState,
            ...foundItem,
          }));
        } else {
          if (!redirected) {
            setRedirected(true);
            navigate("/");
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = foundItem
      ? `http://localhost:3000/devices/${dataToInsert.DeviceID}`
      : "http://localhost:3000/devices";

    const method = foundItem ? "PUT" : "POST";

    try {
      const response = await fetch(endpoint, {
        method,
        body: JSON.stringify(dataToInsert),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setDataToInsert({
      ...dataToInsert,
      [e.target.name]: e.target.value,
    });
  };

  const foundItem = result.find(
    (item) => window.location.pathname === `/modify/${item.DeviceID}`
  );

  return (
    <div className="form_div">
      <h1>
        <title>{foundItem ? "Update Information" : "Add Device"}</title>
      </h1>
      <h1 className="form-text">
        {foundItem ? "Update Infomation" : "Add Device"}
      </h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          className="form_input"
          type="text"
          value={dataToInsert.DeviceName}
          name="DeviceName"
          onChange={handleChange}
          placeholder="Device Name"
          required
          autoComplete="none"
        />
        <textarea
          className="form_input textarea"
          rows={foundItem ? 5 : ""}
          value={dataToInsert.Description}
          name="Description"
          onChange={handleChange}
          placeholder="Description.."
          required
          autoComplete="none"
        ></textarea>
        <input
          className="form_input"
          type="number"
          value={dataToInsert.Rating}
          name="Rating"
          onChange={handleChange}
          placeholder="Rating"
          required
          autoComplete="none"
        />

        <button className="form_button">Save</button>
      </form>
    </div>
  );
}

export default FormData;
