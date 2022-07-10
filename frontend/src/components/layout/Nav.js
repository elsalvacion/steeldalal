import { Badge, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { navLink } from "../../constants/links";
import "./Nav.css";
import Search from "./Search";
import {
  Menu,
  Search as SearchIcon,
  AccountCircle,
  GridView,
  Logout,
  ShoppingCart,
  Forum,
} from "@mui/icons-material";
import SideDrawer from "./SideDrawer";
import MobileSearch from "./MobileSearch";
import { HashLink } from "react-router-hash-link";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../actions/authAction";
import { socket } from "../../utils/connectSocket";

const Nav = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [unread, setUnread] = useState(0);

  const history = useHistory();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { cart } = useSelector((state) => state.getCart);
  useEffect(() => {
    if (userInfo) {
      socket.emit("join_room", userInfo.id);
      socket.emit("load_unread_messages", userInfo.id);
      socket.on("message_marked_as_read", () =>
        socket.emit("load_unread_messages", userInfo.id)
      );
      socket.on("unread_messages_loaded", (res) => {
        if (res.userId === userInfo.id) {
          setUnread(res.unread);
        }
      });
      socket.on("message_sent", () => {
        socket.emit("load_unread_messages", userInfo.id);
      });
    }
  }, [userInfo]);
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
              <Badge
                badgeContent={cart ? Object.keys(cart.specs).length : 0}
                color="error"
              >
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
              <>
                <IconButton
                  onClick={() => history.push("/dm")}
                  title="DMS"
                  color="primary"
                >
                  <Badge badgeContent={unread} color="error">
                    <Forum />
                  </Badge>
                </IconButton>
                <IconButton
                  title="logout"
                  onClick={() => dispatch(logoutUser())}
                  color="primary"
                >
                  <Logout />
                </IconButton>
              </>
            )}
          </div>
        </div>
        <div className="bottomNavContent">
          {/* nav links */}
          <div className="navLinks">
            {navLink.map((link) =>
              link.path.includes("#") === -1 ? (
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
            onClick={() => {
              history.push("/search");
              setOpenSearch(!openSearch);
            }}
          >
            <SearchIcon />
          </IconButton>
          {userInfo && (
            <>
              <IconButton
                onClick={() => history.push("/dm")}
                title="DMS"
                color="primary"
              >
                <Badge badgeContent={unread} color="error">
                  <Forum />
                </Badge>
              </IconButton>
              <IconButton
                title="logout"
                onClick={() => dispatch(logoutUser())}
                color="primary"
              >
                <Logout />
              </IconButton>
            </>
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
