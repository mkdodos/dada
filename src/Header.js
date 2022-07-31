import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
function Header() {
  const [activeItem, setActiveItem] = React.useState("");
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
      {/* <Menu.Item
        as={Link}
        to="/posts"
        name="posts"
        onClick={handleClick}
        active={activeItem === "posts"}
      >
        Posts
      </Menu.Item> */}
      <Menu.Item
        name="settings"
        onClick={handleClick}
        active={activeItem === "settings"}
      >
        設定
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item name="logout" />
      </Menu.Menu>
    </Menu>
  );
}

export default Header;
