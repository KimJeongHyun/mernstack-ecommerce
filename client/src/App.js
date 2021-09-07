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
import MyPage from "./component/RowbarMenu/MyPage/MyPage"
import Cart from "./component/RowbarMenu/Cart/Cart";
import Review from "./component/RowbarMenu/Review/Review"
import QnA from "./component/RowbarMenu/QnA/QnA"
import Notice from "./component/RowbarMenu/Notice/Notice"

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
        <Route path="/MyPage" component={MyPage}/>
        <Route path="/Cart" component={Cart}/>
        <Route path="/Notice" component={Notice}/>
        <Route path="/QnA" component={QnA}/>
        <Route path="/Review" component={Review}/>

      </Switch>
    </Router>
  );
}

export default App;
