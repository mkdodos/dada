import React from "react";
import { Menu, Icon, Image, Dropdown } from "semantic-ui-react";
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
    <Menu secondary pointing widths={5}>
      <Menu.Item
        as={Link}
        to="/balances"
        name="balances"
        onClick={handleClick}
        active={activeItem === "balances"}
      >
        收支
      </Menu.Item>

      <Menu.Item
        as={Link}
        to="/query-balances"
        name="query-balances"
        onClick={handleClick}
        active={activeItem === "query-balances"}
      >
        明細
      </Menu.Item>

      <Menu.Item
        as={Link}
        to="/dashboard"
        name="dashboard"
        onClick={handleClick}
        active={activeItem === "dashboard"}
      >
        統計
      </Menu.Item>

      <Dropdown item text="設定">
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/user">
            使用者
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/accounts">
            帳戶
          </Dropdown.Item>
          <Dropdown.Item  as={Link} to="/cates">類別</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

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
            <Icon name="sign-out" />
            {user.displayName}
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
