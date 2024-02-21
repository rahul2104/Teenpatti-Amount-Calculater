import {useState, useEffect, useReducer} from 'react';
import { Logo } from '../public/Svg';

import { Navbar, Nav, Link } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router'

import {toast} from "react-nextjs-toast";

const Header = () => {
  let [bgcolor, setBgcolor] = useState(1);
  const [state, setState] = useReducer(
      (state, newState) => ({ ...state, ...newState }),
      {
        userDetails: {},
        mediaPath:'',
      }
  );
  const router = useRouter()
  const listenScrollEvent = (e) => {
    if (window.scrollY > 40) {
      setBgcolor(2);
    } else {
      setBgcolor(1);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);
  }, []);

  useEffect(() => {
    let accessToken = sessionStorage.getItem('accessToken')
    if (!accessToken) {
      router.push('/auth/login', undefined, { shallow: true })
    }else{

    }
  }, [])

  const handleLogout = () => {
    sessionStorage.removeItem('accessToken');
    localStorage.clear();
    router.push('/auth/login', undefined, { shallow: true })
  }


  return (
    <div className={`components_navbar ${bgcolor == 1 ? 'bg1' : 'bg2'}`}>
      {/*{console.log("header")}*/}
      <Navbar collapseOnSelect expand="md">
        <div className="container navbar-container">
          <Navbar.Brand href="#home">
            <Logo />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <div className="navbar-container">
                <ul>
                  <li className={router.pathname==="/dashboard"?"active-link":""}>
                    <a href="/dashboard">Dashboard</a>
                    <div className="underline"></div>
                  </li>
                  <li className={router.pathname==="/profile/edit"?"active-link":""}>
                    <a href="/profile/edit">My Profile</a>
                    <div className="underline"></div>
                  </li>
                  {state?.userType&&state?.userType===3||state?.userType===2?
                  <li className={router.pathname==="/user/list"?"active-link":""}>
                    <a href="/user/list">User List</a>
                    <div className="underline"></div>
                  </li>
                      :""}
                  <li className={router.pathname==="/settings/changepassword"?"active-link":""}>
                    <a href="/settings/changepassword">Change Password</a>
                    <div className="underline"></div>
                  </li>
                  {/*<li>*/}
                  {/*  <a href="#">Settings</a>*/}
                  {/*  <div className="underline"></div>*/}
                  {/*</li>*/}
                  <li>
                    <button className="logout_btn" onClick={e=>handleLogout(e)}>LOGOUT</button>
                  </li>
                </ul>
              </div>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default Header;
