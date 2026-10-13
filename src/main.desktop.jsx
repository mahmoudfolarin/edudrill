import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { HashRouter } from "react-router-dom"
import "./index.css"
import DesktopApp from "./DesktopApp.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <DesktopApp />
    </HashRouter>
  </StrictMode>,
)
