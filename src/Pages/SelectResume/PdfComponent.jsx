import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Modal, Button, Form } from "react-bootstrap";
import Spinner from "../../Components/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { addColor } from "../../Redux/Slices/ResumeSlice";
import pdf1 from './../../Assets/img1.png'
import pdf2 from './../../Assets/img2.png'
import pdf3 from './../../Assets/img3.png'
import pdf4 from './../../Assets/img4.png'
import pdf5 from './../../Assets/img5.png'
import pdf6 from './../../Assets/img6.png'
import pdf7 from './../../Assets/img7.png'
import pdf8 from './../../Assets/img8.png'
import pdf9 from './../../Assets/img9.png'

import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const PdfComponent = ({ data, isMobile, setIsMobile }) => {
  const [pdfUrls, setPdfUrls] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [bgColor, setBgColor] = useState("");
  const [textColor, setTextColor] = useState("");
  const dispatch = useDispatch()
  const colorsGet = useSelector(state => state.color)
  const [isLoading, setIsLoading] = useState(true);
  const datas = useSelector(state=> state.user)
  console.log('data', datas)
  const [paid, setPaid] = useState(false)
  const navigate = useNavigate()


  // const pdfDummu = [
  //   pdf1, pdf2, pdf3, pdf4, pdf5, pdf6, pdf7, pdf8
  // ]

  const pdfDummu = [
    pdf1, pdf2, pdf3, pdf4, pdf5, pdf6, pdf7, pdf8, pdf9
  ]
  // console.log('pdfD', pdfDummu)

  const resumeColors = [
    { bgColor: "rgb(225, 61, 99)", textColor: "rgb(255, 255, 255)" }, // Format 1
    { bgColor: "rgb(34, 109, 11)", textColor: "rgb(255, 255, 255)" }, // Format 2
    { bgColor: " #282c36", textColor: "rgb(255, 255, 255)" }, // Format 3
    { bgColor: "rgb(55, 49, 49)", textColor: "rgb(255, 255, 255)" }, // Format 4
    { bgColor: "rgb(235, 89, 67)", textColor: "rgb(255, 255, 255)" }, // Format 5
  ];

  useEffect(() => {
    dispatch(addColor(resumeColors))
  }, [])

useEffect(() => {
  const fetchPlan = async () => {
    try {
      const response = await axios.get(
        `https://api.resumeportfolio.ameyashriwas.in/plan/${datas?.data?.id}`
      );

      console.log("data", response.data);

      if (!response.data.success) {
        return;
      } else {
        setPaid(true);
      }
    } catch (error) {
      console.error("Error fetching plan:", error);
    }
  };

  if (datas?.data?.id) {
    fetchPlan();
  }
}, [datas?.data?.id]);


  const generatePDF = (autoDisplay = false) => {
    //   if (!data || Object.keys(data).length === 0) return; // Ensure data exists
    //   const hasValidArrayData =
    //   Array.isArray(data.educational) && data.educational.length > 0 &&
    //   Array.isArray(data.training_expe) && data.training_expe.length > 0 &&
    //   Array.isArray(data.skill) && data.skill.length > 0;

    // if (!hasValidArrayData) {
    //  return
    // }
    return new Promise((resolve, reject) => {
      const htmlString = [
        `<html>
      <body>
        <style>
          body {
            font-family: Arial, sans-serif;
            width: 210mm;
            height: 297mm;
            margin: 0 auto;
            padding: 5mm;
            box-sizing: border-box;
            background-color: white;
          }
          .resume-container {
            background: white;
            padding: 20px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            display: flex;
            align-items: center;
            background:${resumeColors[0].bgColor};
            color:${resumeColors[0].textColor};
            padding: 20px;
            border-radius: 8px;
          }
            .headerTwo {
            margin-top:20px;
            }
          .profile-img {
            max-width: 80px;
            max-height: 80px;
            border-radius: 50%;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            font-weight: bold;
            color:${resumeColors[0].bgColor};
            margin-right: 20px;
          }
          .header-text {
            flex: 1;
          }
          .name {
            font-size: 32px;
            font-weight: bold;
            text-transform: uppercase;
          }
          .contact {
            font-size: 14px;
            margin-top: 5px;
          }
          .content-wrapper {
            display: flex;
            margin-top: 20px;
          }
          .left-section {
            width: 70%;
            padding-right: 20px;
            border-right: 2px solid #ddd;
          }
          .right-section {
            width: 30%;
            padding-left: 20px;
          }
          .section-title {
            font-size: 24px;
            font-weight: bold;
            color:${resumeColors[0].bgColor};
            margin-bottom: 20px;
          }
          .experience-item,
          .education-item {
            margin-bottom: 25px;
          }
          .date-range {
            font-size: 14px;
            color: #666;
            font-weight: bold;
          }
          .job-title {
            font-size: 16px;
            font-weight: bold;
            margin-top: 5px;
          }
          .description {
            font-size: 14px;
            color: #333;
            margin-top: 5px;
          }
          .skills {
            margin-top: 10px;
            display: flex;
            flex-wrap: wrap;
          }
          .skill-badge {
            background:${resumeColors[0].bgColor};
            color: ${resumeColors[0].textColor};
            padding: 5px 10px;
            margin: 5px;
            border-radius: 4px;
            font-size: 12px;
          }
        </style>

        <div class="resume-container">
          <div class="header">
<div class="profile-img">
  <img class="profile-img" src=${data.personal.photo} alt="Profile" />
</div>


            <div class="header-text">
              <div class="name">${data.personal.fullName || "Your Name"}</div>
              <div class="contact">📧 ${data.personal.email || ""} | 📞 ${data.personal.number || ""} | 📍 ${data.personal.address || ""}</div>
            </div>
          </div>

           <div class="headerTwo">
         
            <div class="header-text">
            <div class="section-title">About Me</div>
              <div class="">${data.bio.bio || "Your Name"}</div>
            </div>
          </div>

          <div class="content-wrapper">
            <div class="left-section">
              <div class="section-title">Experience & Training</div>
              ${data.training_expe
          .map(
            (exp) => `
                  <div class="experience-item">
                    <div class="date-range">${exp.from} - ${exp.to}</div>
                    <div class="job-title">${exp.training_company} - ${exp.course_job}</div>
                    <div class="description">${exp.description}</div>
                  </div>
                `
          )
          .join("")}
            </div>

            <div class="right-section">
              <div class="section-title">Education</div>
              ${data.educational
          .map(
            (edu) => `
                  <div class="education-item">
                    <div class="date-range">${edu.from} - ${edu.to}</div>
                    <div class="job-title">${edu.university_school} - ${edu.degree_class}</div>
                  </div>
                `
          )
          .join("")}

              <div class="section-title">Skills</div>
              <div class="skills">
                ${data.skill.map((s) => `<div class="skill-badge">${s.skill}</div>`).join("")}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
 `,


        `<html>
  <body>
    <style>
      body {
        font-family: Arial, sans-serif;
        width: 210mm;
        height: 297mm;
        margin: 0 auto;
        padding: 5mm;
        box-sizing: border-box;
        background-color: white;
      }
        .name {
         font-size: 32px;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 30px;
            color:${resumeColors[1].textColor};
        }
      .resume-container {
        background: white;
        padding: 20px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        display: flex;
        height: 100%
      }
          .headerTwo {
            margin-top:20px;
            margin-bottom:20px;
            }
      .left-section {
        width: 30%;
        background:${resumeColors[1].bgColor};
        padding: 20px;
        border-radius: 8px;
      }
      .profile-img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        font-weight: bold;
        color: darkgreen;
        margin: 0 auto 20px;
      }
      .personal-details, {
        margin-bottom: 20px;
        color:${resumeColors[1].textColor};
      }
        .education, .skills {
        margin-bottom: 20px;
        color:${resumeColors[1].textColor};
      }
      .section-title {
        font-size: 20px;
        font-weight: bold;
        color: darkgreen;
        margin-bottom: 10px;
      }
         .section-titles {
        font-size: 20px;
        font-weight: bold;
        color: ${resumeColors[1].textColor};
        margin-bottom: 10px;
        margin-top:20px
      }
      .contact {
        font-size: 14px;
        color:${resumeColors[1].textColor};
      }
      .skills .skill-badge {
        background: darkgreen;
        color: ${resumeColors[1].textColor};
        padding: 5px 10px;
        margin: 5px 0;
        border-radius: 4px;
        font-size: 12px;
        display: block;
      }
      .right-section {
        width: 70%;
        padding-left: 20px;
      }
      .experience-item {
        margin-bottom: 15px;
      }
    //   .date-range {
    //     font-size: 14px;
    //     color: #666;
    //     font-weight: bold;
    //   },
        .date-ranges {
        font-size: 14px;
        color: ${resumeColors[1].textColor};
        font-weight: bold;
        margin-top: 25px
      }
      .job-title {
        font-size: 16px;
        font-weight: bold;
        margin-top: 5px;
      }
         .job-titles {
        font-size: 16px;
        font-weight: bold;
        margin-top: 15px;
      }
      .description {
        font-size: 14px;
        color: #333;
        margin-top: 5px;
      }
    </style>

    <div class="resume-container">

      <div class="left-section">
           <div class="name">${data.personal.fullName || "Your Name"}</div>
        <div class="personal-details">
          <div class="section-titles">Personal Details</div>
          <div class="contact">📧 ${data.personal.email || ""} <br> 📞 ${data.personal.number || ""} <br> 📍 ${data.personal.address || ""}</div>
        </div>
        <div class="education">
          <div class="section-titles">Education</div>
          ${data.educational.map((edu) => `
            <div class="education-item">
              <div class="date-ranges">${edu.from} - ${edu.to}</div>
              <div class="job-titles">${edu.university_school} - ${edu.degree_class}</div>
            </div>
          `).join("")}
        </div>
        <div class="skills">
          <div class="section-titles">Skills</div>
          ${data.skill.map((s) => `<div class="skill-badge">${s.skill}</div>`).join("")}
        </div>
      </div>

      <div class="right-section">
      
           <div class="headerTwo">
         
            <div class="header-text">
            <div class="section-title">About Me</div>
              <div class="">${data.bio.bio || "Your Name"}</div>
            </div>
          </div>
        <div class="section-title">Experience & Training</div>
        ${data.training_expe.map((exp) => `
          <div class="experience-item">
            <div class="date-range">${exp.from} - ${exp.to}</div>
            <div class="job-title">${exp.training_company} - ${exp.course_job}</div>
            <div class="description">${exp.description}</div>
          </div>
        `).join("")}
      </div>
    </div>
  </body>
</html>`,


        `<html>
  <body>
    <style>
      body {
        font-family: Arial, sans-serif;
        width: 210mm;
        height: 297mm;
        margin: 0 auto;
        padding: 10mm;
        box-sizing: border-box;
        background-color: #1e1e2e;
        color: ${resumeColors[2].textColor};
      }
      .resume-container {
        display: flex;
        background:${resumeColors[2].bgColor};
        box-shadow: 0px 0px 15px rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        overflow: hidden;
        height: 100%
      }
      .sidebar {
        width: 30%;
        background: #181a22;
        padding: 20px;
        text-align: center;
      }
      .profile-img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background:${resumeColors[2].textColor};;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        font-weight: bold;
        color: #181a22;
        margin: 0 auto 20px;
      }
      .section-title {
        font-size: 18px;
        font-weight: bold;
        color: #4caf50;
        margin-bottom: 10px;
        border-bottom: 2px solid #4caf50;
        padding-bottom: 5px;
          margin-top:20px;
      }
      .contact-info, .education, .skills {
        text-align: left;
        font-size: 14px;
        margin-top: 10px;
      }
      .skill-badge {
        background: #4caf50;
        color: ${resumeColors[2].textColor};
        padding: 6px 12px;
        margin: 4px 0;
        border-radius: 4px;
        font-size: 12px;
        display: inline-block;
      }
      .main-content {
        width: 70%;
        padding: 30px;
      }
      .name {
        font-size: 28px;
        font-weight: bold;
        text-transform: uppercase;
      }
      .experience-item {
        margin-bottom: 20px;
      }
      .date-range {
        font-size: 14px;
        color: #4caf50;
        font-weight: bold;
      }
      .job-title {
        font-size: 16px;
        font-weight: bold;
        margin-top: 5px;
      }
      .description {
        font-size: 14px;
        color: #ddd;
        margin-top: 5px;
      }
    </style>

    <div class="resume-container">
      <div class="sidebar">
       <div class="profile-img">
  <img class="profile-img" src=${data.personal.photo} alt="Profile" />
</div>
        <div class="section-title">Contact</div>
        <div class="contact-info">📧 ${data.personal.email || ""} <br> 📞 ${data.personal.number || ""} <br> 📍 ${data.personal.address || ""}</div>
        
        <div class="section-title">Education</div>
        ${data.educational.map((edu) => `
          <div class="education">
            <div class="date-range">${edu.from} - ${edu.to}</div>
            <div>${edu.university_school} - ${edu.degree_class}</div>
          </div>
        `).join("")}
        
        <div class="section-title">Skills</div>
        ${data.skill.map((s) => `<div class="skill-badge">${s.skill}</div>`).join("")}
      </div>

      <div class="main-content">
        <div class="name">${data.personal.fullName || "Your Name"}</div>
        <div class="section-title">About Me</div>
        <div>${data.bio.bio || "Your Bio Here"}</div>
        
        <div class="section-title">Experience & Training</div>
        ${data.training_expe.map((exp) => `
          <div class="experience-item">
            <div class="date-range">${exp.from} - ${exp.to}</div>
            <div class="job-title">${exp.training_company} - ${exp.course_job}</div>
            <div class="description">${exp.description}</div>
          </div>
        `).join("")}
      </div>
    </div>
  </body>
</html>
`,
        `<html>
<head>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      width: 210mm;
      height: 297mm;
      margin: 0 auto;
      padding: 4mm;
      box-sizing: border-box;
      background-color: #121212;
      color: #ffffff;
    }
    .resume-container {
      display: flex;
      background: #1e1e1e;
      box-shadow: 0px 0px 15px rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      overflow: hidden;
      height: 100%
    }
    .sidebar {
      width: 35%;
      background: #181a1f;
      padding: 25px;
      text-align: center;
      color: #ffffff;
      height: 100%
    }
    .profile-img {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 26px;
      font-weight: bold;
      color: #181a1f;
      margin: 0 auto 20px;
    }
    .section-title {
      font-size: 20px;
      font-weight: bold;
      color: #ff9800;
      margin-bottom: 12px;
      border-bottom: 2px solid #ff9800;
      padding-bottom: 6px;
      text-align: left;
      margin-top:20px;
    }
    .contact-info, .education, .skills {
      text-align: left;
      font-size: 15px;
      margin-top: 10px;
    }
    .skill-badge {
      background: #ff9800;
      color: white;
      padding: 6px 14px;
      margin: 5px 2px;
      border-radius: 6px;
      font-size: 13px;
      display: inline-block;
    }
    .main-content {
      width: 65%;
      padding: 35px;
      background: ${resumeColors[3].bgColor};
    }
    .name {
      font-size: 30px;
      font-weight: bold;
      text-transform: uppercase;
      color: #ff9800;
      margin-bottom: 15px;
    }
    .experience-item {
      margin-bottom: 25px;
    }
    .date-range {
      font-size: 15px;
      color: #ff9800;
      font-weight: bold;
    }
    .job-title {
      font-size: 17px;
      font-weight: bold;
      margin-top: 6px;
      color: #ffffff;
    }
    .description {
      font-size: 14px;
      color: #ddd;
      margin-top: 6px;
    }
  </style>
</head>
<body>
  <div class="resume-container">
    <div class="sidebar">
     <div class="profile-img">
  <img class="profile-img" src=${data.personal.photo} alt="Profile" />
</div>
      <div class="section-title">Contact</div>
      <div class="contact-info">📧 ${data.personal.email || ""} <br> 📞 ${data.personal.number || ""} <br> 📍 ${data.personal.address || ""}</div>
      
      <div class="section-title">Education</div>
      ${data.educational.map((edu) => `
        <div class="education">
          <div class="date-range">${edu.from} - ${edu.to}</div>
          <div>${edu.university_school} - ${edu.degree_class}</div>
        </div>
      `).join("")}
      
      <div class="section-title">Skills</div>
      ${data.skill.map((s) => `<div class="skill-badge">${s.skill}</div>`).join("")}
    </div>
    <div class="main-content">
      <div class="name">${data.personal.fullName || "Your Name"}</div>
      <div class="section-title">About Me</div>
      <div>${data.bio.bio || "Your Bio Here"}</div>
      
      <div class="section-title">Experience & Training</div>
      ${data.training_expe.map((exp) => `
        <div class="experience-item">
          <div class="date-range">${exp.from} - ${exp.to}</div>
          <div class="job-title">${exp.training_company} - ${exp.course_job}</div>
          <div class="description">${exp.description}</div>
        </div>
      `).join("")}
    </div>
  </div>
</body>
</html>
`,
        `<html>
  <body>
    <style>
      body {
        font-family: Arial, sans-serif;
        width: 210mm;
        height: 297mm;
        margin: 0 auto;
        padding: 5mm;
        box-sizing: border-box;
        background-color: #F8F9FA; /* Light gray background */
        
      }
      .resume-container {
        display: flex;
        flex-direction: column;
        background: white;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        padding: 20px;
        border-radius: 8px;
        height: 100%;
      }
      .header {
        text-align: center;
        background-color:${resumeColors[4].bgColor};
        color: white;
        padding: 15px;
        border-radius: 8px;
      }
      .name {
        font-size: 28px;
        font-weight: bold;
        text-transform: uppercase;
      }
      .contact-info {
        margin-top: 5px;
        font-size: 14px;
      }
      .content {
        display: flex;
        margin-top: 20px;
        min-height: 100%;
        height: 100%
      }
      .left-section {
        width: 35%;
        background:${resumeColors[4].bgColor};
        color: white;
        padding: 15px;
        border-radius: 8px;
        height: 100%
      }
        .education-item{
        margin-top:20px
        }
      .profile-img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        font-weight: bold;
        color:${resumeColors[4].bgColor};
        margin: 0 auto 20px;
      }
      .profile-img img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
      .section-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
        border-bottom: 2px solid #ddd;
        padding-bottom: 5px;
        margin-top: 20px
      }
      .section-title.white {
        color: white;
        border-bottom-color: rgba(255, 255, 255, 0.5);
      }
      .skills .skill-badge {
        background: white;
        color:${resumeColors[4].bgColor};
        padding: 6px 12px;
        margin: 4px 0;
        border-radius: 4px;
        font-size: 12px;
        display: inline-block;
      }
      .right-section {
        width: 65%;
        padding-left: 20px;
      }
      .experience-item {
        margin-bottom: 15px;
      }
      .date-range, .date-ranges {
        font-size: 14px;
        font-weight: bold;
      }
      .date-range {
        color: #666;
      }
      .date-ranges {
        color: white;
      }
      .job-title {
        font-size: 16px;
        font-weight: bold;
        color:${resumeColors[4].bgColor};
      }
      .job-titles {
        font-size: 16px;
        font-weight: bold;
        color: white;
      }
      .description {
        font-size: 14px;
        color: #333;
        margin-top: 5px;
      }
    </style>

    <div class="resume-container">
      <div class="header">
        <div class="name">${data.personal.fullName || "Your Name"}</div>
        <div class="contact-info">
          📧 ${data.personal.email || ""} | 📞 ${data.personal.number || ""} | 📍 ${data.personal.address || ""}
        </div>
      </div>

      <div class="content">
        <div class="left-section">
          <div class="profile-img">
            <img src="${data.personal.photo || ''}" alt="Profile Picture" />
          </div>
          <div class="section-title white">Education</div>
          ${data.educational.map((edu) => `
            <div class="education-item">
              <div class="date-ranges">${edu.from} - ${edu.to}</div>
              <div class="job-titles">${edu.university_school} - ${edu.degree_class}</div>
            </div>
          `).join("")}
          
          <div class="section-title white">Skills</div>
          ${data.skill.map((s) => `<div class="skill-badge">${s.skill}</div>`).join("")}
        </div>

        <div class="right-section">
          <div class="headerTwo">
            <div class="header-text">
              <div class="section-title">About Me</div>
              <div class="">${data.bio.bio || "Your Bio Here"}</div>
            </div>
          </div>
          <div class="section-title">Experience & Training</div>
          ${data.training_expe.map((exp) => `
            <div class="experience-item">
              <div class="date-range">${exp.from} - ${exp.to}</div>
              <div class="job-title">${exp.training_company} - ${exp.course_job}</div>
              <div class="description">${exp.description}</div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  </body>
</html>
`,
        `<html>
  <body>
    <style>
      body {
        font-family: Arial, sans-serif;
        width: 210mm;
        height: 297mm;
        margin: 0 auto;
        padding: 10mm;
        background: white;
        color: black;
        box-sizing: border-box;
      }
      .resume-container {
        display: flex;
        flex-direction: column;
        border: 2px solid black;
        padding: 20px;
        height: 100%;
      }
      .header {
        text-align: left;
        border-bottom: 3px solid black;
        padding-bottom: 10px;
      }
      .name {
        font-size: 30px;
        font-weight: bold;
        text-transform: uppercase;
      }
      .contact-info {
        font-size: 14px;
        margin-top: 5px;
      }
      .content {
        display: flex;
        margin-top: 20px;
        height: 100%;
      }
      .left-section {
        width: 40%;
        padding-right: 20px;
        border-right: 2px solid black;
      }
      .profile-img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        border: 2px solid black;
        overflow: hidden;
        margin: 0 auto 20px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .profile-img img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .section-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
        border-bottom: 2px solid black;
        padding-bottom: 5px;
        margin-top: 20px;
      }
      .right-section {
        width: 60%;
        padding-left: 20px;
      }
      .experience-item {
        margin-bottom: 15px;
      }
      .date-range {
        font-size: 14px;
        font-weight: bold;
        color: black;
      }
      .job-title {
        font-size: 16px;
        font-weight: bold;
      }
      .description {
        font-size: 14px;
        color: black;
        margin-top: 5px;
      }
      .skill-badge {
        background: black;
        color: white;
        padding: 6px 12px;
        margin: 4px 0;
        border-radius: 4px;
        font-size: 12px;
        display: inline-block;
      }
    </style>

    <div class="resume-container">
      <div class="header">
        <div class="name">${data.personal.fullName || "Your Name"}</div>
        <div class="contact-info">
          📧 ${data.personal.email || ""} | 📞 ${data.personal.number || ""} | 📍 ${data.personal.address || ""}
        </div>
      </div>

      <div class="content">
        <div class="left-section">
          <div class="profile-img">
            <img src="${data.personal.photo || ''}" alt="Profile Picture" />
          </div>
          <div class="section-title">Education</div>
          ${data.educational.map((edu) => `
            <div class="education-item">
              <div class="date-range">${edu.from} - ${edu.to}</div>
              <div class="job-title">${edu.university_school} - ${edu.degree_class}</div>
            </div>
          `).join("")}
          
          <div class="section-title">Skills</div>
          ${data.skill.map((s) => `<div class="skill-badge">${s.skill}</div>`).join("")}
        </div>

        <div class="right-section">
          <div class="section-title">About Me</div>
          <div class="description">${data.bio.bio || "Your Bio Here"}</div>
          <div class="section-title">Experience & Training</div>
          ${data.training_expe.map((exp) => `
            <div class="experience-item">
              <div class="date-range">${exp.from} - ${exp.to}</div>
              <div class="job-title">${exp.training_company} - ${exp.course_job}</div>
              <div class="description">${exp.description}</div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  </body>
</html>
`,
        `<html>
  <body>
    <style>
      body {
        font-family: Arial, sans-serif;
        width: 210mm;
        height: 297mm;
        margin: 0 auto;
        padding: 10mm;
        background: white;
        color: black;
        box-sizing: border-box;
      }
      .resume-container {
        display: flex;
        flex-direction: column;
        border: 2px solid black;
        padding: 20px;
        height: 100%;
      }
      .header {
        text-align: center;
        border-bottom: 3px solid black;
        padding-bottom: 10px;
      }
      .name {
        font-size: 28px;
        font-weight: bold;
        text-transform: uppercase;
      }
      .contact-info {
        font-size: 14px;
        margin-top: 5px;
      }
      .content {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        height: 100%;
      }
      .top-section {
        display: flex;
        justify-content: space-between;
        border-bottom: 2px solid black;
        padding-bottom: 10px;
      }
      .profile-img {
        width: 0px;
        height: 0px;
        border-radius: 50%;
       
        overflow: hidden;
      }
      .profile-img img {
       min-width: 100px;
        min-height: 100px;
        object-fit: cover;
      }
      .left-section, .right-section {
        width: 100%;
        padding-top: 20px;
      }
      .section-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
        border-bottom: 2px solid black;
        padding-bottom: 5px;
      }
      .experience-item, .education-item {
        margin-bottom: 15px;
      }
      .date-range {
        font-size: 14px;
        font-weight: bold;
      }
      .job-title {
        font-size: 16px;
        font-weight: bold;
      }
      .description {
        font-size: 14px;
        color: black;
        margin-top: 5px;
      }
      .skill-container {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .skill-badge {
        background: black;
        color: white;
        padding: 6px 12px;
        border-radius: 4px;
        font-size: 12px;
      }
    </style>
    <div class="resume-container">
      <div class="header">
        <div class="name">${data.personal.fullName || "Your Name"}</div>
        <div class="contact-info">
          📧 ${data.personal.email || ""} | 📞 ${data.personal.number || ""} | 📍 ${data.personal.address || ""}
        </div>
      </div>
      <div class="top-section">
        <div class="profile-img">
          <img src="${data.personal.photo || ''}" alt="Profile Picture" />
        </div>
        <div class="description">${data.bio.bio || "Your Bio Here"}</div>
      </div>
      <div class="left-section">
        <div class="section-title">Education</div>
        ${data.educational.map((edu) => `
          <div class="education-item">
            <div class="date-range">${edu.from} - ${edu.to}</div>
            <div class="job-title">${edu.university_school} - ${edu.degree_class}</div>
          </div>
        `).join("")}
        <div class="section-title">Skills</div>
        <div class="skill-container">
          ${data.skill.map((s) => `<div class="skill-badge">${s.skill}</div>`).join("")}
        </div>
      </div>
      <div class="right-section">
        <div class="section-title">Experience & Training</div>
        ${data.training_expe.map((exp) => `
          <div class="experience-item">
            <div class="date-range">${exp.from} - ${exp.to}</div>
            <div class="job-title">${exp.training_company} - ${exp.course_job}</div>
            <div class="description">${exp.description}</div>
          </div>
        `).join("")}
      </div>
    </div>
  </body>
</html>
`,
        `<html>
  <body>
    <style>
      body {
        font-family: Arial, sans-serif;
        width: 210mm;
        height: 297mm;
        margin: 0 auto;
        padding: 0mm;
        background: white;
        color: black;
        box-sizing: border-box;
      }
      .resume-container {
        display: flex;
        flex-direction: row;
        border: 2px solid black;
        height: 100%;
      }
      .sidebar {
        width: 35%;
        background: #2c3e50;
        color: white;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .profile-img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        overflow: hidden;
        margin-bottom: 15px;
      }
      .profile-img img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .name {
        font-size: 24px;
        font-weight: bold;
        text-transform: uppercase;
        text-align: center;
      }
      .contact-info {
        font-size: 14px;
        margin-top: 10px;
        text-align: center;
      }
      .main-content {
        width: 65%;
        padding: 20px;
      }
      .section-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 20px;
        margin-top:20px;
        border-bottom: 2px solid black;
        padding-bottom: 5px;
      }
      .education-item, .experience-item {
        margin-bottom: 15px;
      }
      .date-range {
        font-size: 14px;
        font-weight: bold;
      }
      .job-title {
        font-size: 16px;
        font-weight: bold;
      }
      .description {
        font-size: 14px;
        color: black;
        margin-top: 5px;
      }
      .skill-container {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .skill-badge {
        background: white;
        color: black;
        padding: 6px 12px;
        border-radius: 4px;
        font-size: 12px;
        border: 1px solid black;
      }
    </style>
    <div class="resume-container">
      <div class="sidebar">
        <div class="profile-img">
          <img src="${data.personal.photo || ''}" alt="Profile Picture" />
        </div>
        <div class="name">${data.personal.fullName || "Your Name"}</div>
        <div class="contact-info">
          📧 ${data.personal.email || ""} <br>
          📞 ${data.personal.number || ""} <br>
          📍 ${data.personal.address || ""}
        </div>
        <div class="section-title">Skills</div>
        <div class="skill-container">
          ${data.skill.map((s) => `<div class="skill-badge">${s.skill}</div>`).join("")}
        </div>
      </div>
      <div class="main-content">
        <div class="section-title">About Me</div>
        <div class="description">${data.bio.bio || "Your Bio Here"}</div>
        <div class="section-title">Education</div>
        ${data.educational.map((edu) => `
          <div class="education-item">
            <div class="date-range">${edu.from} - ${edu.to}</div>
            <div class="job-title">${edu.university_school} - ${edu.degree_class}</div>
          </div>
        `).join("")}
        <div class="section-title">Experience & Training</div>
        ${data.training_expe.map((exp) => `
          <div class="experience-item">
            <div class="date-range">${exp.from} - ${exp.to}</div>
            <div class="job-title">${exp.training_company} - ${exp.course_job}</div>
            <div class="description">${exp.description}</div>
          </div>
        `).join("")}
      </div>
    </div>
  </body>
</html>
`,
`<html>
  <body>
    <style>
      body {
        font-family: Arial, sans-serif;
        width: 210mm;
        height: 297mm;
        margin: 0 auto;
        padding: 15mm;
        background: white;
        color: black;
        box-sizing: border-box;
      }
      .resume-container {
        display: flex;
        flex-direction: row;
        border: 1px solid #ddd;
        height: 100%;
        box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1);
        background: white;
        border-radius: 10px;
        overflow: hidden;
      }
      .sidebar {
        width: 30%;
        background: #F5F5F5;
        padding: 25px;
        text-align: center;
        border-right: 2px solid #ddd;
      }
      .profile-img {
        width: 110px;
        height: 110px;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 auto 15px;
        border: 2px solid #ddd;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
      }
      .profile-img img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .name {
        font-size: 22px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .contact-info {
        font-size: 14px;
        margin-bottom: 20px;
      }
      .main-content {
        width: 70%;
        padding: 25px;
      }
      .section-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 15px;
        padding-bottom: 5px;
        border-bottom: 2px solid #ddd;
      }
      .education-item, .experience-item {
        margin-bottom: 15px;
      }
      .date-range {
        font-size: 14px;
        font-weight: bold;
        color: #555;
      }
      .job-title {
        font-size: 16px;
        font-weight: bold;
        margin-top: 5px;
      }
      .description {
        font-size: 14px;
        color: #333;
        margin-top: 5px;
      }
      .skill-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
        margin-top: 10px;
      }
      .skill-badge {
        background: white;
        color: black;
        padding: 8px 14px;
        border-radius: 6px;
        font-size: 12px;
        border: 1px solid #ddd;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
      }
    </style>
    <div class="resume-container">
      <div class="sidebar">
        <div class="profile-img">
          <img src="${data.personal.photo || ''}" alt="Profile Picture" />
        </div>
        <div class="name">${data.personal.fullName || "Your Name"}</div>
        <div class="contact-info">
          📧 ${data.personal.email || ""} <br>
          📞 ${data.personal.number || ""} <br>
          📍 ${data.personal.address || ""}
        </div>
        <div class="section-title">Skills</div>
        <div class="skill-container">
          ${data.skill.map((s) => `<div class="skill-badge">${s.skill}</div>`).join("")}
        </div>
      </div>
      <div class="main-content">
        <div class="section-title">About Me</div>
        <div class="description">${data.bio.bio || "Your Bio Here"}</div>
        <div class="section-title">Education</div>
        ${data.educational.map((edu) => 
          `<div class="education-item">
            <div class="date-range">${edu.from} - ${edu.to}</div>
            <div class="job-title">${edu.university_school} - ${edu.degree_class}</div>
          </div>`
        ).join("")}
        <div class="section-title">Experience & Training</div>
        ${data.training_expe.map((exp) => 
          `<div class="experience-item">
            <div class="date-range">${exp.from} - ${exp.to}</div>
            <div class="job-title">${exp.training_company} - ${exp.course_job}</div>
            <div class="description">${exp.description}</div>
          </div>`
        ).join("")}
      </div>
    </div>
  </body>
</html>
`


      ]

      const pdfUrlsArray = [];
      htmlString.forEach((html, index) => {
        const iframe = document.createElement("iframe");
        document.body.appendChild(iframe);
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        doc.open();
        doc.write(html);
        doc.close();

        iframe.onload = () => {
          html2canvas(doc.body, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            const pdfBlob = pdf.output("blob");
            const pdfUrl = URL.createObjectURL(pdfBlob);

            pdfUrlsArray.push(pdfUrl);
            if (pdfUrlsArray.length === htmlString.length) {
              setPdfUrls(pdfUrlsArray);
              resolve(pdfUrlsArray);
            }

            document.body.removeChild(iframe);
          });
        };
      });
    })
  };

  useEffect(() => {
    const checkDataAndGenerate = () => {
      if (!data || Object.keys(data).length === 0) {
        setTimeout(checkDataAndGenerate, 4000);
        return;
      }

      const hasValidArrayData =
        Array.isArray(data.educational) && data.educational.length > 0 &&
        Array.isArray(data.training_expe) && data.training_expe.length > 0 &&
        Array.isArray(data.skill) && data.skill.length > 0;

      if (!hasValidArrayData) {
        setTimeout(checkDataAndGenerate, 4000);
        return;
      }

      console.log("Running generatePDF()");
      generatePDF();
    };

    checkDataAndGenerate();
  }, [data]); // Runs again if `data` updates

  const choosePDFEdit = (index) => {
    alert(index)
  }

  const handleColorChange = (e) => {

  }

  const handleShow = (index) => {
    setSelectedPDF(index);
    setShow(true);
    console.log('color', colorsGet[index])
  };

  const handleClose = () => setShow(false);

  useEffect(() => {
    if (pdfUrls.length > 0) {
      setIsLoading(false);
    }
  }, [pdfUrls]);

  return (
    <div className="flex flex-col items-center p-0" style={{ height: '100%' }}>
    <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: "30px", height: '100%' }}>
      {isLoading ? <Spinner /> : (
      (paid ? pdfUrls : pdfUrls.slice(0, 4))?.map((url, index) => (

          <div key={index} style={{  padding: '10px', boxShadow: `rgba(0, 0, 0, 0.24) 0px 3px 8px` }}>
            <div
              style={{
                display: 'inline-block',
                transition: 'transform 0.3s ease-in-out, z-index 0s',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.zIndex = '1000'; // Increase z-index
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.zIndex = '1'; // Reset z-index
              }}
            >
              <img
                src={pdfDummu[index]}
                style={{
                  width: "200px",
                  height: "281px",
                  border: "none",
                  backgroundColor: "white",
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
              <Button variant="success" target="_blank" rel="noopener noreferrer" href={url} style={{ marginTop: "10px", fontSize: "12px", padding: "5px 10px" }}>
                Download
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
    <div 
  className="d-flex justify-content-center align-items-center border-bottom pb-2"
  style={{ marginTop: '30px' }}
>
  {!paid && (
    <span className="text-center text-danger fw-bold">
      Subscribe to our plan for more templates &nbsp;
      <a 
        href="#" 
        onClick={() => navigate('/plan')} 
        className="text-primary fw-bold text-decoration-none"
        style={{ cursor: 'pointer' }}
      >
        Upgrade Now
      </a>
    </span>
  )}
</div>


  </div>
  );
};

export default PdfComponent;
