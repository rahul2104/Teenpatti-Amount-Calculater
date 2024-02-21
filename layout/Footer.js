// import { useState, useEffect } from "react";
import Link from 'next/link'

const Footer = (props) => {

  return (
    <>
      <footer>
          <p>Powered By:{" "}<Link className="pointer" href="" target="_blank"><span className="black">Teen Patti</span></Link></p>
      </footer>
    </>
  );
};

export default Footer;
