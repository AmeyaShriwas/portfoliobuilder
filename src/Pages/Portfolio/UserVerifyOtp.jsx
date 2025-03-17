import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import swal from "sweetalert";
import { verifyOtp, deleteUnverifiedUser } from '../../Redux/Slices/AuthSlice';
import { useSelector } from 'react-redux';

const UserVerifyOtp = ({ isMobile, setIsMobile }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, data } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({ email: data?.email, otp: '' });
  const [errors, setErrors] = useState({});
  const [timeLeft, setTimeLeft] = useState(120); // 2-minute countdown (120 seconds)
  const [isOtpExpired, setIsOtpExpired] = useState(false);
  

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      dispatch(deleteUnverifiedUser(formData.email))
      setIsOtpExpired(true);
      navigate('/user/login')
    }
  }, [timeLeft]);

  const handleOtpExpire = () => {
    setIsOtpExpired(true);
    swal("OTP Expired", "Your OTP has expired. Please request a new one.", "error");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email format';
    if (!formData.otp.trim()) errors.otp = 'OTP is required';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isOtpExpired) {
      swal("Error", "Your OTP has expired. Please request a new one.", "error");
      return;
    }

    if (validateForm()) {
      dispatch(verifyOtp(formData)).then((response) => {
        if (response.payload.status) {
          swal("Success", response.payload.message, "success");
          navigate('/user/login');
        } else {
            swal('Error', response.payload.message ? response.payload.message : response.payload)
        }
      });
    }
  };

  return (
    <>
      <Header isMobile={isMobile} setIsMobile={setIsMobile} />
      <div className="d-flex justify-content-center align-items-center vh-100" style={{
        background: 'linear-gradient(135deg, rgb(255, 255, 255), rgb(255, 255, 255))',
        color: '#000',
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="card p-4 shadow-lg border-0"
          style={{ width: '400px', borderRadius: '15px', background: '#fff' }}
        >
          <h3 className="text-center mb-3">Verify OTP</h3>

          {/* Countdown Timer */}
          <p className="text-center mb-3" style={{ fontSize: '16px', fontWeight: 'bold', color: timeLeft <= 30 ? 'red' : 'green' }}>
            OTP Expires in: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                value={formData.email}
                onChange={handleChange}
                disabled={isOtpExpired}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">OTP</label>
              <input
                type="number"
                name="otp"
                className={`form-control ${errors.otp ? 'is-invalid' : ''}`}
                value={formData.otp}
                onChange={handleChange}
                disabled={isOtpExpired}
              />
              {errors.otp && <div className="invalid-feedback">{errors.otp}</div>}
            </div>

            <motion.button
              type="submit"
              className="btn btn-primary w-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isOtpExpired}
            >
              Verify
            </motion.button>
          </form>

          <div className="text-center mt-3">
            <p className="mb-1">
              <a href="#" className="text-dark" onClick={() => navigate('/user/forgotPassword')}>
                Forgot your password?
              </a>
            </p>
            <p>
              Don't have an account? <a href="#" className="text-dark" onClick={() => navigate('/user/signup')}>
                Sign up now
              </a>
            </p>
          </div>
        </motion.div>
      </div>
      <Footer isMobile={isMobile} setIsMobile={setIsMobile} />
    </>
  );
};

export default UserVerifyOtp;
