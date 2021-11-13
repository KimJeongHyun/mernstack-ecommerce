import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import Auth from './hoc/auth'
import LandingPage from './component/LandingPage/LandingPage'
import NewLandingPage from "./component/LandingPage/NewLandingPage"
import AdminLandingPage from "./component/LandingPage/AdminLandingPage"
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
import ProductDetail from "./component/Store/ProductDetail";
import ProductOrder from "./component/Store/ProductOrder"
import QnAPost from "./component/Store/QnAPost";
import QnAView from "./component/Store/QnAView";
import ReviewPost from "./component/Store/ReviewPost"
import ReviewView from "./component/Store/ReviewView";
import NoticePost from "./component/RowbarMenu/Notice/NoticePost";
import NoticeView from "./component/RowbarMenu/Notice/NoticeView";
import Help from "./component/RowbarMenu/Help/Help";
import NotFound from "./component/ErrorPage/NotFound";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={NewLandingPage}/>
        <Route path='/Manage' component={Auth(AdminLandingPage,true)}/>
        <Route path='/Main' component={LandingPage}/>
        <Route path="/About" component={About}/>
        <Route path="/Store/:idx" component={Store}/>
        <Route path="/Login" component={Login}/>
        <Route path="/Join" component={Join}/>
        <Route path="/CheckPw" component={CheckPw}/>
        <Route path="/MyPage" component={Auth(MyPage,true)}/>
        <Route path="/Cart" component={Auth(Cart,true)} />
        <Route path="/Notice" component={Notice}/>
        <Route path="/QnA" component={QnA}/>
        <Route path="/Review" component={Review}/>
        <Route path="/ProductDetail/:idx" component={ProductDetail}/>
        <Route path="/ProductOrder/" component={Auth(ProductOrder,true)}/>
        <Route path="/QnAPost/" component={Auth(QnAPost,true)}/>
        <Route path="/ReviewPost/" component={Auth(ReviewPost,true)}/>
        <Route path="/QnAOne/:idx/:_id" component={QnAView}/>
        <Route path="/ReviewOne/:idx/:_id" component={ReviewView}/>
        <Route path="/NoticePost/" component={Auth(NoticePost,true)}/>
        <Route path="/NoticeOne/:idx/:_id" component={NoticeView}/>
        <Route path="/HelpDesk" component={Auth(Help,true)}/>
        <Route component={NotFound}/>
      </Switch>
    </Router>
  );
}

export default App;
