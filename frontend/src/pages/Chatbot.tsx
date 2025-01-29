import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Volume2, VolumeX, Mic, MicOff, X } from 'lucide-react';
import axios from 'axios';

interface Message {
  type: 'user' | 'bot';
  content: string | string[];
  timestamp: Date;
  isThinking?: boolean;
  isTyping?: boolean;
}

const thinkingPhrases = [
  "Analyzing your financial data...",
  "Crunching the numbers...",
  "Reviewing market trends...",
  "Calculating optimal solutions...",
  "Processing financial insights...",
  "Examining investment patterns...",
  "Evaluating market conditions...",
  "Generating personalized advice..."
];

const defaultPrompts = [
  "what is the stock price of Adani green",
  "give me last week return of tata motors",
  "give me last 3days stock price of tata consultancy services"
];

const Chatbot = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      content: 'Hello! I\'m your AI financial assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentThinkingIndex, setCurrentThinkingIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState<number | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeechModalOpen, setIsSpeechModalOpen] = useState(false);
  const [transcript, setTranscript] = useState('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    let thinkingInterval: number;
    
    if (isTyping) {
      thinkingInterval = setInterval(() => {
        setCurrentThinkingIndex((prev) => {
          const nextIndex = (prev + 1) % thinkingPhrases.length;
          setMessages(messages => {
            const lastMessage = messages[messages.length - 1];
            if (lastMessage.isThinking) {
              const currentContent = Array.isArray(lastMessage.content) 
                ? lastMessage.content 
                : [lastMessage.content];
              return [
                ...messages.slice(0, -1),
                {
                  ...lastMessage,
                  content: [...currentContent, thinkingPhrases[nextIndex]]
                }
              ];
            }
            return messages;
          });
          return nextIndex;
        });
      }, 2000);
    }

    return () => {
      if (thinkingInterval) {
        clearInterval(thinkingInterval);
      }
    };
  }, [isTyping]);

  const speak = (text: string, messageIndex: number) => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    if (isSpeaking === messageIndex) {
      setIsSpeaking(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN'; // Set to Indian English
    utterance.rate = 0.9; // Slightly slower than default
    utterance.pitch = 1;

    utterance.onend = () => {
      setIsSpeaking(null);
    };

    setIsSpeaking(messageIndex);
    window.speechSynthesis.speak(utterance);
  };

  // Stop speaking when component unmounts
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      type: 'user',
      content: input,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setCurrentThinkingIndex(0);

    // Add initial thinking message
    setMessages(prev => [...prev, {
      type: 'bot',
      content: [thinkingPhrases[0]],
      timestamp: new Date(),
      isThinking: true
    }]);

    try {
      const formData = new FormData();
      formData.append('input', input);

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://2ecd-111-125-219-62.ngrok-free.app/agent',
        data: formData
      };

      const response = await axios.request(config);
      console.log(response.data);
      setIsTyping(false);
      
      // First, show the thought process
      setMessages(prev => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage.isThinking) {
          return [
            ...prev.slice(0, -1),
            {
              type: 'bot',
              content: [
                "🤔 Analyzing Your Request:",
                "───────────────",
                response.data.thought,
                "───────────────",
              ],
              timestamp: new Date()
            }
          ];
        }
        return prev;
      });

      // Then show the output with a typing effect
      let displayedText = '';
      const outputText = response.data.output;
      let charIndex = 0;

      // Add a temporary message for typing effect
      setMessages(prev => [...prev, {
        type: 'bot',
        content: '',
        timestamp: new Date(),
        isTyping: true
      }]);

      const typingInterval = setInterval(() => {
        if (charIndex < outputText.length) {
          displayedText += outputText[charIndex];
          charIndex++;
          
          // Update the last message with new text
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = {
              type: 'bot',
              content: displayedText,
              timestamp: new Date()
            };
            return newMessages;
          });
        } else {
          clearInterval(typingInterval);
        }
      }, 30); // Adjust speed as needed - now typing character by character

    } catch (error) {
      console.error(error);
      setIsTyping(false);
      setMessages(prev => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage.isThinking) {
          return [
            ...prev.slice(0, -1),
            {
              type: 'bot',
              content: "Sorry, I encountered an error. Please try again.",
              timestamp: new Date()
            }
          ];
        }
        return prev;
      });
    }
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('');
        setTranscript(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error(event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
      return recognition;
    }
  };

  const SpeechModal = () => {
    if (!isSpeechModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 relative">
          <button
            onClick={() => {
              setIsSpeechModalOpen(false);
              setIsListening(false);
              setTranscript('');
            }}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Voice Input
            </h3>
            <div className="mb-6">
              <button
                onClick={() => {
                  if (isListening) {
                    setIsListening(false);
                  } else {
                    startListening();
                  }
                }}
                className={`p-4 rounded-full ${
                  isListening
                    ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                    : 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
                } hover:opacity-80 transition-opacity`}
              >
                {isListening ? (
                  <MicOff className="h-6 w-6" />
                ) : (
                  <Mic className="h-6 w-6" />
                )}
              </button>
            </div>
            <div className="min-h-[100px] p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 text-sm mb-4">
              {transcript || 'Start speaking...'}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setInput(transcript);
                  setIsSpeechModalOpen(false);
                  setIsListening(false);
                  setTranscript('');
                }}
                className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Use Text
              </button>
              <button
                onClick={() => {
                  setTranscript('');
                }}
                className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-[calc(100vh-2rem)] p-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <Bot className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">AI Financial Assistant</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Ask me anything about your finances</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`p-2 rounded-lg ${message.type === 'user' ? 'bg-indigo-600' : 'bg-gray-100 dark:bg-gray-700'}`}>
                  {message.type === 'user' ? (
                    <User className="h-5 w-5 text-white" />
                  ) : (
                    <Bot className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  )}
                </div>
                <div className={`relative p-4 rounded-2xl ${
                  message.type === 'user' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}>
                  <div className="text-sm whitespace-pre-line">
                    {Array.isArray(message.content) ? (
                      message.content.map((line, i) => (
                        <motion.div
                          key={i}
                          initial={message.isThinking ? { opacity: 0 } : { opacity: 1 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className={`${
                            line.startsWith('🤔') ? 'font-semibold text-indigo-600 dark:text-indigo-400' :
                            line.startsWith('───') ? 'text-gray-400 dark:text-gray-500' :
                            message.isThinking && i === message.content.length - 1 ? 'text-gray-600 dark:text-gray-400' :
                            ''
                          }`}
                        >
                          {line}
                        </motion.div>
                      ))
                    ) : (
                      message.content
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    {message.type === 'bot' && !message.isThinking && (
                      <button
                        onClick={() => speak(
                          Array.isArray(message.content) 
                            ? message.content.join('\n') 
                            : message.content,
                          index
                        )}
                        className={`ml-2 p-1 rounded-full transition-colors ${
                          isSpeaking === index
                            ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                            : 'hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {isSpeaking === index ? (
                          <VolumeX className="h-4 w-4" />
                        ) : (
                          <Volume2 className="h-4 w-4" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          {/* Default Prompts */}
          <div className="mb-4 flex flex-wrap gap-2">
            {defaultPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(prompt)}
                className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setIsSpeechModalOpen(true)}
              className="p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 focus:outline-none"
            >
              <Mic className="h-5 w-5" />
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
      <SpeechModal />
    </div>
  );
};

export default Chatbot; 