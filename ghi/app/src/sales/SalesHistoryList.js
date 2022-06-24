import React, { useEffect, useState } from "react";

function SalesHistoryList(props) {
  const [salespersons, setSalesPersons] = useState([]);
  const [salesRecord, setSalesRecord] = useState("Any"); // established a default of "Any"
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

    const CenteredTd = ({ children}) => <td className="align-middle">{children}</td>

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
        <option disabled value="Any">Select A Salesperson</option>   {/* FIlters "Any" not allowing you to reselect 'Select A Salesperson'  */}
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
          {salesData
          .filter(sale => (sale.emp_no === Number(salesRecord)) || salesRecord==="Any")
          .map((salesperson) => {
            return (
              <tr key={salesperson.id}>
                <CenteredTd>{salesperson.sales_person}</CenteredTd>
                <CenteredTd>{salesperson.customer}</CenteredTd>
                <CenteredTd>{salesperson.vin}</CenteredTd>
                <CenteredTd>${salesperson.price}</CenteredTd>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default SalesHistoryList;
