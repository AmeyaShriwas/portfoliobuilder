import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { useSelector } from 'react-redux';
import PdfGenerator from './PdfComponent';

const SelectResume = ({ isMobile, setIsMobile }) => {
    const personalDetails = useSelector(state => state.resume.personalDetails);
    const educationalDetails = useSelector(state => state.resume.educationalDetails);
    const trainingExperienceDetails = useSelector(state => state.resume.traningExperienceDetails);
    const skillsDetails = useSelector(state => state.resume.skillDetails);
    const bioDetails = useSelector(state => state.resume.bio);

    const [data, setData] = useState({ personal: {}, educational: [], training_expe: [], skill: [], bio: {} });

    useEffect(() => {
        setData({
            personal: personalDetails,
            educational: educationalDetails,
            training_expe: trainingExperienceDetails,
            skill: skillsDetails,
            bio: bioDetails
        });
    }, [personalDetails, educationalDetails, trainingExperienceDetails, skillsDetails]);

    return (
        <>
            <Header isMobile={isMobile} setIsMobile={setIsMobile} />
            <div className="p-4" style={{ minHeight: '100vh' }}>
                <h2>Select Your Preferred Resume Template and Click to Download Yours</h2>
                <p>Browse through our collection of professionally designed resume templates and choose the one that best represents your skills and experience.</p>
                <p>Ensure your resume stands out by selecting a layout that highlights your strengths effectively.</p>
                <PdfGenerator data={data} isMobile={isMobile} setIsMobile={setIsMobile} />

            </div>
            <Footer isMobile={isMobile} setIsMobile={setIsMobile}/>
         
        </>
    );
};

export default SelectResume;