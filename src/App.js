import Header from "./Header";
import Topics from "./components/Topics";
import Posts from "./components/Posts";
import Accounts from "./components/Accounts";
import {
  BrowserRouter,
  Route,
  Link,
  Switch,
  useHistory,
  Redirect,
} from "react-router-dom";
import {
  Grid,
  Label,
  Icon,
  Container,
  Segment,
  Menu,
  Card,
  List,
  Button,
  Table,
} from "semantic-ui-react";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <Switch>
          <Route path="/topics" component={Topics}></Route>
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
