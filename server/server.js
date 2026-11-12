const express = require("express")
const cors = require("cors")
require("dotenv").config()

const pool = require("./src/config/database")

const paymentRoutes = require("./src/routes/paymentRoutes")
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

app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(',') || ['http://localhost:5173'] }))
app.use(express.json())


// =====================================================
// API ROUTES
// =====================================================

// Auth routes
app.use("/api/auth", authRoutes)

// Payment routes
app.use("/api/payment", paymentRoutes)

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

app.get("/api/health", async (req, res) => {
  let dbStatus = "connected";
  try {
    // Quick ping to keep PostgreSQL pool connection warm
    await pool.query("SELECT 1");
  } catch (err) {
    dbStatus = "unavailable";
    console.debug("[HEALTH CHECK] DB ping notice:", err.message);
  }

  res.json({
    success: true,
    status: "online",
    db: dbStatus,
    timestamp: new Date().toISOString(),
    message: "EduDrill backend is running",
  });
});

// =====================================================
// RENDER KEEP-ALIVE (PREVENTS COLD STARTS)
// =====================================================

function startKeepAlive() {
  const serviceUrl = process.env.RENDER_EXTERNAL_URL || "https://edudrill-1.onrender.com";
  const PING_INTERVAL = 10 * 60 * 1000; // Ping every 10 minutes (Render sleeps at 15m)

  console.log(`[KEEP-ALIVE] Scheduled background ping to ${serviceUrl}/api/health every 10 minutes.`);

  setInterval(async () => {
    try {
      const response = await fetch(`${serviceUrl}/api/health`);
      if (response.ok) {
        console.log(`[KEEP-ALIVE] Auto-ping successful at ${new Date().toLocaleTimeString()}`);
      } else {
        console.warn(`[KEEP-ALIVE] Auto-ping returned HTTP ${response.status}`);
      }
    } catch (err) {
      console.debug(`[KEEP-ALIVE] Auto-ping notice: ${err.message}`);
    }
  }, PING_INTERVAL);
}

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
  );
  startKeepAlive();
})