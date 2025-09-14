import React, { useState } from 'react';
import { getGravatarUrl, getAvatarGradient, getUserInitials } from '../utils/gravatar';

const Avatar = ({ 
  name, 
  email, 
  size = 32, 
  className = '',
  showTooltip = false 
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const gravatarUrl = getGravatarUrl(email, size);
  const gradient = getAvatarGradient(email);
  const initials = getUserInitials(name);
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  const avatarStyle = {
    width: `${size}px`,
    height: `${size}px`,
    background: gradient,
    fontSize: `${size * 0.4}px`
  };
  
  return (
    <div 
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden ${className}`}
      style={avatarStyle}
      title={showTooltip ? name : undefined}
    >
      {/* Gravatar Image */}
      {gravatarUrl && !imageError && (
        <img
          src={gravatarUrl}
          alt={`${name}'s avatar`}
          className={`w-full h-full object-cover transition-opacity duration-200 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onError={handleImageError}
          onLoad={handleImageLoad}
          loading="lazy"
        />
      )}
      
      {/* Fallback Initials */}
      {(imageError || !gravatarUrl || !imageLoaded) && (
        <span 
          className={`text-white font-bold select-none transition-opacity duration-200 ${
            imageLoaded && !imageError ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {initials}
        </span>
      )}
      
      {/* Online Indicator (optional) */}
      {showTooltip && (
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
      )}
    </div>
  );
};

// Different size variants
export const AvatarSizes = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
  '2xl': 80
};

// Avatar with loading state
export const AvatarWithLoading = ({ loading, ...props }) => {
  if (loading) {
    return (
      <div 
        className={`animate-pulse bg-gray-300 rounded-full ${props.className}`}
        style={{ width: `${props.size || 32}px`, height: `${props.size || 32}px` }}
      />
    );
  }
  
  return <Avatar {...props} />;
};

export default Avatar;
