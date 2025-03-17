import React, { useState, useEffect } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const Portfolio = ({ isMobile, setIsMobile }) => {
  const [timer, setTimer] = useState("");

  useEffect(() => {
    const countdown = () => {
      const today = new Date();
      const targetDate = new Date();
      targetDate.setDate(today.getDate() + 4); // 4-day countdown
      targetDate.setHours(0, 0, 0, 0); // Midnight start

      const timeLeft = targetDate - today;

      if (timeLeft <= 0) {
        return "00d : 00h : 00m : 00s";
      }

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
      const seconds = Math.floor((timeLeft / 1000) % 60);

      return `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
    };

    const interval = setInterval(() => {
      setTimer(countdown());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header isMobile={isMobile} setIsMobile={setIsMobile} />
      <div className="portfolio-container">
        <div className="content">
          <h2 className="title">🚀 Start Building Your Portfolio</h2>
          <p className="description">
            Portfolio Section will be fully functional after the countdown ends. Stay tuned!
          </p>
          <h1 className="timer">{timer}</h1>
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

export default Portfolio;
