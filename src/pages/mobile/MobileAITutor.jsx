import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";

function MobileAITutor() {
  const { exam, subject } = useParams();
  const isGeneralTutor = !subject;

  const storageKey = isGeneralTutor
    ? `edudrill_ai_chats_${exam}_general`
    : `edudrill_ai_chats_${exam}_${subject}`;

  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats, currentChatId]);

  const formatSubjectName = (value) => {
    if (!value) return "";
    return value.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  const saveChats = (updatedChats) => {
    setChats(updatedChats);
    localStorage.setItem(storageKey, JSON.stringify(updatedChats));
  };

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
            : `Hello! 👋 I'm your EduDrill AI Tutor for ${formatSubjectName(subject)}. Ask me anything about this subject and I'll help you understand it.`,
        },
      ],
    };
    const updatedChats = [newChat, ...chats];
    saveChats(updatedChats);
    setCurrentChatId(newChat.id);
    setInput("");
    setShowHistory(false);
  };

  useEffect(() => {
    try {
      const savedChats = localStorage.getItem(storageKey);
      if (savedChats) {
        const parsedChats = JSON.parse(savedChats);
        if (Array.isArray(parsedChats) && parsedChats.length > 0) {
          setChats(parsedChats);
          setCurrentChatId(parsedChats[0].id);
          return;
        }
      }
      
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
              : `Hello! 👋 I'm your EduDrill AI Tutor for ${formatSubjectName(subject)}. Ask me anything about this subject and I'll help you understand it.`,
          },
        ],
      };
      setChats([newChat]);
      setCurrentChatId(newChat.id);
      localStorage.setItem(storageKey, JSON.stringify([newChat]));
    } catch (error) {
      console.error("Failed to load AI Tutor chats:", error);
    }
  }, [storageKey]);

  const openChat = (chatId) => {
    setCurrentChatId(chatId);
    setInput("");
    setShowHistory(false);
  };

  const sendMessage = async () => {
    const message = input.trim();
    if (!message || loading) return;

    const activeChat = chats.find(chat => chat.id === currentChatId);
    if (!activeChat) return;

    const userMessage = { id: crypto.randomUUID(), role: "user", content: message };
    const messagesWithUser = [...activeChat.messages, userMessage];

    const newTitle = activeChat.title === "New Chat"
      ? message.length > 35 ? `${message.substring(0, 35)}...` : message
      : activeChat.title;

    const chatsWithUserMessage = chats.map(chat => 
      chat.id !== activeChat.id ? chat : { ...chat, title: newTitle, messages: messagesWithUser }
    );
    saveChats(chatsWithUserMessage);
    setInput("");
    setLoading(true);

    try {
      const conversationHistory = messagesWithUser.slice(-20).map(item => ({
        role: item.role,
        content: item.content,
      }));

      const response = await fetch("/api/ai-tutor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          exam,
          subject: subject || null,
          generalTutor: isGeneralTutor,
          messages: conversationHistory,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "The AI Tutor could not process your request.");
      }

      const assistantMessage = { id: crypto.randomUUID(), role: "assistant", content: data.answer };
      const chatsWithAssistant = chatsWithUserMessage.map(chat => 
        chat.id !== activeChat.id ? chat : { ...chat, messages: [...chat.messages, assistantMessage] }
      );
      saveChats(chatsWithAssistant);
    } catch (error) {
      console.error("AI Tutor error:", error);
      const errorMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Sorry, I couldn't connect to the AI Tutor right now. Please make sure the EduDrill server is running and try again.",
      };
      const chatsWithError = chatsWithUserMessage.map(chat => 
        chat.id !== activeChat.id ? chat : { ...chat, messages: [...chat.messages, errorMessage] }
      );
      saveChats(chatsWithError);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const currentChat = chats.find(chat => chat.id === currentChatId);

  return (
    <main style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#f8fafc' }}>
      
      {/* HEADER */}
      <header style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link 
            to={isGeneralTutor ? `/dashboard/${exam}` : `/dashboard/${exam}/subjects/${subject}`}
            style={{ textDecoration: 'none', color: '#64748b', fontSize: '24px', fontWeight: 'bold' }}
          >
            ←
          </Link>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '14px', color: '#1e293b', fontWeight: '800' }}>EduDrill AI</span>
            <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }}></span> Online
            </span>
          </div>
        </div>
        <button onClick={() => setShowHistory(true)} style={{ background: '#f1f5f9', border: 'none', color: '#1e293b', padding: '8px 16px', borderRadius: '16px', fontWeight: 'bold', fontSize: '12px' }}>
          History
        </button>
      </header>

      {/* CHAT AREA */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {currentChat?.messages.map((msg) => (
          <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', maxWidth: '85%' }}>
              {msg.role === 'assistant' && (
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#123b72', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', flexShrink: 0 }}>
                  🤖
                </div>
              )}
              <div style={{ 
                background: msg.role === 'user' ? '#123b72' : 'white', 
                color: msg.role === 'user' ? 'white' : '#1e293b', 
                padding: '12px 16px', 
                borderRadius: '16px', 
                borderBottomRightRadius: msg.role === 'user' ? 4 : 16,
                borderBottomLeftRadius: msg.role === 'assistant' ? 4 : 16,
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                fontSize: '14px',
                lineHeight: 1.5,
                wordBreak: 'break-word'
              }}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#123b72', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>🤖</div>
            <div style={{ background: 'white', padding: '12px 16px', borderRadius: '16px', borderBottomLeftRadius: 4, display: 'flex', gap: '4px' }}>
              <span style={{ width: 6, height: 6, background: '#cbd5e1', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both' }}></span>
              <span style={{ width: 6, height: 6, background: '#cbd5e1', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '0.2s' }}></span>
              <span style={{ width: 6, height: 6, background: '#cbd5e1', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '0.4s' }}></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT AREA */}
      <div style={{ padding: '12px 16px', background: 'white', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          style={{ flex: 1, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '12px 16px', fontSize: '14px', outline: 'none', resize: 'none', maxHeight: '100px', fontFamily: 'inherit' }}
          rows={1}
          disabled={loading}
        />
        <button 
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          style={{ width: 44, height: 44, borderRadius: '50%', background: loading || !input.trim() ? '#e2e8f0' : '#123b72', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
        >
          ➤
        </button>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>

      {/* HISTORY OVERLAY */}
      {showHistory && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100, display: 'flex', flexDirection: 'column' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)' }} onClick={() => setShowHistory(false)}></div>
          <div style={{ background: 'white', marginTop: 'auto', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', height: '80vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800' }}>Chat History</h3>
              <button onClick={() => setShowHistory(false)} style={{ background: 'transparent', border: 'none', fontSize: '24px', color: '#64748b' }}>×</button>
            </div>
            
            <div style={{ padding: '16px' }}>
              <button onClick={createChat} style={{ width: '100%', background: '#f0f9ff', color: '#123b72', border: '2px dashed #bae6fd', padding: '16px', borderRadius: '16px', fontWeight: 'bold', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>+</span> New Chat
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {chats.map(chat => (
                <button
                  key={chat.id}
                  onClick={() => openChat(chat.id)}
                  style={{ background: chat.id === currentChatId ? '#123b72' : 'white', color: chat.id === currentChatId ? 'white' : '#1e293b', border: `1px solid ${chat.id === currentChatId ? '#123b72' : '#e2e8f0'}`, padding: '16px', borderRadius: '16px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '12px' }}
                >
                  <span style={{ fontSize: '16px' }}>💬</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: '600', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{chat.title}</div>
                    <div style={{ fontSize: '11px', color: chat.id === currentChatId ? '#bae6fd' : '#94a3b8', marginTop: '4px' }}>{new Date(chat.createdAt).toLocaleDateString()}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default MobileAITutor;
