import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { addPortfolioDetails } from "../../Redux/Slices/PortfolioSlice";
import { useDispatch, useSelector } from "react-redux";
import swal from 'sweetalert'

const PortfolioDetails = () => {
  const [personalData, setPersonalData] = useState({});
  const [projects, setProjects] = useState([
    { projectName: "", projectDescription: "", projectImage: null, techStack: "", liveLink: "", githubLink: "" },
  ]);
  const dispatch = useDispatch()
  const {token} = useSelector(state=> state.user)
  const [training_experience, settraining_experienceData] = useState([{ training_company: '', course_job: '', from: '', to: '', description: '' }])
  

  const handlePersonalDataChange = (e) => {
    const { name, files, value } = e.target;
    setPersonalData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleProjectDataChange = (index, event) => {
    const { name, value, type, files } = event.target;
    const updatedProjects = [...projects];
    updatedProjects[index][name] = type === "file" ? files[0] : value;
    setProjects(updatedProjects);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    console.log('personal', personalData);
    console.log('project', projects);
  
    // Append personal data
    Object.entries(personalData).forEach(([key, value]) => {
      formData.append(key, value);
    });
  
    // Append project images separately under "projectImages"
    projects.forEach((project) => {
      if (project.projectImage) {
        formData.append("projectImages", project.projectImage);
      }
    });

      formData.append('training_Experience', JSON.stringify(training_experience));
    
    
    // Append other project details as JSON string
    const projectsData = projects.map(({ projectImage, ...rest }) => rest); // Exclude images
    formData.append("projects", JSON.stringify(projectsData));
    formData.append('userId', token)
    // Log FormData
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
  
    dispatch(addPortfolioDetails(formData)).then((response) => {
      console.log('res', response)
      if (response.payload.status) {
        swal('Success', response.payload.message);
      } else {
        swal('Error', response.payload.message);
      }
    });
  };
  
  const handleDataChange = (e, index)=> {
    const { name, value } = e.target;
    settraining_experienceData(prev => prev.map((data, i) => (i === index ? { ...data, [name]: value } : data)));

  }

  const handleAddMoreTraining_Experience = () => {
    const training_experienceDataGet = JSON.parse(JSON.stringify(training_experience))
    training_experienceDataGet.push({ training_company: '', course_job: '', from: '', to: '', description: '' })
    settraining_experienceData(training_experienceDataGet)
}

const handleRemoveTraining_Experience = (index) => {
  const training_experienceDataGet = JSON.parse(JSON.stringify(training_experience))
  const updateData = training_experienceDataGet.filter((data, i) => i !== index)
  settraining_experienceData(updateData)
}

  return (
    <div className="container mt-4">
      <Form className="p-4 border rounded bg-light shadow-sm" onSubmit={handleSubmit} encType="multipart/form-data">
        <h3 className="text-center mb-4">Personal Details</h3>
        <div className="row">
          <Form.Group className="col-md-6 mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" placeholder="Ameya Shriwas" name="name" onChange={handlePersonalDataChange} />
          </Form.Group>

          <Form.Group className="col-md-6 mb-3">
            <Form.Label>Profile Photo</Form.Label>
            <Form.Control type="file" name="profilePhoto" onChange={handlePersonalDataChange} />
          </Form.Group>

          <Form.Group className="col-md-6 mb-3">
            <Form.Label>Tag Line</Form.Label>
            <Form.Control type="text" name="tagLine" onChange={handlePersonalDataChange} />
          </Form.Group>

          <Form.Group className="col-md-12 mb-3">
            <Form.Label>Short Bio</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Your expertise and what you do" name="bio" onChange={handlePersonalDataChange} />
          </Form.Group>

          <Form.Group className="col-md-6 mb-3">
            <Form.Label>LinkedIn Profile</Form.Label>
            <Form.Control type="text" placeholder="LinkedIn Link" name="linkedin" onChange={handlePersonalDataChange} />
          </Form.Group>

          <Form.Group className="col-md-6 mb-3">
            <Form.Label>Resume (PDF)</Form.Label>
            <Form.Control type="file" name="resume" onChange={handlePersonalDataChange} />
          </Form.Group>
        </div>

        <h3 className="text-center mt-5 mb-4">Skills & Tech Stack</h3>
        <Form.Group className="mb-3">
          <Form.Label>Skill & Tech</Form.Label>
          <Form.Control type="text" placeholder="JavaScript, TypeScript, Python" name="skills" onChange={handlePersonalDataChange} />
        </Form.Group>

        <h3 className="text-center mt-5 mb-4">Projects</h3>
        {projects.map((item, index) => (
          <div key={index} className="row mb-3 p-3 border rounded bg-light">
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Project Name</Form.Label>
              <Form.Control type="text" placeholder="Project One" value={item.projectName} name="projectName" onChange={(e) => handleProjectDataChange(index, e)} />
            </Form.Group>

            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Project Description</Form.Label>
              <Form.Control as='textarea' placeholder="Project Description" value={item.projectDescription} name="projectDescription" onChange={(e) => handleProjectDataChange(index, e)} />
            </Form.Group>

            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Tech Stack</Form.Label>
              <Form.Control type="text" placeholder="React, Node.js" value={item.techStack} name="techStack" onChange={(e) => handleProjectDataChange(index, e)} />
            </Form.Group>

            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Live Link</Form.Label>
              <Form.Control type="text" placeholder="https://project-live.com" value={item.liveLink} name="liveLink" onChange={(e) => handleProjectDataChange(index, e)} />
            </Form.Group>

            <Form.Group className="col-md-6 mb-3">
              <Form.Label>GitHub Repository</Form.Label>
              <Form.Control type="text" placeholder="https://github.com/project" value={item.githubLink} name="githubLink" onChange={(e) => handleProjectDataChange(index, e)} />
            </Form.Group>

            <Form.Group className="col-md-12 mb-3">
              <Form.Label>Project Image</Form.Label>
              <Form.Control type="file" name="projectImage" onChange={(e) => handleProjectDataChange(index, e)} />
            </Form.Group>

            {index > 0 && (
              <div className="col-md-12 text-end">
                <Button variant="danger" onClick={() => setProjects((prev) => prev.filter((_, i) => i !== index))}>
                  Remove
                </Button>
              </div>
            )}
          </div>
        ))}

        <div className="mt-3 text-center">
          <Button variant="primary" onClick={() => setProjects([...projects, { projectName: "", projectDescription: "", projectImage: null, techStack: "", liveLink: "", githubLink: "" }])}>
            Add More
          </Button>
        </div>

         <div className="container py-3">
                    <h4 className="text-center text-secondary mb-3">
                        🏫 Enter Your Training/Experience Details
                    </h4>
        
                    {training_experience.map((data, index) => (
                        <Form key={index} className="border rounded p-4 mb-3 shadow-sm bg-light">
                            <div className="row">
                                <Form.Group className="col-md-6 mb-3">
                                    <Form.Label>Training Institute / Company Name</Form.Label>
                                    <Form.Control
                                        formdetail="training_experience"
                                        name="training_company"
                                        value={data.training_company}
                                        onChange={(e) => handleDataChange(e, index)}
                                        type="text"
                                        placeholder="Enter company name"
                                    />
                                </Form.Group>
        
                                <Form.Group className="col-md-6 mb-3">
                                    <Form.Label>Course Name / Job Position</Form.Label>
                                    <Form.Control
                                        formdetail="training_experience"
                                        name="course_job"
                                        value={data.course_job}
                                        onChange={(e) => handleDataChange(e, index)}
                                        type="text"
                                        placeholder="Enter course or job position"
                                    />
                                </Form.Group>
        
                                <Form.Group className="col-md-6 mb-3">
                                    <Form.Label>From</Form.Label>
                                    <Form.Control
                                        formdetail="training_experience"
                                        name="from"
                                        value={data.from}
                                        onChange={(e) => handleDataChange(e, index)}
                                        type="date"
                                    />
                                </Form.Group>
        
                                <Form.Group className="col-md-6 mb-3">
                                    <Form.Label>To</Form.Label>
                                    <Form.Control
                                        formdetail="training_experience"
                                        name="to"
                                        value={data.to}
                                        onChange={(e) => handleDataChange(e, index)}
                                        type="date"
                                    />
                                </Form.Group>
        
                                <Form.Group className="col-12 mb-3">
                                    <Form.Label>Short Description</Form.Label>
                                    <Form.Control
                                        formdetail="training_experience"
                                        name="description"
                                        value={data.description}
                                        onChange={(e) => handleDataChange(e, index)}
                                        as="textarea"
                                        rows={3}
                                        maxLength={300}
                                        placeholder="Describe your training or experience"
                                    />
                                </Form.Group>
                            </div>
        
                            <div className="d-flex justify-content-between">
                                <Button variant="outline-primary" onClick={handleAddMoreTraining_Experience}>➕ Add More</Button>
                                {index > 0 && (
                                    <Button variant="outline-danger" onClick={() => handleRemoveTraining_Experience(index)}>❌ Remove</Button>
                                )}
                            </div>
                        </Form>
                    ))}
                </div>

        <h3 className="text-center mt-5 mb-4">Contact</h3>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="your.email@example.com" name="email" onChange={handlePersonalDataChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" placeholder="+1234567890" name="phone" onChange={handlePersonalDataChange} />
        </Form.Group>

        <div className="text-end mt-4">
          <Button variant="success" type="submit" className="me-2">Save</Button>
        </div>
      </Form>
    </div>
  );
};

export default PortfolioDetails;
