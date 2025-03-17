import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaLinkedin, FaEnvelope, FaFileAlt, FaUser } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { userLogin, UserLogin } from "../../Redux/Slices/AuthSlice";
import { useDispatch } from "react-redux";
import swal from "sweetalert";


const ViewPortfolio = ({ isMobile, setIsMobile }) => {
  const [data, setData] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const { id } = useParams();
  const [loginData, setLoginData] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.resumeportfolio.ameyashriwas.in/portfolio/${id}`
      );
      console.log('res', response)
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching portfolio data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleLoginChange = (e) => {
    const { name, value } = e.target
    setLoginData((prev) => ({
      ...prev,
      [name]: value
    }))

  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    dispatch(userLogin(loginData)).then((response) => {
      console.log('res', response)
      if (response.payload.status) {
        swal('Success', response.payload.message)
        navigate(`/updatePortfolio/${data.id}`)
      }
      else {
        swal('Error', response.payload.message ? response.payload.message : response.payload)
      }
    })
  }

  if (!data) {
    return <div className="text-center text-dark py-5">Loading...</div>;
  }

  return (
    <div className="container-fluid p-0" style={{ background: "white", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ backgroundColor: "white", color: "black" }} className="d-flex justify-content-between border align-items-center p-3">
        <h4 className="m-0">{data.name}'s Portfolio</h4>
        <button className="btn" style={{ backgroundColor: "#7C99AC", color: "white" }} onClick={() => setShowSidebar(true)}>
          <FaUser /> Login
        </button>
      </header>

      <div className="d-flex flex-column flex-md-row" style={{minHeight:'80vh'}}>
        {/* Left Section */}
        <div className="col-md-3 bg-white p-4 text-center border">
          <motion.img
            src={`https://api.resumeportfolio.ameyashriwas.in/${data.profilePhoto.replace(/^\/+/, "")}`}
            alt="Profile"
            className="rounded-circle"
            style={{ width: "200px", height: "200px" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
       <div className="text-center" style={{ marginTop: "20px" }}>
  <h5
    className="text-dark"
    style={{ 
      fontWeight: "bold", 
      fontSize: "25px", 
      letterSpacing: "1px",
      textTransform: "uppercase",
      color: "#333",
    }}
  >
    {data.name}
  </h5>

  {data.tagLine && (
    <p
      className="text-dark"
      style={{
        fontSize: "16px",
        fontStyle: "italic",
        backgroundColor: "#f8f9fa",
        padding: "12px 20px",
        borderRadius: "8px",
        display: "inline-block",
        borderLeft: "4px solid #007bff", // Highlight effect
        maxWidth: "80%", 
        margin: "10px auto",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
      }}
    >
      {data.tagLine}
    </p>
  )}
</div>


          <div className="d-flex flex-column gap-2 mt-3">
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="btn" style={{ backgroundColor: "#7C99AC", color: "white" }}>
              <FaLinkedin /> LinkedIn
            </a>
            <a href={`mailto:${data.email}`} className="btn" style={{ backgroundColor: "#7C99AC", color: "white" }}>
              <FaEnvelope /> Contact
            </a>
            <a href={data.resume} style={{ backgroundColor: "#7C99AC", color: "white" }} className="btn" download>
              <FaFileAlt /> Download Resume
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-md-9 p-4">
          <nav className="nav nav-tabs">
            <a className="nav-link active text-dark" data-bs-toggle="tab" href="#projects">
              Projects
            </a>
            <a className="nav-link text-dark" data-bs-toggle="tab" href="#skills">
              Skills
            </a>
            <a className="nav-link text-dark" data-bs-toggle="tab" href="#about">
              About Me
            </a>
            <a className="nav-link text-dark" data-bs-toggle="tab" href="#experience">
              Experience
            </a>
          </nav>

          <div className="tab-content mt-4">
            {/* Projects Section */}
            <div className="tab-pane fade show active" id="projects">
              <h4 className="text-dark" style={{ marginBottom: '20px' }}>Projects</h4>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  overflow: "scroll",
                  gap: "20px",
                  borderRadius: "10px",
                }}
              >
                {data?.projects?.map((project, index) => (
                  <div
                    key={index}
                    className="project-card"
                    style={{
                      flex: "0 0 auto",
                      overflow: "hidden",
                      borderRadius: "10px",
                      boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px`,
                      width: isMobile ? "330px" : "500px",
                    }}
                  >
                    <div
                      className="card shadow-sm border-0"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "auto",
                      }}
                    >
                      {/* Image Section */}
                      <div
                        className="square-container"
                        style={{
                          width: "100%",
                          paddingTop: "56.25%", // Aspect ratio (16:9)
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={`https://api.resumeportfolio.ameyashriwas.in/${project.projectImage}`}
                          className="card-img-top"
                          alt={project.projectName}
                          style={{
                            position: "absolute",
                            top: "0",
                            left: "0",
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>

                      {/* Content Section */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          padding: "12px",
                        }}
                      >
                        <h6 className="card-title text-dark" style={{ marginBottom: "8px" }}>
                          {project.projectName}
                        </h6>

                        <p
                          style={{
                            overflow: "hidden",
                            color: "black",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 3, // Limits description to 3 lines
                            textOverflow: "ellipsis",
                          }}
                        >
                          {project.projectDescription}
                        </p>

                        {/* Buttons Section */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "10px",
                          }}
                        >
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              textDecoration: "none",
                              backgroundColor: "#007bff",
                              color: "white",
                              padding: "8px 12px",
                              borderRadius: "5px",
                              fontSize: "14px",
                            }}
                          >
                            🔗 Link
                          </a>

                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              textDecoration: "none",
                              backgroundColor: "#24292e",
                              color: "white",
                              padding: "8px 12px",
                              borderRadius: "5px",
                              fontSize: "14px",
                            }}
                          >
                            🐙 GitHub
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Section */}
            <div className="tab-pane fade" id="skills">
              <h4 className="text-dark">Skills</h4>
              <p className="text-dark" style={{ display: 'flex', gap: '15px' }}>{data.skills.split(",").map((data) => {
                return (
                  <p className="text-light" style={{ backgroundColor: 'grey', padding: '10px', margin: '10px', borderRadius: '10px' }}>{data}</p>
                )
              })}</p>
            </div>

            {/* About Me Section */}
            <div className="tab-pane fade" id="about">
              <h4 className="text-dark">About Me</h4>
              <p className="text-dark">{data.bio}</p>
            </div>

            {/* Experience Section */}
            <div className="tab-pane fade" id="experience" style={{ padding: "20px" }}>
              <h4 className="text-dark mb-4" style={{ borderBottom: "2px solid #007bff", paddingBottom: "5px" }}>
                Experience
              </h4>

              {data.training_Experience.map((data, index) => (
                <div
                  key={index}
                  className="card shadow-sm mb-3 border-0"
                  style={{ padding: "15px", borderRadius: "8px", backgroundColor: "#7C99AC", color: "white" }}
                >
                  <p className="mb-1 fw-bold" style={{ fontSize: "14px", color:'white' }}>
                    {data.from} - {data.to}
                  </p>

                  <p className="mb-1 fw-semibold" style={{ fontSize: "16px", color:'white' }}>
                    {data.training_company} - <span style={{ fontSize: "16px", color:'white' }} >{data.course_job}</span>
                  </p>

                  <p  style={{ fontSize: "14px", lineHeight: "1.5", color:'white' }}>
                    {data.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center p-3 mt-3 border" style={{ backgroundColor: "white", color: "black" }}>
        <small>&copy; {new Date().getFullYear()} {data.name}. All Rights Reserved.</small>
      </footer>

      {/* Sidebar Login */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            className="position-fixed top-0 start-0 vh-100 text-dark p-4 shadow-lg"
            style={{ width: "25%", backgroundColor: "white" }}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.5 }}
          >
            <button className="btn-close btn-close-dark position-absolute top-2 end-2" onClick={() => setShowSidebar(false)}></button>
            <h4 className="text-center mb-4 text-dark">Login</h4>
            <form>
              <div className="mb-3">
                <label className="form-label text-dark">Email</label>
                <input type="email" name="email" onChange={handleLoginChange} className="form-control" placeholder="Enter email" />
              </div>
              <div className="mb-3">
                <label className="form-label text-dark">Password</label>
                <input type="password" name="password" onChange={handleLoginChange} className="form-control" placeholder="Enter password" />
              </div>
              <button type="submit" onClick={handleLoginSubmit} className="btn w-100" style={{ backgroundColor: "#7C99AC", color: "white" }}>Login</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Styles */}
      <style>
        {`
      .square-container {
        width: 100%;
        padding-top: 100%;
        position: relative;
        overflow: hidden;
      }

      .square-container img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      @media (max-width: 768px) {
        .col-md-3 {
          width: 100%;
          text-align: center;
        }

        .col-md-9 {
          width: 100%;
        }

        .position-fixed {
          width: 100% !important;
        }
      }
    `}
      </style>
    </div>

  );
};

export default ViewPortfolio;