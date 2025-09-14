import React, { useState } from 'react';
import { ClipboardIcon, CheckIcon, CommandLineIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const TerminalCommands = ({ 
  title = "Fix Cursor Editor Issues", 
  description = "Run these commands if Cursor editor is misbehaving or stuck",
  commands = []
}) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const defaultCommands = [
    {
      os: "Windows (PowerShell as Admin)",
      command: "taskkill /IM Cursor.exe /F",
      description: "Force close Cursor on Windows",
      color: "from-blue-500 to-blue-600"
    },
    {
      os: "macOS",
      command: 'pkill -f "Cursor"',
      description: "Force close Cursor on macOS",
      color: "from-gray-500 to-gray-600"
    },
    {
      os: "Linux",
      command: "pkill -f cursor",
      description: "Force close Cursor on Linux",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const commandsList = commands.length > 0 ? commands : defaultCommands;

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Header */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mb-4">
          <CommandLineIcon className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-2">
          {title}
        </h2>
        <p className="text-gray-300 text-lg">
          {description}
        </p>
      </motion.div>

      {/* Commands Grid */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {commandsList.map((cmd, index) => (
          <motion.div
            key={index}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* OS Badge */}
            <div className={`absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r ${cmd.color} text-white text-sm font-medium`}>
              {cmd.os}
            </div>

            {/* Content */}
            <div className="p-6 pt-16">
              {/* Command */}
              <div className="relative mb-4">
                <div className="bg-black/40 rounded-lg p-4 border border-gray-600/30">
                  <code className="text-green-400 font-mono text-sm break-all">
                    {cmd.command}
                  </code>
                </div>
                
                {/* Copy Button */}
                <button
                  onClick={() => copyToClipboard(cmd.command, index)}
                  className="absolute top-2 right-2 p-2 rounded-md bg-gray-700/50 hover:bg-gray-600/50 transition-colors group/btn"
                  title="Copy command"
                >
                  {copiedIndex === index ? (
                    <CheckIcon className="w-4 h-4 text-green-400" />
                  ) : (
                    <ClipboardIcon className="w-4 h-4 text-gray-400 group-hover/btn:text-white" />
                  )}
                </button>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm">
                {cmd.description}
              </p>

              {/* Warning Badge */}
              <div className="mt-4 flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-400 text-xs font-medium uppercase tracking-wide">
                  Important
                </span>
              </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>

      {/* Additional Instructions */}
      <motion.div 
        className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 border border-amber-500/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="text-xl font-semibold text-amber-400 mb-3 flex items-center">
          <span className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-black text-sm font-bold mr-3">
            !
          </span>
          Usage Instructions
        </h3>
        <div className="space-y-2 text-gray-300">
          <p>• <strong>Windows:</strong> Right-click Start button → "Windows PowerShell (Admin)" → Paste command</p>
          <p>• <strong>macOS:</strong> Press Cmd+Space → Type "Terminal" → Paste command</p>
          <p>• <strong>Linux:</strong> Press Ctrl+Alt+T → Paste command</p>
          <p className="text-amber-400 font-medium mt-4">
            ⚠️ These commands will force-close Cursor. Save your work first!
          </p>
        </div>
      </motion.div>

      {/* Success Message */}
      {copiedIndex !== null && (
        <motion.div
          className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
        >
          Command copied to clipboard!
        </motion.div>
      )}
    </div>
  );
};

export default TerminalCommands;
