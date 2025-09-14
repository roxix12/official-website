import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Beautiful Notification Container
export const NotificationContainer = ({ notifications, removeNotification }) => {
  return (
    <div className="fixed top-6 right-6 z-[9999] space-y-3 pointer-events-none">
      <AnimatePresence>
        {notifications.map((notification) => (
          <BeautifulNotification
            key={notification.id}
            notification={notification}
            onRemove={() => removeNotification(notification.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// Individual Beautiful Notification
const BeautifulNotification = ({ notification, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove();
    }, notification.duration || 5000);

    return () => clearTimeout(timer);
  }, [onRemove, notification.duration]);

  const getNotificationStyles = () => {
    switch (notification.type) {
      case 'success':
        return {
          gradient: 'from-emerald-500/90 to-green-600/90',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ),
          glow: 'shadow-emerald-500/25'
        };
      case 'error':
        return {
          gradient: 'from-red-500/90 to-rose-600/90',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ),
          glow: 'shadow-red-500/25'
        };
      case 'warning':
        return {
          gradient: 'from-amber-500/90 to-orange-600/90',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          ),
          glow: 'shadow-amber-500/25'
        };
      default:
        return {
          gradient: 'from-blue-500/90 to-indigo-600/90',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          glow: 'shadow-blue-500/25'
        };
    }
  };

  const styles = getNotificationStyles();

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.9 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }}
      className="pointer-events-auto"
    >
      <div
        className={`
          relative overflow-hidden
          bg-gradient-to-r ${styles.gradient}
          backdrop-blur-lg
          border border-white/20
          rounded-2xl
          shadow-2xl ${styles.glow}
          max-w-sm w-full
          transform transition-all duration-300
          hover:scale-105 hover:shadow-3xl
        `}
      >
        {/* Animated Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent animate-pulse opacity-50" />
        
        {/* Content */}
        <div className="relative p-4">
          <div className="flex items-start space-x-3">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                {styles.icon}
              </div>
            </div>
            
            {/* Text Content */}
            <div className="flex-1 min-w-0">
              {notification.title && (
                <h4 className="text-white font-semibold text-sm mb-1 leading-tight">
                  {notification.title}
                </h4>
              )}
              <p className="text-white/90 text-sm leading-relaxed">
                {notification.message}
              </p>
            </div>
            
            {/* Close Button */}
            <button
              onClick={onRemove}
              className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 flex items-center justify-center text-white/70 hover:text-white"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Progress Bar */}
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: (notification.duration || 5000) / 1000, ease: "linear" }}
            className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
};

// Beautiful Popup Modal
export const BeautifulPopup = ({ isOpen, onClose, type = 'info', title, children, actions }) => {
  const getPopupStyles = () => {
    switch (type) {
      case 'success':
        return {
          gradient: 'from-emerald-500/10 to-green-600/10',
          border: 'border-emerald-500/30',
          icon: (
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center text-white mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )
        };
      case 'error':
        return {
          gradient: 'from-red-500/10 to-rose-600/10',
          border: 'border-red-500/30',
          icon: (
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-rose-600 flex items-center justify-center text-white mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )
        };
      case 'warning':
        return {
          gradient: 'from-amber-500/10 to-orange-600/10',
          border: 'border-amber-500/30',
          icon: (
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center text-white mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
              </svg>
            </div>
          )
        };
      default:
        return {
          gradient: 'from-blue-500/10 to-indigo-600/10',
          border: 'border-blue-500/30',
          icon: (
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )
        };
    }
  };

  const styles = getPopupStyles();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
          />
          
          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          >
            <div
              className={`
                relative
                bg-gradient-to-br ${styles.gradient}
                backdrop-blur-xl
                border ${styles.border}
                rounded-3xl
                shadow-2xl
                max-w-md w-full
                p-8
                text-center
                bg-gray-900/95
              `}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 flex items-center justify-center text-gray-400 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Icon */}
              <div className="flex justify-center">
                {styles.icon}
              </div>
              
              {/* Title */}
              {title && (
                <h3 className="text-2xl font-bold text-white mb-4">
                  {title}
                </h3>
              )}
              
              {/* Content */}
              <div className="text-gray-300 mb-8">
                {children}
              </div>
              
              {/* Actions */}
              {actions && (
                <div className="flex gap-3 justify-center">
                  {actions}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Hook for managing notifications
export const useBeautifulNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'info', title = null, duration = 5000) => {
    const id = Date.now() + Math.random();
    const newNotification = { id, message, type, title, duration };
    
    setNotifications((prev) => [...prev, newNotification]);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const notify = {
    success: (message, title) => addNotification(message, 'success', title),
    error: (message, title) => addNotification(message, 'error', title),
    warning: (message, title) => addNotification(message, 'warning', title),
    info: (message, title) => addNotification(message, 'info', title),
  };

  return { 
    notifications, 
    notify, 
    removeNotification, 
    clearAllNotifications 
  };
};

// Hook for managing popup modals
export const useBeautifulPopup = () => {
  const [popups, setPopups] = useState([]);

  const showPopup = (config) => {
    const id = Date.now() + Math.random();
    const popup = { id, ...config, isOpen: true };
    setPopups((prev) => [...prev, popup]);
    return id;
  };

  const hidePopup = (id) => {
    setPopups((prev) => prev.filter((popup) => popup.id !== id));
  };

  const hideAllPopups = () => {
    setPopups([]);
  };

  return {
    popups,
    showPopup,
    hidePopup,
    hideAllPopups
  };
};
