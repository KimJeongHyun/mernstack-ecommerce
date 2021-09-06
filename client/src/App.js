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
import Login from "./component/RowbarMenu/Login/Login";
import Join from "./component/RowbarMenu/Join/Join";
import CheckPw from "./component/CheckPw/CheckPw";
import Cart from "./component/RowbarMenu/Cart/Cart";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route path="/About" component={About}/>
        <Route path="/Store" component={Store}/>
        <Route path="/Login" component={Login}/>
        <Route path="/Join" component={Join}/>
        <Route path="/CheckPw" component={CheckPw}/>
        <Route path="/Cart" component={Cart}/>
      </Switch>
    </Router>
  );
}

export default App;
