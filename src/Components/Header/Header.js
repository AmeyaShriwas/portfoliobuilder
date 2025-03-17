import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Home, FileText, LogIn, User2Icon } from "lucide-react"; 
import { useDispatch, useSelector } from "react-redux";
import { UserLogout } from "../../Redux/Slices/AuthSlice";
import axios from "axios";

const Header = ({ isMobile, setIsMobile }) => {
  const [headerActive, setHeaderActive] = useState("HOME");
  const [toggleHamburger, setToggleHamburger] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isPortfolio, setIsPortfolio] = useState(false)

  const { isLoggedIn, data } = useSelector((state) => state.user);
  console.log('data', data)

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.resumeportfolio.ameyashriwas.in/portfolio/${data.id}`
      );
      console.log('res', response.data.success)
      setIsPortfolio(true);
    } catch (error) {
      console.error("Error fetching portfolio data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [data.id]);

  const handleLogout = () => {
    dispatch(UserLogout());
    navigate("/user/login"); // Redirect to login after logout
  };

  const headerData = [
    { name: "HOME", icon: <Home size={20} />, path: "/" },
    // { 
    //   name: isLoggedIn ? "RESUME" : null, 
    //   icon: isLoggedIn ? <FileText size={20} /> : null,
    //   path: "/resumebuild"
    // },
    { 
      name: isLoggedIn ? "PORTFOLIO" : null, 
      icon: isLoggedIn ? <FileText size={20} /> : null,
      path: "/portfolioTwo"
    },
    { 
      name: isPortfolio ? "VIEW PORTFOLIO" : null, 
      icon: isPortfolio ? <FileText size={20} /> : null,
      path: `/viewPortfolio/${data.id}`
    },
    { 
      name: isLoggedIn ? "PLAN" : null, 
      icon: isLoggedIn ? <FileText size={20} /> : null,
      path: "/plan"
    },
   
    { 
      name: isLoggedIn ? "LOGOUT" : "LOGIN", 
      icon: <LogIn size={20} />, 
      action: isLoggedIn ? handleLogout : () => navigate("/user/login"),
    },
    { 
      name: isLoggedIn ? `Hi ${data?.name?.split(" ")[0]}` : null, 
      icon: isLoggedIn ? <User2Icon size={20} /> : null
    }
  ].filter(item => item.name !== null || item.icon !== null);
  
  
  useEffect(() => {
    const fetchWidth = () => setIsMobile(window.innerWidth <= 800);
    fetchWidth();
    window.addEventListener("resize", fetchWidth);
    return () => window.removeEventListener("resize", fetchWidth);
  }, [setIsMobile]);

  const handleActiveHeader = (data) => {
    setHeaderActive(data.name);
    if (data.action) {
      data.action(); // Perform login/logout action
    } else {
      navigate(data.path);
    }
    setToggleHamburger(false); // Close menu after selection on mobile
  };

  return (
    <div
      className="d-flex justify-content-between align-items-center px-4 py-3 w-100 shadow-sm"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "linear-gradient(135deg,rgb(0, 0, 0),rgb(38, 69, 102))",
        color: "white",
      }}
    >
      {/* Logo */}
      <motion.div
        className="fw-bold fs-4"
        whileHover={{ scale: 1.1 }}
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
       Portfolio
      </motion.div>

      {/* Desktop Navigation */}
      {!isMobile ? (
        <ul className="nav justify-content-around">
          {headerData.map((data, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.1 }}
              className="px-3 py-2"
              style={{
                color: data.name === headerActive ? "#FFD700" : "#FFF",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "600",
                transition: "all 0.3s ease-in-out",
                borderBottom: data.name === headerActive ? "2px solid #FFD700" : "none",
              }}
              onClick={() => handleActiveHeader(data)}
            >
              {data.icon} <span className="ms-2">{data.name}</span>
            </motion.li>
          ))}
        </ul>
      ) : (
        // Mobile Hamburger Menu
        <div onClick={() => setToggleHamburger(!toggleHamburger)} style={{ cursor: "pointer" }}>
          {toggleHamburger ? <X size={28} /> : <Menu size={28} />}
        </div>
      )}

      {/* Mobile Menu - Slide-in Animation */}
      {isMobile && toggleHamburger && (
        <motion.div
          className="mobile-menu position-absolute start-0 top-100 w-100 p-3 bg-white shadow-lg"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            overflow: "hidden",
            borderRadius: "0 0 10px 10px",
            boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
          }}
        >
          <ul className="list-unstyled">
            {headerData.map((data, index) => (
              <motion.li
                key={index}
                className="p-3 rounded d-flex align-items-center"
                whileHover={{ scale: 1.05 }}
                style={{
                  color: data.name === headerActive ? "#007bff" : "#333",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "500",
                  transition: "color 0.3s ease",
                  background: data.name === headerActive ? "#e3f2fd" : "transparent",
                }}
                onClick={() => handleActiveHeader(data)}
              >
                {data.icon} <span className="ms-2">{data.name}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Header;
