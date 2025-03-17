import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import pdf1 from "./../../Assets/img1.png";
import pdf2 from "./../../Assets/img2.png";
import pdf3 from "./../../Assets/img3.png";
import pdf4 from "./../../Assets/img4.png";
import pdf5 from "./../../Assets/img5.png";
import pdf6 from "./../../Assets/img6.png";
import pdf7 from "./../../Assets/img7.png";
import pdf8 from "./../../Assets/img8.png";
import portfolioImg from './../../Assets/portfolio.png'

const Home = ({ isMobile, setIsMobile }) => {
  const navigate = useNavigate();

  return (
    <>
      <Header isMobile={isMobile} setIsMobile={setIsMobile} />

      {/* Hero Section */}
      <motion.div
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="text-section"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="title">🚀 Create a Stunning Portfolio <br /> <b>in Minutes – Free!</b></span>
          <p className="description">
            Build your portfolio effortlessly with our free online tools.
            Showcase your skills, experience, and projects with a beautifully designed portfolio.
          </p>
          <div className="button-group">
            {/* <motion.button
              className="btn resume-btn"
              onClick={() => navigate("/resumeBuild")}
              whileHover={{ scale: 1.1 }}
            >✍️ Create a Resume Now</motion.button> */}
            <motion.button
              className="btn portfolio-btn"
              onClick={() => navigate("/portfolioTwo")}
              whileHover={{ scale: 1.1 }}
            >🌟 Create a Portfolio Now</motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* View Our Templates Section */}
      {/* <div className="templates-section">
        <h2 className="templates-title">View Our Templates</h2>
        <motion.div 
          className="templates-slider"
          animate={{ x: [0, -300, -600, -900, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        >
          <img src={pdf1} alt="Template 1" className="template-image" />
          <img src={pdf2} alt="Template 2" className="template-image" />
          <img src={pdf3} alt="Template 3" className="template-image" />
          <img src={pdf4} alt="Template 4" className="template-image" />
          <img src={pdf5} alt="Template 1" className="template-image" />
          <img src={pdf6} alt="Template 2" className="template-image" />
          <img src={pdf7} alt="Template 3" className="template-image" />
          <img src={pdf8} alt="Template 4" className="template-image" />
        </motion.div>
      </div> */}

      <div className="templates-sections">
        <h2 className="templates-title">View Our Portfolio</h2>
       
          <img src={portfolioImg} alt="Template 1" className="template-images" />
        
      </div>

      <Footer isMobile={isMobile} />

      <style jsx>{`
        .hero-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 50px 20px;
          color: black;
          min-height: 80vh;
        }
        .text-section {
          min-width: 300px;
          margin-bottom: 30px;
        }
        .title {
          font-size: 3rem;
          font-weight: bold;
          line-height: 1.3;
        }
        .description {
          font-size: 20px;
          margin-top: 10px;
          opacity: 0.9;
        }
        .button-group {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-top: 30px;
        }
        .btn {
          padding: 15px 25px;
          font-size: 18px;
          font-weight: bold;
          color: white;
          border: none;
          border-radius: 30px;
          cursor: pointer;
          box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
        }
        .resume-btn {
          background: linear-gradient(to right, #007bff, #00c6ff);
        }
        .portfolio-btn {
          background: linear-gradient(to right, #28a745, #00ff99);
        }
        .templates-section {
          text-align: center;
          margin-top: 10px;
          overflow: hidden;
          padding: 20px;
        }
        .templates-sections {
        display: flex;
        flex-direction:column;
        width: 100%;
        algn-items: center;
           text-align: center;
          margin-top: 20px;
          overflow: hidden;
          padding: 20px;
        }
        .templates-title {
          font-size: 30px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        .templates-slider {
          display: flex;
          width: 1200px;
        }
        .template-image {
          width: 300px;
          height: auto;
          margin-right: 20px;
          border-radius: 10px;
          box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
        }
            .template-images {
          width: 100%;
          height: auto;
          margin-right: 20px;
          border-radius: 10px;
          box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </>
  );
};

export default Home;
