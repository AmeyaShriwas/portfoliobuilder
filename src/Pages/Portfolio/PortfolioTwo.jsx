import React, { useState, useEffect } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import PortfolioDetails from "./AddPersonalDetails";

const PortfolioTwo = ({ isMobile, setIsMobile }) => {

 

  return (
    <>
      <Header isMobile={isMobile} setIsMobile={setIsMobile} />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="p-4">
                <span className="p-1" style={{ fontSize: '30px' }}>Start Building Your Portfolio</span>
            </div>
            <div>
             <PortfolioDetails/>
            </div>
      </div>
      <Footer isMobile={isMobile} setIsMobile={setIsMobile} />

      {/* Styles */}
      <style jsx>{`
        .portfolio-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 80vh;
          text-align: center;
          padding: 20px;
        //   background: linear-gradient(to right, #ff9966, #ff5e62);
          color: black;
        }
        .title {
          font-size: 35px;
          font-weight: bold;
        }
        .description {
          font-size: 20px;
          margin-top: 10px;
          opacity: 0.9;
        }
        .timer {
          font-size: 100px;
          font-weight: bold;
          margin-top: 20px;
          color:rgb(0, 0, 0);
          text-shadow: 2px 2px 10px rgba(255, 230, 0, 0.8);
          animation: pulse 1s infinite alternate;
        }
        .status-message {
          font-size: 22px;
          margin-top: 15px;
          font-weight: 500;
        }
        @keyframes pulse {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.05);
          }
        }
        @media (max-width: 768px) {
          .timer {
            font-size: 40px;
          }
          .title {
            font-size: 28px;
          }
          .description {
            font-size: 18px;
          }
          .status-message {
            font-size: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default PortfolioTwo;
