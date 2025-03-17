import React from 'react';
import { Container } from "react-bootstrap";

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

const RefundPolicy = ({ isMobile, setIsMobile }) => {
    return (
        <>
          <Header isMobile={isMobile} setIsMobile={setIsMobile} />
          <Container fluid className="py-5" style={{ minHeight: "80vh", background: "white" }}>
            <h2 className="text-center fw-bold" style={{ color: "#2d6a4f" }}>Refund Policy</h2>
            <p className="text-center text-muted">
              We provide services for online resume downloads and live portfolio creation.  
              If you are not satisfied with our service, you may request a refund within 7 days of purchase.
            </p>
            <p className="text-center text-muted">
              Refunds are only applicable to paid plans and do not cover free services or trial versions.
            </p>
            <p className="text-center text-muted">
              Once a resume is downloaded or a live portfolio is created, refunds will not be processed.
            </p>
            <p className="text-center text-muted">
              For any refund inquiries or support, please contact us at: <strong>resumeportfolio09@gmail.com</strong>
            </p>
          </Container>
          <Footer isMobile={isMobile} setIsMobile={setIsMobile} />
        </>
      );
}

export default RefundPolicy;
