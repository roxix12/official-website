import crypto from 'crypto-js';

/**
 * Generate Gravatar URL from email address
 * @param {string} email - User's email address
 * @param {number} size - Image size in pixels (default: 80)
 * @param {string} defaultType - Default image type (default: 'identicon')
 * @returns {string} Gravatar URL
 */
export const getGravatarUrl = (email, size = 80, defaultType = 'identicon') => {
  if (!email) return null;
  
  // Trim and lowercase the email
  const trimmedEmail = email.trim().toLowerCase();
  
  // Generate MD5 hash of the email
  const hash = crypto.MD5(trimmedEmail).toString();
  
  // Construct Gravatar URL
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=${defaultType}&r=pg`;
};

/**
 * Generate a deterministic color from email for fallback avatars
 * @param {string} email - User's email address
 * @returns {string} CSS gradient string
 */
export const getAvatarGradient = (email) => {
  if (!email) return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  
  // Generate a hash from email
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    const char = email.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Generate colors based on hash
  const hue1 = Math.abs(hash) % 360;
  const hue2 = (hue1 + 60) % 360;
  
  return `linear-gradient(135deg, hsl(${hue1}, 70%, 60%) 0%, hsl(${hue2}, 70%, 40%) 100%)`;
};

/**
 * Get user initials from name
 * @param {string} name - User's name
 * @returns {string} User initials (max 2 characters)
 */
export const getUserInitials = (name) => {
  if (!name) return 'U';
  
  const words = name.trim().split(' ');
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
};
