import React from 'react'
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { Container } from "react-bootstrap";


const TermsAndCondition = ({ isMobile, setIsMobile }) => {
    return (
        <>
          <Header isMobile={isMobile} setIsMobile={setIsMobile} />
          <Container fluid className="py-5" style={{ minHeight: "80vh", background: "white" }}>
            <h2 className="text-center fw-bold" style={{ color: "#2d6a4f" }}>Terms and Conditions</h2>
            <p className="text-center text-muted">By using our service, you agree to our terms. Unauthorized use of content is prohibited.</p>
            <p className="text-center text-muted">Resume and Portfolio offers both free and paid plans for building resumes and portfolios.</p>
            <p className="text-center text-muted">For inquiries, contact us at: resumeportfolio09@gmail.com</p>
          </Container>
          <Footer isMobile={isMobile} setIsMobile={setIsMobile} />
        </>
      );
}

export default TermsAndCondition
