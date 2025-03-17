import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaLinkedin, FaEnvelope, FaFileAlt, FaUser, FaEdit } from "react-icons/fa";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Modal, Button, Form } from "react-bootstrap";
import { UserLogout } from "../../Redux/Slices/AuthSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";



const UpdatePortfolioPage = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false)
  const [editField, setEditField] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [deleteField, setDeleteField] = useState(null)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const [personalDetails, setPersonalDetails] = useState({
    name: data?.name || "",
    tagLine: data?.tagLine || "",
    linkedin: data?.linkedin || "",
    email: data?.email || "",
  });
  const [experienceDetails, setExperienceDetails] = useState({
    from: "",
    to: data?.bio || "",
    training_company: "",
    course_job: "",
    description: ""
  });
  const [addexperienceDetails, setAddExperienceDetails] = useState({
    from: "",
    to: data?.bio || "",
    training_company: "",
    course_job: "",
    description: ""
  });
  const [updateBio, setUpdateBio] = useState({ bio: '' })
  const [updateSkills, setUpdateSkills] = useState({ skills: '' })

  const [allProjects, setAllProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState({
  })
  const [addProject, setAddProject] = useState({
  })
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null)
  const { token } = useSelector(state => state.user)

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.resumeportfolio.ameyashriwas.in/portfolio/${id}`
      );
      console.log('res', response)
      setData(response.data.data);

      const personal = {

        name: response.data.data?.name,
        tagLine: response.data.data?.tagLine,
        linkedin: response.data.data?.linkedin,
        email: response.data.data?.email,

      }
      setPersonalDetails(personal)
      const bioGet = {
        bio: response.data.data?.bio
      }
      setUpdateBio(bioGet)

      const skillsGet = {
        skills: response.data.data?.skills
      }
      setUpdateSkills(skillsGet)
      setAllProjects(response.data.projects)
    } catch (error) {
      console.error("Error fetching portfolio data", error);
    }
  };

  const handelLogout = () => {
    const id = data.id
    navigate(`/viewPortfolio/${id}`)


  }


  useEffect(() => {
    fetchData();
  }, [id]);

  const handleOpenModel = (field, index) => {
    console.log('data', data)
    setSelectedProjectIndex(index)
    const allProjects = data.projects.filter((data, i) => i === index)[0]
    console.log('dat', allProjects)
    const allExperience = data.training_Experience.filter((data, i) => i === index)[0]
    setExperienceDetails(allExperience)
    setSelectedProject(allProjects)
    setEditField(field);
    setShowModal(true);
    if (field === "profilePhoto") {
      setImageFile(null);
    } else {

    }
  };

  const handlePersonalDetailsChange = (e) => {
    const { name, value } = e.target
    setPersonalDetails((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleExperienceDetailsChange = (e) => {
    const { name, value } = e.target
    setExperienceDetails((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddExperienceDetailsChange = (e) => {
    const { name, value } = e.target
    setAddExperienceDetails((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleBioDetailsChange = (e) => {
    const { name, value } = e.target
    setUpdateBio((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSkillsDetailsChange = (e) => {
    const { name, value } = e.target
    setUpdateSkills((prev) => ({
      ...prev,
      [name]: value
    }))
  }


  const handleSave = async () => {
    try {

      if (editField === 'profilePhoto') {
        console.log('updated data', data);

        const formData = new FormData();
        if (imageFile) {
          formData.append("profilePhoto", imageFile);
        }

        try {
          const response = await axios.post(
            `https://api.resumeportfolio.ameyashriwas.in/portfolio/updateProfilePhoto/${data.id}`,
            formData,
            {
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
              }
            }
          );

          console.log('res updated', response.data);
          setData(response?.data?.data);
        } catch (error) {
          console.error("Error updating portfolio:", error);
        }
      }
      else if (editField === 'resume') {

        const formData = new FormData();
        if (imageFile) {
          formData.append("resume", imageFile);
        }

        try {
          const response = await axios.post(
            `https://api.resumeportfolio.ameyashriwas.in/portfolio/updateResume/${data.id}`,
            formData,
            {
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
              }
            }
          );

          console.log('res updated', response.data);
          setData(response?.data?.data);
        } catch (error) {
          console.error("Error updating portfolio:", error);
        }
      }
      else if (editField === 'projects') {
        const formData = new FormData();
        console.log('selected project', selectedProject);

        for (let key in selectedProject) {
          if (key === "projectImage" && selectedProject.projectImage instanceof File) {
            formData.append(key, selectedProject.projectImage); // Append the file
          } else {
            formData.append(key, selectedProject[key]);
          }
        }

        formData.append("index", selectedProjectIndex);

        try {
          const response = await axios.post(
            `https://api.resumeportfolio.ameyashriwas.in/portfolio/updateProjects/${data.id}`,
            formData,
            {
              headers: {
                "Authorization": `Bearer ${token}`,
                // REMOVE "Content-Type": "application/json"
                // Axios will automatically set the correct "multipart/form-data"
              },
            }
          );

          console.log("res updated", response.data);
          setData(response?.data?.data);
        } catch (error) {
          console.error("Error updating portfolio:", error);
        }


      }
      else if (editField === 'addprojects') {
        const formData = new FormData();
        console.log('selected project', addProject);

        for (let key in addProject) {
          if (key === "projectImage" && addProject.projectImage instanceof File) {
            formData.append(key, addProject.projectImage); // Append the file
          } else {
            formData.append(key, addProject[key]);
          }
        }

        try {
          const response = await axios.post(
            `https://api.resumeportfolio.ameyashriwas.in/portfolio/addMoreProjects/${data.id}`,
            formData,
            {
              headers: {
                "Authorization": `Bearer ${token}`,
                // REMOVE "Content-Type": "application/json"
                // Axios will automatically set the correct "multipart/form-data"
              },
            }
          );

          console.log("res updated", response.data);
          setData(response?.data?.data);
        } catch (error) {
          console.error("Error updating portfolio:", error);
        }


      }
      else if (editField === 'skills') {

        try {
          const response = await axios.post(
            `https://api.resumeportfolio.ameyashriwas.in/portfolio/updateSkillsDetails/${data.id}`,
            updateSkills,
            {
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"

              }
            }
          );

          console.log('res updated', response.data);
          setData(response?.data?.data);
        } catch (error) {
          console.error("Error updating portfolio:", error);
        }
      } else if (editField === 'aboutMe') {

        try {
          const response = await axios.post(
            `https://api.resumeportfolio.ameyashriwas.in/portfolio/updateBioDetails/${data.id}`,
            updateBio,
            {
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"

              }
            }
          );

          console.log('res updated', response.data);
          setData(response?.data?.data);
        } catch (error) {
          console.error("Error updating portfolio:", error);
        }
      }


      else if (editField === 'experience') {
        const newData = Object.assign(experienceDetails, { index: selectedProjectIndex })

        try {
          const response = await axios.post(
            `https://api.resumeportfolio.ameyashriwas.in/portfolio/updateExperienceDetails/${data.id}`,
            newData,
            {
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"

              }
            }
          );

          console.log('res updated', response.data);
          setData(response?.data?.data);
        } catch (error) {
          console.error("Error updating portfolio:", error);
        }
      }
      else if (editField === 'addexperience') {

        try {
          const response = await axios.post(
            `https://api.resumeportfolio.ameyashriwas.in/portfolio/addExperienceDetails/${data.id}`,
            addexperienceDetails,
            {
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"

              }
            }
          );

          console.log('res updated', response.data);
          setData(response?.data?.data);
        } catch (error) {
          console.error("Error updating portfolio:", error);
        }
      }
      else {
        try {
          const response = await axios.post(
            `https://api.resumeportfolio.ameyashriwas.in/portfolio/updatePersonalDetails/${data.id}`,
            personalDetails,
            {
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
              }
            }
          );

          console.log('res updated', response.data);
          setData(response?.data?.data);
        } catch (error) {
          console.error("Error updating portfolio:", error);
        }
      }

      setShowModal(false);
    } catch (error) {
      console.error("Error updating data", error);
    }
  };


  const handleProjectDetailsChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setSelectedProject(prev => ({
        ...prev,
        [name]: e.target.files[0] // Store the file object
      }));
    } else {
      setSelectedProject(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAddProjectDetailsChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setAddProject(prev => ({
        ...prev,
        [name]: e.target.files[0] // Store the file object
      }));
    } else {
      setAddProject(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleOpenDeleteModel = (e, index) => {
    setDeleteShow(true)
    setDeleteField(e)
    setDeleteIndex(index)
  }

  const handleConfirm = async () => {

    if (deleteField === 'Deleteprojects') {
      try {
        const index = { index: deleteIndex }
        const response = await axios.post(
          `https://api.resumeportfolio.ameyashriwas.in/portfolio/deleteProject/${data.id}`,
          index,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"

            }
          }
        );

        console.log('res updated', response.data);
        setData(response?.data?.data);
        setDeleteShow(false)
        setDeleteField(null)
        setDeleteIndex(null)
      } catch (error) {
        console.error("Error updating portfolio:", error);
      }
    }
    else if (deleteField === 'deleteexperience') {
      try {
        const index = { index: deleteIndex }
        const response = await axios.post(
          `https://api.resumeportfolio.ameyashriwas.in/portfolio/deleteExperienceDetails/${data.id}`,
          index,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"

            }
          }
        );

        console.log('res updated', response.data);
        setData(response?.data?.data);
        setDeleteShow(false)
        setDeleteField(null)
        setDeleteIndex(null)
      } catch (error) {
        console.error("Error updating portfolio:", error);
      }
    }
  }

  const handleClose = () => {
    setDeleteShow(false)
  }


  if (!data) {
    return <div className="text-center text-dark py-5">Loading...</div>;
  }

  return (
    <div className="container-fluid p-0" style={{ background: "white", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ backgroundColor: "white", color: "black" }} className="d-flex justify-content-between border align-items-center p-3">
        <h4 className="m-0">{data.name}'s Portfolio</h4>
        <button className="btn" style={{ backgroundColor: "#7C99AC", color: "white" }} onClick={() => handelLogout()}>
          <FaUser /> Logout
        </button>
      </header>


      <div className="d-flex flex-column flex-md-row" style={{ minHeight: '80vh' }}>
        {/* Left Section */}
        <div className="col-md-3 bg-white p-4 text-center border">
          <motion.div className="position-relative d-inline-block">
            <motion.img
              src={`https://api.resumeportfolio.ameyashriwas.in/${data.profilePhoto.replace(/^\/+/, "")}`}
              alt="Profile"
              className="rounded-circle shadow-lg"
              style={{ width: "200px", height: "200px" }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <button className="btn btn-sm btn-warning position-absolute bottom-0 end-0" onClick={() => handleOpenModel('profilePhoto', 0)}>
              <FaEdit />
            </button>
          </motion.div>
          <h5 className="mt-3 font-weight-bold d-flex justify-content-center align-items-center gap-2">
            {data.name} <FaEdit onClick={() => handleOpenModel('name', 0)} className="text-warning cursor-pointer" />
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
              {data.tagLine} <FaEdit onClick={() => handleOpenModel('tagLine', 0)} className="text-warning cursor-pointer" />
            </p>
          )}
          <div className="d-flex flex-column gap-3 mt-3" style={{ position: "relative" }}>
            {/* LinkedIn Button */}
            <div className="d-flex align-items-center">
              <a
                href={data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn w-100 d-flex align-items-center justify-content-center gap-2 px-3"
                style={{ backgroundColor: "#7C99AC", color: "white", fontSize: "16px", fontWeight: "500" }}
              >
                <FaLinkedin size={20} /> LinkedIn
              </a>
              <FaEdit
                size={18}
                onClick={() => handleOpenModel("linkedin", 0)}
                style={{ marginLeft: "12px", cursor: "pointer", color: "#7C99AC" }}
              />
            </div>

            {/* Contact Button */}
            <div className="d-flex align-items-center">
              <a
                href={`mailto:${data.email}`}
                className="btn w-100 d-flex align-items-center justify-content-center gap-2 px-3"
                style={{ backgroundColor: "#7C99AC", color: "white", fontSize: "16px", fontWeight: "500" }}
              >
                <FaEnvelope size={20} /> Contact
              </a>
              <FaEdit
                size={18}
                onClick={() => handleOpenModel("email", 0)}
                style={{ marginLeft: "12px", cursor: "pointer", color: "#7C99AC" }}
              />
            </div>

            {/* Resume Download Button */}
            <div className="d-flex align-items-center">
              <a
                href={`https://api.resumeportfolio.ameyashriwas.in/${data.resume}`}
                className="btn w-100 d-flex align-items-center justify-content-center gap-2 px-3"
                style={{ backgroundColor: "#7C99AC", color: "white", fontSize: "16px", fontWeight: "500" }}
                download
              >
                <FaFileAlt size={20} /> Download Resume
              </a>
              <FaEdit
                size={18}
                onClick={() => handleOpenModel("resume", 0)}
                style={{ marginLeft: "12px", cursor: "pointer", color: "#7C99AC" }}
              />
            </div>
          </div>

        </div>

        {/* Right Section */}
        <div className="col-md-9 p-4">
          <nav className="nav nav-tabs">
            <a className="nav-link active" data-bs-toggle="tab" href="#projects">
              Projects
            </a>
            <a className="nav-link" data-bs-toggle="tab" href="#skills">
              Skills
            </a>
            <a className="nav-link" data-bs-toggle="tab" href="#about">
              About Me
            </a>
            <a className="nav-link" data-bs-toggle="tab" href="#experience">
              Experience
            </a>
          </nav>

          <div className="tab-content mt-4">
            {/* Projects Section */}
            <div className="tab-pane fade show active" id="projects">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom:'10px' }}>
                <h4 style={{ margin: 0 }}>Projects</h4>
                <h4
                  onClick={() => handleOpenModel("addprojects")}
                  style={{ margin: 0, cursor: "pointer", color: "#007bff" }}
                >
                  + Add More Projects
                </h4>
              </div>

              <div style={{
                width: "100%",
                display: 'flex',
                overflow: 'scroll',
                gap: '20px',
                borderRadius: '10px'
              }}>
                {data.projects.map((project, index) => (
                  <motion.div key={index} style={{minWidth:'400px', boxShadow: `rgba(0, 0, 0, 0.24) 0px 3px 8px`}} className="col-12 col-sm-6 col-md-4 mb-3" whileHover={{ scale: 1.03 }}>
                    <div className="card shadow-sm border-0 position-relative">
                      <div className="square-container">
                        <img
                          src={`https://api.resumeportfolio.ameyashriwas.in/${project.projectImage}`}
                          className="card-img-top"
                          alt={project.projectName}
                        />
                      </div>
                      <button className="btn btn-sm btn-warning position-absolute top-0 end-0 m-2">
                        <FaEdit onClick={() => handleOpenModel('projects', index)} />
                      </button>
                      <button className="btn btn-sm btn-danger position-absolute top-0 end-10 m-2">
                        <MdDelete onClick={() => handleOpenDeleteModel('Deleteprojects', index)} />
                      </button>
                      <div className="card-body">
                        <h6 className="card-title d-flex justify-content-between">
                          {project.projectName} 
                        </h6>
                        <p className="card-text text-muted small d-flex justify-content-between">
                          {project.projectDescription.length > 100 ? project.projectDescription?.slice(0, 100) : project.projectDescription} 
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Skills Section */}

            <div className="tab-pane fade" id="skills">
              <h4 className="text-dark">Skills</h4>
              <p className="text-dark" onClick={() => handleOpenModel('skills', 0)} style={{ display: 'flex', gap: '15px', flexWrap:'wrap' }}>{data.skills.split(",").map((data) => {
                return (
                  <p className="text-light" style={{ backgroundColor: 'grey', padding: '10px', margin: '10px', borderRadius: '10px' }}>{data}  </p>
                )
              })} <FaEdit size={25} onClick={() => handleOpenModel('skills', 0)} className="text-warning cursor-pointer" /></p>
            </div>

            {/* About Me Section */}
            <div className="tab-pane fade" id="about">
              <h4>About Me</h4>
              <p className="d-flex justify-content-between">
                {data.bio} <FaEdit size={35} onClick={() => handleOpenModel('aboutMe', 0)} className="text-warning cursor-pointer" />
              </p>
            </div>

            {/* Experience Section */}

            <div className="tab-pane fade" id="experience" style={{ padding: "20px" }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <h4 className="text-dark mb-4" style={{ borderBottom: "2px solid #007bff", paddingBottom: "5px" }}>
                  Experience
                </h4>
                <h4 onClick={() => handleOpenModel('addexperience')} className="text-dark mb-4" style={{ cursor:'pointer', borderBottom: "2px solid #007bff", paddingBottom: "5px" }}>
                  Add More Experience
                </h4>
              </div>

              {data.training_Experience.map((item, index) => (
  <div
    key={index}
    className="card shadow-sm mb-3 border-0"
    style={{ padding: "15px", borderRadius: "8px", backgroundColor: "#7C99AC", color: "white" }}
  >
    {/* Experience Duration with Edit & Delete Icons */}
    <div className="d-flex justify-content-between align-items-center mb-2">
      <p className="mb-0 fw-bold" style={{ fontSize: "14px", color: "white" }}>
        {item.from} - {item.to}
      </p>
      <div>
        <FaEdit 
          onClick={() => handleOpenModel("experience", index)} 
          className="text-warning cursor-pointer me-2"
          size={18}
          style={{ cursor: "pointer" }}
        />
        <MdDelete 
          onClick={() => handleOpenDeleteModel("deleteexperience", index)} 
          className="btn btn-danger p-1"
          size={18}
          style={{ cursor: "pointer", borderRadius: "4px" }}
        />
      </div>
    </div>

    {/* Company and Job Title */}
    <p className="mb-1 fw-semibold" style={{ fontSize: "16px", color: "white" }}>
      {item.training_company} - <span>{item.course_job}</span>
    </p>

    {/* Description */}
    <p style={{ fontSize: "14px", lineHeight: "1.5", color: "white" }}>
      {item.description}
    </p>
  </div>
))}

            </div>

          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  {editField === "profilePhoto" ? (
    <Form.Group>
      <Form.Label>Upload Image</Form.Label>
      <Form.Control 
        type="file" 
        onChange={(e) => setImageFile(e.target.files[0])} 
        style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ced4da" }}
      />
    </Form.Group>
  ) : editField === "resume" ? (
    <Form.Group>
      <Form.Label>Upload Resume</Form.Label>
      <Form.Control 
        type="file" 
        onChange={(e) => setImageFile(e.target.files[0])} 
        style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ced4da" }}
      />
    </Form.Group>
  ) : editField === "projects" || editField === "addprojects" ? (
    <div className="card shadow-sm border-0 position-relative p-3">
      <Form.Group className="mb-3">
        <Form.Label>Project Image</Form.Label>
        <Form.Control 
          name="projectImage" 
          type="file" 
          onChange={editField === "projects" ? handleProjectDetailsChange : handleAddProjectDetailsChange} 
        />
      </Form.Group>

      {[
        { label: "Project Name", name: "projectName", type: "text" },
        { label: "Project Description", name: "projectDescription", type: "textarea" },
        { label: "Tech Stack", name: "techStack", type: "text" },
        { label: "Live Link", name: "liveLink", type: "text" },
        { label: "GitHub Link", name: "githubLink", type: "text" }
      ].map(({ label, name, type }) => (
        <Form.Group className="mb-3" key={name}>
          <Form.Label>{label}</Form.Label>
          <Form.Control 
            as={type === "textarea" ? "textarea" : "input"} 
            name={name} 
            type={type} 
            value={(editField === "projects" ? selectedProject : addProject)?.[name] || ""} 
            onChange={editField === "projects" ? handleProjectDetailsChange : handleAddProjectDetailsChange} 
          />
        </Form.Group>
      ))}
    </div>
  ) : editField === "aboutMe" ? (
    <Form.Group>
      <Form.Label>Update About Me</Form.Label>
      <Form.Control 
        name="bio" 
        type="text" 
        value={updateBio?.bio} 
        onChange={handleBioDetailsChange} 
      />
    </Form.Group>
  ) : editField === "skills" ? (
    <Form.Group>
      <Form.Label>Update Skills</Form.Label>
      <Form.Control 
        name="skills" 
        type="text" 
        value={updateSkills?.skills} 
        onChange={handleSkillsDetailsChange} 
      />
    </Form.Group>
  ) : editField === "experience" || editField === "addexperience" ? (
    <Form.Group>
      <Form.Label>{editField === "experience" ? "Update Experience" : "Add Experience"}</Form.Label>
      {[
        { label: "Company Name", name: "training_company", type: "text" },
        { label: "From", name: "from", type: "date" },
        { label: "To", name: "to", type: "date" },
        { label: "Position", name: "course_job", type: "text" },
        { label: "Description", name: "description", type: "text" }
      ].map(({ label, name, type }) => (
        <Form.Group className="mb-3" key={name}>
          <Form.Label>{label}</Form.Label>
          <Form.Control 
            name={name} 
            type={type} 
            value={(editField === "experience" ? experienceDetails : addexperienceDetails)?.[name] || ""} 
            onChange={editField === "experience" ? handleExperienceDetailsChange : handleAddExperienceDetailsChange} 
          />
        </Form.Group>
      ))}
    </Form.Group>
  ) : (
    <Form.Group>
      <Form.Label>Update Personal Details</Form.Label>
      {[
        { label: "Name", name: "name", type: "text" },
        { label: "Tag Line", name: "tagLine", type: "text" },
        { label: "LinkedIn", name: "linkedin", type: "text" },
        { label: "Email", name: "email", type: "email" }
      ].map(({ label, name, type }) => (
        <Form.Group className="mb-3" key={name}>
          <Form.Label>{label}</Form.Label>
          <Form.Control 
            name={name} 
            type={type} 
            value={personalDetails?.[name] || ""} 
            onChange={handlePersonalDetailsChange} 
          />
        </Form.Group>
      ))}
    </Form.Group>
  )}
</Modal.Body>


        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={deleteShow} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        {deleteField === 'Deleteprojects' ? <>
          <Modal.Body>
            <p>Are you sure you want to delete this item? This action cannot be undone.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirm}>
              Delete
            </Button>
          </Modal.Footer>
        </> : deleteField === 'deleteexperience' ? <>
          <Modal.Body>
            <p>Are you sure you want to delete this item? This action cannot be undone.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirm}>
              Delete
            </Button>
          </Modal.Footer>
        </> : null}

      </Modal>

      {/* Footer */}
      <footer className="text-center p-3 mt-3 border" style={{ backgroundColor: "white", color: "black" }}>
        <small>&copy; {new Date().getFullYear()} {data.name}. All Rights Reserved.</small>
      </footer>

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
          
          .position-relative {
            position: relative;
          }

          .btn-warning {
            border-radius: 50%;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .cursor-pointer {
            cursor: pointer;
          }

          @media (max-width: 768px) {
            .col-md-3 {
              width: 100%;
              text-align: center;
            }
            
            .col-md-9 {
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default UpdatePortfolioPage;
