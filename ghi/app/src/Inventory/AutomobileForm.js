import React, { useEffect, useState } from "react";

function AutomobileForm() {
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [vin, setVin] = useState("");
  const [model_id, setModel] = useState("");
  const [models, setModels] = useState([]);

  useEffect(() => {
    const getAutomobileData = async () => {
      const autoResponse = await fetch("http://localhost:8100/api/models/");
      const automobileData = await autoResponse.json();
      setModels(automobileData.models);
    };

    getAutomobileData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      color,
      year,
      vin,
      model_id,
    };
    const automobileUrl = "http://localhost:8100/api/automobiles/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(automobileUrl, fetchConfig);

    if (response.ok) {
      setColor("");
      setYear("");
      setVin("");
      setModel("");
    }
  };

  const colorChange = (event) => {
    setColor(event.target.value);
  };

  const yearChange = (event) => {
    setYear(event.target.value);
  };

  const vinChange = (event) => {
    setVin(event.target.value);
  };

  const modelChange = (event) => {
    setModel(event.target.value);
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create an Automobile</h1>
          <form onSubmit={handleSubmit} id="create-automobile-form">
            <div className="form-floating mb-3">
              <input
                onChange={colorChange}
                value={color}
                placeholder="Color"
                required
                name="color"
                id="color"
                className="form-control"
              />
              <label htmlFor="name">Color</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={yearChange}
                value={year}
                placeholder="Year"
                required
                name="year"
                id="year"
                className="form-control"
              />
              <label htmlFor="name">Year</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={vinChange}
                value={vin}
                placeholder="Automobile Name"
                required
                name="vin"
                id="vin"
                className="form-control"
              />
              <label htmlFor="vin">VIN</label>
            </div>
            <div className="mb-3">
              <select
                onChange={modelChange}
                value={model_id}
                required
                name="model"
                id="model"
                className="form-select"
              >
                <option value="">Choose a Model</option>
                {models.map((model) => {
                  return (
                    <option key={model.id} value={model.id}>
                      {model.manufacturer.name} {model.name}
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

export default AutomobileForm;
