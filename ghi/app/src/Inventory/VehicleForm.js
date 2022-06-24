import React, { useEffect, useState } from "react";

function VehicleForm() {
  const [name, setName] = useState("");
  const [picture_url, setPicture] = useState("");
  const [manufacturer_id, setManufacturer] = useState("");
  const [manufacturers, setManufacturers] = useState([]);

  useEffect(() => {
    const getVehicleData = async () => {
      const autoResponse = await fetch(
        "http://localhost:8100/api/manufacturers/"
      );
      const vehicleData = await autoResponse.json();
      setManufacturers(vehicleData.manufacturers);
    };

    getVehicleData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      name,
      picture_url,
      manufacturer_id,
    };
    const automobileUrl = "http://localhost:8100/api/models/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(automobileUrl, fetchConfig);

    if (response.ok) {
      setName("");
      setPicture("");
      setManufacturer("");
    }
  };

  const nameChange = (event) => {
    setName(event.target.value);
  };

  const pictureChange = (event) => {
    setPicture(event.target.value);
  };

  const manufacturererChange = (event) => {
    setManufacturer(event.target.value);
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create an Vehicle Model</h1>
          <form onSubmit={handleSubmit} id="create-automobile-form">
            <div className="form-floating mb-3">
              <input
                onChange={nameChange}
                value={name}
                placeholder="name"
                required
                name="name"
                id="name"
                className="form-control"
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={pictureChange}
                value={picture_url}
                placeholder="Picture"
                required
                name="picture_url"
                id="picture_url"
                className="form-control"
              />
              <label htmlFor="vin">Car Picture</label>
            </div>
            <div className="mb-3">
              <select
                onChange={manufacturererChange}
                value={manufacturer_id}
                required
                name="manufacturer_id"
                id="manufacturer_id"
                className="form-select"
              >
                <option value="">Choose a Manufacturer</option>
                {manufacturers.map((model) => {
                  return (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VehicleForm;
