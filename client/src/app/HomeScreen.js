import React from "react";
import plugins from "../plugins";
import { Page, Panel } from "rsi-react-web-components";

import KioskMasterTemplate from "../templates/KioskMasterTemplate";
import lguLogo from "../assets/images/zamboanga.png";

const Plugin = ({ plugin, onSelect }) => {
  return (
    <div style={styles.plugin}>
      <img className="module-logo" src={plugin.logo} onClick={() => onSelect(plugin)} />
      <label>{plugin.title}</label>
    </div>
  );
};

const HomeScreen = (props) => {
  const onSelectPlugin = (plugin) => {
    props.history.push("/plugin", {pluginName: plugin.name});
  };

  return (
    <KioskMasterTemplate logo={lguLogo} partner={{ name: "Zamboanga City" }}>
     
        <h1 className="header-menu">Main Menu</h1>
        {plugins.map((plugin) => (
          <Plugin
            key={plugin.name}
            {...props}
            plugin={plugin}
            onSelect={onSelectPlugin}
          />
        ))}
      
    </KioskMasterTemplate>
  );
};

const styles = {
  plugin: {
    display: "flex",
    flexDirection: "column",
    width: 150,
    justifyContent: "center",
    alignItems: "center",
  },
};

export default HomeScreen;
