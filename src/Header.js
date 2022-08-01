import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { auth } from "./utils/firebase";
import { useHistory } from "react-router-dom";
function Header() {
  // const user = auth.currentUser;
  const history = useHistory();
  const [activeItem, setActiveItem] = React.useState("");
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    auth.onAuthStateChanged((currUser) => {
      setUser(currUser);
    });
  }, []);

  function handleClick(e, { name }) {
    setActiveItem(name);
  }
  return (
    <Menu secondary pointing widths={4}>
      <Menu.Item
        as={Link}
        to="/accounts"
        name="accounts"
        onClick={handleClick}
        active={activeItem === "accounts"}
      >
        {/* <Icon name="user" disabled={activeItem !== "home"} /> */}
        帳戶
      </Menu.Item>
      <Menu.Item
        as={Link}
        to="/balances"
        name="balances"
        onClick={handleClick}
        active={activeItem === "balances"}
      >
        收支
      </Menu.Item>

      <Menu.Menu position="right">
        {user ? (
          <Menu.Item
            name="logout"
            onClick={() => {
              auth.signOut().then(() => {
                history.push("/login");
              });
            }}
          />
        ) : (
          <Menu.Item
            name="login"
            as={Link}
            to="/login"
            onClick={handleClick}
           
          >
            Login
          </Menu.Item>
        )}
      </Menu.Menu>
    </Menu>
  );
}

export default Header;
