import React from "react";
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="bg-dark p-4 row m-0">
      <div className="d-flex container  align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <p className="mb-0 text-white mr-3">Connect with me:</p>
          <div className="d-flex align-items-center">
            <a href="https://github.com/mamunur13525" target="blank">
              <BsGithub className="icon_social" />
            </a>
            <a href="https://www.linkedin.com/in/mamunahmed13525/" target="blank">
              <BsLinkedin className="icon_social" />
            </a>
            <a href="https://github.com/mamunur13525" target="blank">
              <BsTwitter className="icon_social" />
            </a>
          </div>
        </div>
        <p className="text-center mb-0 text-white font-weight-bold">
          &copy;mamun.dev
        </p>
      </div>
    </div>
  );
};

export default Footer;
