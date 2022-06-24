import React, { useState, useEffect } from "react";

function VehicleList() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const getVehicleModelData = async () => {
      const vehicleModelResponse = await fetch(
        "http://localhost:8100/api/models/"
      );
      const vehicleModelData = await vehicleModelResponse.json();
      setVehicles(vehicleModelData.models);
    };

    getVehicleModelData();
  }, []);

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Manufacturer</th>
          <th>Model</th>
          <th>Picture</th>
        </tr>
      </thead>
      <tbody>
        {vehicles.map((vehicle) => {
          return (
            <tr key={vehicle.id}>
              <td>{vehicle.manufacturer.name}</td>
              <td>{vehicle.name}</td>
              <td>
                <img src={vehicle.picture_url} alt="car" height="110" />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default VehicleList;
