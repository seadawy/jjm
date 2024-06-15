import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'primeicons/primeicons.css';
import StoreLayout from "./StoreLayout";
import Store from "./Store";
function App() {
  return (
    <Router>
      <Switch>
        <StoreLayout>
          <Route path="/Home">
            <Store></Store>
          </Route>
          <Route path='/Store'>
            <Store></Store>
          </Route>
        </StoreLayout>
      </Switch>
    </Router>
  );
}

export default App;
