import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesPersonForm from "./sales/SalesPersonForm";
import CustomerForm from "./sales/CustomerForm";
import SalesForm from "./sales/SalesForm";
import SalesList from "./sales/SalesList";
import SalesHistoryList from "./sales/SalesHistoryList";

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="salesperson">
            <Route index element={<SalesPersonForm />} />
          </Route>
          <Route path="customer">
            <Route path="" element={<CustomerForm />} />
          </Route>
          <Route path="sales">
            <Route path="" element={<SalesForm />} />
            <Route
              path="list"
              element={<SalesList salespersons={props.salespersons} />}
            />
            <Route
              path="history"
              element={
                <SalesHistoryList
                  salespersons={props.salespersons}
                  salesreps={props.salesreps}
                />
              }
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
