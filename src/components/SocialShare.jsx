import React, { useState } from 'react'
import { 
  ShareIcon, 
  CopyIcon, 
  CheckIcon, 
  TwitterIcon, 
  FacebookIcon, 
  LinkedInIcon, 
  WhatsAppIcon, 
  EmailIcon,
  CloseIcon
} from './Icons'

const SocialShare = ({ title, url, excerpt }) => {
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copied, setCopied] = useState(false)

  // Encode text for URLs
  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(url)
  const encodedExcerpt = encodeURIComponent(excerpt || title)

  // Social sharing URLs
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedExcerpt}%0A%0A${encodedUrl}`
  }

  // Copy URL to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }

  // Open share URL
  const openShare = (platform) => {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400')
    setShowShareMenu(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <ShareIcon size={16} />
        Share
      </button>

      {showShareMenu && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setShowShareMenu(false)}
          />
          
          {/* Share Menu */}
          <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-20">
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Share this post
              </h3>
              
              <div className="grid grid-cols-2 gap-2">
                {/* Twitter */}
                <button
                  onClick={() => openShare('twitter')}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                >
                  <div className="w-8 h-8 bg-[#1DA1F2] rounded-full flex items-center justify-center">
                    <TwitterIcon size={16} className="text-white" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Twitter</span>
                </button>

                {/* Facebook */}
                <button
                  onClick={() => openShare('facebook')}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                >
                  <div className="w-8 h-8 bg-[#4267B2] rounded-full flex items-center justify-center">
                    <FacebookIcon size={16} className="text-white" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Facebook</span>
                </button>

                {/* LinkedIn */}
                <button
                  onClick={() => openShare('linkedin')}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                >
                  <div className="w-8 h-8 bg-[#0077B5] rounded-full flex items-center justify-center">
                    <LinkedInIcon size={16} className="text-white" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">LinkedIn</span>
                </button>

                {/* WhatsApp */}
                <button
                  onClick={() => openShare('whatsapp')}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                >
                  <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center">
                    <WhatsAppIcon size={16} className="text-white" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">WhatsApp</span>
                </button>

                {/* Email */}
                <button
                  onClick={() => openShare('email')}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                >
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                    <EmailIcon size={16} className="text-white" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Email</span>
                </button>

                {/* Copy Link */}
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                >
                  <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                    {copied ? (
                      <CheckIcon size={16} className="text-white" />
                    ) : (
                      <CopyIcon size={16} className="text-white" />
                    )}
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {copied ? 'Copied!' : 'Copy Link'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default SocialShare
