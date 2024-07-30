import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import 'primeicons/primeicons.css';
import StoreLayout from "./StoreLayout";
import Store from "./store/Store";
import CarDetails from "./store/CarDetails";
import Home from "./store/Home";
import AdminLayout from "./AdminLayout";
import Login from "./admin/Login";
import CarsForm from "./admin/CarsForm";
import Dashboard from "./admin/Dashboard";
import { useContext } from "react";
import { AppContext } from "./AppContext";
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
                <Store pathParent="/Admin/Car/Edit/"></Store>
              </Route>
              <Route path="/Admin/Car/Add">
                <CarsForm></CarsForm>
              </Route>
              <Route path="/Admin/Car/Edit/:id">
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
          <Route path="/Store/Car/:id">
            <CarDetails></CarDetails>
          </Route>
        </StoreLayout>
      </Switch>
    </Router >
  );
}

export default App;
