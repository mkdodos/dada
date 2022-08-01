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
import Login from "./components/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <Switch>
          <Route path="/accounts" component={Accounts}></Route>
          <Route path="/balances" component={Balances}></Route>
          <Route path="/login" component={Login}></Route>
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
