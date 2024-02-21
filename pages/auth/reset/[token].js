import { LoginLogo, CloseEyeIcon, EyeIcon } from '../../../public/Svg';
import React, {  useReducer } from 'react';
import Layout from '../../../layout/main';
import {authService} from "../../../services/authService";
import {useRouter} from "next/router";
import Link from "next/link";
import {toast} from "react-nextjs-toast";

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
export default function Reset() {
  const router = useRouter();
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      password: '',
      confirmPassword: '',
      passwordError: '',
      confirmPasswordError: '',
      showPassword: true,
      showConfirmPassword: true,
    }
  );

  const handleOnChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      [e.target.name + 'Error']: '',
    });
  };

  const handleValidation = () => {
    let validate = true;
    let { password, confirmPassword } = state;

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

    if (confirmPassword.trim() === '' || confirmPassword.trim() === undefined) {
      validate = false;
      setState({
        confirmPasswordError: 'Please enter confirm password.',
      });
    } else if (confirmPassword.trim() !== password.trim()) {
      validate = false;
      setState({
        confirmPasswordError: 'Password and confirm password does not match.',
      });
    } else {
      setState({
        confirmPasswordError: '',
      });
    }

    return validate;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      // alert('reset');
      const { token } = router.query
      console.log("token",token);

      let params = {
          token: token,
          password: state.password,
      }
      console.log("params", params);
      let data = await authService.reset(params);
      console.log("data", data);
      if (data.statusCode === 1) {
        setState({
          password: '',
          confirmPassword: '',
          passwordError: '',
          confirmPasswordError: '',
          showPassword: true,
          showConfirmPassword: true,
        });
        toast.notify(data.responseData.message,{"duration":3,type:"success",title:"Success!!"})
      } else {
        toast.notify(data.error.responseMessage,{"duration":3,type:"error",title:"Error!!"})
      }
    }
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
                  <h3>Reset Password</h3>
                  <p>Please enter you new password.</p>
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
                <div
                  className={`input-w-icon form-group ${
                    state.confirmPasswordError ? 'error' : ''
                  }`}
                >
                  <input
                    type={state.showConfirmPassword ? 'password' : 'text'}
                    name="confirmPassword"
                    value={state.confirmPassword}
                    onChange={handleOnChange}
                    placeholder="Confirm Password"
                    className="form-control"
                    maxLength="70"
                  />

                  <span
                    className="rt-icon"
                    onClick={(e) =>
                      setState({
                        showConfirmPassword: !state.showConfirmPassword,
                      })
                    }
                  >
                    {state.showConfirmPassword ? <CloseEyeIcon /> : <EyeIcon />}
                  </span>
                  {state.confirmPasswordError ? (
                    <small className="small red">
                      {state.confirmPasswordError}
                    </small>
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
