import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import "./AITutor.css"

function AITutor() {
  const { exam, subject } = useParams()

  const isGeneralTutor = !subject

  const storageKey = isGeneralTutor
    ? `edudrill_ai_chats_${exam}_general`
    : `edudrill_ai_chats_${exam}_${subject}`

  const [chats, setChats] = useState([])
  const [currentChatId, setCurrentChatId] = useState(null)
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  // ========================================
  // FORMAT SUBJECT NAME
  // ========================================

  const formatSubjectName = (value) => {
    if (!value) {
      return ""
    }

    return value
      .replace(/-/g, " ")
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase(),
      )
  }

  // ========================================
  // SAVE CHATS
  // ========================================

  const saveChats = (updatedChats) => {
    setChats(updatedChats)

    localStorage.setItem(
      storageKey,
      JSON.stringify(updatedChats),
    )
  }

  // ========================================
  // CREATE CHAT
  // ========================================

  const createChat = () => {
    const newChat = {
      id: crypto.randomUUID(),

      title: "New Chat",

      createdAt: new Date().toISOString(),

      messages: [
        {
          id: crypto.randomUUID(),

          role: "assistant",

          content: isGeneralTutor
            ? "Hello! 👋 I'm your EduDrill AI Tutor. You can ask me questions from any subject you're studying for this examination. What would you like to learn?"
            : `Hello! 👋 I'm your EduDrill AI Tutor for ${formatSubjectName(
                subject,
              )}. Ask me anything about this subject and I'll help you understand it.`,
        },
      ],
    }

    const updatedChats = [
      newChat,
      ...chats,
    ]

    saveChats(updatedChats)

    setCurrentChatId(newChat.id)

    setInput("")
  }

  // ========================================
  // LOAD SAVED CHATS
  // ========================================

  useEffect(() => {
    try {
      const savedChats =
        localStorage.getItem(storageKey)

      if (savedChats) {
        const parsedChats =
          JSON.parse(savedChats)

        if (
          Array.isArray(parsedChats) &&
          parsedChats.length > 0
        ) {
          setChats(parsedChats)

          setCurrentChatId(
            parsedChats[0].id,
          )

          return
        }
      }

      // No chats yet
      const newChat = {
        id: crypto.randomUUID(),

        title: "New Chat",

        createdAt:
          new Date().toISOString(),

        messages: [
          {
            id: crypto.randomUUID(),

            role: "assistant",

            content: isGeneralTutor
              ? "Hello! 👋 I'm your EduDrill AI Tutor. You can ask me questions from any subject you're studying for this examination. What would you like to learn?"
              : `Hello! 👋 I'm your EduDrill AI Tutor for ${formatSubjectName(
                  subject,
                )}. Ask me anything about this subject and I'll help you understand it.`,
          },
        ],
      }

      const initialChats = [newChat]

      setChats(initialChats)

      setCurrentChatId(newChat.id)

      localStorage.setItem(
        storageKey,
        JSON.stringify(initialChats),
      )
    } catch (error) {
      console.error(
        "Failed to load AI Tutor chats:",
        error,
      )
    }
  }, [storageKey])

  // ========================================
  // OPEN CHAT
  // ========================================

  const openChat = (chatId) => {
    setCurrentChatId(chatId)

    setInput("")
  }

  // ========================================
  // SEND MESSAGE
  // ========================================

  const sendMessage = async () => {
    const message = input.trim()

    if (!message || loading) {
      return
    }

    const activeChat = chats.find(
      (chat) =>
        chat.id === currentChatId,
    )

    if (!activeChat) {
      return
    }

    // --------------------------------------
    // USER MESSAGE
    // --------------------------------------

    const userMessage = {
      id: crypto.randomUUID(),

      role: "user",

      content: message,
    }

    const messagesWithUser = [
      ...activeChat.messages,
      userMessage,
    ]

    // --------------------------------------
    // UPDATE CHAT TITLE
    // --------------------------------------

    const newTitle =
      activeChat.title === "New Chat"
        ? message.length > 35
          ? `${message.substring(
              0,
              35,
            )}...`
          : message
        : activeChat.title

    const chatsWithUserMessage =
      chats.map((chat) => {
        if (
          chat.id !==
          activeChat.id
        ) {
          return chat
        }

        return {
          ...chat,

          title: newTitle,

          messages:
            messagesWithUser,
        }
      })

    saveChats(
      chatsWithUserMessage,
    )

    setInput("")

    setLoading(true)

    try {
      // ------------------------------------
      // SEND CONVERSATION HISTORY
      // ------------------------------------

      const conversationHistory =
        messagesWithUser
          .slice(-20)
          .map((item) => ({
            role: item.role,

            content: item.content,
          }))

      const response = await fetch(
        "http://localhost:5000/api/ai-tutor/chat",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            message,

            exam,

            subject:
              subject || null,

            generalTutor:
              isGeneralTutor,

            messages:
              conversationHistory,
          }),
        },
      )

      const data =
        await response.json()

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "The AI Tutor could not process your request.",
        )
      }

      // ------------------------------------
      // AI RESPONSE
      // ------------------------------------

      const assistantMessage = {
        id: crypto.randomUUID(),

        role: "assistant",

        content: data.answer,
      }

      const chatsWithAssistant =
        chatsWithUserMessage.map(
          (chat) => {
            if (
              chat.id !==
              activeChat.id
            ) {
              return chat
            }

            return {
              ...chat,

              messages: [
                ...chat.messages,
                assistantMessage,
              ],
            }
          },
        )

      saveChats(
        chatsWithAssistant,
      )
    } catch (error) {
      console.error(
        "AI Tutor error:",
        error,
      )

      const errorMessage = {
        id: crypto.randomUUID(),

        role: "assistant",

        content:
          "Sorry, I couldn't connect to the AI Tutor right now. Please make sure the EduDrill server is running and try again.",
      }

      const chatsWithError =
        chatsWithUserMessage.map(
          (chat) => {
            if (
              chat.id !==
              activeChat.id
            ) {
              return chat
            }

            return {
              ...chat,

              messages: [
                ...chat.messages,
                errorMessage,
              ],
            }
          },
        )

      saveChats(chatsWithError)
    } finally {
      setLoading(false)
    }
  }

  // ========================================
  // ENTER KEY
  // ========================================

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault()

      sendMessage()
    }
  }

  // ========================================
  // CURRENT CHAT
  // ========================================

  const currentChat =
    chats.find(
      (chat) =>
        chat.id === currentChatId,
    )

  // ========================================
  // UI
  // ========================================

  return (
    <div className="ai-tutor-page">

      {/* ==================================
          SIDEBAR
      ================================== */}

      <aside className="ai-tutor-sidebar">

        {/* BRAND */}

        <div className="ai-tutor-brand">

          <div className="ai-tutor-brand-logo">
            E
          </div>

          <div>
            <h2>EduDrill</h2>

            <span>
              AI Tutor
            </span>
          </div>

        </div>


        {/* NEW CHAT */}

        <button
          className="new-chat-button"
          onClick={createChat}
        >
          <span>＋</span>

          New Chat
        </button>


        {/* RECENT CHATS */}

        <div className="recent-chats-section">

          <p className="sidebar-section-title">
            Recent Chats
          </p>

          <div className="recent-chats-list">

            {chats.length === 0 ? (
              <p className="no-chats">
                No chats yet
              </p>
            ) : (
              chats.map(
                (chat) => (
                  <button
                    key={chat.id}
                    className={`recent-chat-item ${
                      chat.id ===
                      currentChatId
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      openChat(
                        chat.id,
                      )
                    }
                  >

                    <span className="chat-icon">
                      💬
                    </span>

                    <span className="chat-title">
                      {chat.title}
                    </span>

                  </button>
                ),
              )
            )}

          </div>

        </div>


        {/* HISTORY */}

        <div className="ai-tutor-sidebar-history">

          <Link
            to={
              isGeneralTutor
                ? `/dashboard/${exam}/ai-tutor/history`
                : `/dashboard/${exam}/subjects/${subject}/ai-tutor/history`
            }
            className="history-page-link"
          >
            🕘 View all history
          </Link>

        </div>


        {/* BACK */}

        <div className="ai-tutor-sidebar-bottom">

          {isGeneralTutor ? (
            <Link
              to={`/dashboard/${exam}`}
              className="back-subject-link"
            >
              ← Back to Dashboard
            </Link>
          ) : (
            <Link
              to={`/dashboard/${exam}/subjects/${subject}`}
              className="back-subject-link"
            >
              ← Back to Subject
            </Link>
          )}

        </div>

      </aside>


      {/* ==================================
          MAIN
      ================================== */}

      <main className="ai-tutor-main">

        {/* HEADER */}

        <header className="ai-tutor-header">

          <div>

            <h1>
              AI Tutor
            </h1>

            <p>
              {isGeneralTutor
                ? "All Subjects"
                : formatSubjectName(
                    subject,
                  )}
            </p>

          </div>


          <div className="ai-online-status">

            <span className="online-dot"></span>

            AI Online

          </div>

        </header>


        {/* CHAT */}

        <section className="ai-tutor-chat">

          {!currentChat ? (
            <div className="empty-chat">

              <div className="empty-chat-icon">
                🤖
              </div>

              <h2>
                Start a conversation
              </h2>

              <p>
                Ask the EduDrill AI Tutor
                a question to get started.
              </p>

            </div>
          ) : (
            <div className="chat-messages">

              {currentChat.messages.map(
                (message) => (
                  <div
                    key={message.id}
                    className={`chat-message ${
                      message.role ===
                      "user"
                        ? "user-message"
                        : "assistant-message"
                    }`}
                  >

                    {/* AVATAR */}

                    <div className="message-avatar">

                      {message.role ===
                      "user"
                        ? "👤"
                        : "🤖"}

                    </div>


                    {/* MESSAGE */}

                    <div className="message-content">

                      <div className="message-name">

                        {message.role ===
                        "user"
                          ? "You"
                          : "EduDrill AI"}

                      </div>


                      <div className="message-bubble">

                        {message.content}

                      </div>

                    </div>

                  </div>
                ),
              )}


              {/* TYPING */}

              {loading && (
                <div className="chat-message assistant-message">

                  <div className="message-avatar">
                    🤖
                  </div>

                  <div className="message-content">

                    <div className="message-name">
                      EduDrill AI
                    </div>

                    <div className="message-bubble typing-bubble">

                      <span></span>
                      <span></span>
                      <span></span>

                    </div>

                  </div>

                </div>
              )}

            </div>
          )}

        </section>


        {/* INPUT */}

        <div className="ai-tutor-input-container">

          <div className="ai-tutor-input-box">

            <textarea
              value={input}
              onChange={(event) =>
                setInput(
                  event.target.value,
                )
              }
              onKeyDown={handleKeyDown}
              placeholder={
                isGeneralTutor
                  ? "Ask me anything from any subject..."
                  : `Ask a question about ${formatSubjectName(
                      subject,
                    )}...`
              }
              rows={1}
              disabled={loading}
            />

            <button
              onClick={sendMessage}
              disabled={
                loading ||
                !input.trim()
              }
              className="send-message-button"
            >
              {loading
                ? "..."
                : "➤"}
            </button>

          </div>


          <p className="ai-tutor-disclaimer">
            EduDrill AI can make mistakes.
            Always verify important
            examination information.
          </p>

        </div>

      </main>

    </div>
  )
}

export default AITutor