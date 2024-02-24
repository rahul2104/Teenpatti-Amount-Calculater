import Head from 'next/head';
import Layout from '../../layout/main';
import { Mail, Phone, Skype } from '../../public/Svg';
import { useEffect, useReducer, useState, useRef } from 'react';
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

              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
