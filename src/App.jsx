import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'primeicons/primeicons.css';
import StoreLayout from "./StoreLayout";
import Store from "./store/Store";
import CarDetails from "./store/CarDetails";
import Home from "./store/Home";
import AdminLayout from "./AdminLayout";
import Login from "./admin/Login";
import CarsForm from "./admin/CarsForm";
function App() {
  return (
    <Router>
      <Switch>
        {/* LOGIN */}
        <Route path="/login">
          <Login></Login>
        </Route>
        {/* ADMIN */}
        <Route path="/Admin">
          <AdminLayout>
            <Route path="/Admin/Dashboard">
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
    </Router>
  );
}

export default App;
