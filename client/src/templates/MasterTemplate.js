import React from "react";
import "./MasterTemplate.css";

const getChildren = ({ children }) => {
  const comps = {
    header: null,
    left: null,
    center: null,
    right: null,
    footer: null,
  };
  React.Children.forEach(children, (child) => {
    if (child) {
      let target = child.props.target || "center";
      const childType = typeof child.type === "string" ? child.type : child.type.name;
      if (/header/i.test(childType)) target = "header";
      else if (/footer/i.test(childType)) target = "footer";
      if (!comps[target]) comps[target] = [];
      comps[target].push(child);
    }
  });
  return comps;
};

const MasterTemplate = (props) => {
  const { header, left, center, right, footer } = getChildren(props);
  return (
    <div className="template">
      <div className="row header">{header}</div>
      <div className="content">
        <div className="panel">
          <div className="main">{center} </div>
        </div>
      </div>
      <div className="row footer">{footer}</div>
    </div>
  );
};

export default MasterTemplate;
