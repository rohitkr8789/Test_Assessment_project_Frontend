import "./AboutPage.css";
import StudentNavbar from "./StudentNavbar";

function AboutPage() {
  return (
    <>
   <StudentNavbar />
    <div className="aboutpage-main-container">

      <div className="aboutpage-content-wrapper">

        <h1 className="aboutpage-title">
          About This Platform
        </h1>

        <p className="aboutpage-description">
          This Java Technical Assessment Platform is designed to simulate real-world
          coding tests and MCQ-based evaluations to help candidates prepare effectively
          for technical interviews.
        </p>

        <div className="aboutpage-developer-section">

          <img
            src="/Rohit_kr.jpeg"
            alt="Rohit Kumar"
            className="aboutpage-developer-image"
          />

          <div className="aboutpage-developer-details">

            <h2 className="aboutpage-developer-name">
              Rohit Kumar
            </h2>

            <p className="aboutpage-developer-role">
              Java Full Stack Developer
            </p>

            <p className="aboutpage-developer-info">
              I built this platform to provide a real-time assessment experience
              including coding challenges, MCQs, timer-based tests, and automatic
              evaluation. The goal is to help students and job seekers improve
              their problem-solving skills and perform confidently in interviews.
            </p>

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