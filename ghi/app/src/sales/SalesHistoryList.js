import React, { useEffect, useState } from "react";

function SalesHistoryList(props) {
  const [salespersons, setSalesPersons] = useState([]);
  const [salesRecord, setSalesRecord] = useState();
  const [salesData, setSalesData] = useState([]);
  console.log("salesData:", salesData);
  const handleChange = (event) => {
    setSalesRecord(event.target.value);
  };

  useEffect(() => {
    const getSalesData = async () => {
      const salesRecordResponse = await fetch(
        "http://localhost:8090/api/sales/"
      );
      const salespersonsdata = await salesRecordResponse.json();
      setSalesPersons(salespersonsdata.sales);
      setSalesData(salespersonsdata.sales);
    };
    getSalesData();
  }, []);

  useEffect(() => {
    const getSalesData = () => {
      if (!salesRecord) {
        setSalesData(salespersons);
        return;
      }

      const salesPersonData = salespersons.filter((salesperson) => {
        const salesperson1 = salesperson.sales_person.emp_no;
        return salesperson1 === Number(salesRecord);
      });
      setSalesData(salesPersonData);
    };
    getSalesData();
  }, [salesRecord, salespersons]);

  return (
    <>
      <h1>Sales Person History</h1>
      <select
        onChange={handleChange}
        value={salesRecord}
        className="form-select"
        name="salesPerson"
        id="salesPerson"
        aria-label="Default select example"
      >
        <option>Select a Salesperson</option>
        {props.salesreps.map((salesrep) => {
          return (
            <option
              key={salesrep.employee_number}
              value={salesrep.employee_number}
            >
              {salesrep.name}
            </option>
          );
        })}
      </select>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Sales person</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Sale Price</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((salesperson) => {
            return (
              <tr key={salesperson.automobile}>
                <td>{salesperson.sales_person.name}</td>
                <td>{salesperson.customer}</td>
                <td>{salesperson.automobile}</td>
                <td>${salesperson.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default SalesHistoryList;
