import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const ChatAssistantFab = () => {
  const navigate = useNavigate();
  return (
    <button
      aria-label="Open assistant"
      className="fixed bottom-4 right-4 z-40 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-400/20 hover:shadow-blue-400/40 transition-all duration-300 w-12 h-12 flex items-center justify-center border border-white/20"
      onClick={() => navigate('/chat-cdw-burhan-assistant')}
    >
      <Icon name="Bot" size={20} />
    </button>
  );
};

export default ChatAssistantFab;


