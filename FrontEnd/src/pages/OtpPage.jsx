import React, { useState } from 'react';
import './CSS/Otp.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useGenerateOtp from '../hooks/useGenerateOtp';
import { useEffect } from 'react';
import useVerifyOtp from '../hooks/useVerifyOtp';

const OtpPage = () => {
  const [otp, setOtp] = useState('');
  const { email } = useSelector((state) => state.auth);
  const bcryptEmail = email.split('@');
  const hiddenEmail = `${bcryptEmail[0].slice(0, 3)}***@${bcryptEmail[1]}`;
  const {generateNewOtp}=useGenerateOtp();
  const {verifyOtp}=useVerifyOtp();


  const handleSubmit = () => {

    console.log("inside handle Submit");
    if(otp.length < 4){
        alert('Please enter 4 digit OTP');
        
    }
    else {
        const num=Number(otp);
        // console.log(num);
        if(num>=1000 || num<=9999){
        // alert(otp);
        verifyOtp(num);
        console.log("verify otp called and otp value is=",num);
        }
        else{
            alert('Invalid OTP');
        }
  };
}
useEffect(() => {
    generateNewOtp();
}, []);

  return (
    <>
      <div className="otp-container">
        <div className="otp-wrapper">
          <h2>Verify OTP</h2>
          <h2>Email is sent to {hiddenEmail}</h2>
          <section className="otp-section">
            <div className="otp-input-box">
              <input 
                type="text" 
                placeholder="Enter OTP" 
                onChange={(e) => setOtp(e.target.value)} 
                value={otp} 
                maxLength="4"
              />
            </div>
            <div className="otp-button">
              <button onClick={handleSubmit}>Verify</button>
            </div>
            <div className="otp-text">
              <h3>Didn't receive the OTP? <a href="#">Resend OTP</a></h3>
              <h3>Entered Wrong Email? <Link to="/login">Go Back</Link></h3>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default OtpPage;
