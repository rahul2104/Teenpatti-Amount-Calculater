import { LoginLogo, CloseEyeIcon, EyeIcon } from '../../public/Svg';
import React, { useEffect, useReducer } from 'react';
import Link from 'next/link';
import Layout from '../../layout/main';
import { useRouter } from 'next/router'
import {authService} from "../../services/authService";
import { toast, ToastContainer } from 'react-nextjs-toast';
import { firebase } from '../../api/firebaseApp';
import { uiConfig } from '../../config/firebaseAuthUI.config';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


var mailValidation =
  /(([a-zA-Z0-9\-?\.?]+)@(([a-zA-Z0-9\-_]+\.)+)([a-z]{2,3}))+$/;
export const validateEmail = (e) => new RegExp(mailValidation).test(e);

export function validatePassword(password) {
  let passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (password === '' || password === undefined || password === null) {
    return { status: false, error: 'Please enter valid password.' };
  } else if (password.length < 8) {
    return { status: true, error: '' };
    // return {
    //   status: false,
    //   error:
    //     'Password must have at least 8 characters with at least one Capital letter, at least one lower case letter, at least one number and at least one  special character.',
    // };
  } else if (!passwordRegex.test(password)) {
    return { status: true, error: '' };
    // return {
    //   status: false,
    //   error:
    //     'Password must have at least 8 characters with at least one Capital letter, at least one lower case letter, at least one number and at least one  special character.',
    // };
  } else {
    return { status: true, error: '' };
  }
}

export default function Login() {
  const authConfig = uiConfig(firebase);
  const router = useRouter()
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: '',
      password: '',
      nameError: '',
      emailError: '',
      showPassword: true,
    }
  );


  const handleOnChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      [e.target.name + 'Error']: '',
    });
  };

  const handleValidationLogin = () => {
    let validate = true;
    let { email, password } = state;

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

    if (!validatePassword(password).status) {
      validate = false;
      setState({
        passwordError: validatePassword(password).error,
      });
    } else {
      setState({
        passwordError: '',
      });
    }

    return validate;
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    if (handleValidationLogin()) {
        //alert('login');
        let params={
          email:state.email,
          password:state.password,
          deviceTypeID:"3",
          deviceID:"fdsfdsf",
          deviceToken:"asfsaf"
        }
      console.log("params",params);
      let data =  await authService.login(params);
        console.log("data",data);
      if (data.statusCode === 1) {
        sessionStorage.setItem('accessToken', data.responseData.accessToken);
        toast.notify(data.responseData.message,{"duration":3,type:"success",title:"Success!!"})
        router.push('/dashboard', undefined, { shallow: true })
      } else{
        toast.notify(data.error.responseMessage,{"duration":3,type:"error",title:"Error!!"})
      }
    }
  };

  useEffect(() => {
    let accessToken = sessionStorage.getItem('accessToken')
    if (accessToken) {
      router.push('/dashboard', undefined, { shallow: true })
    }
  }, [])
console.log("login process",process.env)
  return (
    <Layout notFooter={true} notHeader={true}>
      <div className="login-body ">
        <div id="container">
          <div id="section-wrapper">
            <section>
              <span className="auth_logo">
                {' '}
                {/*<LoginLogo />*/}
              </span>
            </section>
            <div className="auth_form  mt-4  ">
              {/*<form>*/}
                <div className="auth_head margin-b">
                  <h3>Sign in</h3>
                  <p>Enter your email & password</p>
                </div>
              <StyledFirebaseAuth uiConfig={authConfig} firebaseAuth={firebase.auth()} />
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
                    <small className="small red">{state.emailError}</small>
                  ) : (
                    ''
                  )}
                </div>
                <div
                  className={`input-w-icon form-group ${
                    state.passwordError ? 'error' : ''
                  }`}
                >
                  <input
                    type={state.showPassword ? 'password' : 'text'}
                    name="password"
                    value={state.password}
                    onChange={handleOnChange}
                    placeholder="Password"
                    className="form-control"
                    maxLength="70"
                  />

                  <span
                    className="rt-icon"
                    onClick={(e) =>
                      setState({
                        showPassword: !state.showPassword,
                      })
                    }
                  >
                    {state.showPassword ? <CloseEyeIcon /> : <EyeIcon />}
                  </span>
                  {state.passwordError ? (
                    <small className="small red">{state.passwordError}</small>
                  ) : (
                    ''
                  )}
                </div>

                <button
                  className="auth_btn margin-b padding-b"
                  onClick={loginSubmit}
                >
                  SIGN IN
                </button>
                <Link href="/auth/forgot" className="forget-pass">
                  Forgot password?
                </Link>
              {/*</form>*/}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}