import { Badge, IconButton } from "@mui/material";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { navLink } from "../../constants/links";
import "./Nav.css";
import Search from "./Search";
import {
  Menu,
  Search as SearchIcon,
  AccountCircle,
  ShoppingCart,
  GridView,
  Logout,
} from "@mui/icons-material";
import SideDrawer from "./SideDrawer";
import MobileSearch from "./MobileSearch";
import { HashLink } from "react-router-hash-link";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../actions/authAction";

const Nav = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { keys } = useSelector((state) => state.getCart);
  return (
    <>
      <nav className="navContainer">
        <div className="topNavContent">
          {/* logo */}
          <Link to="/" className="logo">
            <img src="/assets/logos/1.png" alt="steeldalal" />
          </Link>
          <div className="searchBarContainer">
            {/* search bar */}
            <Search />
          </div>
          <div className="topNavLinks">
            <IconButton
              onClick={() => history.push("/category")}
              title="categories"
              color="primary"
            >
              <GridView />
            </IconButton>
            <IconButton
              onClick={() => history.push("/cart")}
              title="cart"
              color="primary"
            >
              <Badge badgeContent={keys ? keys.length : 0} color="primary">
                <ShoppingCart />
              </Badge>
            </IconButton>
            <IconButton
              title="account"
              onClick={() => history.push(userInfo ? `/profile` : `/login`)}
              color="primary"
            >
              <AccountCircle />
            </IconButton>
            {userInfo && (
              <IconButton
                title="account"
                onClick={() => dispatch(logoutUser())}
                color="primary"
              >
                <Logout />
              </IconButton>
            )}
          </div>
        </div>
        <div className="bottomNavContent">
          {/* nav links */}
          <div className="navLinks">
            {navLink.map((link) =>
              link.title.includes("#") === -1 ? (
                <Link className="navLink" key={link.title} to={link.path}>
                  {link.title}
                </Link>
              ) : (
                <HashLink className="navLink" key={link.title} to={link.path}>
                  {link.title}
                </HashLink>
              )
            )}
          </div>
        </div>
      </nav>
      <nav className="mobileNav">
        <IconButton color="primary" onClick={() => setOpenDrawer(!openDrawer)}>
          <Menu />
        </IconButton>
        <Link to="/" className="mobileLogo">
          <img src="/assets/logos/2.png" alt="steeldalal" />
        </Link>
        <div>
          <IconButton
            color="primary"
            onClick={() => setOpenSearch(!openSearch)}
          >
            <SearchIcon />
          </IconButton>
          {userInfo && (
            <IconButton
              title="account"
              onClick={() => dispatch(logoutUser())}
              color="primary"
            >
              <Logout />
            </IconButton>
          )}
        </div>
      </nav>

      <SideDrawer
        openSideNav={openDrawer}
        onCloseHandler={() => setOpenDrawer(!openDrawer)}
      />
      {openSearch && (
        <MobileSearch handleClose={() => setOpenSearch(!openSearch)} />
      )}
    </>
  );
};

export default Nav;
