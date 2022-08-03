import Header from "./Header";
import Accounts from "./components/Accounts";
import {
  BrowserRouter,
  Route,
  Link,
  Switch,
  useHistory,
  Redirect,
} from "react-router-dom";
import Posts from "./components/Posts";
import Balances from "./components/Balances";
import QueryBalances from "./components/QueryBalances";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import User from "./components/User";
import { auth } from "./utils/firebase";
import React from "react";

function App() {
  const [user, setUser] = React.useState() || null;
  React.useEffect(() => {
    auth.onAuthStateChanged((currUser) => {
      setUser(currUser);
    });
  }, []);
 
  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <Switch>
          <Route path="/accounts">
            {/* 要有登入才能查看此頁,沒有登入時導向登入頁 */}
            {user ? <Accounts /> : <Redirect to="login" />}
          </Route>
          <Route path="/balances">            
             {/* <Balances />  */}
            {user ? <Balances /> : <Redirect to="login" />}
          </Route>
          <Route path="/query-balances">     
          {user ? <QueryBalances /> : <Redirect to="login" />}       
             {/* <QueryBalances />  */}
            
          </Route>
          <Route path="/dashboard">    
          {user ? <Dashboard /> : <Redirect to="login" />}          
                
          </Route>
          {/* <Route path="/accounts" component={Accounts}></Route> */}
          {/* <Route path="/balances" component={Balances}></Route> */}
          <Route path="/login" component={Login}></Route>
          <Route path="/user" component={User}></Route>
          <Route path="/posts" component={Posts}></Route>
        </Switch>
      </BrowserRouter>
      {/* <Container>
        <Topics />
        <Posts />
      </Container> */}
    </>
  );
}
export default App;
