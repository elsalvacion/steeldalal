import React, { useState } from "react";
import LeftPanel from "./LeftPanel";
import "./PanelContainer.css";
import RightPanel from "./RightPanel";
import {
  Inventory,
  People,
  ProductionQuantityLimits,
} from "@mui/icons-material";
const PanelContainer = () => {
  const adminLinks = [
    {
      id: "admin-orders",
      title: "Orders",
      icon: <Inventory sx={{ mr: 2 }} />,
    },
    {
      id: "admin-products",
      title: "Products",
      icon: <ProductionQuantityLimits sx={{ mr: 2 }} />,
    },
    {
      id: "admin-users",
      title: "Users",
      icon: <People sx={{ mr: 2 }} />,
    },
  ];
  const [current, setCurrent] = useState(adminLinks[0].id);
  return (
    <div className="panelMainContainer">
      <div className="panelLeft">
        <LeftPanel
          adminLinks={adminLinks}
          handleCurrent={(selectCurrent) => setCurrent(selectCurrent)}
        />
      </div>
      <div className="panelRight">
        <RightPanel current={current} />
      </div>
    </div>
  );
};

export default PanelContainer;
