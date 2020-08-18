import React from "react";
import plugins from "../plugins";
import { Page } from "rsi-react-web-components";

import KioskMasterTemplate from "../templates/KioskMasterTemplate";
import lguLogo from "../assets/images/zamboanga.png";

const PluginScreen = (props) => {
  const pluginName = props.location.state.pluginName;
  const plugin = plugins.find((plugin) => plugin.name === pluginName);
  const Component = plugin.Component;

  console.log("component", Component)
  
  const partner = {id: "000", name: "Zamboanga City" }
  return (
    <KioskMasterTemplate logo={lguLogo} partner={partner}>
        <Component {...props} partner={partner} />
    </KioskMasterTemplate>
  );
};

export default PluginScreen;
