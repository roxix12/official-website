import React from 'react';

function Image({
  src,
  alt = "Image Name",
  className = "",
  ...props
}) {

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      crossOrigin="anonymous"
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = "/assets/images/no_image.png";
      }}
      {...props}
    />
  );
}

export default Image;
