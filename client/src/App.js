import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  HashRouter
} from "react-router-dom"

import LandingPage from './component/LandingPage/LandingPage'
import About from './component/About/About'
import Store from "./component/Store/Store";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route path="/About" component={About}/>
        <Route path="/Store" component={Store}/>
      </Switch>
    </Router>
  );
}

export default App;
