import React from 'react'
import { Container } from "react-bootstrap";
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

const PrivacuPolicy = ({ isMobile, setIsMobile }) => {
    return (
        <>
          <Header isMobile={isMobile} setIsMobile={setIsMobile} />
          <Container fluid className="py-5" style={{ minHeight: "80vh", background: "white" }}>
            <h2 className="text-center fw-bold" style={{ color: "#2d6a4f" }}>Privacy Policy</h2>
            <p className="text-center text-muted">Your privacy is important to us. We do not share your personal data with third parties.</p>
            <p className="text-center text-muted">Resume and Portfolio provides free and paid online resume and portfolio building services.</p>
            <p className="text-center text-muted">For inquiries, contact us at: resumeportfolio09@gmail.com</p>
          </Container>
          <Footer isMobile={isMobile} setIsMobile={setIsMobile} />
        </>
      );
}

export default PrivacuPolicy
