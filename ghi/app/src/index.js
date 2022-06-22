import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

async function loadDealership() {
  const salesRecordResponse = await fetch("http://localhost:8090/api/sales/");
  const salesrepResponse = await fetch(
    "http://localhost:8090/api/salespersons/"
  );

  if (salesRecordResponse.ok && salesrepResponse.ok) {
    const salesRecordData = await salesRecordResponse.json();
    const salesrepData = await salesrepResponse.json();

    root.render(
      <React.StrictMode>
        <App
          salespersons={salesRecordData.sales}
          salesreps={salesrepData.salespersons}
        />
      </React.StrictMode>
    );
  } else {
    console.error(salesRecordResponse || salesrepResponse);
  }
}
loadDealership();
