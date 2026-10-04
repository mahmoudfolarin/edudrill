const express = require("express")
const cors = require("cors")
require("dotenv").config()

const pool = require("./src/config/database")

const activationRoutes = require("./src/routes/activationRoutes")
const productRoutes = require("./src/routes/productRoutes")
const subjectRoutes = require("./src/routes/subjectRoutes")
const syllabusRoutes = require("./src/routes/syllabusRoutes")
const topicRoutes = require("./src/routes/topicRoutes")
const questionRoutes = require("./src/routes/questionRoutes")
const pastPaperRoutes = require("./src/routes/pastPaperRoutes")
const adminRoutes = require("./src/routes/adminRoutes")
const examRoutes = require("./src/routes/examRoutes")
const progressRoutes = require("./src/routes/progressRoutes")
const aiTutorRoutes = require("./src/routes/aiTutorRoutes")
const userRoutes = require("./src/routes/userRoutes")

const authRoutes = require("./src/routes/authRoutes")

const app = express()


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(cors())
app.use(express.json())


// =====================================================
// API ROUTES
// =====================================================

// Auth routes
app.use("/api/auth", authRoutes)

// Activation Key routes
app.use(
  "/api/activation-keys",
  activationRoutes,
)

// Product / Product Key routes
app.use(
  "/api/products",
  productRoutes,
)

// Subject routes
app.use(
  "/api/subjects",
  subjectRoutes,
)

// Syllabus routes
app.use(
  "/api/syllabuses",
  syllabusRoutes,
)

// Topic routes
app.use(
  "/api/topics",
  topicRoutes,
)

// Question routes
app.use(
  "/api/questions",
  questionRoutes,
)

// Past Paper routes
app.use(
  "/api/past-papers",
  pastPaperRoutes,
)

// Admin routes
app.use(
  "/api/admin",
  adminRoutes,
)

// Exam routes
app.use(
  "/api/exams",
  examRoutes,
)

// Progress routes
app.use(
  "/api/progress",
  progressRoutes,
)

// AI Tutor routes
app.use("/api/ai-tutor", aiTutorRoutes)

// User routes (Bookmarks & Performance)
app.use("/api/user", userRoutes)

app.post("/api/log", (req, res) => {
  console.log("FRONTEND ERROR:", req.body);
  res.json({ success: true });
});


// =====================================================
// HEALTH CHECK
// =====================================================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "EduDrill backend is running",
  })
})


// =====================================================
// DATABASE CONNECTION TEST
// =====================================================

app.get("/api/database-test", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT NOW()",
    )

    res.json({
      success: true,
      message: "EduDrill database connected",
      time: result.rows[0].now,
    })

  } catch (error) {

    console.error(
      "Database error:",
      error,
    )

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    })
  }
})


// =====================================================
// START SERVER
// =====================================================

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(
    `EduDrill server running on port ${PORT}`,
  )
})