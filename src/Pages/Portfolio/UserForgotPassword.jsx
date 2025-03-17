import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import { motion } from 'framer-motion';
import { forgotPassword, verifyOtp } from '../../Redux/Slices/AuthSlice';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert'

const UserForgotPassword = ({ isMobile, setIsMobile }) => {
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(180);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    if (step === 'otp' && timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
    if (timer === 0) navigate('/login');
  }, [step, timer, navigate]);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) setErrors({ email: 'Email is required' });
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) setErrors({ email: 'Invalid email format' });
    else {
      dispatch(forgotPassword(email)).then((response)=> {
        if(response.payload.status){
            swal('Success', response.payload.message)
            setStep('otp')
        }
        else{
            swal('Error', response.payload.message)
        }
      })
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp.length !== 6) setErrors({ otp: 'OTP must be 6 digits' });
    else {
        dispatch(verifyOtp({email, otp})).then((response)=> {
          if(response){
            if(response.payload.status){
                swal('Success', response.payload.message)
                navigate('/user/updatePassword');
            }
            else{
                swal('Error', response.payload.message ? response.payload.message : response.payload)
            }
          }
        })
    
    }
  };

  return (
    <>
      <Header isMobile={isMobile} setIsMobile={setIsMobile} />
      <div className="d-flex justify-content-center align-items-center vh-100" style={{
        background: 'linear-gradient(135deg,rgb(255, 255, 255),rgb(255, 255, 255))',
        color: '#fff',
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="card p-4 shadow-lg border-0"
          style={{ width: '400px', borderRadius: '15px', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}
        >
          <h3 className="text-center mb-4">Forgot Password</h3>
          {step === 'email' ? (
            <form onSubmit={handleEmailSubmit}>
              <div className="mb-3">
                <label className="form-label">Enter Your Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <motion.button
                type="submit"
                className="btn btn-primary w-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Verify Email
              </motion.button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit}>
              <div className="mb-3">
                <label className="form-label">Enter OTP (6 digits)</label>
                <input
                  type="text"
                  className={`form-control ${errors.otp ? 'is-invalid' : ''}`}
                  value={otp}
                  maxLength={6}
                  onChange={(e) => setOtp(e.target.value)}
                />
                {errors.otp && <div className="invalid-feedback">{errors.otp}</div>}
              </div>
              <p className="text-center">Time left: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}</p>
              <motion.button
                type="submit"
                className="btn btn-primary w-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Verify OTP
              </motion.button>
            </form>
          )}
          <div className="text-center mt-3">
            Remember your password? <span className="text-dark" style={{ cursor: 'pointer' }} onClick={() => navigate('/user/login')}>Login now</span>
          </div>
        </motion.div>
      </div>
      <Footer isMobile={isMobile} setIsMobile={setIsMobile} />
    </>
  );
};

export default UserForgotPassword;
