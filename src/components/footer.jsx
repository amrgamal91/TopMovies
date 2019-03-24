import React from "react";
const Footer = () => {
  return (
    <footer className="footer page-footer font-small blue">
      <div className="footer-text footer-copyright text-center ">
        © Developed by :{" "}
        <a
          className="footer-link"
          href="https://www.linkedin.com/in/amr-gamal-11901a33/"
        >
          {" "}
          Amr Gamal
        </a>
        <br />
        <a
          className="footer-link"
          href="https://github.com/amrgamal91/Top-Movies"
        >
          {" "}
          View code on Github
        </a>
      </div>
    </footer>
  );
};

export default Footer;
