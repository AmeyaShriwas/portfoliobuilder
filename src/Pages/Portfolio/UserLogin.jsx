import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import { motion } from 'framer-motion';
import { userLogin } from '../../Redux/Slices/AuthSlice';
import { useDispatch } from 'react-redux';
import swal from "sweetalert";


const UserLogin = ({ isMobile, setIsMobile }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email format';
    if (!formData.password.trim()) errors.password = 'Password is required';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
        dispatch(userLogin(formData)).then((response)=> {
            console.log('res', response)
            if(response.payload.status){
                swal('Success', response.payload.message)
                navigate('/plan')
            }
            else{
                swal('Error', response.payload.message ? response.payload.message : response.payload)
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
          <h3 className="text-center mb-4">Login to Your Account</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            <motion.button
              type="submit"
              className="btn btn-primary w-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
          </form>
          <div className="text-center mt-3">
            <p className="mb-1">
              <a href="#" className="text-dark" onClick={() => navigate('/user/forgotPassword')}>Forgot your password?</a>
            </p>
            <p>
              Don't have an account? <a href="#" className="text-dark" onClick={() => navigate('/user/signup')}>Sign up now</a>
            </p>
          </div>
        </motion.div>
      </div>
      <Footer isMobile={isMobile} setIsMobile={setIsMobile} />
    </>
  );
};

export default UserLogin;
