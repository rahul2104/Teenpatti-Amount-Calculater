import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Fragment } from 'react';
import Footer from './Footer';
import Header from './Header';
import {ToastContainer} from "react-toastify";
import getConfig from 'next/config'
import SideNav from "./SideNav";

const {publicRuntimeConfig,serverRuntimeConfig} = getConfig()
const {BASE_PATH,AUTHORISATION} = publicRuntimeConfig
// console.log("publicRuntimeConfig",publicRuntimeConfig);
export default function Layout ({title = "Teen Patti", notFooter=false , notHeader, isContact=false, isAppPage,children }){
  // console.log(notFooter , notHeader,'notFooter , notHeader');
  return (
    <Fragment>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
          <link rel="icon" href={BASE_PATH+`/favicon.ico`} />
          <link rel="manifest" href={BASE_PATH+"/manifest.json"} />
          <meta name="theme-color" content="#d9fff2" />
          <meta name="description" content="Teen Patti amount calculater"/>
          <meta name="keywords" content="teen patti"/>
          <meta name="author" content="Rahul"/>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"  integrity='sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN' crossOrigin='anonymous'/>
      </Head>
      {notHeader ? '' : <Header isAppPage={isAppPage} />}

        {/** Add toast component **/}
      <ToastContainer align={"right"} position={"bottom"}/>
        {/*<SideNav />*/}
      <main>{children}</main>
      {notFooter ? '' : <Footer isAppPage={isAppPage} />}
    </Fragment>
  );
};



