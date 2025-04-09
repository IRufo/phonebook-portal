import React from "react";
import { Grid, GridItem, Text, Button } from "@chakra-ui/react";
import Sidebar from '../components/ui/sidebar'
import TopNavbar from '../components/ui/topNavbar'
import { SlUser, SlLogout } from "react-icons/sl";
import Popup from "../components/ui/popup";
import { useState } from "react";
import Users from "./users/Users";
import { deleteCookie } from "../utils/cacheCookie";
import { useNavigate } from "react-router-dom";
const AdminDashboard = () => {

  const navigate = useNavigate();
  
  const [showLogoutPopup, setShowLogoutPopup] = useState<boolean>(false);

  const menus = [
      {
          text: "Users",
          icon: SlUser,
          onClick: () => alert('redirect to users list')
      },
      {
          text: "Log out",
          icon: SlLogout,
          onClick: () => setShowLogoutPopup(true)
      },
  ];
  

  return (
    <>
    <Grid
      h="100vh"
      minWidth="1000px"
      templateRows="60px auto"
      templateColumns="250px auto"
    >
      <GridItem rowSpan={1} colSpan={2}>
        <TopNavbar />
      </GridItem>

      <GridItem>
        <Sidebar menus={menus}/>
      </GridItem>

      <GridItem >
        <Users />
      </GridItem>
    </Grid>

    <Popup
      title={"Log out"}
      content={<Text>Are you sure want to log out?</Text>}
      confirm={<Button onClick={() =>{ 
        deleteCookie('token')
        setShowLogoutPopup(false)
        navigate('/login')
      }}>Logout</Button>}
      open={showLogoutPopup}
      setOpen={setShowLogoutPopup}
    ></Popup>
    </>
  );
};

export default AdminDashboard;
