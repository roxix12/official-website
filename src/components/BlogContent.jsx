import React, { useEffect } from 'react'

const BlogContent = ({ content }) => {
  useEffect(() => {
    // Add copy functionality to code blocks
    window.copyCode = function(button) {
      const codeBlock = button.closest('.code-block')
      const code = codeBlock.querySelector('code').textContent
      
      navigator.clipboard.writeText(code).then(() => {
        const originalText = button.textContent
        button.textContent = 'Copied!'
        button.style.background = '#059669'
        
        setTimeout(() => {
          button.textContent = originalText
          button.style.background = '#4b5563'
        }, 2000)
      })
    }

    // Add syntax highlighting for code blocks
    const codeBlocks = document.querySelectorAll('.code-block code')
    codeBlocks.forEach(block => {
      const language = block.className.replace('language-', '')
      
      // Simple syntax highlighting for common languages
      let content = block.innerHTML
      
      if (language === 'javascript' || language === 'js') {
        content = content
          .replace(/\b(const|let|var|function|return|if|else|for|while|class|import|export|from|default)\b/g, '<span style="color: #f59e0b;">$1</span>')
          .replace(/\b(true|false|null|undefined)\b/g, '<span style="color: #ef4444;">$1</span>')
          .replace(/"([^"]*)"/g, '<span style="color: #10b981;">"$1"</span>')
          .replace(/'([^']*)'/g, '<span style="color: #10b981;">\'$1\'</span>')
          .replace(/\/\/(.*)/g, '<span style="color: #6b7280;">//$1</span>')
      }
      
      if (language === 'html') {
        content = content
          .replace(/&lt;([^&\s]+)/g, '<span style="color: #f59e0b;">&lt;$1</span>')
          .replace(/([a-zA-Z-]+)=("[^"]*")/g, '<span style="color: #8b5cf6;">$1</span>=<span style="color: #10b981;">$2</span>')
          .replace(/&lt;!--(.*?)--&gt;/g, '<span style="color: #6b7280;">&lt;!--$1--&gt;</span>')
      }
      
      if (language === 'css') {
        content = content
          .replace(/([a-zA-Z-]+)(\s*:)/g, '<span style="color: #3b82f6;">$1</span>$2')
          .replace(/(#[a-fA-F0-9]{3,6}|rgb\([^)]+\)|rgba\([^)]+\))/g, '<span style="color: #f59e0b;">$1</span>')
          .replace(/\/\*(.*?)\*\//g, '<span style="color: #6b7280;">/*$1*/</span>')
      }
      
      if (language === 'python') {
        content = content
          .replace(/\b(def|class|import|from|if|elif|else|for|while|try|except|with|as|return|yield|lambda|and|or|not|in|is)\b/g, '<span style="color: #f59e0b;">$1</span>')
          .replace(/\b(True|False|None)\b/g, '<span style="color: #ef4444;">$1</span>')
          .replace(/"([^"]*)"/g, '<span style="color: #10b981;">"$1"</span>')
          .replace(/'([^']*)'/g, '<span style="color: #10b981;">\'$1\'</span>')
          .replace(/#(.*)/g, '<span style="color: #6b7280;">#$1</span>')
      }
      
      block.innerHTML = content
    })
  }, [content])

  return (
    <div 
      className="blog-content prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
      style={{
        '--tw-prose-body': '#374151',
        '--tw-prose-headings': '#111827',
        '--tw-prose-links': '#3b82f6',
        '--tw-prose-bold': '#111827',
        '--tw-prose-quotes': '#6b7280',
        '--tw-prose-code': '#ef4444',
        '--tw-prose-pre-bg': '#1f2937',
        '--tw-prose-pre-code': '#e5e7eb',
      }}
    />
  )
}

export default BlogContent
