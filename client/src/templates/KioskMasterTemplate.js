import React from "react";
import MasterTemplate from "../templates/MasterTemplate";
import { Panel, Page } from "rsi-react-web-components";
import etracsLogo from "../assets/images/etracs.png";

const Header = (props) => {
  return (
    <div style={styles.header}>
      <Panel style={styles.headerContainer} >
        <img style={styles.logo} src={props.logo} />
        <div>
          <div style={styles.title}>Welcome to {props.partner.name}</div>
          <div style={styles.title}>Transaction Kiosk</div>
        </div>
      </Panel>
    </div>
  );
};

const Footer = (props) => {
  return (
    <div target="footer" style={styles.footer}>
      <img style={styles.etracsLogo} src={etracsLogo} />
    </div>
  );
};

const KioskMasterTemplate = ({ children, ...rest }) => {
  return (
    <MasterTemplate>
      <Header {...rest} />
      <Page>
        {children}
      </Page>
      <Footer />
    </MasterTemplate>
  );
};

const styles = {
  header: {
    height: "50",
    backgroundColor: "#e2f7fd",
    padding: "8px 8px",
    paddingLeft: "50px",
    borderBottom: "3px solid #2c3e50"
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop:"120px"
  },
  logo: {
    width: 90,
    height: 80,
    marginLeft: 10,
    marginRight: 10,
  },
  etracsLogo: {
    width: 150,
  },
  title: {
    fontSize: 28,
    color: "#0276aa",
  },
  footer: {
    padding: "15px",
    backgroundColor: "#ecf0f1",
    borderTop: "3px solid #2c3e50",
    textAlign: "center",
  },
  footerText: {
    fontSize: "14px",
    color: "#4d4d4d",
  },
};

export default KioskMasterTemplate;
