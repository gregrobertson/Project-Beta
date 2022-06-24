import React, { useState, useEffect } from "react";

function AutomobileList() {
  const [models, setModels] = useState([]);

  useEffect(() => {
    const getAutomobileData = async () => {
      const autoResponse = await fetch(
        "http://localhost:8100/api/automobiles/"
      );
      const automobileData = await autoResponse.json();
      setModels(automobileData.autos);
    };

    getAutomobileData();
  }, []);
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Manufacturer</th>
          <th>Year</th>
          <th>Model Name</th>
          <th>Color</th>
          <th>VIN</th>
          <th>Picture</th>
        </tr>
      </thead>
      <tbody>
        {models.map((model) => {
          return (
            <tr key={model.vin}>
              <td>{model.model.manufacturer.name}</td>
              <td>{model.year}</td>
              <td>{model.model.name}</td>
              <td>{model.color}</td>
              <td>{model.vin}</td>
              <td>
                <img src={model.model.picture_url} alt="car" height="110" />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default AutomobileList;
