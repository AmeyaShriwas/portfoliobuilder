import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = ({ isMobile }) => {
    const navigate = useNavigate();

    return (
        <footer
            style={{
                width: '100%',
                marginTop: '20px',
                padding: '10px',
                backgroundColor: '#222',
                color: '#fff',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                gap: '10px',
                flexWrap: 'wrap'
            }}
        >
            <span>© {new Date().getFullYear()} Resume & Portfolio Builder &nbsp;|&nbsp;</span>
            <span>🚀 Build Your Professional Portfolio Today &nbsp;|&nbsp;</span>
            <span>✨ Designed by <strong>Ameya Shriwas</strong> &nbsp;|&nbsp;</span>
            <span>📧 Contact: <a href="mailto:resumeportfolio09@gmail.com" style={{ color: '#4db8ff', textDecoration: 'none' }}>resumeportfolio09@gmail.com</a></span>
            <span>
                <a 
                    href="#" 
                    onClick={() => navigate('/privacyPolicy')} 
                    style={{ color: '#4db8ff', textDecoration: 'none' }}
                >
                    Privacy Policy
                </a> &nbsp;|&nbsp;
                <a 
                    href="#" 
                    onClick={() => navigate('/refundPolicy')} 
                    style={{ color: '#4db8ff', textDecoration: 'none' }}
                >
                    Refund Policy
                </a> &nbsp;|&nbsp;
                <a 
                    href="#" 
                    onClick={() => navigate('/termsandcondition')} 
                    style={{ color: '#4db8ff', textDecoration: 'none' }}
                >
                    Terms & Conditions
                </a>
            </span>
        </footer>
    );
};

export default Footer;
