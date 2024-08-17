import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import 'primeicons/primeicons.css';
import StoreLayout from "./StoreLayout";
import Store from "./store/Store";
import CarDetails from "./store/CarDetails";
import Home from "./store/Home";
import AdminLayout from "./AdminLayout";
import Login from "./admin/Login";
import CarAdd from "./admin/CarAdd";
import Dashboard from "./admin/Dashboard";
import OrederManage from "./admin/OrederManage"
import { useContext } from "react";
import { AppContext } from "./AppContext";
import BrandManage from "./admin/BrandManage";
import Checkout from "./store/Checkout";
import Partner from "./store/Partner";
function App() {
  const { adminState, tokenState } = useContext(AppContext)
  return (
    <Router>
      <Switch>
        {/* LOGIN */}
        <Route path="/login">
          <Login></Login>
        </Route>
        {/* ADMIN */}
        <Route path="/Admin">
          {adminState && tokenState ?
            (<AdminLayout>
              <Route path="/Admin/Dashboard">
                <Dashboard></Dashboard>
              </Route>
              <Route path="/Admin/Car/View">
                <Store pathParent="/Store/Car/"></Store>
              </Route>
              <Route path="/Admin/Car/Add">
                <CarAdd></CarAdd>
              </Route>
              <Route path="/Admin/Car/:id">
              </Route>
              <Route path="/Admin/Brand">
                <BrandManage></BrandManage>
              </Route>
              <Route path="/Admin/Orders">
                <OrederManage></OrederManage>
              </Route>
            </AdminLayout>
            ) : (<Redirect to="/login" />)}
        </Route>
        {/* STORE */}
        <StoreLayout>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route exact path='/Store'>
            <Store></Store>
          </Route>
          <Route path="/Store/Brand/:id">
            <Store></Store>
          </Route>
          <Route path="/checkout/:orderID">
            <Checkout></Checkout>
          </Route>
          <Route path="/Store/Car/:id">
            <CarDetails></CarDetails>
          </Route>
          <Route path="/Partner">
            <Partner></Partner>
          </Route>
        </StoreLayout>
      </Switch>
    </Router >
  );
}

export default App;
