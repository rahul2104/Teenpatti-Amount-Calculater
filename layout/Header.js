import {useState, useEffect, useReducer} from 'react';
// import { Logo } from '../public/Svg';
import { Navbar, Nav, Link } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router'
import {manageSession,sessionSignOut} from "../api/firebaseApp";
// import Image from "next/image";

const Header = () => {
  let [bgcolor, setBgcolor] = useState(1);
  let [user,setUser]=useState({});

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
    manageSession()
        .then(function (user) {
          if (!user) {
            router.push('/auth/login', undefined, {shallow: true})
          } else {
            console.log("user", user);
            setUser(user);
          }
        })
  }, [])

  const handleLogout = () => {
    let res = sessionSignOut();
    if(res){
      router.push('/auth/login', undefined, { shallow: true })
    }
  }


  return (
    <div className={`components_navbar ${bgcolor == 1 ? 'bg1' : 'bg2'}`}>
      {/*{console.log("header")}*/}
      <Navbar collapseOnSelect expand="md">
        <div className="container navbar-container">
          <Navbar.Brand href="#home">
            {/*<Logo />*/}
            {/*<Image src={"/images/logo.png"} alt={"Logo"} width={50} height={50}/>*/}
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
                  {/*<li className={router.pathname==="/profile/edit"?"active-link":""}>*/}
                  {/*  <a href="/profile/edit">My Profile</a>*/}
                  {/*  <div className="underline"></div>*/}
                  {/*</li>*/}
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
