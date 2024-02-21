import Head from 'next/head';
import Layout from '../../layout/main';
import React, { useReducer } from 'react';
import { CloseEyeIcon, EyeIcon } from '../../public/Svg';
import { authService } from '../../services/authService';
import { toast } from 'react-nextjs-toast';

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

export default function Changepassword() {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      oldPassword: '',
      password: '',
      confirmPassword: '',
      oldPasswordError: '',
      passwordError: '',
      confirmPasswordError: '',
      showOldPassword: true,
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
    let { oldPassword, password, confirmPassword } = state;

    if (!validatePassword(oldPassword).status) {
      validate = false;
      setState({
        oldPasswordError: validatePassword(oldPassword).error,
      });
    } else {
      setState({
        oldPasswordError: '',
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

      let params = {
        oldPassword: state.oldPassword,
        password: state.password,
      };
      console.log('params', params);
      let data = await authService.changePassword(params);
      console.log('data', data);
      if (data.statusCode === 1) {
        setState({
          oldPassword: '',
          password: '',
          confirmPassword: '',
          oldPasswordError: '',
          passwordError: '',
          confirmPasswordError: '',
          showOldPassword: true,
          showPassword: true,
          showConfirmPassword: true,
        });
        toast.notify(data.responseData.message, {
          duration: 3,
          type: 'success',
          title: 'Success!!',
        });
      } else {
        toast.notify(data.error.responseMessage, {
          duration: 3,
          type: 'error',
          title: 'Error!!',
        });
      }
    }
  };

  return (
    <Layout notFooter={false}>
      <div className="edit-page-wrapper">
        <section className="banner_area"></section>
        <div className="box_1620  container">
          <div className=" bg-white shadow rounded-lg px-0 ">
            <div className="profile_heading">
              <h3>CHANGE PASSWORD</h3>

              <hr />
            </div>

            <div className="tab-content pb-5 px-4 px-md-5">
              <div className="row">
                <div className="col-md-12 ">
                <label>Current Password</label>

                  <div
                    className={`input-w-icon form-group ${
                      state.oldPasswordError ? 'error' : ''
                    }`}
                  >
                    <input
                      type={state.showOldPassword ? 'password' : 'text'}
                      name="oldPassword"
                      value={state.oldPassword}
                      onChange={handleOnChange}
                      placeholder="Current Password"
                      className="form-control"
                      maxLength="70"
                    />
                    <span
                      className="rt-icon"
                      onClick={(e) =>
                        setState({
                          showOldPassword: !state.showOldPassword,
                        })
                      }
                    >
                      {state.showOldPassword ? <CloseEyeIcon /> : <EyeIcon />}
                    </span>
                    {state.oldPasswordError ? (
                      <small className="small red">
                        {state.oldPasswordError}
                      </small>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="col-md-12 ">
                <label>New Password</label>

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
                      placeholder="New Password"
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
                </div>
                <div className="col-md-12">
                <label>Confirm Password</label>
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
                      {state.showConfirmPassword ? (
                        <CloseEyeIcon />
                      ) : (
                        <EyeIcon />
                      )}
                    </span>
                    {state.confirmPasswordError ? (
                      <small className="small red">
                        {state.confirmPasswordError}
                      </small>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-3">
                {/*<button className="btn btn-outline-primary">Cancel</button>*/}
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
