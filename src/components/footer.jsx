import React from "react";
const Footer = () => {
  return (
    <footer className="footer page-footer font-small blue">
      <div className="footer-text footer-copyright text-center ">
        {" "}
        <a
          className="footer-link"
          href="https://www.linkedin.com/in/amr-gamal-11901a33/"
        >
          {" "}
          © Developed by Amr Gamal
        </a>
        <br />
        <a
          className="footer-link"
          href="https://github.com/amrgamal91/Top-Movies"
        >
          <i className="fa fa-github" aria-hidden="true" /> View code
        </a>
      </div>
    </footer>
  );
};

export default Footer;
