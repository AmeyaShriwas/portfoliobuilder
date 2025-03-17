import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import { Button, Form } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom'
import { addPersonalDetails, addEducationalDetails, addTrainingExperienceDetails, addSkillDetails, addBioDetails } from '../../Redux/Slices/ResumeSlice'
import { useDispatch, useSelector } from 'react-redux'
import PersonalDetails from './PersonalDetails'
import EducationalDetails from './EducationalDetails'
import Training_ExperienceDetails from './Training_ExperienceDetails'
import SkillsDetails from './SkillsDetails'
import Steps from './Steps'
import AddBio from './AddBio'
import swal from "sweetalert";



const ResumeBuild = ({ isMobile, setIsMobile }) => {

    const [activeForm, setActiveForm] = useState('personalDetails')
    const [personalData, setPersonalData] = useState({ photo: '', fullName: '', email: '', number: '', address: '' })
    const [educationalData, setEducationalData] = useState([{ university_school: '', degree_class: '', from: '', to: '' }])
    const [skillData, setSkillData] = useState([{ skill: '' }])
    const [training_experience, settraining_experienceData] = useState([{ training_company: '', course_job: '', from: '', to: '', description: '' }])
    const [bio, setBio] = useState({bio:''})
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const personalDetails = useSelector(state => state.resume.personalDetails)
    const educationalDetailsGet = useSelector(state => state.resume.educationalDetails)
    const trainig_ExperienceDetails = useSelector(state => state.resume.traningExperienceDetails)
    const skillsDetailsGet = useSelector(state => state.resume.skillDetails)
    const bioDetails = useSelector(state => state.resume.bio)
    const [image, setImage] = useState(null);



    const toggleForm = () => {
        switch (activeForm) {
            case 'personalDetails':
                return <PersonalDetails image={image} personalData={personalData} setPersonalData={setPersonalData} personalDetails={personalDetails} handleDataChange={handleDataChange} handleNextFuntion={handleNextFuntion} setActiveForm={setActiveForm}/>
            case 'educationalForm':
                return <EducationalDetails educationalData={educationalData} setEducationalData={setEducationalData} educationalDetailsGet={educationalDetailsGet} handleDataChange={handleDataChange} handleAddMoreEducation={handleAddMoreEducation} handleRemoveEducation={handleRemoveEducation} setActiveForm={setActiveForm} handleNextFuntion={handleNextFuntion}/>
            case 'trainig_experience':
                return <Training_ExperienceDetails training_experience={training_experience} settraining_experienceData={settraining_experienceData} handleDataChange={handleDataChange} trainig_ExperienceDetails={trainig_ExperienceDetails} handleAddMoreTraining_Experience={handleAddMoreTraining_Experience} handleRemoveTraining_Experience={handleRemoveTraining_Experience} setActiveForm={setActiveForm} handleNextFuntion={handleNextFuntion}/>
            case 'skillData':
                return <SkillsDetails skillData={skillData} setSkillData={setSkillData} skillsDetailsGet={skillsDetailsGet} handleDataChange={handleDataChange} handleAddMoreSkill={handleAddMoreSkill} handleRemoveSkill={handleRemoveSkill} setActiveForm={setActiveForm} handleNextFuntion={handleNextFuntion}/>
            case 'bio':
            return <AddBio bio={bio} setBio={setBio} bioDetails={bioDetails} handleDataChange={handleDataChange} setActiveForm={setActiveForm} handleNextFunction={handleNextFuntion}/>
        }
    }

    const handleDataChange = (e, index) => {
        const { name, value, files } = e.target;
        const formType = e.target.getAttribute('formDetail');
      
        if (formType === 'personal') {
            if (files) {
                console.log('files', files);
                const file = files[0];
                const reader = new FileReader();
            
                reader.onloadend = () => {
                    const imageData = reader.result; // Store the result before setting state
                    setImage(imageData);
            
                    setPersonalData(prev => ({
                        ...prev,
                        [name]: imageData // Use the latest image data here
                    }));
                };
            
                if (file) {
                    reader.readAsDataURL(file);
                } else {
                    setPersonalData(prev => ({
                        ...prev,
                        [name]: value
                    }));
                }
            }
            
            else{
                setPersonalData(prev => ({
                    ...prev,
                    [name] : value
                }));
            }
          
        }else if (formType === 'bio') {
            setBio(prev => ({
                ...prev,
                [name] : value
            }));
        }
         else if (formType === 'educational') {
            setEducationalData(prev => prev.map((data, i) => (i === index ? { ...data, [name]: value } : data)));
        } else if (formType === 'training_experience') {
            settraining_experienceData(prev => prev.map((data, i) => (i === index ? { ...data, [name]: value } : data)));
        } else if (formType === 'skill') {
            setSkillData(prev => prev.map((data, i) => (i === index ? { ...data, [name]: value } : data)));
        }
    };

    const handleNextFuntion = (e) => {
        if (e === 'personal') {
            dispatch(addPersonalDetails(personalData))
            swal('Succes', 'Saved Successfully')
           
        }
        if (e === 'educational') {
            console.log('edu', educationalData)
            dispatch(addEducationalDetails(educationalData))
            swal('Succes', 'Saved Successfully')
          
        }
        if (e === 'training_experience') {
            dispatch(addTrainingExperienceDetails(training_experience))
            swal('Succes', 'Saved Successfully')
        }
        if (e === 'skill') {
            dispatch(addSkillDetails(skillData))
            swal('Succes', 'Saved Successfully')
        }
        if (e === 'bio') {
            dispatch(addBioDetails(bio))
            swal('Succes', 'Saved Successfully')
          
        }
    }

    const handleAddMoreEducation = () => {
        const educationalDataGet = JSON.parse(JSON.stringify(educationalData))
        educationalDataGet.push({ university_school: '', degree_class: '', from: '', to: '' })
        setEducationalData(educationalDataGet)
    }

    const handleRemoveEducation = (index) => {
        const educationalDataGet = JSON.parse(JSON.stringify(educationalData))
        const updateData = educationalDataGet.filter((data, i) => i !== index)
        setEducationalData(updateData)
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

    const handleAddMoreSkill = () => {
        const skillDataGet = JSON.parse(JSON.stringify(skillData))
        skillDataGet.push({ skill: '' })
        setSkillData(skillDataGet)
    }

    const handleRemoveSkill = (index) => {
        const skillDataGet = JSON.parse(JSON.stringify(skillData))
        const updateData = skillDataGet.filter((data, i) => i !== index)
        setSkillData(updateData)
    }

    const steps = [
        "Personal Details",
        "Educational Details",
        "Training and Experience Details",
        "Skills Details",
        "Add Bio",
        "Download Resume"
    ];

    return (
        <>
        <Header isMobile={isMobile} setIsMobile={setIsMobile} />
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div className="p-4">
                <span className="p-1" style={{ fontSize: '30px' }}>Start Building Your Resume</span>
            </div>
            <Steps steps={steps} isMobile={isMobile}  activeForm={activeForm}/>
            <div className="d-flex justify-content-center flex-grow-1">
                {toggleForm()}
            </div>
            <Footer  isMobile={isMobile}/>
        </div>
    </>
    
    )
}

export default ResumeBuild
