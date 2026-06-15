'use client';

import { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
const aiiImage = '/assets/aii.png';
import data from './data.json';


const INITIAL_SUGGESTIONS = [
  { label: "Introduce yourself", query: "Who are you?" },
  { label: "Tell me about your projects", query: "Tell me about your projects" },
  { label: "What are your skills?", query: "What are your skills?" },
  { label: "Show your resume", query: "Show me your resume" },
  { label: "Why hire you?", query: "Why should I hire you?" }
];

const FOLLOW_UP_MAP = {
  intro: [
    { label: "Tell me about your projects", query: "Can you tell me about your projects?" },
    { label: "What are your skills?", query: "What are your technical skills?" },
    { label: "Why should I hire you?", query: "Why hire you?" }
  ],
  projects: [
    { label: "Which is your favorite project?", query: "Which is your favorite project?" },
    { label: "Tell me about your AI projects", query: "What AI projects have you built?" },
    { label: "What is your tech stack?", query: "What technologies do you use?" }
  ],
  skills: [
    { label: "Tell me about your AI work", query: "What AI/ML work have you done?" },
    { label: "Why hire you?", query: "Why are you a good fit for a role?" },
    { label: "Show your resume", query: "Can I see your resume?" }
  ],
  hire: [
    { label: "Tell me about your projects", query: "What projects have you led?" },
    { label: "What are your strengths?", query: "What are your strengths?" },
    { label: "Show your resume", query: "Show me your resume" }
  ],
  resume: [
    { label: "What are your core skills?", query: "What are your main skills?" },
    { label: "Why hire you?", query: "Why should I hire you?" },
    { label: "Tell me about your projects", query: "Tell me about your work" }
  ],
  default: [
    { label: "Introduce yourself", query: "Who are you?" },
    { label: "Tell me about your projects", query: "Tell me about your projects" },
    { label: "Why hire you?", query: "Why hire you?" }
  ]
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: data.greeting.welcome, sender: 'bot', time: formatTime() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState(null);
  const [currentFollowUps, setCurrentFollowUps] = useState([]);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);


  function formatTime() {
    return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  }


  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, streamingMessageId, currentFollowUps]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const streamText = (fullText, messageId) => {
    let currentText = '';
    const words = fullText.split(' ');
    let wordIndex = 0;

    const interval = setInterval(() => {
      if (wordIndex < words.length) {
        currentText += (wordIndex === 0 ? '' : ' ') + words[wordIndex];
        setMessages(prev => prev.map(m => 
          m.id === messageId ? { ...m, text: currentText } : m
        ));
        wordIndex++;
      } else {
        clearInterval(interval);
        setStreamingMessageId(null);
      }
    }, 30);
  };

  const getBotResponse = (userInput) => {
    const query = userInput.toLowerCase();
    let response = "";
    let type = "default";

    if (query.includes('introduce') || query.includes('who are you') || query.includes('yourself')) {
      response = data.about.introduce;
      type = "intro";
    } else if (query.includes('project') || query.includes('work')) {
      const p = data.projects.map(p => p.name).join(', ');
      response = `I have led and built projects like ${p}. One of my favorites is ${data.projects[0].name}, which addresses ${data.projects[0].details.problem}.`;
      type = "projects";
    } else if (query.includes('skill') || query.includes('tech') || query.includes('stack')) {
      response = `My expertise spans ${data.skills.languages.join(', ')} and ${data.skills.frontend.join(', ')}. In AI, I focus on ${data.ai_skills.concepts.join(', ')} using tools like ${data.ai_skills.tools.join(', ')}.`;
      type = "skills";
    } else if (query.includes('hire') || query.includes('why')) {
      response = `You should hire me because: ${data.why_me.join('. ')}. I am a ${data.availability.roles.join(' & ')} ready for ${data.availability.openTo.join(' and ')}.`;
      type = "hire";
    } else if (query.includes('resume') || query.includes('cv')) {
      response = `I am a student at ${data.education.college} with a CGPA of ${data.education.cgpa}. You can find my full resume at the top of the hero section for download.`;
      type = "resume";
    } else if (query.includes('hi') || query.includes('hello')) {
      response = data.greeting.welcome;
      type = "default";
    } else {
      response = data.greeting.fallback;
      type = "default";
    }

    return { response, type };
  };

  const handleSend = (e, customInput) => {
    if (e) e.preventDefault();
    const messageText = customInput || input;
    const trimmed = messageText.trim();
    if (!trimmed || streamingMessageId) return;

    // Reset follow-ups when user asks something new
    setCurrentFollowUps([]);
    
    const userMsg = { id: Date.now(), text: trimmed, sender: 'user', time: formatTime() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botMsgId = Date.now();
      const botMsg = { id: botMsgId, text: '', sender: 'bot', time: formatTime() };
      setMessages(prev => [...prev, botMsg]);
      setStreamingMessageId(botMsgId);
      
      const { response, type } = getBotResponse(trimmed);
      streamText(response, botMsgId);
      
      // Set relative follow-ups after streaming starts
      setCurrentFollowUps(FOLLOW_UP_MAP[type] || FOLLOW_UP_MAP.default);
    }, 1000);
  };

  const isInitialState = messages.length === 1 && !isTyping && !streamingMessageId;
  const showFollowUps = currentFollowUps.length > 0 && !isTyping && !streamingMessageId;

  return (
    <div className="cb-root">
      <button className={`cb-trigger ${isOpen ? 'cb-trigger--open' : ''}`} onClick={() => setIsOpen(o => !o)}>
        <img src={aiiImage} alt="" draggable={false} />
      </button>

      <div className={`cb-panel ${isOpen ? 'cb-panel--visible' : ''}`}>
        <div className="cb-header">
          <div className="cb-header__left">
            <div className="cb-header__avatar"><img src={aiiImage} alt="" /></div>
            <div className="cb-header__meta">
              <span className="cb-header__name">Bala's Assistant</span>
              <span className="cb-header__status"><span className="cb-dot" />Online</span>
            </div>
          </div>
          <button className="cb-close" onClick={() => setIsOpen(false)}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          </button>
        </div>

        <div className="cb-body">
          {messages.map((msg) => (
            <div key={msg.id} className={`cb-msg cb-msg--${msg.sender}`}>
              <div className="cb-msg__bubble">{msg.text}</div>
              <span className="cb-msg__time" suppressHydrationWarning>
                {mounted ? msg.time : ''}
              </span>

            </div>
          ))}

          {isTyping && (
            <div className="cb-msg cb-msg--bot">
              <div className="cb-msg__bubble cb-typing"><span /><span /><span /></div>
            </div>
          )}

          {showFollowUps && (
            <div className="cb-followups">
              <span className="cb-followups-label">Follow-ups</span>
              <div className="cb-followups-list">
                {currentFollowUps.map((s, i) => (
                  <button key={i} className="cb-followup-item" onClick={() => handleSend(null, s.query)}>
                    <svg className="cb-followup-icon" width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} style={{ height: '1px' }} />
        </div>

        {isInitialState && (
          <div className="cb-suggestions">
            {INITIAL_SUGGESTIONS.map((s, i) => (
              <button key={i} className="cb-suggestion-chip" onClick={() => handleSend(null, s.query)}>
                {s.label}
              </button>
            ))}
          </div>
        )}

        <form className="cb-footer" onSubmit={handleSend}>
          <input
            ref={inputRef}
            className="cb-input"
            type="text"
            placeholder="Ask me anything..."
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={streamingMessageId || isTyping}
            autoComplete="off"
          />
          <button className="cb-send" type="submit" disabled={!input.trim() || streamingMessageId || isTyping}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
