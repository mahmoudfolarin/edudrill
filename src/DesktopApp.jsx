import { Routes, Route, Navigate, useLocation } from "react-router-dom"

import Home from "./pages/Home"
import StudentOnboarding from "./pages/StudentOnboarding"
import Activation from "./pages/Activation"
import DesktopTitleBar from "./components/DesktopTitleBar"
import ExamSelection from "./pages/ExamSelection"
import Dashboard from "./pages/Dashboard"
import Subjects from "./pages/Subjects"
import SubjectDashboard from "./pages/SubjectDashboard"
import Learn from "./pages/Learn"
import Topic from "./pages/Topic"
import Lesson from "./pages/Lesson"
import Practice from "./pages/Practice"
import PastQuestions from "./pages/PastQuestions"
import PastQuestionYears from "./pages/PastQuestionYears"
import PastQuestionPapers from "./pages/PastQuestionPapers"
import PastPaper from "./pages/PastPaper"
import ExamPractice from "./pages/ExamPractice"
import ExamCBT from "./pages/ExamCBT"
import AITutor from "./pages/AITutor"
import AITutorHistory from "./pages/AITutorHistory"
import Bookmarks from "./pages/Bookmarks"
import Performance from "./pages/Performance"
import ErrorBoundary from "./components/ErrorBoundary"
import UserHeader from "./components/UserHeader"

export default function DesktopApp() {
  const location = useLocation()
  const isSplash = location.pathname === "/"

  return (
    <div className="desktop-app-layout" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f8fafc" }}>
      <DesktopTitleBar />
      {!isSplash && <UserHeader />}
      <div style={{ flex: 1, position: "relative" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/onboarding" element={<StudentOnboarding />} />
          <Route path="/activate" element={<Activation />} />

          <Route path="/exams" element={<ExamSelection />} />
          <Route path="/dashboard/:exam" element={<Dashboard />} />

          <Route path="/dashboard/:exam/practice" element={<ErrorBoundary><ExamPractice /></ErrorBoundary>} />
          <Route path="/dashboard/:exam/cbt" element={<ExamCBT />} />
          <Route path="/dashboard/:exam/performance" element={<Performance />} />

          <Route path="/dashboard/:exam/subjects" element={<Subjects />} />
          <Route path="/dashboard/:exam/subjects/:subject" element={<SubjectDashboard />} />
          <Route path="/dashboard/:exam/subjects/:subject/bookmarks" element={<Bookmarks />} />
          <Route path="/dashboard/:exam/subjects/:subject/performance" element={<Performance />} />
          <Route path="/dashboard/:exam/subjects/:subject/learn" element={<Learn />} />
          <Route path="/dashboard/:exam/subjects/:subject/learn/:topicId" element={<Topic />} />
          <Route path="/dashboard/:exam/subjects/:subject/learn/:topicId/lesson/:lessonId" element={<Lesson />} />
          <Route path="/dashboard/:exam/subjects/:subject/learn/:topicId/practice" element={<Practice />} />

          <Route path="/dashboard/:exam/past-questions" element={<PastQuestions />} />
          <Route path="/dashboard/:exam/past-questions/:subject" element={<PastQuestionYears />} />
          <Route path="/dashboard/:exam/past-questions/:subject/:year" element={<PastQuestionPapers />} />
          <Route path="/dashboard/:exam/past-questions/:subject/:year/:paperId" element={<PastPaper />} />
          <Route path="/dashboard/:exam/ai-tutor" element={<AITutor />} />
          <Route path="/dashboard/:exam/subjects/:subject/ai-tutor" element={<AITutor />} />
          <Route path="/dashboard/:exam/subjects/:subject/ai-tutor/history" element={<AITutorHistory />} />

          {/* Security: Reject any admin route in desktop build and redirect home */}
          <Route path="/admin" element={<Navigate to="/" replace />} />
          <Route path="/admin/*" element={<Navigate to="/" replace />} />

          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </div>
  )
}
