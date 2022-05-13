import React from "react";
import {
  SwipeableDrawer,
  Box
} from "@mui/material";
import { Link,
  //  useHistory
   } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
import { navLink } from "../../constants/links";
import './SideDrawer.css'


const SideDrawer = (props) => {
  // const history = useHistory();

  // const dispatch = useDispatch();


  // const { userInfo } = useSelector((state) => state.userLogin);
  return (
    <SwipeableDrawer
      anchor="left"
      variant='temporary'
      open={props.openSideNav}
      onClose={props.onCloseHandler}
    >
      <Box
      sx={{
    width:  250,
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 3px'    
     }}
      role="presentation">
         {
                navLink.map(link => <Link className='mobileNavLink' key={link.title} to={link.path}>{link.title}</Link>)
            }
      </Box>
    </SwipeableDrawer>
  );
};

export default SideDrawer;