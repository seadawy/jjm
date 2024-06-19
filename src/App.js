import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'primeicons/primeicons.css';
import StoreLayout from "./StoreLayout";
import Store from "./store/Store";
import CarDetails from "./store/CarDetails";
import Home from "./store/Home";

function App() {
  return (
    <Router>
      <Switch>
        <StoreLayout>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route exact path='/Store'>
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
