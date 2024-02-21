import Head from 'next/head';
import Layout from '../../layout/main';
import { Mail, Phone, Skype } from '../../public/Svg';
import { useEffect, useReducer, useState, useRef } from 'react';
import { userService } from '../../services/userService';
import { toast } from 'react-nextjs-toast';
import QRCode from 'react-qr-code';

export default function Index() {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      userDetails: {},
      name: '',
      email: '',
      designation: '',
      companyName: '',
      aboutUs: '',
      workEmail: '',
      phoneNo: '',
      whatsApp: '',
      skype: '',
      website: '',
      instagram: '',
      facebook: '',
      linkedin: '',
      twitter: '',
      googleMap: '',
      hangouts: '',
      youtube: '',
      snapchat: '',
      tiktok: '',
      pinterest: '',
      profileImage: '',
      mediaPath: '',
      profileImagePrev: '',
      employeeId:''
    }
  );

  useEffect( () => {
    userService.getUserDetails({})
        .then((data)=> {
          console.log('response==', data);
          if (data.statusCode == 1) {
            setState({
              userDetails: data.responseData.result,
              mediaPath: data.responseData.mediaPath,
              employeeId: data.responseData.result.employeeId,
              name: data.responseData.result.name,
              email: data.responseData.result.email,
              designation: data.responseData.result.designation,
              companyName: data.responseData.result.companyName,
              aboutUs: data.responseData.result.aboutUs,
              workEmail: data.responseData.result.workEmail,
              phoneNo: data.responseData.result.phoneNo,
              whatsApp: data.responseData.result.whatsApp,
              skype: data.responseData.result.skype,
              website: data.responseData.result.website,
              instagram: data.responseData.result.instagram,
              facebook: data.responseData.result.facebook,
              linkedin: data.responseData.result.linkedin,
              twitter: data.responseData.result.twitter,
              googleMap: data.responseData.result.googleMap,
              hangouts: data.responseData.result.hangouts,
              youtube: data.responseData.result.youtube,
              snapchat: data.responseData.result.snapchat,
              tiktok: data.responseData.result.tiktok,
              pinterest: data.responseData.result.pinterest,
              profileImage: data.responseData.result.profileImage,
            });
            if (
                data.responseData.result.profileImage &&
                data.responseData.result.profileImage != ''
            ) {
              setState({
                profileImagePrev:
                    data.responseData.mediaPath + data.responseData.result.profileImage,
              });
            }
          }else if (data.statusCode === 0&&data?.error?.errorCode==2) {
              sessionStorage.removeItem('accessToken');
              localStorage.clear();
          }else{
            toast.notify(data.error.responseMessage, {
              duration: 3,
              type: 'error',
              title: 'Error!!',
            });
          }
        })
  }, []);
  let [flipped, setStateFlip] = useState(true);
  const increment = useRef(null);

  const handleStart = () => {
    increment.current= setInterval(() => {
      setStateFlip(!flipped);
    }, 3000);
  };

  useEffect(() => {
    handleStart();
  }, []);

  const handleReset = () => {
    clearInterval(increment.current);
    setStateFlip(false);
  };

  const handleFlip = () => {
    setStateFlip(!flipped);
  };

  return (
    <Layout notFooter={false}>
    
      <div className="edit-page-wrapper">
        <section className="banner_area"></section>
        <div className="box_1620  container">
          <div className="box_1620 bg-white shadow rounded-lg px-0">
            <div className="profile_heading">
              <h3>DASHBOARD</h3>
              <hr />
            </div>

            <div className="row min-hight-wrapper m-md-3 mx-1">
              <div className="col-md-6">
                <div
                  onClick={handleFlip}
                  onMouseEnter={handleReset}
                  onMouseLeave={handleStart}
                  id="card-container"
                  className={'card-container' + (flipped ? ' flipped' : '')}
                >
                  <div className="front">
                    <div id="card-front">
                      <div className="card-details">
                        <div className="container-sm">
                          <figure>
                              {state?.employeeId?
                            <QRCode
                              value={"https://contacts.mobcoder.com/profile/"+state.employeeId&&state.employeeId!=""?state?.employeeId?.toLowerCase():""}
                              size={70}
                              bgColor={'#000000'}
                              fgColor={'#a7701a'}
                            />:<QRCode
                                      value={"Teen Patti"}
                                      size={70}
                                      bgColor={'#000000'}
                                      fgColor={'#a7701a'}
                                  />}
                          </figure>
                        </div>
                        <div className="container-lg">
                          <div className="text-left">
                            <h5>{state.name}</h5>
                            <p>{state.designation}</p>
                          </div>
                          <ul>
                              {state.email&&state.email!==""?
                            <li>
                              <span className="fa-li">
                                <Mail />
                              </span>
                              <a
                                className="pointer"
                                href={'mailto:' + state.email}
                                target="_blank"
                                style={{ color: '#f5b64e' }}
                              >
                                {state.email}
                              </a>
                            </li>:""}
                              {state.skype&&state.skype!==""?
                            <li>
                              <span className="fa-li">
                                <Skype />
                              </span>
                              <a
                                className="pointer"
                                href={'skype:' + state.skype + '?chat'}
                                target="_blank"
                                style={{ color: '#f5b64e' }}
                              >
                                {state.skype}
                              </a>
                            </li>:""}
                              {state.phoneNo&&state.phoneNo!==""?
                            <li>
                              <span className="fa-li">
                                <Phone />
                              </span>
                              <a
                                className="pointer"
                                href={'tel:' + state.phoneNo}
                                target="_blank"
                                style={{ color: '#f5b64e' }}
                              >
                                {state.phoneNo}
                              </a>
                            </li>:""}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="back">
                    <div id="card-back">
                      <img src="../images/logo-gold.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
