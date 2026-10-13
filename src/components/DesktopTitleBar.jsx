import { useState, useEffect } from "react"
import logo from "../assets/edudrill_logo.jpg"

export default function DesktopTitleBar() {
  const isDesktop = typeof window !== "undefined" && Boolean(window.desktopApi?.isDesktop)
  const [isMaximized, setIsMaximized] = useState(false)

  useEffect(() => {
    if (!isDesktop) return
    window.desktopApi?.isMaximized?.().then(val => setIsMaximized(Boolean(val)))
  }, [isDesktop])

  if (!isDesktop) return null

  const handleMinimize = () => {
    window.desktopApi?.minimizeWindow?.()
  }

  const handleMaximize = async () => {
    window.desktopApi?.maximizeWindow?.()
    const max = await window.desktopApi?.isMaximized?.()
    setIsMaximized(Boolean(max))
  }

  const handleClose = () => {
    window.desktopApi?.closeWindow?.()
  }

  return (
    <header className="desktop-titlebar" style={{
      height: "36px",
      background: "#0c192c",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      userSelect: "none",
      WebkitAppRegion: "drag",
      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
      paddingLeft: "12px",
      zIndex: 9999,
      position: "relative"
    }}>
      {/* Brand & App Identifier */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", WebkitAppRegion: "drag" }}>
        <img 
          src={logo} 
          alt="EduDrill" 
          style={{ width: "20px", height: "20px", borderRadius: "50%", objectFit: "cover" }} 
        />
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ color: "#ffffff", fontWeight: "700", fontSize: "13px", letterSpacing: "0.2px" }}>
            Edu<span style={{ color: "#38bdf8" }}>Drill</span>
          </span>
          <span style={{ 
            fontSize: "10px", 
            fontWeight: "600", 
            background: "rgba(56, 189, 248, 0.15)", 
            color: "#38bdf8", 
            padding: "2px 6px", 
            borderRadius: "4px",
            letterSpacing: "0.5px"
          }}>
            OFFLINE CBT
          </span>
        </div>
      </div>

      {/* Center Subtitle */}
      <div style={{ color: "#94a3b8", fontSize: "11px", fontWeight: "500", WebkitAppRegion: "drag" }}>
        Smart Examination Preparation
      </div>

      {/* Window Controls (Minimize, Maximize, Close) */}
      <div style={{ display: "flex", height: "100%", WebkitAppRegion: "no-drag" }}>
        <button
          onClick={handleMinimize}
          title="Minimize"
          style={{
            width: "46px",
            height: "100%",
            background: "transparent",
            border: "none",
            color: "#94a3b8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.15s ease, color 0.15s ease"
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#94a3b8"; }}
        >
          <svg width="10" height="1" viewBox="0 0 10 1" fill="currentColor">
            <rect width="10" height="1" />
          </svg>
        </button>

        <button
          onClick={handleMaximize}
          title={isMaximized ? "Restore" : "Maximize"}
          style={{
            width: "46px",
            height: "100%",
            background: "transparent",
            border: "none",
            color: "#94a3b8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.15s ease, color 0.15s ease"
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#94a3b8"; }}
        >
          {isMaximized ? (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="2" y="0.5" width="7.5" height="7.5" />
              <polyline points="0.5,2.5 0.5,9.5 7.5,9.5" />
            </svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="0.5" y="0.5" width="9" height="9" />
            </svg>
          )}
        </button>

        <button
          onClick={handleClose}
          title="Close"
          style={{
            width: "46px",
            height: "100%",
            background: "transparent",
            border: "none",
            color: "#94a3b8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.15s ease, color 0.15s ease"
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#e11d48"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#94a3b8"; }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.2">
            <line x1="1" y1="1" x2="9" y2="9" />
            <line x1="9" y1="1" x2="1" y2="9" />
          </svg>
        </button>
      </div>
    </header>
  )
}
