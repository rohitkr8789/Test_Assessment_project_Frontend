import "./AboutPage.css";
import StudentNavbar from "./StudentNavbar";

function AboutPage() {
  return (
    <>
      <StudentNavbar />
      <div className="aboutpage-main-container">
        <div className="aboutpage-content-wrapper">
          <h1 className="aboutpage-title">About This Platform</h1>

          <p className="aboutpage-description">
            Cracking technical interviews isn’t just about knowledge — it’s
            about practicing in the right environment.
            <br />
            This Java Technical Assessment Platform recreates real interview
            scenarios with coding challenges and MCQ-based tests, complete with
            time constraints and instant evaluation.
            <br />
            It helps candidates sharpen their skills, track progress, and walk
            into interviews with confidence.
          </p>

          <div className="aboutpage-developer-section">
            <img
              src="/Rohit_kr.jpeg"
              alt="Rohit Kumar"
              className="aboutpage-developer-image"
            />

            <div className="aboutpage-developer-details">
              <h2 className="aboutpage-developer-name">Rohit Kumar</h2>

              <p className="aboutpage-developer-role">
                <strong>Java Full Stack Developer</strong> <br />
                Rohit Kumar • 📧 rohit2kumar02@gmail.com • 📱 +91 8789085464
              </p>

              <div className="aboutpage-developer-info">
                <p>
                  This is a full-stack technical assessment platform built using
                  <strong> Spring Boot and React</strong>, designed to simulate
                  real-world hiring tests.
                </p>

                <p>
                  It offers coding challenges, MCQs, timer-based assessments,
                  and instant automated evaluation to provide a seamless testing
                  experience.
                </p>

                <p>
                  The platform helps students and job seekers improve their
                  problem-solving skills, track performance, and confidently
                  prepare for technical interviews.
                </p>
              </div>

              <div className="aboutpage-tech-stack">
                <span>React</span>
                <span>Spring Boot</span>
                <span>PostgreSQL</span>
                <span>Render</span>
                <span>Netlify</span>
                <span>Cloudinary</span>
                <span>STS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
