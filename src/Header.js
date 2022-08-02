import React from "react";
import { Menu, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { auth } from "./utils/firebase";
import { useHistory } from "react-router-dom";
import sea from "./images/avatar/large/matthew.png";
import girl from "./images/avatar/large/kristy.png";
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
    <Menu secondary pointing widths={5}>
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

      {user && (
        <Menu.Item
          as={Link}
          to="/user"
          name="user"
          onClick={handleClick}
          active={activeItem === "user"}
        >
          設定
        </Menu.Item>
      )}

      <Menu.Menu position="right">
        {user ? (
          <Menu.Item
            name=""
            onClick={() => {
              auth.signOut().then(() => {
                history.push("/login");
              });
            }}
          >
             
        <Icon name="sign-out"/>{user.displayName}
          </Menu.Item>
        ) : (
          <Menu.Item name="login" as={Link} to="/login" onClick={handleClick}>
            Login
          </Menu.Item>
        )}
      </Menu.Menu>
    </Menu>
  );
}

export default Header;
