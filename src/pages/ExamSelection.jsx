import { Link } from "react-router-dom"

const exams = [
  {
    name: "WAEC",
    title: "WAEC",
    description:
      "Prepare for the West African Senior School Certificate Examination with focused learning and practice.",
    icon: <img src="/assets/waec_logo.png" alt="WAEC Logo" style={{ width: "40px", height: "40px", objectFit: "contain" }} />,
  },
  {
    name: "NECO",
    title: "NECO",
    description:
      "Build your confidence and prepare effectively for your National Examinations Council examination.",
    icon: <img src="/assets/neco_logo.png" alt="NECO Logo" style={{ width: "40px", height: "40px", objectFit: "contain" }} />,
  },
  {
    name: "GCE",
    title: "GCE",
    description:
      "Strengthen your knowledge with structured preparation, practice questions and tests.",
    icon: <img src="/assets/gce_logo.png" alt="GCE Logo" style={{ width: "40px", height: "40px", objectFit: "contain" }} />,
  },
  {
    name: "JAMB",
    title: "JAMB",
    description:
      "Prepare for UTME with your required four-subject combination, with English Language compulsory.",
    icon: <img src="/assets/jamb_logo.png" alt="JAMB Logo" style={{ width: "40px", height: "40px", objectFit: "contain" }} />,
  },
]

function ExamSelection() {
  console.log("ExamSelection rendered");
    return (
      <main className="exam-page">
        
      
        
        


      {/* Header */}
      <header className="exam-header">

        <Link to="/" className="exam-brand">
          <div className="exam-brand-icon">
            E
          </div>

          <div>
            <strong>EduDrill</strong>
            <span>Smart Exam Preparation</span>
          </div>
        </Link>

        <Link to="/" className="exam-home-button">
          ← Back to EduDrill Home
        </Link>

      </header>


      {/* Main */}
      <section className="exam-main">

        <div className="exam-intro">

          <div className="exam-label">
            <span></span>
            LET'S GET STARTED
          </div>

          <h1>
            Choose your
            <br />
            <span>examination.</span>
          </h1>

          <p>
            Tell EduDrill which examination you're preparing
            for. We'll take you to the right preparation
            environment.
          </p>

        </div>


        {/* Exam Cards */}
        <div className="exam-grid">

          {exams.map((exam) => (
            <Link
              key={exam.name}
              to={`/dashboard/${exam.name.toLowerCase()}`}
              className="exam-card"
            >

              <div className="exam-card-header">

                <div className="exam-icon">
                  {exam.icon}
                </div>

                <div className="exam-card-arrow">
                  →
                </div>

              </div>


              <div className="exam-card-body">

                <span className="exam-name">
                  {exam.title}
                </span>

                <h2>
                  {exam.name === "WAEC" &&
                    "West African Examinations Council"}

                  {exam.name === "NECO" &&
                    "National Examinations Council"}

                  {exam.name === "GCE" &&
                    "General Certificate of Education"}

                  {exam.name === "JAMB" &&
                    "Joint Admissions and Matriculation Board"}
                </h2>

                <p>
                  {exam.description}
                </p>

              </div>


              <div className="exam-card-action">
                <span>
                  Begin preparation
                </span>

                <strong>
                  Continue →
                </strong>
              </div>

            </Link>
          ))}

        </div>


        {/* Bottom Information */}
        <div className="exam-info">

          <div className="exam-info-icon">
            ✓
          </div>

          <div>
            <strong>
              Choose the examination you're preparing for
            </strong>

            <p>
              You can return here and choose another
              examination whenever you need to.
            </p>
          </div>

        </div>

      </section>


      {/* Footer */}
      <footer className="exam-footer">

        <div className="footer-brand">
          <div><img src="/assets/edudrill_logo.jpg" alt="EduDrill" style={{ width: "100%", height: "100%", borderRadius: "inherit" }} /></div>
          <strong>EduDrill</strong>
        </div>

        <p>
          Prepare smarter. Practice better. Perform with confidence.
        </p>

      </footer>

    </main>
    
  )
}

export default ExamSelection