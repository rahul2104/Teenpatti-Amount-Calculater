import React, {useEffect} from 'react';
import {Link} from 'react-bootstrap';
// import {MenuIcon} from '../SvgIcon';
// import {connect} from "react-redux";

const toggleMenuClass = (e) => {
    document.body.classList.toggle('nav_menu_open')
};
const removeMenuClass = () => {
    document.body.classList.remove('nav_menu_open')
}

const SideNav = (props) => {
    console.log("props",props)
    const logout =() =>{

    }

    useEffect( () => {
        document.body.classList.add('only---sidenav');
        document.body.classList.remove('menu_open')
        return () => {
            document.body.classList.remove('only---sidenav');
            document.body.classList.remove('menu_open')
        }
    }, [])

        return(
            <>
              <div className="sidenav menu-show-desktop" >
                      <span onClick={toggleMenuClass} className="menu_toogle_icon">
                        <span className="sidebar_tog_icon_open">
                            abcd
                            {/*<MenuIcon/>*/}
                        </span>
                        <span className="sidebar_tog_icon_close">
                            abcd
                            {/*<MenuIcon/>*/}
                        </span>
                    </span>
                     <ul>
                            <li>
                                   <Link  to={`/diary`} className={props?.match?.path==="/diary/:salonId"?"active":""} title="Calender">
                                          <span className="menu_icon">
                                          <svg viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 3h-1V2c0-.55-.45-1-1-1s-1 .45-1 1v1H7V2c0-.55-.45-1-1-1s-1 .45-1 1v1H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 18H5c-.55 0-1-.45-1-1V8h16v12c0 .55-.45 1-1 1z"/></svg>
                                          </span>
                                          <span className="sidenav_text">Diary</span>
                                   </Link>
                            </li>
                            <li>
                                   <Link to="/clients" className={props?.match?.path==="/clients"||props?.match?.path==="/clients/add"||props?.match?.path==="/clients/:id"?"active":""} title="Clients">
                                          <span className="menu_icon">
                                          <svg viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v2c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-2c0-2.66-5.33-4-8-4z"/></svg>
                                          </span>
                                          <span className="sidenav_text">Clients</span>
                                   </Link>
                            </li>



                            <li>
                                   <Link  to={`/services`} className={props?.match?.path==="/services"?"active":""} >
                                          <span className="menu_icon">
                                          <svg viewBox="0 0 24 24"><g fill="none"><path d="M0 0h24v24H0V0z"/><path d="M0 0h24v24H0V0z" opacity=".87"/></g><path d="M4 13c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm0 4c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm0-8c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm4 4h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1zm0 4h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1zM7 8c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1zm-3 5c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm0 4c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm0-8c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm4 4h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1zm0 4h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1zM7 8c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1z"/></svg>
                                          </span>
                                          <span className="sidenav_text">Services</span>
                                   </Link>
                            </li>

                     </ul>

              </div>

          </>

)}

// function mapStateToProps(state) {
//     return {
//         ...state
//     };
// }
//
// export default connect(mapStateToProps)(SideNav);
export default SideNav;
