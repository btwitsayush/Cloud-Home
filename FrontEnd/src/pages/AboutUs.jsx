import React from 'react';
import './CSS/AboutUs.css'; 
import NavBar from './NavBar';
import Footer from './Footer';
import aboutImg from '../images/aboutImg.png';

const AboutUs = () => {
    return (
        <>
        <NavBar />
        <div className="about-us-container">
            {/* Section 1 */}
            <section className="about-us-section1">
                <div className="about-us-story">
                    <h1>About CloudHome</h1>
                    <p>
                        Welcome to CloudHome, your in-house solution for Google Drive. 
                        Our platform simplifies your file management experience by offering 
                        intuitive features to upload, organize, and access your documents 
                        seamlessly. Whether you're managing personal files or collaborating 
                        on team projects, CloudHome provides the tools you need to stay 
                        organized and productive.
                    </p>
                </div>
                <div className="about-us-image">
                    <img src={aboutImg} alt="CloudHome" />
                </div>
            </section>

            {/* Section 2 */}
            <section className="about-us-section2">
                <h2>Our Services</h2>
                <div className="about-us-cards">
                    <div className="about-us-card">
                        <h3>File Upload</h3>
                        <p>Quickly upload files from your device to your CloudHome storage.</p>
                    </div>
                    <div className="about-us-card">
                        <h3>Folder Management</h3>
                        <p>Organize your files into folders for easy access and management.</p>
                    </div>
                    <div className="about-us-card">
                        <h3>Secure Access</h3>
                        <p>Enjoy secure and reliable access to your files from anywhere.</p>
                    </div>
                    <div className="about-us-card">
                        <h3>File Sharing</h3>
                        <p>Easily share your files with others securely and efficiently.</p>
                    </div>
                    <div className="about-us-card">
                        <h3>Backup & Restore</h3>
                        <p>Automatic backup and restore options to keep your data safe.</p>
                    </div>
                    <div className="about-us-card">
                        <h3>Version Control</h3>
                        <p>Keep track of file versions and access previous versions easily.</p>
                    </div>
                </div>
            </section>
        </div>
        <Footer />
        </>
    );
};

export default AboutUs;
