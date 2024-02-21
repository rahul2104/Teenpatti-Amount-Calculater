import '../styles/globals.css';
import ReactGA from 'react-ga4';
import {useEffect} from "react";
// ReactGA.initialize('');

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    // window is accessible here.
    // console.log("window.innerHeight", window.innerHeight);
    //ReactGA.pageview(window.location.pathname + window.location.search);
    //ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
