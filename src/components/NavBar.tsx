import React from "react";
import Navbar from "react-bootstrap/Navbar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Button from "react-bootstrap/Button";

export interface NavBarProps {
  isOnline: boolean;
}

const NavBar = (props: NavBarProps) => {
  const { isOnline } = props;

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Navbar.Brand href="">Bitcoin account generator</Navbar.Brand>
      <div>
        <OverlayTrigger
          trigger={["hover", "focus"]}
          key="bottom"
          placement="bottom"
          overlay={
            <Popover id={`popover`}>
              <Popover.Title as="h3">
                {isOnline ? 'Generator is "HOT"' : 'Generator is not "HOT"'}
              </Popover.Title>
              <Popover.Content>
                {isOnline ? (
                  <ul>
                    <li>Disconnect Internet to prevent infomation leakage</li>
                    <li>
                      Download this website and open it in incognito mode
                      locally
                    </li>
                  </ul>
                ) : (
                  <ul>
                    <li>Write down all infomation on a paper before exit</li>
                    <li>Open in incognito mode locally</li>
                  </ul>
                )}
              </Popover.Content>
            </Popover>
          }
        >
          <Button variant={isOnline ? "danger" : "success"}>
            {isOnline
              ? "Detected Internet connection"
              : "Isolated from Internet"}
          </Button>
        </OverlayTrigger>
      </div>
    </Navbar>
  );
};

export default NavBar;
