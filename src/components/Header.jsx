import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Avatar, Row, Col, Button } from "antd";
import { DownOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import FillButton from "./FillButton";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is logged in by looking for user data in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const menu = (
    <Menu>
      <Menu.Item
        key="logout"
        onClick={() => {
          localStorage.removeItem("user");
          setIsLoggedIn(false);
          setUser(null);
        }}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="bg-background w-full">
      <Row justify="space-between" align="middle" className="p-4">
        {/* Left - Logo */}
        <Col xs={12} sm={8} md={6}>
          <Link to="/">
            <img
              src="src/assets/images/logo.png"
              alt="Logo"
              className="w-24 sm:w-28 md:w-36"
            />
          </Link>
        </Col>

        {/* Middle - Navigation */}
        <Col xs={0} sm={12} md={12} className="text-center"></Col>

        {/* Right - Login/Profile */}
        <Col xs={12} sm={4} md={6} className="text-right">
          <div className="flex justify-center items-center gap-4">
            {isLoggedIn ? (
              <>
                <Dropdown overlay={menu} trigger={["click"]}>
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <Avatar
                      src={user?.avatarUrl || "src/assets/images/user.png"} // Sample avatar if no URL
                      alt={user?.name || "Avatar"}
                    />
                    <DownOutlined className="text-black" />
                  </div>
                </Dropdown>
              </>
            ) : (
              <Link to="/login">
                <FillButton onClick={() => console.log("Button clicked")}>
                  Sign in
                </FillButton>
              </Link>
            )}
          </div>
        </Col>
      </Row>
    </header>
  );
};

export default Header;
