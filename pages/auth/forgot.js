import { LoginLogo } from '../../public/Svg';
import React, { useReducer } from 'react';
import Layout from '../../layout/main';
import {authService} from "../../services/authService";
import Link from "next/link";
import {toast} from "react-nextjs-toast";

var mailValidation =
  /(([a-zA-Z0-9\-?\.?]+)@(([a-zA-Z0-9\-_]+\.)+)([a-z]{2,3}))+$/;
export const validateEmail = (e) => new RegExp(mailValidation).test(e);

export default function Forgot() {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: '',
      emailError: '',
    }
  );
  const handleValidation = () => {
    let validate = true;
    let { email } = state;

    if (email === '' || email === undefined) {
      validate = false;
      setState({
        emailError: 'Please enter your email address.',
      });
    } else if (!validateEmail(String(email.toLowerCase()))) {
      validate = false;
      setState({ emailError: 'Please enter a valid email address.' });
    } else {
      setState({
        emailError: '',
      });
    }

    return validate;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (handleValidation()) {
      //alert('submit');
      //alert('login');
      let params = {
        email: state.email,
      }
      console.log("params", params);
      let data = await authService.forgot(params);
      console.log("data", data);
      if (data.statusCode === 1) {
        setState({
          email: '',
          emailError: '',
        })
        toast.notify(data.responseData.message,{"duration":3,type:"success",title:"Success!!"})
      } else {
        toast.notify(data.error.responseMessage,{"duration":3,type:"error",title:"Error!!"})
      }
    }
  };

  const handleOnChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      [e.target.name + 'Error']: '',
    });
  };

  return (
    <Layout notFooter={true} notHeader={true}>

      <div className="login-body ">
        <div id="container">
          <div id="section-wrapper">
            <section>
              <span className="auth_logo">
                {/*<LoginLogo />*/}
              </span>
            </section>
            <div className="auth_form mt-5">
              {/*<form>*/}
                <div className="auth_head margin-b">
                  <h3>Forgot Password</h3>
                  <p>
                    Enter your email
                  </p>
                </div>
                <div
                  className={`form-group ${state.emailError ? 'error' : ''}`}
                >
                  <input
                    maxLength="70"
                    className="form-control"
                    type="text"
                    name="email"
                    placeholder="Email Address"
                    value={state.email}
                    onChange={handleOnChange}
                  />

                  {state.emailError ? (
                    <small className="small">{state.emailError}</small>
                  ) : (
                    ''
                  )}
                </div>

                <button className="auth_btn mb-3 pb-1" onClick={handleSubmit}>
                  SUBMIT
                </button>
                <Link href="/auth/login" className="forget-pass">
                  Back to Login
                </Link>
              {/*</form>*/}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
