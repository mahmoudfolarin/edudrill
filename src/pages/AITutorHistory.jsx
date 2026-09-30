import { Link, useParams } from "react-router-dom"

function AITutorHistory() {
  const { exam, subject } = useParams()

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "#f5f8ff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Link
        to={`/dashboard/${exam}/subjects/${subject}/ai-tutor`}
        style={{
          textDecoration: "none",
          color: "#1557d6",
          fontWeight: "600",
        }}
      >
        ← Back to AI Tutor
      </Link>

      <h1 style={{ marginTop: "30px" }}>
        AI Tutor History
      </h1>

      <p style={{ color: "#71809b" }}>
        Your previous AI Tutor conversations will appear here.
      </p>
    </div>
  )
}

export default AITutorHistory